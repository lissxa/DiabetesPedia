from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
# import numpy as np
import tensorflow as tf
import joblib
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
import os
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

# Load model klasifikasi diabetes
model = tf.keras.models.load_model("model/best_model_cnn.h5")
scaler_minmax = joblib.load("model/minmax_scaler.pkl")
scaler_standard = joblib.load("model/standard_scaler.pkl")
pca = joblib.load("model/pca_transformer.pkl")
x_scaled_cols = joblib.load("model/X_scaled.pkl")
x_scaled_cols = x_scaled_cols.columns.tolist()

# # Load pretrained model explanation (FLAN-T5)
# tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
# t5_model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")
# explanation_generator = pipeline("text2text-generation", model=t5_model, tokenizer=tokenizer)

# Setup FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class PatientData(BaseModel):
    gender: str
    age: int
    hypertension: int
    heart_disease: int
    smoking_history: str
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float

# Preprocessing + Prediction
def preprocess_and_predict(data: PatientData):
    df = pd.DataFrame([data.dict()])

    # Scaling
    df[['age', 'bmi']] = scaler_minmax.transform(df[['age', 'bmi']])
    df[['HbA1c_level', 'blood_glucose_level']] = scaler_standard.transform(df[['HbA1c_level', 'blood_glucose_level']])

    # One-hot encoding
    df_encoded = pd.get_dummies(df[['gender', 'smoking_history']], prefix=['gender', 'smoking_history'], drop_first=True)
    df_others = df[['hypertension', 'heart_disease']]
    df_all = pd.concat([df[['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']], df_encoded, df_others], axis=1)

    # Align to original training columns
    for col in x_scaled_cols:
        if col not in df_all:
            df_all[col] = 0
    df_all = df_all[x_scaled_cols]

    # PCA
    x_pca = pca.transform(df_all)
    x_pca = x_pca.reshape(-1, 1, x_pca.shape[1])

    # Prediction
    prob = model.predict(x_pca)[0][0]
    label = "Rentan Diabetes" if prob > 0.5 else "Tidak Rentan Diabetes"
    return label, prob

# Explanation prompt
# def generate_explanation(data: PatientData, prediction: str):
#     prompt = (
#         f"The patient is {data.age} years old, with an HbA1c level of {data.HbA1c_level}, blood glucose level of {data.blood_glucose_level}, "
#         f"a history of hypertension: {data.hypertension}, heart disease history: {data.heart_disease}, smoking history: {data.smoking_history}, "
#         f"and a BMI of {data.bmi}. The model's prediction is '{prediction}'. "
#         f"Please provide an explanation of why the patient is predicted to be {prediction.lower()}."
#     )
#     explanation = explanation_generator(
#         prompt,
#         max_length=200,
#         do_sample=True,
#         temperature=0.7,
#         top_k=50,
#         top_p=0.9,
#         truncation=True,
#     )[0]["generated_text"]
#     return explanation

# Endpoint
@app.get("/")
def root():
    return {"message": "Service is running"}

@app.post("/predict")
def predict(data: PatientData):
    prediction, prob = preprocess_and_predict(data)
    # explanation = generate_explanation(data, prediction)
    return {
        "prediction": prediction,
        "probability": round(float(prob), 4),
        # "explanation": explanation
    }

# Jalankan server dengan port dari .env
if __name__ == "__main__":
    host = "0.0.0.0"
    port = 8000
    uvicorn.run("main:app", host=host, port=port, reload=True)
