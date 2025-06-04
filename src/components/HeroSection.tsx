
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-2xl">👋</span>
              <span className="text-gray-300 font-medium">Hello!</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                I'm <span className="text-cyan-400 font-bold">Heather</span>,<br />
                founder of<br />
                Winkshift
              </h1>
              
              <p className="text-xl text-white leading-relaxed max-w-lg">
                A concierge-style, AI automation studio that helps business owners, creators, and service pros set up tailored AI services to each client's unique workflow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                Steal My Prompts
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800/50">
                View My Services
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:pl-12">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/30">
                <img 
                  src="/lovable-uploads/2227b81b-c0e0-477b-a2f7-906e0b97b4a9.png"
                  alt="Tam - AI Educator and Consultant"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/30 rounded-full opacity-70 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-400/30 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
