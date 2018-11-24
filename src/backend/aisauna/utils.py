import json


def json_dumps_datetime(dict_):
    return json.dumps(dict_, indent=4, sort_keys=True, default=str)
