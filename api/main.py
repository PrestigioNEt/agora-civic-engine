from fastapi import FastAPI
from .routers import sentiment

app = FastAPI()

app.include_router(sentiment.router, prefix="/sentiment", tags=["sentiment"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
