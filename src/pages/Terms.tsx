import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto prose">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using HealthyThako, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p className="text-muted-foreground">
              You must register for an account in order to access certain features of the platform. You must provide accurate and complete information and keep your account information updated.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Privacy Policy</h2>
            <p className="text-muted-foreground">
              Please review our Privacy Policy, which also governs your visit to HealthyThako, to understand our practices regarding the collection and use of your personal information.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new Terms and Conditions on this page.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;