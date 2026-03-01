import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Flame, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import appLogo from '@buzz_source_img/IMG_8922.png';

export default function StreakSplash() {
  const [streak, setStreak] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setStreak(4);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const days = ['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We'];
  
  return (
    <div className="min-h-screen bg-white text-gt-navy flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center w-full space-y-8">
        {/* App logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 mb-2"
        >
          <img src={appLogo} alt="Swamz x GT Logo" className="w-full h-full object-contain" />
        </motion.div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gt-metallic">swarmz x gt</p>

        {/* Animated Flame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={isAnimating ? { 
            scale: [1, 1.2, 1],
            filter: ["grayscale(100%)", "grayscale(0%)"],
            opacity: 1
          } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <Flame 
            className={cn(
              "w-32 h-32 transition-colors duration-500",
              isAnimating ? "text-gt-gold fill-gt-gold" : "text-gray-300 fill-gray-300"
            )} 
          />
          {isAnimating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 150,
                    y: (Math.random() - 0.5) * 150
                  }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="absolute w-2 h-2 bg-gt-gold rounded-full"
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Streak Number */}
        <div className="text-center">
          <motion.h1 
            key={streak}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl font-black tracking-tighter text-gt-navy"
          >
            {streak}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-gray-400 uppercase tracking-widest"
          >
            game streak
          </motion.p>
        </div>

        {/* Weekly Calendar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-xs space-y-4"
        >
          <div className="flex justify-between px-2">
            {days.map((day, i) => (
              <div key={day} className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-gray-400">{day}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  i === 3 && isAnimating ? "bg-gt-gold border-gt-gold" : 
                  i < 3 ? "bg-gt-gold border-gt-gold" : "border-gray-100 bg-gray-50"
                )}>
                  {(i < 3 || (i === 3 && isAnimating)) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "42%" }}
              animate={isAnimating ? { width: "57%" } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="absolute top-0 left-0 h-full bg-gt-gold rounded-full"
            />
          </div>
          <p className="text-center text-sm font-bold text-gt-gold">
            Way to earn your Perfect Streak!
          </p>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="w-full max-w-md space-y-4"
      >
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Current Multiplier</p>
            <p className="text-xl font-black text-gt-gold">1.4×</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Next Milestone</p>
            <p className="text-sm font-bold text-gt-navy">5 Games (1.6×)</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-[0_4px_0_0_#001a30] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider"
        >
          Find my next game
        </button>
        
        <button 
          onClick={() => navigate('/streak-explanation')}
          className="w-full py-2 text-gray-400 font-bold text-sm uppercase tracking-widest"
        >
          How streaks work
        </button>
      </motion.div>
    </div>
  );
}
