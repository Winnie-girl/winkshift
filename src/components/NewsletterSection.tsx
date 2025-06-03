
import { useState } from "react";
import { Mail } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // Handle newsletter signup
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Stay Ahead of the AI Curve
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Get weekly AI insights, new templates, and expert tips delivered straight to your inbox. No spam, just value.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-sm text-gray-500">
          We respect your privacy and will never share your information with third parties.
        </p>
      </div>
    </section>
  );
};
