import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I book a fitness center?</AccordionTrigger>
              <AccordionContent>
                You can book a fitness center by browsing through our listings, selecting your preferred center, and clicking the "Book Now" button. Follow the prompts to complete your booking.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely through our platform.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I cancel my booking?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your booking according to the center's cancellation policy. Each center has its own policy, which is clearly displayed on their listing page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I become a listed center?</AccordionTrigger>
              <AccordionContent>
                To list your center, create an owner account and follow the listing process. You'll need to provide details about your center, amenities, and upload photos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
              <AccordionContent>
                Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your consent.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;