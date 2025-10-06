import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  // CONFIGURATION: Replace this with your own audio file path
  // Place your audio file in the /public folder and reference it like: '/your-song.mp3'
  const AUDIO_FILE = '/birthday-song.mp3'; // Replace with your audio file
  const SONG_TITLE = 'Birthday Song'; // Replace with your song title

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-gray-200">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center hover:shadow-lg transition-all hover:scale-110 text-white"
          >
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
          </button>

          {/* Song Info */}
          <div className="hidden md:block">
            <div className="text-sm font-medium text-gray-800">{SONG_TITLE}</div>
            <div className="text-xs text-gray-500">Background Music</div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_FILE}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Instructions for replacing audio */}
      {/*
        TO REPLACE THE AUDIO FILE:
        1. Place your audio file (MP3, WAV, etc.) in the /public folder
        2. Update the AUDIO_FILE constant above with your file name
        3. Update the SONG_TITLE constant with your song's title

        Example:
        const AUDIO_FILE = '/my-birthday-song.mp3';
        const SONG_TITLE = 'Happy Birthday Song';
      */}
    </div>
  );
}
