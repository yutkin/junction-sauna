import logging
from datetime import datetime

from aiohttp import web
from .utils import json_dumps_datetime, generate_timetable, get_sensors_readings

logger = logging.getLogger(__name__)


async def book_sauna(request):
    data = await request.json()

    user_id = data["user_id"]
    allow_joins = data.get("allow_joins", False)
    req_from = datetime.strptime(data["from"], "%Y-%m-%d %H:%M:%S")
    req_to = datetime.strptime(data["to"], "%Y-%m-%d %H:%M:%S")

    now = datetime.now().replace(second=0, microsecond=0)
    timeslot = request.app["config"]["app"]["book_timeslot"]

    if req_from >= req_to or req_from < now:
        return web.json_response({"errors": {"message": "Bad ranges"}}, status=400)

    search_filter = {
        "$or": [
            {"from": {"$gte": req_from, "$lte": req_to}},
            {"to": {"$gte": req_from, "$lte": req_to}},
            {"$and": [{"from": {"$lte": req_from}}, {"to": {"$gte": req_to}}]},
        ]
    }

    booked_already = []
    db = request.app["db"]

    async for doc in db.bookings.find(search_filter, {"_id": False}):
        booked_already.append(doc)

    if booked_already:
        return web.json_response(
            {"booked_periods": booked_already}, status=409, dumps=json_dumps_datetime
        )

    await db.bookings.insert_one(
        {"user_id": user_id, "from": req_from, "to": req_to, "allow_joins": allow_joins}
    )

    return web.json_response({"result": "ok"}, status=200)


async def cancel_booking(request):
    data = await request.json()
    user_id = data.get("user_id", -1)

    db = request.app["db"]
    await db.bookings.delete_many({"user_id": {"$eq": user_id}})
    return web.json_response({"result": "ok"}, status=200)


async def get_timetable(request):
    db = request.app["db"]

    now = datetime.now().replace(second=0, microsecond=0)

    timetable = dict()

    async for booking in db.bookings.find({"from": {"$gte": now}}, {"_id": False}):
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


async def get_booked_slots(request):
    db = request.app["db"]
    now = datetime.now()

    res = []
    async for booking in db.bookings.find({"from": {"$gte": now}}, {"_id": False}).sort(
        "from"
    ):
        res.append(booking)

    return web.json_response(
        {"booked_slots": res}, status=200, dumps=json_dumps_datetime
    )


async def get_user_booking(request):
    user_id = request.query.get("user_id")

    if user_id is None:
        return web.json_response(
            {"errors": {"message": "User is not provided"}}, status=400
        )

    db = request.app["db"]
    search_filter = {
        "$and": [{"user_id": {"$eq": user_id}}, {"from": {"$gte": datetime.now()}}]
    }

    res = await db.bookings.find_one(search_filter, {"_id": False})

    if res is not None:
        return web.json_response(
            {"booking": res}, status=200, dumps=json_dumps_datetime
        )

    return web.json_response({"errors": {"message": "Bookings not found"}}, status=404)


async def sauna_conditions(request):
    sensors_readings = await get_sensors_readings()

    T, H = request.app.get("T"), request.app.get("H")

    if (
        sensors_readings["Temperature"] < T
        and sensors_readings["Relative humidity"] < H
    ):
        sensors_readings["conditions"] = "safe"
    else:
        sensors_readings["conditions"] = "dangerous"

    sensors_readings["temperature_ok"] = bool(sensors_readings["Temperature"] < T)
    sensors_readings["humidity_ok"] = bool(sensors_readings["Relative humidity"] < H)

    return web.json_response(sensors_readings, status=200)


async def set_tresholds(request):
    data = await request.json()

    new_T = data["T"]
    new_H = data["H"]

    request.app["T"] = new_T
    request.app["H"] = new_H

    return web.json_response({"result": "ok"}, status=200)
