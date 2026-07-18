from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    packets = int(data.get("packets", 0))
    failed = int(data.get("failed_logins", 0))
    traffic = int(data.get("traffic", 0))

    if packets > 800 and traffic > 900:
        attack = "DDoS"
        confidence = 97

    elif failed > 5:
        attack = "Brute Force"
        confidence = 94

    elif packets > 300:
        attack = "Probe"
        confidence = 90

    else:
        attack = "Normal"
        confidence = 96

    return jsonify({
        "prediction": attack,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(port=8001)