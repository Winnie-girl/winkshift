import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EmailCollectionModal } from "@/components/EmailCollectionModal";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Handler for opening blueprints modal
  const handleBlueprintsModal = () => {
    setIsBlueprintModalOpen(true);
    setIsResourcesOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-midnight-900/95 backdrop-blur-md border-b border-deep-purple-700/30 shadow-lg' : 'bg-midnight-900/80 backdrop-blur-md border-b border-deep-purple-700/20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                aria-label="Home"
                className="text-2xl font-bold bg-gradient-to-r from-[#f97316] via-[#f97316] to-[#2563eb] bg-clip-text text-transparent hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #f97316 10%, #2563eb 90%)"
                }}
              >
                Winkshift
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  Home
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-coral-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
                
                {/* Free Resources Dropdown */}
                <div className="relative"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <button className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group flex items-center">
                    Free Resources
                    <ChevronDown className="ml-1 h-4 w-4" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-coral-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-md rounded-md shadow-lg border border-deep-purple-200/30 transition-all duration-200 ${isResourcesOpen ? 'opacity-100 visible z-[99]' : 'opacity-0 invisible'}`}>
                    <div className="py-1">
                      <Link 
                        to="/prompts" 
                        className="block px-4 py-2 text-sm text-deep-purple-800 hover:bg-gradient-to-r hover:from-warm-orange-50 hover:to-coral-glow-50 hover:text-deep-purple-900 transition-colors"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        Prompt Library
                      </Link>
                      <Link 
                        to="/tools" 
                        className="block px-4 py-2 text-sm text-deep-purple-800 hover:bg-gradient-to-r hover:from-warm-orange-50 hover:to-coral-glow-50 hover:text-deep-purple-900 transition-colors"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        AI Tool Directory
                      </Link>
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-deep-purple-800 hover:bg-gradient-to-r hover:from-warm-orange-50 hover:to-coral-glow-50 hover:text-deep-purple-900 transition-colors"
                        onClick={handleBlueprintsModal}
                      >
                        AI Blueprints
                      </button>
                    </div>
                  </div>
                </div>

                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-coral-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative group">
                  Services
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-coral-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              </div>
            </div>

            {/* Enhanced Social Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <span className="sr-only">YouTube</span>
                <div className="w-8 h-8 bg-midnight-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 border border-deep-purple-600/30">
                  📺
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <span className="sr-only">TikTok</span>
                <div className="w-8 h-8 bg-midnight-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300 border border-deep-purple-600/30">
                  🎵
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 bg-midnight-700 rounded-full flex items-center justify-center hover:bg-gradient-coral-glow transition-colors duration-300 border border-deep-purple-600/30">
                  📷
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <div className="w-8 h-8 bg-midnight-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 border border-deep-purple-600/30">
                  💼
                </div>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none transition-all duration-300 hover:scale-110">
                <div className="relative w-6 h-6">
                  <Menu size={24} className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                  <X size={24} className={`absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-midnight-800/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-deep-purple-600/30">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-deep-purple-700/50 rounded-lg hover:scale-105">
                Home
              </button>
              <Link to="/prompts" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-deep-purple-700/50 rounded-lg hover:scale-105">
                Prompt Library
              </Link>
              <Link to="/tools" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-deep-purple-700/50 rounded-lg hover:scale-105">
                AI Tool Directory
              </Link>
              <button
                type="button"
                onClick={handleBlueprintsModal}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-deep-purple-700/50 rounded-lg hover:scale-105"
              >
                AI Blueprints
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-deep-purple-700/50 rounded-lg hover:scale-105">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-all duration-300 hover:bg-deep-purple-700/50 rounded-lg hover:scale-105">
                Services
              </button>
            </div>
          </div>
        </div>
      </nav>
      <EmailCollectionModal
        isOpen={isBlueprintModalOpen}
        onClose={() => setIsBlueprintModalOpen(false)}
      />
    </>
  );
};
