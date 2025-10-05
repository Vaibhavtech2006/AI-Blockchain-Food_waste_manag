import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.multioutput import MultiOutputRegressor
import joblib
from flask import Flask, request, jsonify

# Load dataset
df = pd.read_csv("fooddemand.csv")

# Features and targets
X = df[['dayOfWeek', 'pastConsumption', 'weather', 'eventType']]
y = df[['demandedFood', 'leftFoodForNGO']]

# Preprocessing for categorical features
categorical_features = ['dayOfWeek', 'weather', 'eventType']
numeric_features = ['pastConsumption']

preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
], remainder='passthrough')

# Base model
base_model = LinearRegression()

# Multi-output regressor
multi_model = MultiOutputRegressor(base_model)

# Full pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', multi_model)
])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'food_demand_multi_model.pkl')
print("Model trained and saved successfully!")

# --- Flask API for prediction ---
app = Flask(__name__)

# Load the trained model
loaded_model = joblib.load('food_demand_multi_model.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df_input = pd.DataFrame([data])
    prediction = loaded_model.predict(df_input)
    
    result = {
        "demandedFood": round(prediction[0][0], 2),
        "leftFoodForNGO": round(prediction[0][1], 2)
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
