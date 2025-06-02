from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

# Model prediksi klasifikasi
ml_model = tf.keras.models.load_model('model/diabetes_prediction_model.h5')
scaler_minmax = joblib.load('model/minmax_scaler.pkl')
scaler_standard = joblib.load('model/standard_scaler.pkl')
pca = joblib.load('model/pca_transformer.pkl')
X_scaled_cols = joblib.load('model/X_scaled_cols.pkl')

# Model Pre-train untuk penjelasan
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
explanation_model = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class InputData(BaseModel):
    gender: str
    age: int
    hypertension: int
    heart_disease: int
    smoking_history: str
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float

def preprocess_and_predict(data: InputData):
    df = pd.DataFrame([data.dict()])

    df[['age', 'bmi']] = scaler_minmax.transform(df[['age', 'bmi']])
    df[['HbA1c_level', 'blood_glucose_level']] = scaler_standard.transform(df[['HbA1c_level', 'blood_glucose_level']])

    df_encoded = pd.get_dummies(df[['gender', 'smoking_history']], prefix=['gender', 'smoking_history'], drop_first=True)
    df_others = df[['hypertension', 'heart_disease']]

    df_all = pd.concat([df[['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']], df_encoded, df_others], axis=1)

    for col in X_scaled_cols:
        if col not in df_all:
            df_all[col] = 0
    df_all = df_all[X_scaled_cols]
    x_pca = pca.transform(df_all)

    prob = ml_model.predict(x_pca)[0][0]
    label = "Rentan" if prob > 0.5 else "Tidak Rentan"
    return label, prob


@app.post("/predict")
def predict(data: InputData):
    prediction, prob = preprocess_and_predict(data)

    prompt = (
        f"The patient is {data.age} years old, with an HbA1c level of {data.HbA1c_level} and blood glucose level of {data.blood_glucose_level}.The prediction is '{prediction}'. Jelaskan alasannya tentang rentan atau tidak rentan berdasarkan data yang diberikan sebelumya?"
    )
    explanation = explanation_model(
    prompt,
    max_length=200,     # biar output lebih panjang
    do_sample=True,     # sampling aktif supaya variatif
    temperature=0.7,    # kontrol kreativitas
    top_p=0.9,          # nucleus sampling
    top_k=50,           # batasi token dari top k kata
    truncation=True
)[0]["generated_text"]


    return {
        "prediction": prediction,
        "explanation": f"The patient is {data.age} years old, with an HbA1c level of {data.HbA1c_level} and blood glucose level of {data.blood_glucose_level}.The prediction is '{prediction}'.{explanation}"
    }
