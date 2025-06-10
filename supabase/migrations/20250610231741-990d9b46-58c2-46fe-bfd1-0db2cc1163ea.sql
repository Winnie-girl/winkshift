
-- Create prompts table
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RLS policies
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read public prompts
CREATE POLICY "Anyone can view public prompts" ON prompts
  FOR SELECT USING (is_public = true);

-- Insert some sample data
INSERT INTO prompts (title, description, content, category, tags, author) VALUES
  ('Marketing Strategy Generator', 'Create comprehensive marketing strategies for any business', 'You are a marketing expert. Create a detailed marketing strategy for [business type] targeting [target audience]. Include specific tactics, channels, and measurable goals.', 'Marketing', ARRAY['strategy', 'business', 'planning'], 'AI Expert'),
  ('Social Media Content Creator', 'Generate engaging social media posts for various platforms', 'Create 5 engaging social media posts for [platform] about [topic]. Make them [tone] and include relevant hashtags and call-to-actions.', 'Marketing', ARRAY['social-media', 'content', 'engagement'], 'Content Specialist'),
  ('Email Sales Sequence', 'Craft persuasive email sequences for sales campaigns', 'Write a 5-email sales sequence for [product/service] targeting [audience]. Focus on building trust, addressing pain points, and driving conversions.', 'Sales', ARRAY['email', 'sales', 'conversion'], 'Sales Pro'),
  ('Product Description Writer', 'Create compelling product descriptions that convert', 'Write a compelling product description for [product name]. Highlight key benefits, features, and use persuasive language to drive purchases. Target audience: [audience].', 'Sales', ARRAY['copywriting', 'ecommerce', 'conversion'], 'Copy Expert');
