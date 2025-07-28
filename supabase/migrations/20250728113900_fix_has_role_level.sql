CREATE OR REPLACE FUNCTION public.has_role_level(min_level INTEGER)
RETURNS BOOLEAN AS $$
  SELECT COALESCE((SELECT public.get_user_hierarchy(auth.uid())), 0) >= min_level;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;
