-- User settings table
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  google_maps_api_key TEXT,
  timezone TEXT DEFAULT 'America/Los_Angeles',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Routes table
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  origin_address TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  check_time TIME NOT NULL,
  check_days INTEGER[] DEFAULT ARRAY[1, 2, 3, 4, 5],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Commute logs table
CREATE TABLE public.commute_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_id UUID NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  duration_minutes INTEGER NOT NULL,
  duration_in_traffic_minutes INTEGER NOT NULL,
  day_of_week TEXT NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commute_logs ENABLE ROW LEVEL SECURITY;

-- User settings policies
CREATE POLICY "Users can view their own settings"
ON public.user_settings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
ON public.user_settings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
ON public.user_settings FOR UPDATE
USING (auth.uid() = user_id);

-- Routes policies
CREATE POLICY "Users can view their own routes"
ON public.routes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own routes"
ON public.routes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routes"
ON public.routes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routes"
ON public.routes FOR DELETE
USING (auth.uid() = user_id);

-- Commute logs policies (users can view logs for their own routes)
CREATE POLICY "Users can view their own commute logs"
ON public.commute_logs FOR SELECT
USING (
  route_id IN (
    SELECT id FROM public.routes WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert logs for their own routes"
ON public.commute_logs FOR INSERT
WITH CHECK (
  route_id IN (
    SELECT id FROM public.routes WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own commute logs"
ON public.commute_logs FOR DELETE
USING (
  route_id IN (
    SELECT id FROM public.routes WHERE user_id = auth.uid()
  )
);