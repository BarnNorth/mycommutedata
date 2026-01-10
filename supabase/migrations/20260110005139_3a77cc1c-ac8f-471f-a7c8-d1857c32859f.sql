-- Add trial and payment tracking to user_settings
ALTER TABLE public.user_settings 
ADD COLUMN trial_started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN has_lifetime_access BOOLEAN NOT NULL DEFAULT false;

-- Create function to set trial_started_at when first route is created
CREATE OR REPLACE FUNCTION public.set_trial_start_on_first_route()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update if trial hasn't started yet
  UPDATE public.user_settings
  SET trial_started_at = now()
  WHERE user_id = NEW.user_id
    AND trial_started_at IS NULL;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on routes table
CREATE TRIGGER trigger_set_trial_start
AFTER INSERT ON public.routes
FOR EACH ROW
EXECUTE FUNCTION public.set_trial_start_on_first_route();