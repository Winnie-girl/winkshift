import { useState } from "react";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Footer newsletter signup:", email);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <footer ref={ref} className="bg-gray-900/80 pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className={`lg:col-span-1 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">▶</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Winkshift</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Making AI automation accessible to everyone, no matter your technical background.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm">📺</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm">🎵</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-sm">💼</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center hover:translate-x-2 group">
                  <span className="group-hover:animate-bounce mr-2">📚</span>
                  Prompt Library
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center hover:translate-x-2 group">
                  <span className="group-hover:animate-bounce mr-2">🛠️</span>
                  AI Tool Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center hover:translate-x-2 group">
                  <span className="group-hover:animate-bounce mr-2">📋</span>
                  AI Blueprints
                </a>
              </li>
            </ul>
          </div>
          
          {/* Stay Connected */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h4 className="text-lg font-semibold text-white mb-6">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Get in touch to explore how AI can transform your workflow.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-800/50 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 py-3 mb-4 animate-scale-in">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-green-400 font-semibold">Subscribed!</span>
              </div>
            )}
            
            <button className="w-full bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group text-sm hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              Work With Me
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`border-t border-gray-700 pt-8 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-center text-gray-400 text-sm">
            © 2024 Winkshift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
