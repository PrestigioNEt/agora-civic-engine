import os
from supabase import create_client, Client

def main():
    supabase_url = "https://nxpkcxpcbqkzkepzmvej.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cGtjeHBjYnFremtlcHptdmVqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzY4NDQ4NSwiZXhwIjoyMDY5MjYwNDg1fQ.yzda-cxnW_Q2dkj0n__u_qzu4mJ2yNxYKLwZixQiYcg"

    supabase: Client = create_client(supabase_url, supabase_key)

    # 1. Iniciar sesión como MASTER_DEVELOPER
    try:
        master_developer_session = supabase.auth.sign_in_with_password({"email": "dalopez56740@gmail.com", "password": "123456,7"})
        print("Logged in as MASTER_DEVELOPER.")

        # Asignar la sesión al cliente de supabase
        supabase.auth.set_session(master_developer_session.session.access_token, master_developer_session.session.refresh_token)

    except Exception as e:
        print(f"Error logging in as MASTER_DEVELOPER: {e}")
        return

    # 2. Crear un nuevo rol o obtenerlo si ya existe
    try:
        role_name = "SUPER_ADMIN"

        # Intentar obtener el rol
        role = supabase.from_("roles").select("id").eq("name", role_name).single().execute().data

        if role:
            new_role_id = role["id"]
            print(f"Role {role_name} already exists with ID: {new_role_id}")
        else:
            new_role_capabilities = {
                "permissions": ["*"],
                "features": ["*"],
                "menus": ["*"],
                "limits": {"apiCallsPerHour": 20000}
            }

            new_role_id = supabase.rpc(
                "create_role",
                {
                    "role_name": role_name,
                    "role_hierarchy": 120,
                    "role_capabilities": new_role_capabilities,
                }
            ).execute().data

            print(f"New role {role_name} created with ID: {new_role_id}")

    except Exception as e:
        print(f"Error creating or getting role: {e}")
        return

    # 3. Crear un nuevo usuario y asignarle el nuevo rol
    try:
        new_user_email = "superadmin@example.com"
        new_user_password = "superadminpassword"

        supabase_admin: Client = create_client(supabase_url, supabase_key)

        # Intentar obtener el usuario
        users = supabase_admin.auth.admin.list_users()
        new_user = next((u for u in users if u.email == new_user_email), None)

        if new_user:
            print(f"User {new_user_email} already exists.")
        else:
            new_user = supabase_admin.auth.admin.create_user(
                {
                    "email": new_user_email,
                    "password": new_user_password,
                    "email_confirm": True,
                }
            ).user
            print(f"New user SUPER_ADMIN created with email: {new_user_email}")

        # Asignar el rol al nuevo usuario
        supabase.from_("profiles").update({"role_id": new_role_id}).eq("user_id", new_user.id).execute()

        print(f"Assigned SUPER_ADMIN role to the new user.")

    except Exception as e:
        print(f"Error creating or assigning role to new user: {e}")
        return

    # 4. Iniciar sesión como el nuevo SUPER_ADMIN y verificar permisos
    try:
        super_admin_session = supabase.auth.sign_in_with_password({"email": new_user_email, "password": new_user_password})
        print("Logged in as SUPER_ADMIN.")

        # Asignar la sesión al cliente de supabase
        supabase.auth.set_session(super_admin_session.session.access_token, super_admin_session.session.refresh_token)

        # Verificar perfil
        profile = supabase.from_("profiles").select("*, roles(*)").eq("user_id", super_admin_session.user.id).single().execute().data

        if profile and profile["roles"]["hierarchy"] == 120:
            print("SUPER_ADMIN has the correct hierarchy level.")
        else:
            print("SUPER_ADMIN does not have the correct hierarchy level.")

    except Exception as e:
        print(f"Error logging in or verifying SUPER_ADMIN: {e}")
        return

if __name__ == "__main__":
    main()
