from fastapi import APIRouter, Depends
from supabase import Client
from ..dependencies import get_supabase_client

router = APIRouter()

@router.get("/influencers")
async def get_influencers(supabase: Client = Depends(get_supabase_client)):
    """
    Returns all influencers from the database.
    """
    response = supabase.from_("influencers").select("*").execute()
    return response.data

@router.get("/connections")
async def get_connections(supabase: Client = Depends(get_supabase_client)):
    """
    Returns all connections from the database.
    """
    response = supabase.from_("connections").select("*").execute()
    return response.data
