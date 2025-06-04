
import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2 className={`text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Stay Ahead of the AI Curve
        </h2>
        
        <p className={`text-xl text-gray-300 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Get weekly AI insights, new templates, and expert tips delivered straight to your inbox. No spam, just value.
        </p>
        
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors duration-300 group-focus-within:text-cyan-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 border border-gray-600 bg-gray-800/50 text-white rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 py-4 mb-8 animate-scale-in">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-green-400 font-semibold text-lg">Thanks for subscribing!</span>
            </div>
          )}
        </div>
        
        <p className={`text-sm text-gray-400 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          We respect your privacy and will never share your information with third parties.
        </p>
      </div>
    </section>
  );
};
