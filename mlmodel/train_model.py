import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Load dataset
df = pd.read_csv("fooddemand.csv")

# Features (X) and target (y)
X = df[['dayOfWeek', 'pastConsumption', 'weather', 'eventType', 'demandedFood', 'leftFoodForNGO']]
y = df['demand']

# Categorical and numeric features
categorical_features = ['dayOfWeek', 'weather', 'eventType']
numeric_features = ['pastConsumption', 'demandedFood', 'leftFoodForNGO']

# Preprocessing pipeline
preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ('num', 'passthrough', numeric_features)
])

# Define full pipeline
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, 'food_demand_model.pkl')

print("✅ Model trained and saved as food_demand_model.pkl")
