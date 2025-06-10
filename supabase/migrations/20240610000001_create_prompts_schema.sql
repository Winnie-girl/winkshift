
-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prompts table
CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  author VARCHAR(100) DEFAULT 'Winkshift Team',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user favorites table (for future use)
CREATE TABLE user_favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id INTEGER REFERENCES prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, prompt_id)
);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('Content Creation', 'Prompts for creating various types of content'),
  ('Social Media', 'Prompts for social media posts and engagement'),
  ('Marketing', 'Marketing and advertising related prompts'),
  ('Business', 'Business and professional communication prompts'),
  ('Creative', 'Creative writing and brainstorming prompts');

-- Insert sample prompts
INSERT INTO prompts (title, description, content, category_id, tags) VALUES
  (
    'Blog Post Writer',
    'Generate engaging blog posts on any topic with proper structure and SEO optimization.',
    'Write a comprehensive blog post about [TOPIC]. Include an engaging introduction, 3-5 main sections with subheadings, and a compelling conclusion. Optimize for SEO with relevant keywords.',
    1,
    ARRAY['blog', 'seo', 'writing']
  ),
  (
    'Social Media Caption',
    'Create compelling social media captions that drive engagement.',
    'Create an engaging social media caption for [PLATFORM] about [TOPIC]. Include relevant hashtags, a call-to-action, and maintain the appropriate tone for the platform.',
    2,
    ARRAY['social', 'engagement', 'captions']
  ),
  (
    'Email Marketing Template',
    'Professional email templates for marketing campaigns.',
    'Write a professional marketing email for [PRODUCT/SERVICE]. Include a compelling subject line, personalized greeting, clear value proposition, and strong call-to-action.',
    3,
    ARRAY['email', 'marketing', 'conversion']
  );

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to categories and public prompts
CREATE POLICY "Categories are publicly readable" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public prompts are readable by everyone" ON prompts
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage their own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);
