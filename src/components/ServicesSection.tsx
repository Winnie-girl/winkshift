import { ArrowRight } from "lucide-react";
export const ServicesSection = () => {
  return <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
            Free Resources
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How can I help you with AI?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover free tools and resources designed to help you harness the power of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Free AI Blueprints */}
          <div className="bg-gray-800/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Free AI Blueprints</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get step-by-step video tutorials and downloadable templates to build powerful automations for your business.
            </p>
            <button className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group">
              Browse Blueprints
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Prompt Library */}
          <div className="bg-gray-800/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Prompt Library</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Access a curated library of high-quality prompts to get better results from tools like ChatGPT.
            </p>
            <button className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group">
              Explore Prompts
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* AI Tools Directory */}
          <div className="bg-gray-800/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">AI Tools Directory</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover my personally vetted list of the best AI tools to grow your business and boost productivity.
            </p>
            <button className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center group">
              See the Directory
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready for a Custom AI Strategy?
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custom AI Automation */}
          <div className="bg-gray-800/50 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/30">
            <h4 className="text-2xl font-bold text-white mb-6">Custom AI Automation



If you’re looking for a hands-off solution, I design tailored AI-powered systems that simplify your backend, save time, and support your next stage of growth.






          </h4>
            <p className="text-gray-300 mb-8 leading-relaxed">
              For businesses that need a done-for-you solution. I'll design and build bespoke AI-powered automations to streamline your operations, save you 10+ hours a week, and help you scale.
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center group w-full justify-center">
              Build My Automation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 1:1 Consulting */}
          <div className="bg-gray-800/50 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/30">
            <h4 className="text-2xl font-bold text-white mb-6">1:1 Consulting</h4>
            <p className="text-gray-300 mb-8 leading-relaxed">
              For leaders who need strategic guidance. In these private sessions, we'll develop a personalized AI roadmap for your business goals, ensuring you make the right investments and decisions.
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center group w-full justify-center">
              Book a Session
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};