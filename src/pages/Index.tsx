import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HeroSearch from '@/components/HeroSearch';
import Categories from '@/components/Categories';
import FeaturedListings from '@/components/FeaturedListings';
import Events from '@/components/Events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#1a1528] to-[#0f0a1e]">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1528] to-[#0f0a1e]">
      <Navbar />
      <main>
        <HeroSearch />
        <Categories />
        <FeaturedListings />
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default Index;