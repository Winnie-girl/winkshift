
import { Copy, X, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PromptModalProps {
  prompt: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptModal = ({ prompt, isOpen, onClose }: PromptModalProps) => {
  if (!prompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    toast({
      title: "Prompt copied!",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  const handleShare = () => {
    const url = `${window.location.origin}/prompts?id=${prompt.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The prompt link has been copied to your clipboard.",
    });
  };

  const handleFavorite = () => {
    toast({
      title: "Added to favorites",
      description: "This prompt has been saved to your favorites.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900/95 backdrop-blur-md border border-gray-700/50 text-white">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                {prompt.title}
              </DialogTitle>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30">
                  {prompt.category}
                </span>
                <span className="text-gray-400 text-sm">by {prompt.author}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300">{prompt.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-lg text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Prompt Content */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Prompt</h3>
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                {prompt.content}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700/30">
            <Button
              onClick={handleCopy}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Prompt
            </Button>
            
            <Button
              onClick={handleFavorite}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Add to Favorites
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
