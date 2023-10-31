from flask import Flask, render_template
import psutil
import config
import requests


app = Flask(__name__)


@app.route("/system-status", methods=["GET"])
def system_status():
    data = {
        "cpu": psutil.cpu_percent(4) * 10,
        "virtual_memory": int(psutil.virtual_memory().percent),
    }
    return data


@app.route("/weather", methods=["GET"])
def weather():
    r = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?lat=59.943660&lon=30.391942&appid={config.OPEN_WEATHER_MAP_API_KEY}&units=metric&lang=ru")
    return r.json()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6789)
