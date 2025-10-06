import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// CONFIGURATION: Add your images here
// Replace the placeholder images with your own image URLs or paths
const images = [
  {
    src: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Remember this amazing day? Add your own caption here!',
  },
  {
    src: 'https://images.pexels.com/photos/1649817/pexels-photo-1649817.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'That time we laughed until we cried. Your memory here!',
  },
  {
    src: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Best friends forever. Replace with your caption!',
  },
  {
    src: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Adventures together. Add your special memory!',
  },
  {
    src: 'https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Another wonderful moment. Your caption goes here!',
  },
  {
    src: 'https://images.pexels.com/photos/1157394/pexels-photo-1157394.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Making memories. Add your personal touch!',
  },
];

export default function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-5xl md:text-7xl font-extralight mb-6">
            Our Memories
          </h2>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-gray-600">
            A collection of moments that made us who we are
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative aspect-square overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-6 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} strokeWidth={1} />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].src}
              alt={`Memory ${selectedImage + 1}`}
              className="w-full h-auto rounded-2xl shadow-2xl mb-6"
            />
            <p className="text-white text-center text-lg md:text-xl font-light px-6 leading-relaxed">
              {images[selectedImage].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
