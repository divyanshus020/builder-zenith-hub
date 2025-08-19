import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Calendar, Lock, Unlock, Star, Sparkles, Gift } from 'lucide-react';

interface DailyMessage {
  day: number;
  message: string;
  image: string;
  unlocked: boolean;
  specialNote?: string;
}

export default function Countdown() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState<DailyMessage | null>(null);
  
  // Her birthday date - should match the one in Index.tsx
  const birthdayDate = new Date('2024-12-25'); // Update this date!
  const today = new Date();
  const startDate = new Date(birthdayDate);
  startDate.setDate(startDate.getDate() - 30); // 30 days countdown
  
  const daysPassed = Math.max(0, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));
  const totalDays = 30;

  // Sample daily messages - customize these!
  const dailyMessages: DailyMessage[] = [
    {
      day: 1,
      message: "Good morning, beautiful! Today marks the beginning of our countdown to your special day. I can't wait to celebrate you! 🌅",
      image: "/placeholder.svg",
      unlocked: daysPassed >= 0,
      specialNote: "The start of something magical ✨"
    },
    {
      day: 2,
      message: "Remember our first date? You wore that gorgeous smile that made my heart skip a beat. Still does every day! 💕",
      image: "/placeholder.svg",
      unlocked: daysPassed >= 1
    },
    {
      day: 3,
      message: "You have this amazing way of making ordinary moments feel extraordinary. Thank you for being you! 🌟",
      image: "/placeholder.svg",
      unlocked: daysPassed >= 2
    },
    {
      day: 4,
      message: "I love how you laugh at my silly jokes, even when they're not funny. Your laugh is my favorite sound! 😄",
      image: "/placeholder.svg",
      unlocked: daysPassed >= 3
    },
    {
      day: 5,
      message: "Every morning I wake up grateful that I get to love you and be loved by you. You're my sunshine! ☀️",
      image: "/placeholder.svg",
      unlocked: daysPassed >= 4
    },
    // Add more days...
    ...Array.from({ length: 25 }, (_, i) => ({
      day: i + 6,
      message: `Day ${i + 6}: Another reason I love you... You make every day brighter just by being in it! 💖`,
      image: "/placeholder.svg",
      unlocked: daysPassed >= (i + 5),
      specialNote: i === 19 ? "We're getting so close! 🎉" : undefined
    }))
  ];

  useEffect(() => {
    setCurrentDay(Math.min(daysPassed + 1, totalDays));
  }, [daysPassed]);

  const handleDayClick = (day: DailyMessage) => {
    if (day.unlocked) {
      setSelectedDay(day);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-rose-50 to-peach-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 font-playful font-medium text-rose-600 bg-white/70 backdrop-blur-sm border border-rose-300 rounded-full hover:bg-white hover:border-rose-400 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="font-romantic text-3xl md:text-4xl text-rose-600 mb-2">
              Daily Love Notes 💌
            </h1>
            <p className="font-playful text-rose-500">
              {totalDays - daysPassed} days until your birthday!
            </p>
          </div>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-rose-200">
          <div 
            className="bg-gradient-to-r from-rose-400 to-peach-400 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${(daysPassed / totalDays) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-soft"></div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 mb-8">
          {dailyMessages.map((day) => (
            <div
              key={day.day}
              onClick={() => handleDayClick(day)}
              className={`
                relative aspect-square p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
                ${day.unlocked 
                  ? 'bg-gradient-to-br from-rose-100 to-peach-100 border-rose-300 hover:from-rose-200 hover:to-peach-200 hover:border-rose-400 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                }
                ${selectedDay?.day === day.day ? 'ring-4 ring-rose-400 ring-opacity-50' : ''}
              `}
            >
              {/* Day Number */}
              <div className="absolute top-2 left-2">
                <span className={`font-playful font-bold text-sm ${day.unlocked ? 'text-rose-600' : 'text-gray-400'}`}>
                  {day.day}
                </span>
              </div>

              {/* Lock/Unlock Icon */}
              <div className="absolute top-2 right-2">
                {day.unlocked ? (
                  <Unlock className="w-4 h-4 text-rose-500" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>

              {/* Center Icon */}
              <div className="flex items-center justify-center h-full">
                {day.unlocked ? (
                  <div className="text-center">
                    {day.specialNote ? (
                      <Star className="w-8 h-8 text-gold-500 mx-auto animate-pulse-soft" />
                    ) : day.day === daysPassed + 1 ? (
                      <Gift className="w-8 h-8 text-rose-500 mx-auto animate-bounce-soft" />
                    ) : (
                      <Heart className="w-6 h-6 text-rose-400 mx-auto animate-heart-beat fill-current" />
                    )}
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                )}
              </div>

              {/* Special indicator */}
              {day.specialNote && day.unlocked && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-gold-400 animate-pulse-soft" />
                </div>
              )}

              {/* Current day indicator */}
              {day.day === daysPassed + 1 && day.unlocked && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse-soft"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Day Content */}
        {selectedDay && (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-rose-200 shadow-2xl animate-float">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-rose-500 mr-3" />
                <h3 className="font-romantic text-2xl md:text-3xl text-rose-600">
                  Day {selectedDay.day}
                </h3>
                {selectedDay.specialNote && (
                  <Star className="w-6 h-6 text-gold-500 ml-2 animate-pulse-soft" />
                )}
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-rose-400 hover:text-rose-600 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-rose-200 shadow-lg">
                  <img 
                    src={selectedDay.image} 
                    alt={`Day ${selectedDay.day}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedDay.specialNote && (
                  <div className="absolute -top-2 -right-2 bg-gold-400 text-white px-3 py-1 rounded-full text-sm font-playful font-medium shadow-lg animate-bounce-soft">
                    {selectedDay.specialNote}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-rose-50 to-peach-50 p-6 rounded-2xl border border-rose-200">
                  <p className="font-playful text-lg text-rose-700 leading-relaxed mb-4">
                    {selectedDay.message}
                  </p>
                  <div className="flex items-center text-rose-500">
                    <Heart className="w-4 h-4 mr-2 fill-current animate-heart-beat" />
                    <span className="font-playful text-sm">With all my love</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Day Selected Message */}
        {!selectedDay && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-rose-300 mx-auto mb-4 animate-heart-beat" />
            <h3 className="font-romantic text-2xl text-rose-500 mb-2">
              Select a day to read your special message! 💕
            </h3>
            <p className="font-playful text-rose-400">
              {daysPassed < totalDays 
                ? `${daysPassed + 1} messages are waiting for you...`
                : "All messages unlocked! Happy Birthday! 🎉"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
