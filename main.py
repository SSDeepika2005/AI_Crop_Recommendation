
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import numpy as np
import pandas as pd
import requests
import datetime
import joblib

# app = FastAPI()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ======================================================
# LOAD MODELS
# ======================================================

crop_model = joblib.load("model.pkl")
yield_model = joblib.load("yield_model.pkl")

scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

le_state = joblib.load("le_state.pkl")
le_dist = joblib.load("le_dist.pkl")
le_season = joblib.load("le_season.pkl")
le_crop = joblib.load("le_crop.pkl")

# ======================================================
# LOAD CSV DATA
# ======================================================

df = pd.read_csv("crop_data.csv")

crop_info = {
    row["crop"].lower().strip(): {
        "yield_per_acre": row["yield_per_acre"],
        "price_per_kg": row["price_per_kg"],
        "cost_per_acre": row["cost_per_acre"]
    }
    for _, row in df.iterrows()
}

# ======================================================
# INPUT MODEL
# ======================================================

class CropRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    land_area: float
    workman_cost: float
    latitude: Optional[float] = None
    longitude: Optional[float] = None

# ======================================================
# LOCATION
# ======================================================

def get_location_from_latlon(lat, lon):
    try:
        url = "https://nominatim.openstreetmap.org/reverse"
        params = {"lat": lat, "lon": lon, "format": "json", "addressdetails": 1}
        headers = {"User-Agent": "thalir-app"}

        data = requests.get(url, params=params, headers=headers, timeout=5).json()
        address = data.get("address", {})

        state = address.get("state", "Tamil Nadu")
        district = (
            address.get("state_district")
            or address.get("district")
            or address.get("county")
            or address.get("city")
            or "Coimbatore"
        )

        return state.strip().upper(), district.replace(" District", "").strip().upper()

    except:
        return "TAMIL NADU", "COIMBATORE"

# ======================================================
# SEASON
# ======================================================

def detect_season():
    month = datetime.datetime.now().month

    if month in [6,7,8,9]:
        return "KHARIF"
    elif month in [10,11,12,1]:
        return "RABI"
    else:
        return "SUMMER"

# ======================================================
# WEATHER
# ======================================================

WEATHER_API_KEY = "afbe381da78c32c09c9dba0f4491b7f5"

def get_weather(lat, lon):
    try:
        url = "https://api.openweathermap.org/data/2.5/weather"
        params = {
            "lat": lat,
            "lon": lon,
            "appid": WEATHER_API_KEY,
            "units": "metric"
        }

        data = requests.get(url, params=params, timeout=5).json()

        return (
            data["main"]["temp"],
            data["main"]["humidity"],
            data.get("rain", {}).get("1h", 0)
        )

    except:
        return 30, 60, 0

# ======================================================
# MAIN API
# ======================================================

@app.post("/predict")
def predict(data: CropRequest):

    area_hectare = data.land_area / 2.471
    area_acre = data.land_area

    state, district = get_location_from_latlon(data.latitude, data.longitude)
    season = detect_season()

    temperature, humidity, rainfall = get_weather(data.latitude, data.longitude)

    # ======================================================
    # CROP MODEL
    # ======================================================

    crop_features = np.array([[  
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        temperature,
        humidity,
        data.ph,
        rainfall
    ]])

    crop_scaled = scaler.transform(crop_features)
    probabilities = crop_model.predict_proba(crop_scaled)[0]

    top3 = np.argsort(probabilities)[-3:][::-1]

    results = []

    for idx in top3:

        crop_name = label_encoder.inverse_transform([idx])[0]
        crop_name = crop_name.strip().upper()
        crop_key = crop_name.lower()

        success_rate = float(probabilities[idx]) * 100

        # ======================================================
        # YIELD MODEL
        # ======================================================

        try:
            state_enc = le_state.transform([state])[0]
            dist_enc = le_dist.transform([district])[0]
            season_enc = le_season.transform([season])[0]
            crop_enc = le_crop.transform([crop_name])[0]

            yield_input = np.array([[  
                state_enc,
                dist_enc,
                season_enc,
                crop_enc,
                datetime.datetime.now().year,
                area_hectare
            ]])

            predicted_yield = yield_model.predict(yield_input)[0]

        except:
            predicted_yield = 2000

        production = predicted_yield

        if production > 1000:
            production = production / 1000

        # ======================================================
        # PRICE & REVENUE
        # ======================================================

        price_per_kg = crop_info.get(crop_key, {}).get("price_per_kg", 20)
        revenue = production * price_per_kg * 1000

        # ======================================================
        # EXPENSES
        # ======================================================

        cost_per_acre = crop_info.get(crop_key, {}).get("cost_per_acre", 15000)
        expenses = (cost_per_acre * area_acre) + data.workman_cost

        # ======================================================
        # PROFIT (UPDATED)
        # ======================================================

        profit_value = revenue - expenses

        if profit_value < 0:
            profit_status = "Loss"
        else:
            profit_status = "Profit"

        # ======================================================
        # RISK
        # ======================================================

        if success_rate >= 80:
            risk = "Low"
        elif success_rate >= 60:
            risk = "Medium"
        else:
            risk = "High"

        results.append({
            "crop": crop_name,
            "success_rate": round(success_rate, 2),
            "expected_yield_tons": round(production, 2),
            "price_per_kg": price_per_kg,
            "revenue": round(revenue, 2),
            "expenses": round(expenses, 2),
            "farmer_profit": round(abs(profit_value), 2),
            "profit_status": profit_status,
            "risk": risk
        })

    # ======================================================
    # SORT BY PROFIT
    # ======================================================

    results = sorted(
        results,
        key=lambda x: x["farmer_profit"] if x["profit_status"] == "Profit" else -x["farmer_profit"],
        reverse=True
    )

    return {
        "location": f"{district}, {state}",
        "season": season,
        "recommendations": results
    }