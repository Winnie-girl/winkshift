
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const scrollToCustomAIStrategy = () => {
    const target = document.getElementById('custom-ai-strategy');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-2xl animate-bounce-slow">👋</span>
              <span className="text-gray-300 font-medium">Hello!</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight overflow-hidden">
                <span className={`inline-block transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
                  I&apos;m <span
                    className="text-white font-bold"
                  >
                    Heather
                  </span>
                  ,<br />
                </span>
                <span className={`inline-block transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
                  founder of<br />
                </span>
                <span className={`inline-block transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
                  <span
                    className="bg-gradient-to-r from-[#f97316] via-[#f97316] to-[#2563eb] bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #f97316 10%, #2563eb 90%)"
                    }}
                  >
                    Winkshift
                  </span>
                </span>
              </h1>
              <p className={`text-xl text-gray-300 leading-relaxed max-w-lg transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>A concierge style AI automation studio that helps business owners, creators, and service professionals set up tailored AI services to each client&apos;s unique workflow.</p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
              <button
                className="bg-gradient-coral-glow hover:shadow-warm-orange-500/25 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
                onClick={() => navigate("/prompts")}
              >
                Steal My Prompts
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Updated gradient border for brand flair */}
              <button
                className="relative px-8 py-4 rounded-full font-semibold transition-all duration-300 text-white flex items-center justify-center group"
                style={{
                  border: "2px solid transparent",
                  background: "linear-gradient(#131c32, #131c32) padding-box, linear-gradient(90deg, #f97316, #2563eb) border-box"
                }}
                onClick={scrollToCustomAIStrategy}
              >
                <span className="text-gray-100 font-bold">View My Services</span>
              </button>
            </div>
          </div>
          <div className={`lg:pl-12 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-deep-purple-800/30 via-deep-purple-600/20 to-warm-orange-800/30 rounded-3xl shadow-2xl border border-deep-purple-500/30 flex items-center justify-center hover:scale-105 transition-transform duration-500 backdrop-blur-sm">
                <span className="text-gray-300 text-center px-8">
                  Your image will go here
                </span>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-warm-orange-500/30 rounded-full opacity-70 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-deep-purple-500/30 rounded-full opacity-60 animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-coral-glow-500/40 rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
