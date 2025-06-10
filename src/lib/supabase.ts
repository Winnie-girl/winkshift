
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Prompt {
  id: number;
  title: string;
  description: string;
  content: string;
  category_id: number;
  tags: string[];
  author: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface UserFavorite {
  id: number;
  user_id: string;
  prompt_id: number;
  created_at: string;
}
