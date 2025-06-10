
import { useQuery } from '@tanstack/react-query';
import { supabase, Prompt, Category } from '@/lib/supabase';

export const usePrompts = () => {
  return useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      console.log('Fetching prompts...');
      const { data, error } = await supabase
        .from('prompts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prompts:', error);
        throw error;
      }
      
      console.log('Prompts fetched:', data);
      return data as (Prompt & { category: Category })[];
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories...');
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      
      console.log('Categories fetched:', data);
      return data as Category[];
    },
  });
};
