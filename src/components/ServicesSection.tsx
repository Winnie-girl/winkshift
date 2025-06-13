
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ServicesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-1000 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-400 hover:scale-105 transition-transform duration-300 shadow-lg">
            Free Resources
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How can I help you with AI?
          </h2>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover free tools and resources designed to help you harness the power of AI.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Free AI Blueprints */}
          <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-600/30 hover:scale-105 hover:border-teal-400/50 hover:shadow-teal-400/20 group backdrop-blur-sm ${cardsVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">Free AI Blueprints</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get step-by-step video tutorials and downloadable templates to build powerful automations for your business.
            </p>
            <button className="w-full border-2 border-teal-400 text-teal-300 hover:bg-teal-500 hover:text-white hover:border-teal-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-teal-400/30">
              Browse Blueprints
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Prompt Library */}
          <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-600/30 hover:scale-105 hover:border-teal-400/50 hover:shadow-teal-400/20 group backdrop-blur-sm ${cardsVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">Prompt Library</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Access a curated library of high-quality prompts to get better results from tools like ChatGPT.
            </p>
            <button className="w-full border-2 border-teal-400 text-teal-300 hover:bg-teal-500 hover:text-white hover:border-teal-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-teal-400/30">
              Explore Prompts
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* AI Tools Directory */}
          <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-600/30 hover:scale-105 hover:border-teal-400/50 hover:shadow-teal-400/20 group backdrop-blur-sm ${cardsVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">AI Tools Directory</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover my personally vetted list of the best AI tools to grow your business and boost productivity.
            </p>
            <button className="w-full border-2 border-teal-400 text-teal-300 hover:bg-teal-500 hover:text-white hover:border-teal-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-teal-400/30">
              See the Directory
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div ref={ctaRef} className={`text-center mb-12 transition-all duration-1000 ${ctaVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready for a Custom AI Strategy?
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custom AI Automation */}
          <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-600/30 hover:scale-105 hover:border-teal-400/50 hover:shadow-teal-400/20 group backdrop-blur-sm ${ctaVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <h4 className="text-2xl font-bold text-white mb-6 group-hover:text-teal-300 transition-colors duration-300">Custom AI Automation</h4>
            <p className="text-gray-300 mb-8 leading-relaxed">If you're looking for a hands-off solution, I design tailored AI-powered systems that simplify your backend, save time, and support your next stage of growth.</p>
            <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-400/30 flex items-center group w-full justify-center">
              Build My Automation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 1:1 Consulting */}
          <div className={`bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-600/30 hover:scale-105 hover:border-teal-400/50 hover:shadow-teal-400/20 group backdrop-blur-sm ${ctaVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <h4 className="text-2xl font-bold text-white mb-6 group-hover:text-teal-300 transition-colors duration-300">1:1 Consulting</h4>
            <p className="text-gray-300 mb-8 leading-relaxed">
              These private sessions are built for leaders who want clarity. Together, we'll map out a custom AI strategy that aligns with your vision so every decision drives progress.
            </p>
            <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-400/30 flex items-center group w-full justify-center">
              Book a Session
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
