
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I need to know AI to work with you?",
      answer: "Not at all! My whole mission is making AI accessible to everyone, regardless of technical background. I'll handle the technical setup and teach you exactly what you need to know to use your new systems effectively."
    },
    {
      question: "How long does setup take?",
      answer: "For custom automations, most projects take 2-4 weeks depending on complexity. For consulting sessions, we can start immediately. I'll give you a clear timeline during our initial consultation."
    },
    {
      question: "What platforms and tools do you use?",
      answer: "I work with the best AI tools available including ChatGPT, Claude, Make.com, Zapier, and many others. I choose the right tools based on your specific needs and budget, not what's trendy."
    },
    {
      question: "Will this replace my team?",
      answer: "No! AI is meant to augment your team, not replace them. The goal is to eliminate repetitive tasks so your team can focus on high-value work that requires human creativity and judgment."
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "Perfect! You're exactly who I built this for. I specialize in creating solutions that are simple to use and maintain. You don't need to understand how it works - just how to use it effectively."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about working with AI automation
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 rounded-2xl shadow-md overflow-hidden border border-gray-700/30">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
