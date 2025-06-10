
import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "./PromptCard";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { PromptModal } from "./PromptModal";
import { usePrompts, useCategories } from "@/hooks/usePrompts";

export const PromptLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const { data: prompts = [], isLoading: promptsLoading } = usePrompts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Create category list with "All" option
  const categoryOptions = ["All", ...categories.map(cat => cat.name)];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || prompt.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePromptClick = (prompt: any) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  if (promptsLoading || categoriesLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-white text-xl">Loading prompts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Prompt
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 ml-4">
            Library
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Discover and use our curated collection of AI prompts to enhance your productivity and creativity.
        </p>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Prompt
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        <div className="lg:w-64">
          <CategoryFilter 
            categories={categoryOptions}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {filteredPrompts.length} of {prompts.length} prompts
        </p>
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPrompts.map((prompt) => (
          <PromptCard 
            key={prompt.id} 
            prompt={{
              ...prompt,
              category: prompt.category?.name || 'Uncategorized',
              createdAt: prompt.created_at
            }}
            onClick={() => handlePromptClick(prompt)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No prompts found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Prompt Modal */}
      <PromptModal 
        prompt={selectedPrompt ? {
          ...selectedPrompt,
          category: selectedPrompt.category?.name || 'Uncategorized'
        } : null}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPrompt(null);
        }}
      />
    </div>
  );
};
