-- Deshabilitar el trigger de asignación de roles especiales temporalmente
ALTER TABLE public.profiles DISABLE TRIGGER assign_special_roles_trigger;

-- 1. Crear la tabla de roles
CREATE TABLE public.roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  hierarchy INTEGER NOT NULL,
  capabilities JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para la tabla de roles
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Insertar los roles existentes en la nueva tabla
INSERT INTO public.roles (name, hierarchy, capabilities) VALUES
('VOTER', 10, '{"permissions": ["profile.read", "news.read"], "features": ["basic_access"], "menus": ["dashboard", "profile"], "limits": {"apiCallsPerHour": 100}}'),
('VOLUNTEER', 30, '{"permissions": ["profile.read", "profile.update", "activities.read", "activities.create"], "features": ["basic_access", "activity_logging"], "menus": ["dashboard", "profile", "activities"], "limits": {"apiCallsPerHour": 200}}'),
('LEADER', 50, '{"permissions": ["profile.read", "profile.update", "activities.read", "activities.create", "team.read", "team.manage"], "features": ["basic_access", "activity_logging", "team_management"], "menus": ["dashboard", "profile", "activities", "team"], "limits": {"apiCallsPerHour": 500, "maxTeamMembers": 50}}'),
('COORDINATOR', 70, '{"permissions": ["profile.read", "profile.update", "activities.read", "activities.create", "team.read", "team.manage", "territory.read", "territory.update"], "features": ["basic_access", "activity_logging", "team_management", "territory_coordination"], "menus": ["dashboard", "profile", "activities", "team", "territories"], "limits": {"apiCallsPerHour": 1000, "maxTeamMembers": 100}}'),
('ADMIN', 100, '{"permissions": ["*"], "features": ["full_access", "user_management", "system_config"], "menus": ["dashboard", "profile", "activities", "team", "territories", "admin"], "limits": {"apiCallsPerHour": 5000}}'),
('MASTER_DEVELOPER', 110, '{"permissions": ["*"], "features": ["full_access", "developer_tools", "system_debug"], "menus": ["dashboard", "profile", "activities", "team", "territories", "admin", "dev"], "limits": {"apiCallsPerHour": 10000}}');

-- 2. Modificar la tabla de perfiles
-- Eliminar las columnas computadas y la columna de rol existente
ALTER TABLE public.profiles DROP COLUMN hierarchy;
ALTER TABLE public.profiles DROP COLUMN capabilities;
ALTER TABLE public.profiles DROP COLUMN role;

-- Añadir la nueva columna role_id
ALTER TABLE public.profiles ADD COLUMN role_id UUID REFERENCES public.roles(id);

-- Actualizar los perfiles existentes para que apunten al rol correcto
UPDATE public.profiles p SET role_id = (SELECT id FROM public.roles r WHERE r.name = 'VOTER') WHERE p.email NOT IN ('dalopez56740@gmail.com', 'bastianvalenciago@gmail.com');
UPDATE public.profiles p SET role_id = (SELECT id FROM public.roles r WHERE r.name = 'MASTER_DEVELOPER') WHERE p.email IN ('dalopez56740@gmail.com', 'bastianvalenciago@gmail.com');

-- 3. Modificar las funciones
-- Eliminar las funciones antiguas
DROP FUNCTION public.get_role_hierarchy(public.user_role);
DROP FUNCTION public.get_role_capabilities(public.user_role);
DROP FUNCTION public.get_current_user_role();
DROP TYPE public.user_role;

-- Crear nuevas funciones que leen de la tabla de roles
ALTER TABLE public.profiles
ADD COLUMN hierarchy INTEGER GENERATED ALWAYS AS ((SELECT hierarchy FROM public.roles WHERE id = role_id)) STORED,
ADD COLUMN capabilities JSONB GENERATED ALWAYS AS ((SELECT capabilities FROM public.roles WHERE id = role_id)) STORED;

-- 4. Crear función para crear roles
CREATE OR REPLACE FUNCTION public.create_role(
  role_name TEXT,
  role_hierarchy INTEGER,
  role_capabilities JSONB
)
RETURNS UUID AS $$
DECLARE
  new_role_id UUID;
BEGIN
  IF NOT public.has_role_level(110) THEN
    RAISE EXCEPTION 'Only MASTER_DEVELOPER can create new roles';
  END IF;

  INSERT INTO public.roles (name, hierarchy, capabilities, created_by)
  VALUES (role_name, role_hierarchy, role_capabilities, auth.uid())
  RETURNING id INTO new_role_id;

  RETURN new_role_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies para la tabla de roles
CREATE POLICY "All users can view all roles"
ON public.roles FOR SELECT
USING (true);

CREATE POLICY "MASTER_DEVELOPER can create roles"
ON public.roles FOR INSERT
WITH CHECK (public.has_role_level(110));

-- Reactivar el trigger de asignación de roles
ALTER TABLE public.profiles ENABLE TRIGGER assign_special_roles_trigger;

-- Modificar el trigger de asignación de roles para que use la nueva tabla
CREATE OR REPLACE FUNCTION public.assign_special_roles()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IN ('dalopez56740@gmail.com', 'bastianvalenciago@gmail.com') THEN
    NEW.role_id := (SELECT id FROM public.roles WHERE name = 'MASTER_DEVELOPER');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
