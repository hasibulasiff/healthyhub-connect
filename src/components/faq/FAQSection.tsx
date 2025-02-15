import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I list my fitness center?",
    answer: "Simply sign up for an account, verify your business, and follow our easy listing process to showcase your facility."
  },
  {
    question: "What types of businesses can list?",
    answer: "We welcome gyms, yoga studios, sports centers, personal trainers, and fitness event organizers."
  },
  {
    question: "How much does it cost to list?",
    answer: "We offer flexible pricing plans starting with a free basic listing. Premium features are available with our paid plans."
  },
  {
    question: "Can I manage multiple locations?",
    answer: "Yes, our platform supports managing multiple locations under a single account."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg border border-gray-200"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-medium text-gray-900">{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;