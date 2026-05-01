#  Ruhuna Hoops AI Predictor (Science Faculty)

An end-to-end Machine Learning web application that predicts inter-faculty basketball tournament points based on team statistics.

##  Architecture & Workflow
I built this project using a decoupled **Model-as-a-Service** architecture:

1. **Model Training (Google Colab):** 
   - Trained a Linear Regression model using `scikit-learn` on historical team performance data.
   - Serialized and exported the trained model as a `.pkl` file.
2. **Backend API (Python/Flask):** 
   - Built a RESTful API to host the `.pkl` model.
   - Extracts exact model weights and biases to provide Explainable AI (XAI) metrics to the user.
3. **Frontend UI (Vanilla JS/CSS):** 
   - Designed a responsive, glassmorphism-styled interface using Material UI principles.
   - Uses asynchronous `fetch` requests to communicate with the backend.

##  Tech Stack
* **Machine Learning:** Python, Scikit-Learn, Pandas, NumPy
* **Backend:** Flask, Flask-CORS, Joblib
* **Frontend:** HTML5, CSS3, Vanilla JavaScript, Bootstrap 5
