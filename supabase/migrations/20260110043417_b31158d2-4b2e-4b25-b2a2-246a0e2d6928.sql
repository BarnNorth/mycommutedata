-- Add last_login_at column to user_settings
ALTER TABLE public.user_settings 
ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update existing records to have a last_login_at value
UPDATE public.user_settings 
SET last_login_at = COALESCE(trial_started_at, created_at, now())
WHERE last_login_at IS NULL;