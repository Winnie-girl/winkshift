
import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "./PromptCard";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { PromptModal } from "./PromptModal";

// Mock data for now - will be replaced with Supabase data
const mockPrompts = [
  {
    id: 1,
    title: "Blog Post Writer",
    description: "Generate engaging blog posts on any topic with proper structure and SEO optimization.",
    content: "Write a comprehensive blog post about [TOPIC]. Include an engaging introduction, 3-5 main sections with subheadings, and a compelling conclusion. Optimize for SEO with relevant keywords.",
    category: "Content Creation",
    tags: ["blog", "seo", "writing"],
    author: "Winkshift Team",
    isPublic: true,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Social Media Caption",
    description: "Create compelling social media captions that drive engagement.",
    content: "Create an engaging social media caption for [PLATFORM] about [TOPIC]. Include relevant hashtags, a call-to-action, and maintain the appropriate tone for the platform.",
    category: "Social Media",
    tags: ["social", "engagement", "captions"],
    author: "Winkshift Team",
    isPublic: true,
    createdAt: "2024-01-14"
  },
  {
    id: 3,
    title: "Email Marketing Template",
    description: "Professional email templates for marketing campaigns.",
    content: "Write a professional marketing email for [PRODUCT/SERVICE]. Include a compelling subject line, personalized greeting, clear value proposition, and strong call-to-action.",
    category: "Marketing",
    tags: ["email", "marketing", "conversion"],
    author: "Winkshift Team",
    isPublic: true,
    createdAt: "2024-01-13"
  }
];

const categories = ["All", "Content Creation", "Social Media", "Marketing", "Business", "Creative"];

export const PromptLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const filteredPrompts = mockPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePromptClick = (prompt: any) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

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
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {filteredPrompts.length} of {mockPrompts.length} prompts
        </p>
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPrompts.map((prompt) => (
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
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
        prompt={selectedPrompt}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPrompt(null);
        }}
      />
    </div>
  );
};
