# ai_search_api.py
# To run: pip install fastapi uvicorn transformers torch
# Then: uvicorn ai_search_api:app --reload --port 8001

import datetime
from fastapi import FastAPI, Request
from transformers import pipeline

app = FastAPI()
nlp = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.post("/ai-search")
async def ai_search(request: Request):
    data = await request.json()
    query = data.get("query", "")
    region = data.get("region", "")  # Optionally sent from frontend
    candidate_labels = [
        # Activities & Classes
        "spin class", "boxing", "kickboxing", "pilates", "yoga", "zumba", "HIIT", "crossfit", "bootcamp", "outdoor bootcamp", "dance fitness", "barre", "strength training", "cardio class", "circuit training", "personal training", "group class", "meditation", "mindfulness", "stretching", "mobility",
        # Facilities & Amenities
        "gym", "fitness center", "studio", "pool", "swimming pool", "sauna", "spa", "wellness center", "sports club", "running track", "basketball court", "tennis court", "squash court", "climbing wall",
        # Professionals
        "trainer", "personal trainer", "coach", "nutritionist", "dietitian", "physiotherapist", "massage therapist", "yoga instructor", "pilates instructor",
        # Goals & Needs
        "weight loss", "muscle gain", "strength", "flexibility", "endurance", "rehabilitation", "injury recovery", "senior fitness", "kids fitness", "prenatal fitness", "postnatal fitness", "adaptive fitness", "accessible gym",
        # Products & Shops
        "supplements", "protein powder", "fitness equipment", "apparel", "shoes", "accessories", "smart watch", "wearable",
        # Events & Offers
        "event", "competition", "challenge", "workshop", "seminar", "open day", "free trial", "discount", "membership",
        # Location & Time
        "near me", "in city", "in region", "open now", "24/7", "morning", "evening", "weekend", "today", "this week",
        # General
        "shop", "facility", "class"
    ]
    result = nlp(query, candidate_labels)
    # Log the search
    try:
        with open("search_logs.csv", "a") as f:
            f.write(f'"{datetime.datetime.now()}","{query}","{region}","{result["labels"][0]}",{result["scores"][0]:.2f}\n')
    except Exception as e:
        print(f"Logging error: {e}")
    return {"labels": result["labels"], "scores": result["scores"]}
