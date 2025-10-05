from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.multioutput import MultiOutputRegressor

app = Flask(__name__)
CORS(app)

# ---- Load Dataset ----
df = pd.read_csv("consumption_dataset.csv")  # aapka banaya hua CSV

X = df[['predictedFood', 'numberOfPeople', 'eventTiming']]
y = df[['actualConsumption', 'leftFoodForNGO']]

# Categorical + Numeric Features
categorical_features = ['eventTiming']
numeric_features = ['predictedFood', 'numberOfPeople']

# Preprocessing
preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
    ('num', StandardScaler(), numeric_features)
])

# Model
base_model = LinearRegression()
multi_model = MultiOutputRegressor(base_model)

model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', multi_model)
])

# Train
model.fit(X, y)
joblib.dump(model, 'food_consumption_model.pkl')

# Load trained model
loaded_model = joblib.load('food_consumption_model.pkl')

# ---- API Route ----
@app.route('/api/predict_consumption', methods=['POST'])
def predict_consumption():
    data = request.get_json()
    df_input = pd.DataFrame([data])
    prediction = loaded_model.predict(df_input)

    result = {
        "actualConsumption": max(0, round(prediction[0][0], 2)),
        "leftFoodForNGO": max(0, round(prediction[0][1], 2))
    }
    return jsonify(result)


if __name__ == "__main__":
    app.run(port=5001, debug=True)
