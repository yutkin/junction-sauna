from aiohttp import web


async def handler(request):
    return web.json_response({"hello": "world"})
