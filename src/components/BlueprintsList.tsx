
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlueprintCard } from "@/components/BlueprintCard";
import { Loader2 } from "lucide-react";

export const BlueprintsList = () => {
  const { data: blueprints, isLoading, error } = useQuery({
    queryKey: ['blueprints'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blueprints')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
        <span className="ml-2 text-gray-300">Loading blueprints...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load blueprints. Please try again.</p>
      </div>
    );
  }

  if (!blueprints || blueprints.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-300">No blueprints available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Available Blueprints</h3>
        <p className="text-sm text-gray-300">
          Download these automation templates and follow the included instructions to set them up.
        </p>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {blueprints.map((blueprint) => (
          <BlueprintCard
            key={blueprint.id}
            blueprint={blueprint}
          />
        ))}
      </div>
      
      <div className="pt-3 border-t border-slate-600/50">
        <p className="text-xs text-gray-400 text-center">
          More blueprints will be added regularly. Check back soon!
        </p>
      </div>
    </div>
  );
};
