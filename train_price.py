# ===============================
# TRAIN YIELD PREDICTION MODEL
# ===============================

import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# -----------------------------------
# Load dataset
# -----------------------------------
df = pd.read_csv("crop_production.csv")

# -----------------------------------
# CLEAN TEXT (CRITICAL)
# -----------------------------------
def clean_text(x):
    return str(x).strip().upper()

df["State_Name"] = df["State_Name"].apply(clean_text)
df["District_Name"] = df["District_Name"].apply(clean_text)
df["Season"] = df["Season"].apply(clean_text)
df["Crop"] = df["Crop"].apply(clean_text)

# -----------------------------------
# Basic cleaning
# -----------------------------------
df = df.dropna()
df = df[df["Area"] > 0]
df = df[df["Production"] > 0]

# -----------------------------------
# Create Yield
# -----------------------------------
df["Yield"] = df["Production"] / df["Area"]

# -----------------------------------
# STATE + CROP average yield (FALLBACK)
# -----------------------------------
state_avg_yield = (
    df.groupby(["State_Name", "Crop"])["Yield"]
      .mean()
)

joblib.dump(state_avg_yield, "state_avg_yield.pkl")
print("✅ State average yield saved")

# -----------------------------------
# Encode categorical columns
# -----------------------------------
le_state = LabelEncoder()
le_dist = LabelEncoder()
le_season = LabelEncoder()
le_crop = LabelEncoder()

df["State_Name"] = le_state.fit_transform(df["State_Name"])
df["District_Name"] = le_dist.fit_transform(df["District_Name"])
df["Season"] = le_season.fit_transform(df["Season"])
df["Crop"] = le_crop.fit_transform(df["Crop"])

# -----------------------------------
# Features & target
# -----------------------------------
X = df[["State_Name","District_Name","Season","Crop","Crop_Year","Area"]]
y = df["Yield"]

# -----------------------------------
# Train model
# -----------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------------------
# Save everything
# -----------------------------------
joblib.dump(model, "yield_model.pkl")
joblib.dump(le_state, "le_state.pkl")
joblib.dump(le_dist, "le_dist.pkl")
joblib.dump(le_season, "le_season.pkl")
joblib.dump(le_crop, "le_crop.pkl")

print("✅ Yield model training completed")