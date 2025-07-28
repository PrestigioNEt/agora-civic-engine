import os
from supabase import create_client, Client

def main():
    supabase_url = "https://nxpkcxpcbqkzkepzmvej.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGtjeHBjYnFremtlcHptdmVqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzY4NDQ4NSwiZXhwIjoyMDY5MjYwNDg1fQ.yzda-cxnW_Q2dkj0n__u_qzu4mJ2yNxYKLwZixQiYcg"

    supabase: Client = create_client(supabase_url, supabase_key)

    users_to_create = [
        {"email": "dalopez56740@gmail.com", "password": "123456,7"},
        {"email": "bastianvalenciago@gmail.com", "password": "123456,7"}
    ]

    for user_data in users_to_create:
        try:
            response = supabase.auth.admin.create_user(
                {
                    "email": user_data["email"],
                    "password": user_data["password"],
                    "email_confirm": True,
                }
            )
            if response.user:
                print(f"User with email {user_data['email']} created successfully.")
        except Exception as e:
            print(f"An error occurred while creating user {user_data['email']}: {e}")

if __name__ == "__main__":
    main()
