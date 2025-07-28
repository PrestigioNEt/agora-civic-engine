from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..services.sentiment_analysis import analyze_sentiment
from ..services.alerting import check_for_negative_mentions
from supabase import Client
from ..dependencies import get_supabase_client

router = APIRouter()

class SentimentRequest(BaseModel):
    text: str
    source: str
    created_at: str

@router.post("/analyze")
async def analyze_and_store_sentiment(
    request: SentimentRequest,
    supabase: Client = Depends(get_supabase_client)
):
    """
    Analyzes the sentiment of a given text, and stores the result in the database.
    """
    sentiment_data = analyze_sentiment(request.text)

    sentiment_score = sentiment_data["sentiment"]
    if sentiment_score > 0.25:
        sentiment = "positive"
    elif sentiment_score < -0.25:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    db_data = {
        "text": request.text,
        "source": request.source,
        "sentiment": sentiment,
        "score": sentiment_score,
        "created_at": request.created_at,
    }

    response = supabase.from_("sentiment_analysis").insert(db_data).execute()
    return response.data

@router.get("/check-alerts")
async def check_alerts(supabase: Client = Depends(get_supabase_client)):
    """
    Checks for new negative mentions and returns them.
    """
    return check_for_negative_mentions(supabase)
