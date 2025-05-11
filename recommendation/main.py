import joblib
import json
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os
from fastapi.middleware.cors import CORSMiddleware
import sys

# Add flask-api-project/app directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'flask-api-project', 'app'))
from recommendation_fastapi import router as recommendation_router

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = joblib.load(model_path)

# Load the cleaned dataset
dataset_path = os.path.join(os.path.dirname(__file__), 'cleaned_dataset.csv')
data = pd.read_csv(dataset_path)

# Generate the numeric_to_category mapping dynamically
label_encoder = LabelEncoder()
data['Courses_label'] = label_encoder.fit_transform(data['Courses'])
numeric_to_category = dict(zip(data['Courses_label'], data['Courses']))

# Load feature names from the dataset
feature_names = data.columns[:-2].tolist()  # Exclude 'Courses' and 'Courses_label'

# Define FastAPI app
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or replace "*" with your frontend URL, like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendation_router)

# Define input schema
class InputData(BaseModel):
    features: dict

@app.post("/predict")
def predict(input_data: InputData):
    # Convert input to DataFrame
    user_data = pd.DataFrame([input_data.features])
    
    # Ensure all features are present
    for column in feature_names:
        if column not in user_data:
            user_data[column] = 0
    
    # Make prediction
    prediction = model.predict(user_data)
    numeric_prediction = prediction[0]
    
    # Convert to category
    categorical_prediction = numeric_to_category.get(numeric_prediction, "Unknown")
    
    # Handle unmapped predictions
    if categorical_prediction == "Unknown":
        return {"error": "Prediction could not be mapped to a category."}
    
    return {"prediction": categorical_prediction}