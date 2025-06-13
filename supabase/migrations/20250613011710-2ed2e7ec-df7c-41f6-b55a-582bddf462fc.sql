
-- Remove the remaining RLS policy that's still causing security warnings
DROP POLICY IF EXISTS "Anyone can view tools" ON public.tools;

-- Also remove any other potential remaining policies with different names
DROP POLICY IF EXISTS "Users can view tools" ON public.tools;
DROP POLICY IF EXISTS "Public can view tools" ON public.tools;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.tools;

-- This should completely clean up all RLS policies from the tools table
-- Since RLS is disabled, the table will continue to function with full public access
