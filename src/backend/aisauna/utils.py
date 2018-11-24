import json
from datetime import datetime
from datetime import timedelta


def json_dumps_datetime(dict_):
    return json.dumps(dict_, indent=4, sort_keys=True, default=str)


def round_dt(dt, timeslot_length):
    minutes = dt.minute
    new_minute = minutes // timeslot_length * timeslot_length

    dt = dt.replace(minute=new_minute)

    ts = (dt - datetime(1970, 1, 1)) / timedelta(seconds=1) + timeslot_length * 60

    return datetime.utcfromtimestamp(ts)


def generate_timetable(timeslot_length):
    now = datetime.now().replace(second=0, microsecond=0)
    start_dt = round_dt(now, timeslot_length)

    tomorrow = now.replace(hour=0, minute=0) + timedelta(days=1)

    while start_dt < tomorrow:
        dt_from = start_dt
        start_dt += timedelta(minutes=timeslot_length)
        dt_to = start_dt

        yield (dt_from, dt_to)
