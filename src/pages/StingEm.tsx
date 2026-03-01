import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Timer, CheckCircle2, Trophy } from 'lucide-react';
import { BuzzBee } from '../components/Icons';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import gtLogo from '@buzz_source_img/gt.png';
import dukeLogo from '@buzz_source_img/duke.png';
import kowacieImage from '@buzz_source_img/kowacie.jpeg';
import kamCraftImage from '@buzz_source_img/kamkraft.jpeg';
import akaiImage from '@buzz_source_img/akai.jpeg';

export default function StingEm() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const players = [
    { id: 1, name: 'Kowacie Reeves Jr.', image: kowacieImage },
    { id: 2, name: 'Kam Craft', image: kamCraftImage },
    { id: 3, name: 'Akai Fleming', image: akaiImage },
  ];

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/home" className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <ChevronLeft className="w-5 h-5 text-gt-navy" />
          </Link>
          <h1 className="text-xl font-bold text-gt-navy">Live Sting'Em</h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-gt-gold/20 text-gt-gold rounded-full">
          <div className="w-2 h-2 bg-gt-gold rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase">Live</span>
        </div>
      </div>

      {/* Game Status */}
      <div className="bg-gt-navy rounded-3xl p-5 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5">
            <img src={gtLogo} alt="GT" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-gt-gold">2nd Quarter</p>
            <p className="text-lg font-black">GT 42 - 38 DUKE</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <Timer className="w-4 h-4 text-gt-gold ml-auto mb-1" />
            <p className="text-xs font-bold">08:42</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5">
            <img src={dukeLogo} alt="Duke" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* Prediction Card */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div 
            key="prediction"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gt-gold">
                <BuzzBee className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">Quick Pick • +50 Pts</span>
              </div>
              <h2 className="text-xl font-black text-gt-navy">Who will score the next 3-pointer for the Jackets?</h2>
            </div>

            <div className="space-y-3">
              {players.map((player) => (
                <button
                  key={player.id}
                  onClick={() => setSelectedOption(player.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4",
                    selectedOption === player.id 
                      ? "border-gt-gold bg-gt-gold/5" 
                      : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-gt-navy/5 overflow-hidden border border-gray-100">
                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                  </div>
                  <span className={cn(
                    "font-bold text-sm",
                    selectedOption === player.id ? "text-gt-navy" : "text-gray-500"
                  )}>
                    {player.name}
                  </span>
                  {selectedOption === player.id && (
                    <CheckCircle2 className="w-5 h-5 text-gt-gold ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <button 
              disabled={!selectedOption}
              onClick={() => setSubmitted(true)}
              className="w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
            >
              LOCK IN PREDICTION
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gt-gold rounded-3xl p-8 text-center space-y-4"
          >
            <div className="w-20 h-20 bg-gt-navy rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Trophy className="w-10 h-10 text-gt-gold" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gt-navy">Prediction Locked!</h2>
              <p className="text-gt-navy/70 text-sm font-medium">You'll earn 50 buzzpoints if you're right.</p>
            </div>
            <button 
              onClick={() => { setSubmitted(false); setSelectedOption(null); }}
              className="px-6 py-2 bg-gt-navy text-white text-xs font-bold rounded-full"
            >
              Make Another Prediction
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard Teaser */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gt-navy">Live Sting'Em Rank</h3>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gt-gold rounded-full flex items-center justify-center text-gt-navy font-black text-xs">
              #42
            </div>
            <span className="text-sm font-bold text-gt-navy">You</span>
          </div>
          <span className="text-sm font-black text-gt-navy">150 Pts</span>
        </div>
      </div>

      {/* Store Link */}
      <Link 
        to="/rewards"
        className="block w-full py-4 bg-white border-2 border-dashed border-gt-gold/30 rounded-3xl text-center group active:scale-95 transition-all"
      >
        <p className="text-[10px] font-black text-gt-gold uppercase tracking-widest mb-1">Redeem your buzzpoints</p>
        <p className="text-sm font-bold text-gt-navy group-hover:text-gt-gold transition-colors">View Buzz Store Prizes</p>
      </Link>
    </div>
  );
}
