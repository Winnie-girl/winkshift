
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/30 shadow-lg' 
        : 'bg-gray-900/80 backdrop-blur-md border-b border-gray-700/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
              Winkblink
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <span className="sr-only">YouTube</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
                📺
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <span className="sr-only">TikTok</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300">
                🎵
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <span className="sr-only">Instagram</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300">
                📷
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
              <span className="sr-only">LinkedIn</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                💼
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-300 hover:text-white focus:outline-none transition-all duration-300 hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2 shadow-lg">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-gray-700 rounded-lg hover:scale-105"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-gray-700 rounded-lg hover:scale-105"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-gray-700 rounded-lg hover:scale-105"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-gray-700 rounded-lg hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
