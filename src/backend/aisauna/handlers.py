import logging
from datetime import datetime

import json

from aiohttp import web
from .utils import json_dumps_datetime

logger = logging.getLogger(__name__)


async def book_sauna(request):
    data = await request.json()

    user_id = data["user_id"]
    req_from = datetime.strptime(data["from"], '%Y-%m-%d %H:%M:%S')
    req_to = datetime.strptime(data["to"], '%Y-%m-%d %H:%M:%S')

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
