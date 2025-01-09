export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  reviews: number;
  sponsored?: boolean;
  type: string;
  price: number;
}