import { Listing } from "./types";

export const dummyListings: Listing[] = [
  {
    id: 1,
    title: "Elite Fitness Center",
    description: "State-of-the-art equipment and expert trainers",
    location: "Downtown LA",
    rating: 4.8,
    category: "Gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    reviews: 120,
    sponsored: true,
    type: "fitness",
    price: 50
  },
  {
    id: 2,
    title: "Yoga Heaven",
    description: "Find your inner peace with expert guidance",
    location: "Beverly Hills",
    rating: 4.9,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&q=80",
    reviews: 89,
    type: "wellness",
    price: 35
  },
  {
    id: 3,
    title: "CrossFit Zone",
    description: "Push your limits with intensive training",
    location: "Santa Monica",
    rating: 4.7,
    category: "CrossFit",
    image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=500&q=80",
    reviews: 156,
    type: "fitness",
    price: 45
  },
  {
    id: 4,
    title: "Wellness Spa & Fitness",
    description: "Combine wellness and fitness in one place",
    location: "Hollywood",
    rating: 4.9,
    category: "Spa & Fitness",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&q=80",
    reviews: 78,
    sponsored: true,
    type: "wellness",
    price: 65
  }
];