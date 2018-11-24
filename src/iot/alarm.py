#!/usr/bin/python
import os
import requests
from signal import SIGKILL
from time import sleep


ALARM_SOUND_PATH = './alarm.wav'
ALARM_API_URL = 'https://snek-gc.misha.im/api/conditions'
DOWNLOAD_URL = 'http://www.docdailey.com/Audio/divalrm1.wav'


def sound():
    while True:
        print('Playing alarm')
        os.system('play {} -q trim 0 0:01'.format(ALARM_SOUND_PATH))


def poller(pid):
    req = requests.get(ALARM_API_URL)
    req.raise_for_status()

    condition = req.json()['conditions']
    if condition == 'dangerous' and pid is None:
        pid = os.fork()
        if not pid:
            sound()
    elif condition == 'safe' and pid is not None:
        print('Stopping sound')
        os.kill(pid, SIGKILL)
        pid = None
    return pid


def main():
    if not os.path.exists(ALARM_SOUND_PATH):
        print('Downloading')
        req = requests.get(DOWNLOAD_URL)

        with open('./alarm.wav', 'wb') as f:
            f.write(req.content)

    pid = None
    try:
        while True:
            pid = poller(pid)
            sleep(1)
    except:
        if pid is not None:
            os.kill(pid, SIGKILL)


if __name__ == '__main__':
    main()
