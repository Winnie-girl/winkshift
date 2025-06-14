import { useState, useEffect } from "react";
import { Search, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  is_public: boolean;
  created_at: string;
}

export const PromptLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast({
        title: "Error",
        description: "Failed to load prompts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, title: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: `"${title}" has been copied to your clipboard.`,
    });
  };

  const filteredPrompts = prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group prompts by their actual categories
  const latestPrompts = filteredPrompts.filter(p => p.category === 'Latest Additions');
  const mostUsedPrompts = filteredPrompts.filter(p => p.category === 'Most Used Prompts');
  const featuredPrompts = filteredPrompts.filter(p => p.category === 'Featured Prompts');

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Marketing':
        return 'bg-blue-100 text-blue-700';
      case 'Sales':
        return 'bg-purple-100 text-purple-700';
      case 'Featured Prompts':
        return 'bg-yellow-100 text-yellow-700';
      case 'Most Used Prompts':
        return 'bg-green-100 text-green-700';
      case 'Latest Additions':
        return 'bg-cyan-100 text-cyan-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (category: string) => {
    switch (category) {
      case 'Marketing':
      case 'Most Used Prompts':
        return { text: 'popular', color: 'bg-green-100 text-green-700' };
      case 'Latest Additions':
        return { text: 'new', color: 'bg-blue-100 text-blue-700' };
      case 'Featured Prompts':
        return { text: 'featured', color: 'bg-purple-100 text-purple-700' };
      default:
        return { text: 'new', color: 'bg-blue-100 text-blue-700' };
    }
  };

  const PromptCard = ({ prompt, variant = "default" }: { prompt: Prompt; variant?: "default" | "compact" }) => {
    const statusBadge = getStatusBadge(prompt.category);
    
    return (
      <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(prompt.category)}`}>
                {prompt.category.toLowerCase()}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${statusBadge.color}`}>
                {statusBadge.text}
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {prompt.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {prompt.description}
          </p>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(prompt.content, prompt.title)}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prompt Library
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Access a curated library of high-quality prompts to get better results from tools like ChatGPT.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="marketing strategy"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Latest Additions & Most Used Prompts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Latest Additions */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">New</span>
              <h2 className="text-2xl font-bold text-gray-900">Latest Additions</h2>
            </div>
            <div className="space-y-4">
              {latestPrompts.length > 0 ? (
                latestPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No latest additions found</p>
              )}
            </div>
          </div>

          {/* Most Used Prompts */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Popular</span>
              <h2 className="text-2xl font-bold text-gray-900">Most Used Prompts</h2>
            </div>
            <div className="space-y-4">
              {mostUsedPrompts.length > 0 ? (
                mostUsedPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No most used prompts found</p>
              )}
            </div>
          </div>
        </div>

        {/* Featured Prompts */}
        {featuredPrompts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Featured</span>
              <h2 className="text-2xl font-bold text-gray-900">Featured Prompts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* Email Signup Section */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔓</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Unlock All {prompts.length} Expert-Crafted Prompts
          </h3>
          <p className="text-gray-600 mb-6">
            Enter your email below to get instant access to our entire library of prompts.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
              Get Access
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
