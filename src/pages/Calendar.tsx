import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Filter, Info, Star, Users, Flame, Clock, MapPin, Loader2, CheckCircle2, X } from 'lucide-react';
import { BuzzBee } from '../components/Icons';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import dukeLogo from '@buzz_source_img/duke.png';
import clemsonLogo from '@buzz_source_img/clemson.png';
import fsuLogo from '@buzz_source_img/fsu.jpeg';
import gtLogo from '@buzz_source_img/gt.png';
import uncLogo from '@buzz_source_img/unc.png';

type FilterType = 'all' | 'men' | 'women';

export default function Calendar() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [confirmationStep, setConfirmationStep] = useState<'idle' | 'checking' | 'loc_confirmed' | 'att_confirmed'>('idle');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleStartConfirmation = () => {
    setConfirmationStep('checking');
    setTimeout(() => {
      setConfirmationStep('loc_confirmed');
      setTimeout(() => {
        setConfirmationStep('att_confirmed');
      }, 1500);
    }, 2000);
  };
  
  const games = [
    { day: 4, type: 'men', opponent: 'Duke', multiplier: '2.0×', time: '7:00 PM', bonus: 'Rivalry Night', logo: dukeLogo },
    { day: 7, type: 'women', opponent: 'UNC', multiplier: '1.5×', time: '6:30 PM', bonus: "Women's Game Boost", logo: uncLogo },
    { day: 12, type: 'men', opponent: 'Clemson', multiplier: '1.2×', time: '8:00 PM', bonus: 'Streak Saver', logo: clemsonLogo },
    { day: 15, type: 'women', opponent: 'FSU', multiplier: '1.5×', time: '7:00 PM', bonus: "Women's Game Boost", logo: fsuLogo },
  ];

  const getGameForDay = (day: number) => {
    const game = games.find(g => g.day === day);
    if (!game) return null;
    if (activeFilter === 'all') return game;
    if (activeFilter === 'men' && game.type === 'men') return game;
    if (activeFilter === 'women' && game.type === 'women') return game;
    return null;
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/home" className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <ChevronLeft className="w-5 h-5 text-gt-navy" />
          </Link>
          <h1 className="text-xl font-bold text-gt-navy">Game Calendar</h1>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <Filter className="w-5 h-5 text-gt-navy" />
        </button>
      </div>

      {/* Toggle Tabs - Video Style */}
      <div className="bg-gray-100 p-1 rounded-2xl flex">
        {['all', 'men', 'women'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab as FilterType)}
            className={cn(
              "flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
              activeFilter === tab ? "bg-white text-gt-navy shadow-sm" : "text-gray-400"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['Highest Multipliers', 'Streak Saver', 'This Week'].map((chip) => (
          <button key={chip} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-wider text-gray-500 whitespace-nowrap">
            {chip}
          </button>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-black text-gt-navy">March 2026</h2>
          <div className="flex gap-2">
            <button className="p-1 text-gray-400"><ChevronLeft className="w-5 h-5" /></button>
            <button className="p-1 text-gray-400"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={`${d}-${i}`} className="text-center text-[10px] font-black text-gray-300 mb-2">{d}</div>
          ))}
          {days.map(day => {
            const game = getGameForDay(day);
            return (
              <button
                key={day}
                onClick={() => game && setSelectedGame(game)}
                className={cn(
                  "aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all",
                  game ? "bg-gt-navy text-white shadow-lg scale-105" : "text-gt-navy hover:bg-gray-50"
                )}
              >
                <span className="text-sm font-bold">{day}</span>
                {game && (
                  <>
                    <div className={cn(
                      "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white shadow-sm",
                      game.type === 'men' ? "bg-blue-500" : "bg-pink-500"
                    )}>
                      {game.type === 'men' ? 'M' : 'W'}
                    </div>
                    <div className="absolute -bottom-1 bg-gt-navy text-gt-gold text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm border border-gt-gold/20">
                      {game.multiplier}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" /> Men's Game
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full" /> Women's Game
        </div>
      </div>

      {/* Game Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedGame && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[70] max-w-md mx-auto shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header row: title placeholder + close button */}
              <div className="shrink-0 flex items-center justify-end px-6 pt-5 pb-2">
                <button
                  onClick={() => setSelectedGame(null)}
                  aria-label="Close game details"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 pb-8">
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        selectedGame.type === 'men' ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                      )}>
                        {selectedGame.type === 'men' ? "Men's Basketball" : "Women's Basketball"}
                      </span>
                      <span className="px-3 py-1 bg-gt-gold/10 text-gt-gold rounded-full text-[10px] font-black uppercase tracking-wider">
                        {selectedGame.bonus}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-gt-navy">GT vs {selectedGame.opponent}</h3>
                    <p className="text-gray-500 font-bold text-sm">Mar {selectedGame.day} • {selectedGame.time} • McCamish Pavilion</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100">
                    <img src={selectedGame.logo || gtLogo} alt="Opponent" className="w-10 h-10 object-contain" />
                  </div>
                </div>

                {/* Points Calculation Widget */}
                <div className="bg-gt-navy rounded-3xl p-5 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gt-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-white/60 uppercase tracking-widest">
                      <span>Buzzpoints Gained</span>
                      <Star className="w-4 h-4 text-gt-gold fill-current" />
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-gt-gold">42</span>
                      <span className="text-lg font-bold mb-0.5">BUZZPOINTS</span>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-bold uppercase tracking-wider">
                      <div className="space-y-1">
                        <p className="text-white/40">Base</p>
                        <p>20 buzzpoints</p>
                      </div>
                      <div className="space-y-1 border-x border-white/10 px-2">
                        <p className="text-white/40">Streak</p>
                        <p>1.4×</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/40">Game</p>
                        <p className={cn(selectedGame.multiplier === '2.0×' ? "text-gt-gold" : "text-pink-400")}>
                          {selectedGame.multiplier}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Streak Impact */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-2xl border border-green-100 flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 shrink-0">
                      <Flame className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-green-600 uppercase">Attend</p>
                      <p className="text-sm font-bold text-gt-navy">Streak → 5</p>
                    </div>
                  </div>
                  <div className="bg-gt-metallic/5 p-3 rounded-2xl border border-gt-metallic/10 flex items-center gap-3">
                    <div className="w-9 h-9 bg-gt-metallic rounded-xl flex items-center justify-center shadow-lg shadow-gt-metallic/20 shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gt-metallic uppercase">Miss</p>
                      <p className="text-sm font-bold text-gt-navy">Ends in 2d</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartConfirmation}
                  className="w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-xl flex items-center justify-center text-center px-6 active:scale-95 transition-all uppercase tracking-widest leading-tight"
                >
                  Confirm Attendance & Join Hangout
                </button>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Multi-step Confirmation Overlay */}
      <AnimatePresence>
        {confirmationStep !== 'idle' && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gt-navy/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-[40px] p-10 w-full max-w-xs text-center space-y-8 shadow-2xl relative overflow-hidden"
              >
                {/* Progress Ring Background */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ 
                      width: confirmationStep === 'checking' ? '33%' : 
                             confirmationStep === 'loc_confirmed' ? '66%' : '100%' 
                    }}
                    className="h-full bg-gt-gold"
                  />
                </div>

                <div className="relative w-24 h-24 mx-auto">
                  <AnimatePresence mode="wait">
                    {confirmationStep === 'checking' && (
                      <motion.div 
                        key="checking"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="relative w-full h-full">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-gt-gold/20 border-t-gt-gold rounded-full"
                          />
                          <MapPin className="absolute inset-0 m-auto w-10 h-10 text-gt-gold animate-bounce" />
                        </div>
                      </motion.div>
                    )}
                    {(confirmationStep === 'loc_confirmed' || confirmationStep === 'att_confirmed') && (
                      <motion.div 
                        key="confirmed"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-gt-navy">
                    {confirmationStep === 'checking' && "Checking Location"}
                    {confirmationStep === 'loc_confirmed' && "Location Confirmed"}
                    {confirmationStep === 'att_confirmed' && "Attendance Confirmed"}
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    {confirmationStep === 'checking' && "Verifying your proximity to McCamish Pavilion..."}
                    {confirmationStep === 'loc_confirmed' && "You're in the right spot! Securing your buzzpoints..."}
                    {confirmationStep === 'att_confirmed' && "You're all set! See you at the game."}
                  </p>
                </div>

                {confirmationStep === 'att_confirmed' && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="pt-4"
                  >
                    <Link 
                      to="/rsvp-manager"
                      onClick={() => setConfirmationStep('idle')}
                      className="block w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs"
                    >
                      Go to Hangout
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
