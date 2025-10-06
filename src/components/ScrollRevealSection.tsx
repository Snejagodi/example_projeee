import { useEffect, useRef, useState } from 'react';

interface ScrollRevealSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  delay?: number;
}

export default function ScrollRevealSection({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  delay = 0,
}: ScrollRevealSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center ${
            imagePosition === 'left' ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            } ${imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            } ${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}
            style={{ transitionDelay: `${delay + 200}ms` }}
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 leading-tight">
              {title}
            </h3>
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
