from flask import Flask, render_template
import psutil


app = Flask(__name__)


@app.route("/system-status", methods=["GET"])
def system_status():
    data = {
        "cpu": psutil.cpu_percent(4) * 10,
        "virtual_memory": int(psutil.virtual_memory().percent),
    }
    return data


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6789)
