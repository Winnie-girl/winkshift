
-- Add a 'name' column to store the user's name (nullable, so existing data isn't affected)
ALTER TABLE public.email_subscribers
ADD COLUMN name TEXT;
