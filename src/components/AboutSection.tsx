import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
export const AboutSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:scale-105 transition-transform duration-300">
            About Me
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Placeholder for future image */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="relative group">
              <div className="aspect-[4/5] max-w-md mx-auto bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl shadow-xl flex items-center justify-center hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                <span className="text-gray-600 text-center px-8">
                  Your image will go here
                </span>
              </div>
              {/* Floating decoration */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-3xl group-hover:rotate-3 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`order-1 lg:order-2 space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Meet Heather Probst</h2>
            
            <div className="space-y-6 text-white leading-relaxed">
              <p className={`text-lg transition-all duration-700 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                I help professionals eliminate backend busywork by designing custom AI workflows that run quietly in the background. From qualifying leads to generating proposals and automating onboarding, I build systems that free you up to focus on what you do best.
              </p>
              
              <p className={`text-lg transition-all duration-700 delay-900 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>My mission is to make AI simple, practical, and accessible so entrepreneurs and small businesses can use it to run smarter, not harder, no tech expertise required.</p>
            </div>

            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-1100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{
              animationDelay: '1.3s'
            }}>
                AI Education
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{
              animationDelay: '1.4s'
            }}>
                Generative AI
              </span>
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{
              animationDelay: '1.5s'
            }}>
                Prompt Engineering
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{
              animationDelay: '1.6s'
            }}>
                Workflow Automation
              </span>
            </div>

            <div className={`pt-4 transition-all duration-700 delay-1300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center group">
                Work With Me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};