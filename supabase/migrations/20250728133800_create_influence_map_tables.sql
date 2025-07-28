CREATE TABLE public.influencers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  followers INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES public.influencers(id) ON DELETE CASCADE,
  strength FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All users can view influencers and connections"
ON public.influencers FOR SELECT
USING (true);

CREATE POLICY "All users can view influencers and connections"
ON public.connections FOR SELECT
USING (true);

CREATE POLICY "Admins can insert influencers and connections"
ON public.influencers FOR INSERT
WITH CHECK (public.has_role_level(100));

CREATE POLICY "Admins can insert influencers and connections"
ON public.connections FOR INSERT
WITH CHECK (public.has_role_level(100));
