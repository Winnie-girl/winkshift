
-- 1. Create consultation_requests table to store booking inquiries from all lead capture points

CREATE TABLE public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service_type TEXT NOT NULL, -- e.g. 'automation', 'consulting', 'newsletter', 'work_with_me', 'general'
  project_description TEXT,
  goals TEXT,
  current_challenges TEXT,
  budget_range TEXT,
  timeline TEXT,
  preferred_contact_method TEXT,
  source TEXT, -- stores where the lead came from ("get_started", "build_automation", "book_session", "work_with_me", "newsletter", etc)
  status TEXT DEFAULT 'new', -- e.g. 'new', 'contacted', 'in_progress', 'completed'
  referral_info TEXT -- How they found you / referral details
);

-- 2. Indexing for quick lookup by email or status
CREATE INDEX idx_consultation_requests_email ON public.consultation_requests(email);
CREATE INDEX idx_consultation_requests_status ON public.consultation_requests(status);

-- 3. Enable RLS but allow public insert for form submissions (admin dashboard policies can be restricted later)
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for consultation requests"
ON public.consultation_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow admin select for consultation requests"
ON public.consultation_requests
FOR SELECT
USING (true);

-- 4. (Optional) Add a simple audit trigger to always update updated_at
CREATE OR REPLACE FUNCTION update_consultation_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_consultation_requests_updated_at ON public.consultation_requests;

CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION update_consultation_requests_updated_at();

-- 5. Add 'source' column to public.email_subscribers so newsletter signups can track where from (if not already, for redundancy)
ALTER TABLE public.email_subscribers
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'newsletter';

