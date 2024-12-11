import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="md:col-span-2">
        <img
          src={images[selectedImage]}
          alt={title}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-300"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} ${index + 1}`}
            className={`w-full h-48 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
              selectedImage === index 
                ? "ring-2 ring-purple-500 opacity-100" 
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;