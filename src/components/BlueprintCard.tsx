
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Blueprint {
  id: string;
  title: string;
  description: string;
  json_file_path: string;
  file_size_kb: number | null;
  download_count: number | null;
}

interface BlueprintCardProps {
  blueprint: Blueprint;
  onDownload?: () => void;
}

export const BlueprintCard = ({ blueprint, onDownload }: BlueprintCardProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      // Get the public URL for the file
      const { data } = supabase.storage
        .from('blueprints')
        .getPublicUrl(blueprint.json_file_path);

      if (data?.publicUrl) {
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = data.publicUrl;
        link.download = blueprint.json_file_path;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Update download count
        await supabase
          .from('blueprints')
          .update({ download_count: (blueprint.download_count || 0) + 1 })
          .eq('id', blueprint.id);

        toast({
          title: "Download Started",
          description: `${blueprint.title} blueprint is downloading...`,
        });

        onDownload?.();
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the blueprint. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 hover:border-blue-400/50 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm mb-1">{blueprint.title}</h4>
          <p className="text-gray-300 text-xs leading-relaxed">{blueprint.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          {blueprint.file_size_kb && (
            <span>{blueprint.file_size_kb}KB</span>
          )}
          {blueprint.download_count !== null && (
            <span>{blueprint.download_count} downloads</span>
          )}
        </div>
        <Button
          onClick={handleDownload}
          size="sm"
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 h-auto"
        >
          <Download className="w-3 h-3 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};
