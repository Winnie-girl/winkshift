
import { Navigation } from "@/components/Navigation";
import { ToolsLibrary } from "@/components/ToolsLibrary";
import { Footer } from "@/components/Footer";

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation />
      <main className="relative z-10 pt-20">
        <ToolsLibrary />
      </main>
      <Footer />
    </div>
  );
};

export default ToolsPage;
