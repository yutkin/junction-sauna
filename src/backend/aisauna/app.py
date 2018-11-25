import click
import uvloop
import yaml
from aiohttp import web
import logging
import motor.motor_asyncio

from .handlers import (
    get_timetable,
    get_user_booking,
    book_sauna,
    sauna_conditions,
    get_booked_slots,
    cancel_booking,
    set_tresholds,
)


uvloop.install()


logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] PID: %(process)d %(levelname)s @ "
    "%(pathname)s:%(lineno)d ~ %(message)s",
    datefmt="%d/%b/%Y %H:%M:%S",
)


logger = logging.getLogger(__name__)


def read_config(config_path: str):
    with open(config_path, "r") as conf_file:
        raw_config = yaml.load(conf_file) or {}

    return raw_config


def setup_db(app):
    mongo_settings = app["config"]["mongo"]

    host = mongo_settings["host"]
    port = mongo_settings["port"]
    db_name = mongo_settings["db"]
    user = mongo_settings["user"]
    password = mongo_settings["password"]

    uri = f"mongodb://{user}:{password}@{host}:{port}/{db_name}"

    client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    db = client[db_name]
    app["db"] = db


def setup_routes(app: web.Application) -> None:
    app.router.add_post("/api/book", book_sauna)
    app.router.add_post("/api/cancel_booking", cancel_booking)
    app.router.add_post("/api/set_tresholds", set_tresholds)

    app.router.add_get("/api/timetable", get_timetable)
    app.router.add_get("/api/conditions", sauna_conditions)

    app.router.add_get("/api/book", get_user_booking)
    app.router.add_get("/api/booked_slots", get_booked_slots)


async def create_app(config_path: str) -> web.Application:
    app = web.Application(
        # middlewares=[error_middleware]
    )

    app["config"] = read_config(config_path)

    setup_db(app)
    setup_routes(app)

    app["thresholds"] = {"T": 120, "H": 20}

    return app


@click.command()
@click.option("--config", default="/app/etc/development.yml")
@click.option("--port", default=8080)
@click.option("--socket_path", default=None)
def start_app(config, port, socket_path) -> None:
    web.run_app(create_app(config), host="0.0.0.0", port=port, path=socket_path)


if __name__ == "__main__":
    start_app()
