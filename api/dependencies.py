from supabase import create_client, Client
import os

def get_supabase_client() -> Client:
    """
    Returns a Supabase client.
    """
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not supabase_key:
        raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables not set.")

    return create_client(supabase_url, supabase_key)
