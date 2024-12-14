import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import LeadCapture from "@/components/landing/LeadCapture";
import Testimonials from "@/components/landing/Testimonials";
import FeaturesComparison from "@/components/landing/FeaturesComparison";
import Vision from "@/components/landing/Vision";
import FAQ from "@/components/landing/FAQ";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSearch />
        <div className="bg-white">
          <div className="relative">
            <FeaturedListings />
            <Categories />
            <Events />
          </div>
          <LeadCapture />
          <Testimonials />
          <FeaturesComparison />
          <Vision />
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;