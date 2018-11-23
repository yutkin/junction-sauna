FROM python:3.7

ENV TZ Europe/Moscow

COPY requirements.txt /app/requirements.txt
RUN pip install -U pip -r /app/requirements.txt

RUN pip install -U git+https://github.com/Supervisor/supervisor \
    git+https://github.com/MagicStack/uvloop

COPY aisauna /app/aisauna
COPY etc /app/etc

COPY setup.py /app/setup.py
RUN pip install -e /app

EXPOSE 8080

WORKDIR /app
