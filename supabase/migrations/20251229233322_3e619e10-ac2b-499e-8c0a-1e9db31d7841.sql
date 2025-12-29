-- Add UPDATE policy for commute_logs table
-- This ensures only route owners can update their commute logs
CREATE POLICY "Users can update their own commute logs"
ON public.commute_logs FOR UPDATE
USING (
  route_id IN (
    SELECT id FROM public.routes WHERE user_id = auth.uid()
  )
);