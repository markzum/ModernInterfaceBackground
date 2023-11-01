from flask import Flask, render_template
import psutil
# import config
import requests
import json
import speedtest


app = Flask(__name__)
weather_codes = {}
with open("E:\\markzum\\Programming\\Projects\\ModernInterfaceBackground\\weatherCodes.json", encoding='utf-8') as json_file:
    weather_codes = json.load(json_file)


def humansize_internet_speed(nbytes):
    suffixes = ['b/s', 'Kb/s', 'Mb/s', 'Gb/s', 'Tb/s', 'Pb/s']
    i = 0
    while nbytes >= 1024 and i < len(suffixes)-1:
        nbytes /= 1024.
        i += 1
    f = ('%.2f' % nbytes).rstrip('0').rstrip('.')
    return '%s %s' % (f, suffixes[i])


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
        f"https://api.open-meteo.com/v1/forecast?latitude=59.943660&longitude=30.391942&current=temperature_2m,is_day,weathercode")
    r = r.json()

    time_of_day = "day" if r["current"]["is_day"] else "night"
    weather_code = str(r["current"]["weathercode"])
    res = {
        "temperature": r["current"]["temperature_2m"],
        "description": weather_codes[weather_code][time_of_day]["description"],
        "icon_url": weather_codes[weather_code][time_of_day]["image"]
    }
    return res


@app.route("/internet-speed", methods=["GET"])
def internet_speed():
    st = speedtest.Speedtest()
    res = {
        "download_b": st.download(),
        "upload_b": st.upload(),
    }
    res["download"] = humansize_internet_speed(res["download_b"])
    res["upload"] = humansize_internet_speed(res["upload_b"])
    return res


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6789)
