from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# ==============================
# Phishing Detector
# ==============================

@app.route("/api/phishing", methods=["POST"])
def phishing():

    data = request.json

    email = data.get("email", "").lower()

    keywords = [
        "bank",
        "verify",
        "password",
        "urgent",
        "click",
        "login",
        "otp",
        "gift",
        "free"
    ]

    matched = []

    for word in keywords:
        if word in email:
            matched.append(word)

    prediction = "Phishing" if len(matched) >= 2 else "Safe"

    confidence = min(99, 60 + len(matched) * 8)

    return jsonify({
        "prediction": prediction,
        "confidence": confidence,
        "matched_words": matched
    })


# ==============================
# Intrusion Detector
# ==============================

@app.route("/api/intrusion", methods=["POST"])
def intrusion():

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


# ==============================
# Malware Classifier
# ==============================

@app.route("/api/malware", methods=["POST"])
def malware():

    data = request.json

    filename = data.get("filename", "").lower()

    if ".exe" in filename:
        prediction = "Trojan"
        confidence = 96

    elif ".dll" in filename:
        prediction = "Ransomware"
        confidence = 94

    elif ".bat" in filename:
        prediction = "Worm"
        confidence = 91

    elif ".js" in filename:
        prediction = "Spyware"
        confidence = 88

    else:
        prediction = "Safe File"
        confidence = 98

    return jsonify({
        "prediction": prediction,
        "confidence": confidence
    })


# ==============================
# Health Check
# ==============================

@app.route("/")
def home():
    return jsonify({
        "status": "CyberVerse AI ML Server Running"
    })


# ==============================
# Render Startup
# ==============================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000))
    )