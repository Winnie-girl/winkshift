import { useState } from "react";
import { Menu, X } from "lucide-react";
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white">Winkblink</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">YouTube</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                📺
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">TikTok</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                🎵
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                📷
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                💼
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2 shadow-lg">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium">
                Contact
              </button>
            </div>
          </div>}
      </div>
    </nav>;
};