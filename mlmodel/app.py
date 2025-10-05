from flask import Flask, request, jsonify
from flask_cors import CORS  # <- import this
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.multioutput import MultiOutputRegressor

app = Flask(__name__)
CORS(app)  # <- enable CORS for all routes

# Load dataset and train model (agar already model pickle hai to skip training)
df = pd.read_csv("fooddemand.csv")
X = df[['dayOfWeek', 'pastConsumption', 'weather', 'eventType']]
y = df[['demandedFood', 'leftFoodForNGO']]

categorical_features = ['dayOfWeek', 'weather', 'eventType']
preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
], remainder='passthrough')

base_model = LinearRegression()
multi_model = MultiOutputRegressor(base_model)
model = Pipeline(steps=[('preprocessor', preprocessor), ('regressor', multi_model)])

model.fit(X, y)
joblib.dump(model, 'food_demand_multi_model.pkl')

# Load trained model
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
