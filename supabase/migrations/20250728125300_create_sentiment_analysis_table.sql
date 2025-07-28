CREATE TABLE public.sentiment_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  source TEXT,
  sentiment TEXT NOT NULL,
  score FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  analyzed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.sentiment_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All users can view sentiment analysis"
ON public.sentiment_analysis FOR SELECT
USING (true);

CREATE POLICY "Admins can insert sentiment analysis"
ON public.sentiment_analysis FOR INSERT
WITH CHECK (public.has_role_level(100));
