import os
from supabase import create_client, Client

def main():
    supabase_url = "https://nxpkcxpcbqkzkepzmvej.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGtjeHBjYnFremtlcHptdmVqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzY4NDQ4NSwiZXhwIjoyMDY5MjYwNDg1fQ.yzda-cxnW_Q2dkj0n__u_qzu4mJ2yNxYKLwZixQiYcg"

    supabase: Client = create_client(supabase_url, supabase_key)

    with open("supabase/migrations/20250728113400_dynamic_roles.sql", "r") as f:
        sql = f.read()

    try:
        # Dividir el script en sentencias individuales
        sql_statements = [s.strip() for s in sql.split(';') if s.strip()]

        for statement in sql_statements:
            # Esta es una forma indirecta de ejecutar SQL.
            # No es ideal, pero es la única forma con la librería de python.
            supabase.rpc("eval", {"x": f"DO $BODY$ BEGIN {statement}; END; $BODY$"}).execute()

        print("Migration applied successfully.")

    except Exception as e:
        print(f"An error occurred while applying the migration: {e}")

if __name__ == "__main__":
    main()
