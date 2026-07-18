from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PHISHING_WORDS = [
    "urgent",
    "verify",
    "password",
    "bank",
    "click",
    "login",
    "otp",
    "gift",
    "winner",
    "account",
    "limited",
]

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    email = data.get("email", "").lower()

    score = sum(
        word in email
        for word in PHISHING_WORDS
    )

    if score >= 3:
        prediction = "Phishing"
        confidence = 96
    else:
        prediction = "Legitimate"
        confidence = 91

    return jsonify({
        "prediction": prediction,
        "confidence": confidence,
        "matched_words": [
            word
            for word in PHISHING_WORDS
            if word in email
        ]
    })

if __name__ == "__main__":
    app.run(port=8000)