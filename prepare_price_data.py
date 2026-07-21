import pandas as pd
import joblib

# Load mandi dataset
df = pd.read_csv("Price.csv")

# ===============================
# CLEAN TEXT (CRITICAL)
# ===============================
def clean_text(x):
    return str(x).strip().upper()

df["commodity_name"] = df["commodity_name"].apply(clean_text)
df["state"] = df["state"].apply(clean_text)
df["district"] = df["district"].apply(clean_text)

# ===============================
# SAFE PRICE CONVERSION
# ===============================
df["modal_price"] = pd.to_numeric(df["modal_price"], errors="coerce")
df = df.dropna(subset=["modal_price"])

# ===============================
# DATE CLEANING
# ===============================
df["date"] = pd.to_datetime(
    df["date"],
    format="mixed",
    dayfirst=True,
    errors="coerce"
)

df = df.dropna(subset=["date"])

# ===============================
# LATEST PRICE PER LOCATION
# ===============================
latest_prices = (
    df.sort_values("date")
      .groupby(["commodity_name", "state", "district"])
      .last()
)

# Save processed file
joblib.dump(latest_prices, "latest_prices.pkl")

print("✅ Price data prepared successfully!")