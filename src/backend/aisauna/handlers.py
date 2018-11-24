import logging
from datetime import datetime

from aiohttp import web
from .utils import json_dumps_datetime, generate_timetable

logger = logging.getLogger(__name__)


async def book_sauna(request):
    data = await request.json()

    user_id = data["user_id"]
    req_from = datetime.strptime(data["from"], '%Y-%m-%d %H:%M:%S')
    req_to = datetime.strptime(data["to"], '%Y-%m-%d %H:%M:%S')

    now = datetime.now().replace(second=0, microsecond=0)
    timeslot = request.app["config"]["app"]["book_timeslot"]

    if (
        req_from >= req_to or
        req_from < now or
        req_from.minute % timeslot != 0 or
        req_to.minute % timeslot != 0
    ):
        return web.json_response(
            {"errors": {"message": "Bad ranges"}},
            status=400
        )

    search_filter = {
        "$or": [
            {"from": {"$gte": req_from, "$lte": req_to}},
            {"to": {"$gte": req_from, "$lte": req_to}},
            {
                "$and": [
                    {"from": {"$lte": req_from}},
                    {"to": {"$gte": req_to}}
                ]
            }
        ]
    }

    booked_already = []
    db = request.app["db"]

    async for doc in db.bookings.find(search_filter, {'_id': False}):
        booked_already.append(doc)

    if booked_already:
        return web.json_response(
            {"booked_periods": booked_already},
            status=409,
            dumps=json_dumps_datetime,
        )

    await db.bookings.insert_one({
        "user_id": user_id,
        "from": req_from,
        "to": req_to,
    })

    return web.Response(status=200)


async def get_timetable(request):
    db = request.app["db"]

    now = datetime.now().replace(second=0, microsecond=0)

    timetable = dict()

    async for booking in db.bookings.find({"from": {"$gte": now}}, {'_id': False}):
        timetable[(booking["from"], booking["to"])] = booking

    timeslot = request.app["config"]["app"]["book_timeslot"]

    for dt_from, dt_to in generate_timetable(timeslot):
        slot = (dt_from, dt_to)
        if slot not in timetable:
            timetable[slot] = {"from": dt_from, "to": dt_to}

    return web.json_response(
        {"timetable": sorted(timetable.values(), key=lambda x: x["from"])},
        dumps=json_dumps_datetime,
        status=200,
    )


async def get_nearest_booking(request):
    user_id = request.query.get("user_id")

    if user_id is None:
        return web.Response(status=400)

    db = request.app["db"]
    search_filter = {
        "$and": [
            {"user_id": {"$eq": int(user_id)}},
            {"from": {"$gte": datetime.now()}}
        ]
    }

    res = await db.bookings.find_one(search_filter, {'_id': False})

    if res is not None:
        return web.json_response(
            {"booking": res},
            status=200,
            dumps=json_dumps_datetime
        )

    return web.json_response({"errors": {"message": "Bookings not found"}}, status=404)


async def sauna_conditions(request):
    now = datetime.now()
    sec = now.second

    resp = {"conditions": "safe" if sec % 10 < 5 else "dangerous"}

    return web.json_response(resp, status=200)
