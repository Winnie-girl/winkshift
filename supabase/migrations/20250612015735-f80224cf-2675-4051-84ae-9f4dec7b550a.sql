
-- Remove the specified tools from the database
DELETE FROM tools WHERE name IN ('ChatGPT', 'MidJourney', 'Zapier');

-- Alternative approach if the names might have slight variations:
-- This will also catch variations like 'Chat GPT', 'Midjourney', etc.
DELETE FROM tools WHERE 
  LOWER(name) LIKE '%chatgpt%' OR 
  LOWER(name) LIKE '%chat gpt%' OR
  LOWER(name) LIKE '%midjourney%' OR
  LOWER(name) LIKE '%mid journey%' OR
  LOWER(name) LIKE '%zapier%';
