export interface Listing {
  id: number;
  title: string;
  type: string;
  sponsored?: boolean;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  image: string;
  description: string;
  amenities?: string[];
  features?: string[];
  openNow?: boolean;
  category: string;
}