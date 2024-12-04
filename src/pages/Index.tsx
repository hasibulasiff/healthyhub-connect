import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSearch />
        {/* More sections will be added here */}
      </main>
    </div>
  );
};

export default Index;
