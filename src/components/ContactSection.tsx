
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={ref} className={`bg-gradient-to-r from-midnight-800 via-deep-purple-900 to-midnight-800 rounded-3xl p-16 text-white relative overflow-hidden hover:scale-105 transition-all duration-700 border border-deep-purple-600/30 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          {/* Enhanced background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-warm-orange-500 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral-glow-500 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-deep-purple-500 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Ready to Transform Your Workflow with <span className="bg-gradient-coral-glow bg-clip-text text-transparent">AI?</span>
            </h2>
            
            <p className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Let's work together to implement AI solutions that save you time, improve quality, and drive results.
            </p>
            
            <button className={`bg-gradient-coral-glow hover:shadow-warm-orange-500/25 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} delay-700`}>
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
