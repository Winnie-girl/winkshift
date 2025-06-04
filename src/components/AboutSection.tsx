import { ArrowRight } from "lucide-react";
export const AboutSection = () => {
  return <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            About Me
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] max-w-md mx-auto bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl overflow-hidden shadow-xl">
                <img src="/lovable-uploads/636a0308-2cb3-432d-be78-9f24f19e2f3f.png" alt="Tam with her dog outdoors" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Meet Heather Probst</h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">I help professionals eliminate backend busywork by designing custom AI workflows that run quietly in the background. From qualifying leads to generating proposals and automating onboarding, I build systems that free you up to focus on what you do best.</p>
              
              <p className="text-lg">My mission is to make AI simple, practical, and accessible — so entrepreneurs and small businesses can use it to run smarter, not harder, no tech expertise required.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                AI Education
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Generative AI
              </span>
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                Prompt Engineering
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Workflow Automation
              </span>
            </div>

            <div className="pt-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center group">
                Work With Me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};