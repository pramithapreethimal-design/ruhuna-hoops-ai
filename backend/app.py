from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

print("🔍 Starting backend...")

# Check model path
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'model', 'ruhuna_hoops_model.pkl')
print(f" Looking for model at: {MODEL_PATH}")

if not os.path.exists(MODEL_PATH):
    print(" MODEL NOT FOUND! Run train_model.py first.")
else:
    try:
        model = joblib.load(MODEL_PATH)
        print(" Model loaded successfully!")
    except Exception as e:
        print(f" Failed to load model: {e}")
        model = None

@app.route('/predict', methods=['POST'])
def predict_points():
    if model is None:
        return jsonify({'success': False, 'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()
        print(f" Received data: {data}")
        
        # Exact order: practice, players, assists, rebounds
        features = [[
            float(data['practice_hours']),
            float(data['total_players']),
            float(data['total_assists']),
            float(data['total_rebounds'])
        ]]
        
        pred = model.predict(features)[0]
        print(f" Prediction: {pred:.2f}")
        return jsonify({'success': True, 'predicted_points': round(pred, 2)})
        
    except Exception as e:
        print(f" Prediction error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    print("🚀 Server starting on http://0.0.0.0:5000")

    app.run(host='0.0.0.0', debug=True, port=5000)