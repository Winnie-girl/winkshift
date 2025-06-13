
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Enhanced floating background shapes with new colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>
      
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
