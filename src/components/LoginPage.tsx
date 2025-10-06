import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // CONFIGURATION: Change login credentials here
  const CORRECT_NAME = 'Friend'; // Change this to your friend's name
  const CORRECT_PASSWORD = 'Birthday2025'; // Change this to your desired password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.toLowerCase() === CORRECT_NAME.toLowerCase() && password === CORRECT_PASSWORD) {
      setIsAnimating(true);
      setTimeout(() => {
        onLogin();
      }, 1000);
    } else {
      alert('Incorrect name or password. Try again!');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-blue-50 transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center px-6">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-amber-400 animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-amber-300 opacity-50 animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-light mb-4 text-gray-800 tracking-wide">
          Something Special
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 font-light">
          awaits you...
        </p>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-center text-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all placeholder-gray-400"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-center text-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Enter
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-400 font-light">
          A countdown to remember
        </p>
      </div>
    </div>
  );
}
