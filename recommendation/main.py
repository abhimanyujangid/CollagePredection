"""
main.py - FastAPI application for course prediction and college recommendations.

This API provides endpoints for predicting course categories using a machine learning model
and for recommending colleges based on user input and database records.
"""
import joblib
import json
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os
from fastapi.middleware.cors import CORSMiddleware
import sys

# Add flask-api-project/app directory to sys.path for importing the recommendation router
sys.path.append(os.path.join(os.path.dirname(__file__), 'flask-api-project', 'app'))
from recommendation_fastapi import router as recommendation_router

# Load the trained ML model for course prediction
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = joblib.load(model_path)

# Load the cleaned dataset for label encoding and feature extraction
dataset_path = os.path.join(os.path.dirname(__file__), 'cleaned_dataset.csv')
data = pd.read_csv(dataset_path)

# Generate the numeric_to_category mapping dynamically for course labels
label_encoder = LabelEncoder()
data['Courses_label'] = label_encoder.fit_transform(data['Courses'])
numeric_to_category = dict(zip(data['Courses_label'], data['Courses']))

# Extract feature names (excluding target columns)
feature_names = data.columns[:-2].tolist()  # Exclude 'Courses' and 'Courses_label'

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for all origins (customize as needed for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the college recommendation router
app.include_router(recommendation_router)

class InputData(BaseModel):
    """Schema for prediction input data."""
    features: dict

@app.post("/predict")
def predict(input_data: InputData):
    """
    Predict the course category for a given set of features.
    Args:
        input_data (InputData): Input features as a dictionary.
    Returns:
        dict: Predicted course category or error message.
    """
    # Convert input to DataFrame
    user_data = pd.DataFrame([input_data.features])
    # Ensure all required features are present
    for column in feature_names:
        if column not in user_data:
            user_data[column] = 0
    # Make prediction
    prediction = model.predict(user_data)
    numeric_prediction = prediction[0]
    # Convert numeric prediction to category
    categorical_prediction = numeric_to_category.get(numeric_prediction, "Unknown")
    if categorical_prediction == "Unknown":
        return {"error": "Prediction could not be mapped to a category."}
    return {"prediction": categorical_prediction}