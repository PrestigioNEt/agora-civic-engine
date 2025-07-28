from fastapi import FastAPI
from .routers import sentiment, influence_map, pixel_tracking

app = FastAPI()

app.include_router(sentiment.router, prefix="/sentiment", tags=["sentiment"])
app.include_router(influence_map.router, prefix="/influence-map", tags=["influence-map"])
app.include_router(pixel_tracking.router, prefix="/pixel-tracking", tags=["pixel-tracking"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
