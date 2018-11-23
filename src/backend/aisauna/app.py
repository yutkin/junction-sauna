import click
import uvloop
import yaml
from aiohttp import web
import logging

from .handlers import handler

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


def setup_routes(app: web.Application) -> None:
    app.router.add_get("/hello", handler)


async def create_app(config_path: str) -> web.Application:
    app = web.Application(
        # middlewares=[error_middleware]
    )

    app["config"] = read_config(config_path)

    setup_routes(app)

    return app


@click.command()
@click.option("--config", default="/app/etc/development.yml")
@click.option("--port", default=8080)
@click.option("--socket_path", default=None)
def start_app(config, port, socket_path) -> None:
    web.run_app(
        create_app(config), host="0.0.0.0", port=port, path=socket_path
    )


if __name__ == "__main__":
    start_app()
