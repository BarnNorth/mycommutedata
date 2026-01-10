-- Update the set_trial_start_on_first_route function with explicit authorization check
CREATE OR REPLACE FUNCTION public.set_trial_start_on_first_route()
RETURNS TRIGGER AS $$
BEGIN
  -- Explicit authorization check for defense in depth
  IF NEW.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized: user_id does not match authenticated user';
  END IF;
  
  UPDATE public.user_settings
  SET trial_started_at = now()
  WHERE user_id = NEW.user_id
    AND trial_started_at IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;