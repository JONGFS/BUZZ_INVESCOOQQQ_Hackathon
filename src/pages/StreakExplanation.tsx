import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Zap, Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StreakExplanation() {
  const navigate = useNavigate();

  const rules = [
    {
      icon: Flame,
      title: "Attend Games",
      description: "Check in at McCamish Pavilion or Bobby Dodd Stadium to keep your streak alive.",
      color: "text-gt-gold",
      bg: "bg-gt-gold/10"
    },
    {
      icon: Star,
      title: "Earn Multipliers",
      description: "The longer your streak, the higher your point multiplier. Reach 5 games for 1.6×!",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Trophy,
      title: "Unlock Rewards",
      description: "Top streak holders get exclusive access to student section floor seats and limited merch.",
      color: "text-gt-metallic",
      bg: "bg-gt-metallic/10"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gt-navy flex flex-col p-8">
      <div className="flex-1 flex flex-col justify-center space-y-12">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-gt-gold rounded-2xl flex items-center justify-center shadow-lg shadow-gt-gold/20"
          >
            <Flame className="w-10 h-10 text-white fill-white" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight">How Streaks Work</h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Your streak is your ticket to the best student experiences at Georgia Tech.
          </p>
        </div>

        <div className="space-y-8">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className={`flex-shrink-0 w-12 h-12 ${rule.bg} rounded-xl flex items-center justify-center`}>
                <rule.icon className={`w-6 h-6 ${rule.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">{rule.title}</h3>
                <p className="text-sm text-gray-400 leading-snug">{rule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate('/home')}
        className="w-full py-5 bg-gt-navy text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 transition-all"
      >
        Got it, let's go!
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
