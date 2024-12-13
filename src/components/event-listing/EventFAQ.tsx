import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EventFAQ = () => {
  const faqs = [
    {
      question: "What's the dress code?",
      answer: "Smart casual attire is recommended for this event."
    },
    {
      question: "Is parking available?",
      answer: "Yes, free parking is available on-site."
    },
    {
      question: "What's the cancellation policy?",
      answer: "Full refunds are available up to 48 hours before the event."
    },
    {
      question: "Are there food options available?",
      answer: "Light refreshments will be provided during breaks."
    }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default EventFAQ;