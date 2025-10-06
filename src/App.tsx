import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import CountdownTimer from './components/CountdownTimer';
import FallingStarTransition from './components/FallingStarTransition';
import ScrollRevealSection from './components/ScrollRevealSection';
import ImageGrid from './components/ImageGrid';
import LyricsBox from './components/LyricsBox';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBackgroundColor = () => {
    if (scrollProgress < 0.15) {
      return 'from-white via-gray-50 to-gray-100';
    } else if (scrollProgress < 0.4) {
      const transitionProgress = (scrollProgress - 0.15) / 0.25;
      if (transitionProgress < 0.33) {
        return 'from-gray-100 via-orange-50 to-amber-100';
      } else if (transitionProgress < 0.66) {
        return 'from-amber-100 via-blue-100 to-slate-200';
      } else {
        return 'from-slate-200 via-slate-400 to-slate-600';
      }
    } else {
      return 'from-slate-800 via-slate-900 to-black';
    }
  };

  const getTextColor = () => {
    return scrollProgress > 0.4 ? 'text-white' : 'text-gray-900';
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="relative min-h-screen">
      <div
        className={`fixed inset-0 bg-gradient-to-b ${getBackgroundColor()} transition-all duration-1000 -z-10`}
      />

      <FallingStarTransition scrollProgress={scrollProgress} />

      <MusicPlayer />

      <div className={`relative z-10 transition-colors duration-1000 ${getTextColor()}`}>
        <CountdownTimer />

        <div className="h-32 md:h-48"></div>

        {/* CONFIGURATION: Replace these sections with your own content */}
        <ScrollRevealSection
          title="Attention and affection"
          description="Every moment with you has been a gift. Your friendship has brought so much light and joy into my life. Here's to celebrating another year of beautiful memories and countless adventures yet to come."
          imageSrc="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1200"
          imageAlt="Friendship moment"
          imagePosition="right"
        />

        <div className="h-32 md:h-48"></div>

        <ScrollRevealSection
          title="Growing together"
          description="Through all the ups and downs, laughter and tears, you've been there. Your strength inspires me, your kindness moves me, and your friendship completes me. Happy birthday to someone truly special."
          imageSrc="https://images.pexels.com/photos/1649817/pexels-photo-1649817.jpeg?auto=compress&cs=tinysrgb&w=1200"
          imageAlt="Special memories"
          imagePosition="left"
        />

        <div className="h-32 md:h-48"></div>

        <ImageGrid />

        <LyricsBox />

        <footer className="py-24 px-6 text-center">
          <p className="text-lg md:text-xl font-extralight leading-relaxed max-w-2xl mx-auto mb-8">
            Made with love for a special birthday
          </p>
          <p className="text-sm font-light opacity-60">
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
