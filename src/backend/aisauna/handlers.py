from aiohttp import web


async def handler(request):
    db = request.app["db"]
    return web.json_response({"hello": "world"})
