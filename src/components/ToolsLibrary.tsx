
import { useState, useEffect } from "react";
import { Search, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export const ToolsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast({
        title: "Error",
        description: "Failed to load tools. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: `"${name}" URL has been copied to your clipboard.`,
    });
  };

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group tools by type
  const featuredTools = filteredTools.filter(t => t.is_featured);
  const latestTools = filteredTools.filter(t => !t.is_featured).slice(0, 6);
  const allTools = filteredTools.filter(t => !t.is_featured);

  const getCategoryBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'writing':
        return 'bg-blue-100 text-blue-700';
      case 'design':
        return 'bg-purple-100 text-purple-700';
      case 'productivity':
        return 'bg-green-100 text-green-700';
      case 'development':
        return 'bg-cyan-100 text-cyan-700';
      case 'marketing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const ToolCard = ({ tool }: { tool: Tool }) => {
    return (
      <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(tool.category)}`}>
                {tool.category.toLowerCase()}
              </span>
              {tool.is_featured && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                  featured
                </span>
              )}
            </div>
          </div>

          {tool.icon_url && (
            <div className="w-12 h-12 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <img 
                src={tool.icon_url} 
                alt={`${tool.name} icon`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {tool.description}
          </p>

          {tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tool.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {tool.tags.length > 3 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{tool.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopyUrl(tool.website_url, tool.name)}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy URL
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(tool.website_url, '_blank')}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Visit
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
          <p className="text-gray-600">Loading tools...</p>
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
            AI Tools Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the best AI tools to supercharge your workflow. From writing assistants to design generators, 
            find the perfect tools for your needs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Featured</span>
              <h2 className="text-2xl font-bold text-gray-900">Featured Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Tools */}
        {latestTools.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">New</span>
              <h2 className="text-2xl font-bold text-gray-900">Latest Additions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* All Tools */}
        {allTools.length > 6 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTools.slice(6).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {filteredTools.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tools found matching your search.</p>
          </div>
        )}

        {/* Email Signup Section */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Stay Updated with New AI Tools
          </h3>
          <p className="text-gray-600 mb-6">
            Get notified when we add new tools to our directory. Be the first to discover the latest AI innovations.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
