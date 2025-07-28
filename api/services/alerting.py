from supabase import Client
from datetime import datetime, timedelta

def check_for_negative_mentions(supabase: Client):
    """
    Checks for new mentions with a very negative sentiment and returns them.
    """
    five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)

    response = supabase.from_("sentiment_analysis").select("*").eq("sentiment", "negative").gte("analyzed_at", five_minutes_ago.isoformat()).execute()

    return response.data
