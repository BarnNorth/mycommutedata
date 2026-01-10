-- Remove the google_maps_api_key column from user_settings table
-- This column is no longer needed as the API key is now stored as a server-side secret
ALTER TABLE public.user_settings DROP COLUMN IF EXISTS google_maps_api_key;