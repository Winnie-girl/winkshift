
import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ToolForm } from "@/components/ToolForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

export const ToolManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);

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

  const handleDelete = async (toolId: string, toolName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${toolName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', toolId);

      if (error) throw error;

      setTools(tools.filter(tool => tool.id !== toolId));
      toast({
        title: "Success",
        description: `"${toolName}" has been deleted.`,
      });
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast({
        title: "Error",
        description: "Failed to delete tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingTool(null);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingTool(null);
    fetchTools();
  };

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tool Management
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Add, edit, and manage AI tools in your directory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search Bar */}
            <div className="max-w-md relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            {/* Add Button */}
            <Button 
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Tool
            </Button>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? "No tools found matching your search." : "No tools available. Add your first tool!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
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
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tool)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(tool.id, tool.name)}
                        className="text-gray-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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

                  <div className="text-xs text-gray-500">
                    Created: {new Date(tool.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tool Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTool ? 'Edit Tool' : 'Add New Tool'}
              </DialogTitle>
            </DialogHeader>
            <ToolForm 
              tool={editingTool}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
