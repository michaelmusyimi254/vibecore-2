# ai_search_api.py
# To run: pip install fastapi uvicorn transformers torch
# Then: uvicorn ai_search_api:app --reload --port 8001

from fastapi import FastAPI, Request
from transformers import pipeline

app = FastAPI()
nlp = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.post("/ai-search")
async def ai_search(request: Request):
    data = await request.json()
    query = data.get("query", "")
    candidate_labels = [
        "yoga",
        "gym",
        "trainer",
        "event",
        "shop",
        "pool",
        "cheap",
        "open now",
        "near me",
        "class",
        "personal training",
        "zumba",
        "pilates",
        "hiit",
        "dance",
        "swimming",
        "nutrition",
        "bootcamp",
        "competition",
        "facility",
        "supplements",
        "equipment",
        "apparel",
        "accessories",
        "technology"
    ]
    result = nlp(query, candidate_labels)
    return {"labels": result["labels"], "scores": result["scores"]}
