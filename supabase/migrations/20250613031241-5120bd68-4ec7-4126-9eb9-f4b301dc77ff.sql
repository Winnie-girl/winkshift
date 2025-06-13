
-- Create a table for storing email subscribers
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  remember_me BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'blueprints',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on email_subscribers table
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert access (to allow email collection)
CREATE POLICY "Allow public insert access to email_subscribers"
ON public.email_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy for public read access (if needed for verification)
CREATE POLICY "Allow public read access to email_subscribers"
ON public.email_subscribers
FOR SELECT
TO public
USING (true);
