
import { Copy, Heart, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: {
    id: number;
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    createdAt: string;
  };
  onClick: () => void;
}

export const PromptCard = ({ prompt, onClick }: PromptCardProps) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    toast({
      title: "Prompt copied!",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Added to favorites",
      description: "This prompt has been saved to your favorites.",
    });
  };

  return (
    <div 
      onClick={onClick}
      className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl"
    >
      {/* Category Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30">
          {prompt.category}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavorite}
          className="text-gray-400 hover:text-red-400 transition-colors duration-300"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
        {prompt.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 mb-4 line-clamp-3">
        {prompt.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.map((tag) => (
          <span 
            key={tag}
            className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {prompt.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(prompt.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
