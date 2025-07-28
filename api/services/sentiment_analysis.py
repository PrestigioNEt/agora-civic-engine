import os
from google.cloud import language_v1

def analyze_sentiment(text: str):
    """
    Analyzes the sentiment of a given text using the Google Natural Language API.

    Args:
        text: The text to analyze.

    Returns:
        A dictionary containing the sentiment and score.
    """
    client = language_v1.LanguageServiceClient(
        client_options={"api_key": "AIzaSyD2q2KUOCtvukosGWGIZNwNdqezev2S5QY"}
    )

    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment

    return {"sentiment": sentiment.score, "magnitude": sentiment.magnitude}
