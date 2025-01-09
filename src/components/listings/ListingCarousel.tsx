import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ListingCard } from "./ListingCard";
import { Listing } from "./types";
import { memo } from "react";

interface ListingCarouselProps {
  listings: Listing[];
}

export const ListingCarousel = memo(({ listings }: ListingCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {listings.map((listing) => (
          <CarouselItem key={listing.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
            <ListingCard listing={listing} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
});

ListingCarousel.displayName = "ListingCarousel";