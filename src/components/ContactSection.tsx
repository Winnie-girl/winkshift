
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useConsultationModal } from "./hooks/useConsultationModal";

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { open } = useConsultationModal();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={ref} className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-16 text-white relative overflow-hidden border border-slate-700/50 shadow-2xl ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-600 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Ready to transform your workflow with <span className="text-orange-400">AI</span>?
            </h2>
            
            <p className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Let's discuss how AI can revolutionize your business operations and unlock new possibilities for growth.
            </p>
            
            <div className={`flex justify-center transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <button
                className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-400/25 flex items-center group border-2 border-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                onClick={() => open("detailed_consultation", "contact_section")}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
