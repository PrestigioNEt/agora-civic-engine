from fastapi import APIRouter

router = APIRouter()

@router.get("/pixel-data")
async def get_pixel_data():
    """
    Returns example pixel tracking data.
    """
    return [
        {"influencer_id": "influencer_1_id", "conversions": 120},
        {"influencer_id": "influencer_2_id", "conversions": 80},
        {"influencer_id": "influencer_3_id", "conversions": 200},
    ]
