-- Change check_time from single time to array of times
ALTER TABLE public.routes 
ALTER COLUMN check_time TYPE time[] USING ARRAY[check_time];