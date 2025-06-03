
import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Footer newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">▶</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Tam AI</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Making AI automation accessible to everyone, no matter your technical background.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-sm">📺</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-sm">🎵</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-sm">💼</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  📚 Prompt Library
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  🛠️ AI Tool Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                  📋 AI Blueprints
                </a>
              </li>
            </ul>
          </div>
          
          {/* Stay Connected */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Stay Connected</h4>
            <p className="text-gray-600 mb-4">
              Get in touch to explore how AI can transform your workflow.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-coral-500 hover:bg-coral-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                Subscribe
              </button>
            </form>
            
            <button className="w-full bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group text-sm">
              Work With Me
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Tam AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
