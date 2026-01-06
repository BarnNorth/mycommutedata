-- Add display_order column to routes table
ALTER TABLE public.routes 
ADD COLUMN display_order integer DEFAULT 0;

-- Set initial order based on created_at
UPDATE public.routes 
SET display_order = subquery.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) as row_num 
  FROM public.routes
) as subquery
WHERE public.routes.id = subquery.id;