import { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  
  // Her birthday date - update this to the actual date
  const birthdayDate = new Date('2024-12-25'); // Update this date!
  const today = new Date();
  const timeDiff = birthdayDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  useEffect(() => {
    // Generate floating hearts
    const heartArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-peach-50 to-lavender-50 relative overflow-hidden">
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-300 opacity-20 pointer-events-none animate-float"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${Math.random() * 20 + 15}px`
          }}
        >
          <Heart className="fill-current" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
        
        {/* Header with sparkles */}
        <div className="mb-8 relative">
          <Sparkles className="absolute -top-4 -left-4 text-gold-400 w-6 h-6 animate-pulse-soft" />
          <Sparkles className="absolute -top-2 -right-6 text-gold-300 w-4 h-4 animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <h1 className="font-romantic text-4xl md:text-6xl text-rose-600 mb-2 animate-bounce-soft">
            Happy Almost Birthday!
          </h1>
          <p className="font-playful text-lg md:text-xl text-rose-500 opacity-80">
            To the most amazing person in the world ✨
          </p>
        </div>

        {/* Girlfriend's Photo Container */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-peach-400 rounded-full blur-lg opacity-30 animate-pulse-soft group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-500">
            {/* Placeholder - replace with actual photo */}
            <div className="w-full h-full bg-gradient-to-br from-rose-200 to-peach-200 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-rose-400 mx-auto mb-4 animate-heart-beat" />
                <p className="font-playful text-rose-600 text-sm px-4">
                  Replace this with her beautiful photo! 📸
                </p>
              </div>
            </div>
          </div>
          {/* Floating hearts around photo */}
          <Heart className="absolute -top-2 -right-2 text-rose-400 w-8 h-8 animate-heart-beat" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute -bottom-2 -left-2 text-peach-400 w-6 h-6 animate-heart-beat" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Heartfelt Message */}
        <div className="max-w-2xl mb-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-rose-200 shadow-lg">
          <h2 className="font-elegant text-2xl md:text-3xl text-rose-700 mb-4">
            My Dearest Love 💕
          </h2>
          <p className="font-playful text-base md:text-lg text-rose-600 leading-relaxed mb-4">
            Every day with you feels like a celebration, but your birthday is extra special! 
            I've created this little space just for you, filled with surprises that will unlock 
            each day until your special day arrives.
          </p>
          <p className="font-playful text-base md:text-lg text-rose-600 leading-relaxed">
            You bring so much joy, laughter, and love into my life. This countdown is my way 
            of showing you how excited I am to celebrate another year of your amazing existence! 🌟
          </p>
        </div>

        {/* Countdown Display */}
        <div className="mb-8 p-6 bg-gradient-to-r from-rose-100 to-peach-100 rounded-2xl border-2 border-rose-200 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-rose-500 mr-3" />
            <h3 className="font-romantic text-2xl md:text-3xl text-rose-600">
              Days Until Your Birthday
            </h3>
          </div>
          <div className="text-center">
            <div className="font-elegant text-5xl md:text-7xl text-rose-700 mb-2 animate-pulse-soft">
              {daysLeft > 0 ? daysLeft : 0}
            </div>
            <p className="font-playful text-rose-500 text-lg">
              {daysLeft > 0 ? 'Days to go!' : "It's your birthday! 🎉"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/countdown"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-playful font-medium text-white bg-gradient-to-r from-rose-500 to-peach-500 rounded-full hover:from-rose-600 hover:to-peach-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce-soft" />
            Open Daily Surprises
            <Sparkles className="w-4 h-4 ml-2 group-hover:animate-pulse-soft" />
          </Link>
          
          <button className="group inline-flex items-center justify-center px-8 py-4 font-playful font-medium text-rose-600 bg-white/70 backdrop-blur-sm border-2 border-rose-300 rounded-full hover:bg-white hover:border-rose-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Heart className="w-5 h-5 mr-2 group-hover:animate-heart-beat fill-current" />
            Send Love Message
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="font-romantic text-lg text-rose-500 opacity-80">
            Made with endless love and excitement for your special day 💝
          </p>
        </div>
      </div>
    </div>
  );
}
