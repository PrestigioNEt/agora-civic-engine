import os
from supabase import create_client, Client

def main():
    supabase_url = "https://nxpkcxpcbqkzkepzmvej.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGtjeHBjYnFremtlcHptdmVqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzY4NDQ4NSwiZXhwIjoyMDY5MjYwNDg1fQ.yzda-cxnW_Q2dkj0n__u_qzu4mJ2yNxYKLwZixQiYcg"

    supabase: Client = create_client(supabase_url, supabase_key)

    emails_to_check = ["dalopez56740@gmail.com", "bastianvalenciago@gmail.com"]

    try:
        response = supabase.auth.admin.list_users()

        emails_in_db = [user.email for user in response]

        for email in emails_to_check:
            if email in emails_in_db:
                print(f"User with email {email} already exists.")
            else:
                print(f"User with email {email} does not exist.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
