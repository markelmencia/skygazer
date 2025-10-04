import pandas as pd
from datetime import datetime

lunares = pd.read_csv("data/lunar.csv")
solares = pd.read_csv("data/solar.csv")

def to_iso_date(s):
    try:
        return datetime.strptime(s, "%Y %B %d").strftime("%Y-%m-%d")
    except:
        return s

lunares["Calendar Date"] = lunares["Calendar Date"].apply(to_iso_date)
solares["Calendar Date"] = solares["Calendar Date"].apply(to_iso_date)

lunares.to_json("data/lunar.json", orient="records", lines=True)
solares.to_json("data/solar.json", orient="records", lines=True)