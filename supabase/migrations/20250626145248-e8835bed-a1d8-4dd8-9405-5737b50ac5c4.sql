
-- Update the consultation_requests table to better support different modal types
-- Add a clear modal_type field and make optional fields truly optional

-- First, let's add any missing columns and update the service_type to be more specific
ALTER TABLE public.consultation_requests 
ADD COLUMN IF NOT EXISTS modal_type TEXT;

-- Update existing records to have a modal_type based on service_type
UPDATE public.consultation_requests 
SET modal_type = CASE 
  WHEN service_type = 'automation' THEN 'detailed_consultation'
  WHEN service_type = 'consulting' THEN 'detailed_consultation'
  WHEN service_type = 'newsletter' THEN 'newsletter'
  ELSE 'general'
END
WHERE modal_type IS NULL;

-- Make modal_type required going forward
ALTER TABLE public.consultation_requests 
ALTER COLUMN modal_type SET NOT NULL;

-- Add a check constraint to ensure modal_type is one of the valid values
ALTER TABLE public.consultation_requests 
ADD CONSTRAINT valid_modal_type 
CHECK (modal_type IN ('quick_contact', 'detailed_consultation', 'newsletter', 'general', 'automation', 'consulting'));

-- Add an index on modal_type for better query performance
CREATE INDEX IF NOT EXISTS idx_consultation_requests_modal_type ON public.consultation_requests(modal_type);

-- Add a comment to document the table structure
COMMENT ON TABLE public.consultation_requests IS 'Stores all consultation requests from different modal types with conditional field requirements';
COMMENT ON COLUMN public.consultation_requests.modal_type IS 'Type of modal form: quick_contact (name, email, message), detailed_consultation (full form), newsletter (name, email only), general (name, email, message)';
