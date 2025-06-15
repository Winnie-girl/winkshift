import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useConsultationModal } from "./hooks/useConsultationModal";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const NewsletterSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { open } = useConsultationModal();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // When newsletter submit is successful, offer option to book consultation
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!email) return;
      // Add to email_subscribers table with source "newsletter"
      const { error } = await supabase.from("email_subscribers").insert([{ email, source: "newsletter" }]);
      if (error) throw error;
      toast({ title: "Subscribed!", description: "Check your inbox for AI strategies & blueprints." });
      // Offer to open consultation modal after successful sign-up
      setTimeout(() => {
        open("newsletter", "newsletter", email);
      }, 700);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Could not subscribe." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/95">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={ref} className={`bg-slate-800/60 backdrop-blur-sm rounded-3xl p-16 text-white relative overflow-hidden hover:scale-105 transition-all duration-700 border border-slate-700/40 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Stay Ahead of the <span className="text-orange-400">AI Curve</span>
            </h2>
            
            <p className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Get weekly insights, exclusive AI strategies, and early access to new automation blueprints delivered straight to your inbox.
            </p>
            
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto transition-all duration-1000 delay-700"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={submitting}
                className="flex-1 px-6 py-4 rounded-full bg-slate-700/60 border border-slate-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/25 flex items-center justify-center group disabled:opacity-70"
                disabled={submitting}
              >
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            
            <p className={`text-sm text-gray-400 mt-4 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              No spam, unsubscribe at any time. Your data is safe with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
