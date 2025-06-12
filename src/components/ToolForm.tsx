
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Tool {
  id: string;
  name: string;
  description: string;
  website_url: string;
  category: string;
  tags: string[];
  icon_url: string | null;
  is_featured: boolean;
  created_at: string;
}

interface ToolFormProps {
  tool?: Tool | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ToolForm = ({ tool, onSuccess, onCancel }: ToolFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website_url: '',
    category: '',
    tags: '',
    icon_url: '',
    is_featured: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name,
        description: tool.description,
        website_url: tool.website_url,
        category: tool.category,
        tags: tool.tags.join(', '),
        icon_url: tool.icon_url || '',
        is_featured: tool.is_featured
      });
    }
  }, [tool]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const toolData = {
        name: formData.name,
        description: formData.description,
        website_url: formData.website_url,
        category: formData.category,
        tags: tagsArray,
        icon_url: formData.icon_url || null,
        is_featured: formData.is_featured
      };

      if (tool) {
        // Update existing tool
        const { error } = await supabase
          .from('tools')
          .update(toolData)
          .eq('id', tool.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Tool updated successfully!",
        });
      } else {
        // Create new tool
        const { error } = await supabase
          .from('tools')
          .insert([toolData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Tool created successfully!",
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving tool:', error);
      toast({
        title: "Error",
        description: "Failed to save tool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Tool Name *
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., ChatGPT"
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <Input
            id="category"
            type="text"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="e.g., Writing, Design, Productivity"
            required
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe what this tool does and how it helps users..."
          required
          rows={4}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 mb-2">
          Website URL *
        </label>
        <Input
          id="website_url"
          type="url"
          value={formData.website_url}
          onChange={(e) => handleChange('website_url', e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="icon_url" className="block text-sm font-medium text-gray-700 mb-2">
          Icon URL (optional)
        </label>
        <Input
          id="icon_url"
          type="url"
          value={formData.icon_url}
          onChange={(e) => handleChange('icon_url', e.target.value)}
          placeholder="https://example.com/icon.png"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <Input
          id="tags"
          type="text"
          value={formData.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="AI, writing, productivity, automation"
          className="w-full"
        />
      </div>

      <div className="flex items-center">
        <input
          id="is_featured"
          type="checkbox"
          checked={formData.is_featured}
          onChange={(e) => handleChange('is_featured', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
          Mark as featured tool
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !formData.name || !formData.description || !formData.website_url}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Saving...' : (tool ? 'Update Tool' : 'Create Tool')}
        </Button>
      </div>
    </form>
  );
};
