import logging
from datetime import datetime

from aiohttp import web
from .utils import json_dumps_datetime

logger = logging.getLogger(__name__)


async def book_sauna(request):
    data = await request.json()

    user_id = data["user_id"]
    req_from = datetime.strptime(data["from"], '%Y-%m-%d %H:%M:%S')
    req_to = datetime.strptime(data["to"], '%Y-%m-%d %H:%M:%S')
    now = datetime.now().replace(second=0, microsecond=0)

    if req_from >= req_to or req_from < now:
        return web.Response(status=400)

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
    search_filter = {"from": {"$gte": now}}
    timetable = []

    async for doc in db.bookings.find(search_filter, {'_id': False}).sort('from'):
        timetable.append(doc)

    return web.json_response(
        {"timetable": timetable},
        status=200,
        dumps=json_dumps_datetime
    )


async def sauna_conditions(request):
    now = datetime.now()
    sec = now.second

    resp = {"conditions": "safe" if sec % 10 < 5 else "dangerous"}

    return web.json_response(resp, status=200)
