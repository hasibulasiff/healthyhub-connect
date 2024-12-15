import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mb-8 group">
      <div className="relative h-[500px] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={`${title} ${selectedImage + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={previousImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              className="w-full h-24 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;