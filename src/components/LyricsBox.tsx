import { useEffect, useState } from 'react';

export default function LyricsBox() {
  // CONFIGURATION: Replace these lyrics with your own song lyrics
  // Each line will animate in sequence
  const lyrics = [
    "Happy birthday to you,",
    "You light up every room,",
    "Another year of memories,",
    "And dreams that will come true.",
    "",
    "Here's to laughter and joy,",
    "To friendship that won't end,",
    "May this year bring you happiness,",
    "My wonderful friend.",
  ];

  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate lyrics lines one by one
            lyrics.forEach((_, index) => {
              setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
              }, index * 400); // 400ms delay between each line
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('lyrics-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="lyrics-section"
      className="py-32 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl border border-white/10">
          <div className="text-center space-y-4">
            {lyrics.map((line, index) => (
              <div
                key={index}
                className={`text-2xl md:text-3xl font-light text-white transition-all duration-700 ${
                  visibleLines.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}
          </div>

          {/* Musical notes decoration */}
          <div className="flex justify-center gap-6 mt-12 text-4xl opacity-30">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>♪</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>♫</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>♪</span>
          </div>
        </div>
      </div>
    </section>
  );
}
