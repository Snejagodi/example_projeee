import { useEffect, useState } from 'react';

interface FallingStarTransitionProps {
  scrollProgress: number;
}

export default function FallingStarTransition({ scrollProgress }: FallingStarTransitionProps) {
  const [starPosition, setStarPosition] = useState({ x: -100, y: -100 });
  const [moonVisible, setMoonVisible] = useState(false);

  useEffect(() => {
    // Star appears and falls when scroll progress is between 0.1 and 0.4
    if (scrollProgress > 0.1 && scrollProgress < 0.4) {
      const progress = (scrollProgress - 0.1) / 0.3;
      setStarPosition({
        x: 80 - progress * 100, // Start from top right, move to center-left
        y: progress * 120,
      });
    }

    // Moon appears when scroll reaches 0.35
    if (scrollProgress > 0.35) {
      setMoonVisible(true);
    }
  }, [scrollProgress]);

  return (
    <>
      {/* Falling Star/Meteor */}
      {scrollProgress > 0.1 && scrollProgress < 0.4 && (
        <div
          className="fixed pointer-events-none z-40 transition-opacity duration-500"
          style={{
            top: `${starPosition.y}vh`,
            right: `${starPosition.x}vw`,
            opacity: scrollProgress > 0.1 && scrollProgress < 0.35 ? 1 : 0,
          }}
        >
          {/* Star with tail */}
          <div className="relative">
            {/* Star tail */}
            <div className="absolute w-32 h-1 bg-gradient-to-r from-transparent via-yellow-200 to-yellow-400 blur-sm transform rotate-45 -translate-x-full"></div>
            <div className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-amber-500 transform rotate-45 -translate-x-full"></div>

            {/* Star core */}
            <div className="relative">
              <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-yellow-200 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      )}

      {/* Moon */}
      {moonVisible && (
        <div
          className="fixed top-20 right-20 pointer-events-none z-30 transition-all duration-1000"
          style={{
            opacity: scrollProgress > 0.35 ? 1 : 0,
            transform: `scale(${scrollProgress > 0.35 ? 1 : 0.5})`,
          }}
        >
          {/* Moon glow */}
          <div className="absolute inset-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>

          {/* Moon surface */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-2xl">
            {/* Moon craters */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-gray-400 rounded-full opacity-30"></div>
            <div className="absolute top-16 left-16 w-6 h-6 bg-gray-400 rounded-full opacity-20"></div>
            <div className="absolute top-12 right-8 w-3 h-3 bg-gray-400 rounded-full opacity-25"></div>
          </div>
        </div>
      )}
    </>
  );
}
