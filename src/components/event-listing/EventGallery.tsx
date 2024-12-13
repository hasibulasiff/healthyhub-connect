import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EventGalleryProps {
  images: string[];
}

const EventGallery = ({ images }: EventGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Event gallery ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <img
            src={selectedImage || ""}
            alt="Gallery preview"
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventGallery;