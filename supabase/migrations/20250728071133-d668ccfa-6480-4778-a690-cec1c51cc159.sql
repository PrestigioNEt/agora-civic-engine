-- Sistema de Roles con Factory Pattern para AGORA
-- Crear enum para roles
CREATE TYPE public.user_role AS ENUM (
  'VOTER',
  'VOLUNTEER', 
  'LEADER',
  'COORDINATOR',
  'ADMIN',
  'MASTER_DEVELOPER'
);

-- Tabla de perfiles de usuario
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role public.user_role NOT NULL DEFAULT 'VOTER',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Función para obtener jerarquía de roles
CREATE OR REPLACE FUNCTION public.get_role_hierarchy(role_name public.user_role)
RETURNS INTEGER AS $$
BEGIN
  CASE role_name
    WHEN 'VOTER' THEN RETURN 10;
    WHEN 'VOLUNTEER' THEN RETURN 30;
    WHEN 'LEADER' THEN RETURN 50;
    WHEN 'COORDINATOR' THEN RETURN 70;
    WHEN 'ADMIN' THEN RETURN 100;
    WHEN 'MASTER_DEVELOPER' THEN RETURN 110;
    ELSE RETURN 0;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Función para obtener capacidades del rol
CREATE OR REPLACE FUNCTION public.get_role_capabilities(role_name public.user_role)
RETURNS JSONB AS $$
BEGIN
  CASE role_name
    WHEN 'VOTER' THEN 
      RETURN jsonb_build_object(
        'permissions', ARRAY['profile.read', 'news.read'],
        'features', ARRAY['basic_access'],
        'menus', ARRAY['dashboard', 'profile'],
        'limits', jsonb_build_object('apiCallsPerHour', 100)
      );
    WHEN 'VOLUNTEER' THEN 
      RETURN jsonb_build_object(
        'permissions', ARRAY['profile.read', 'profile.update', 'activities.read', 'activities.create'],
        'features', ARRAY['basic_access', 'activity_logging'],
        'menus', ARRAY['dashboard', 'profile', 'activities'],
        'limits', jsonb_build_object('apiCallsPerHour', 200)
      );
    WHEN 'LEADER' THEN 
      RETURN jsonb_build_object(
        'permissions', ARRAY['profile.read', 'profile.update', 'activities.read', 'activities.create', 'team.read', 'team.manage'],
        'features', ARRAY['basic_access', 'activity_logging', 'team_management'],
        'menus', ARRAY['dashboard', 'profile', 'activities', 'team'],
        'limits', jsonb_build_object('apiCallsPerHour', 500, 'maxTeamMembers', 50)
      );
    WHEN 'COORDINATOR' THEN 
      RETURN jsonb_build_object(
        'permissions', ARRAY['profile.read', 'profile.update', 'activities.read', 'activities.create', 'team.read', 'team.manage', 'territory.read', 'territory.update'],
        'features', ARRAY['basic_access', 'activity_logging', 'team_management', 'territory_coordination'],
        'menus', ARRAY['dashboard', 'profile', 'activities', 'team', 'territories'],
        'limits', jsonb_build_object('apiCallsPerHour', 1000, 'maxTeamMembers', 100)
      );
    WHEN 'ADMIN' THEN 
      RETURN jsonb_build_object(
        'permissions', ARRAY['*'],
        'features', ARRAY['full_access', 'user_management', 'system_config'],
        'menus', ARRAY['dashboard', 'profile', 'activities', 'team', 'territories', 'admin'],
        'limits', jsonb_build_object('apiCallsPerHour', 5000)
      );
    WHEN 'MASTER_DEVELOPER' THEN 
      RETURN jsonb_build_object(
        'permissions', ARRAY['*'],
        'features', ARRAY['full_access', 'developer_tools', 'system_debug'],
        'menus', ARRAY['dashboard', 'profile', 'activities', 'team', 'territories', 'admin', 'dev'],
        'limits', jsonb_build_object('apiCallsPerHour', 10000)
      );
    ELSE 
      RETURN jsonb_build_object('permissions', ARRAY[]::TEXT[], 'features', ARRAY[]::TEXT[]);
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Agregar columnas computadas
ALTER TABLE public.profiles 
ADD COLUMN hierarchy INTEGER GENERATED ALWAYS AS (public.get_role_hierarchy(role)) STORED,
ADD COLUMN capabilities JSONB GENERATED ALWAYS AS (public.get_role_capabilities(role)) STORED;

-- Función para obtener el rol del usuario actual
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS public.user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Función para verificar si el usuario tiene un rol específico
CREATE OR REPLACE FUNCTION public.has_role_level(min_level INTEGER)
RETURNS BOOLEAN AS $$
  SELECT COALESCE((SELECT hierarchy FROM public.profiles WHERE user_id = auth.uid()), 0) >= min_level;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (public.has_role_level(100));

CREATE POLICY "Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING (public.has_role_level(100));

-- Función para auto-asignar roles especiales
CREATE OR REPLACE FUNCTION public.assign_special_roles()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-asignar MASTER_DEVELOPER a emails específicos
  IF NEW.email IN ('dalopez56740@gmail.com', 'bastianvalenciago@gmail.com') THEN
    NEW.role := 'MASTER_DEVELOPER';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auto-asignación de roles
CREATE TRIGGER assign_special_roles_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_special_roles();

-- Función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para timestamps automáticos
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();