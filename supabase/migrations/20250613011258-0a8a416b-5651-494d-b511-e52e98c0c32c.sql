
-- Remove the existing RLS policies that are causing the security warnings
-- Since RLS is disabled on the tools table, these policies are not being used
DROP POLICY IF EXISTS "Allow public read access to tools" ON public.tools;
DROP POLICY IF EXISTS "Allow public insert access to tools" ON public.tools;
DROP POLICY IF EXISTS "Allow public update access to tools" ON public.tools;
DROP POLICY IF EXISTS "Allow public delete access to tools" ON public.tools;

-- The table will continue to work exactly as before since RLS remains disabled
-- This just cleans up the unused policies that were causing the security warnings
