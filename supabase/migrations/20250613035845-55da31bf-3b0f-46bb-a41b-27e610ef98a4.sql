
-- Create a storage bucket for blueprint JSON files
INSERT INTO storage.buckets (id, name, public)
VALUES ('blueprints', 'blueprints', true);

-- Create storage policies for public access to blueprint files
CREATE POLICY "Allow public read access to blueprints" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'blueprints');

CREATE POLICY "Allow public insert access to blueprints" 
ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'blueprints');

-- Create a table for storing blueprint metadata
CREATE TABLE public.blueprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'automation',
  json_file_path TEXT NOT NULL,
  file_size_kb INTEGER,
  download_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blueprints table
ALTER TABLE public.blueprints ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to blueprints
CREATE POLICY "Allow public read access to blueprints" 
ON public.blueprints 
FOR SELECT 
TO public 
USING (true);

-- Create policy for public insert access to blueprints (for admin uploads)
CREATE POLICY "Allow public insert access to blueprints" 
ON public.blueprints 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy for public update access to blueprints (for download tracking)
CREATE POLICY "Allow public update access to blueprints" 
ON public.blueprints 
FOR UPDATE 
TO public 
USING (true);

-- Insert sample blueprint data (you can update these with your actual file details)
INSERT INTO public.blueprints (title, description, json_file_path, file_size_kb, is_featured) VALUES
('Automatic Email from Transcript', 'Convert audio/video transcripts into professional emails automatically using AI. Perfect for meeting summaries, interview follow-ups, and content repurposing.', 'automatic-email-from-transcript.json', 15, true),
('AI Content Scheduler', 'Automatically schedule and publish content across multiple platforms using AI-generated captions and optimal timing.', 'ai-content-scheduler.json', 12, true);
