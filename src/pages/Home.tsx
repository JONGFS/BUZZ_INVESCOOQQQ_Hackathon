import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ArrowRight, Bell, Zap, Users, Star, X, Clock, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import appLogo from '@buzz_source_img/IMG_8922.png';
import dukeLogo from '@buzz_source_img/duke.png';

export default function Home() {
  const [showNotifications, setShowNotifications] = useState(false);

  const [currentNotifIndex, setCurrentNotifIndex] = useState(0);

  const notifications = [
    { id: 1, title: "GT vs Duke", time: "Starts in 2h", type: "Rivalry", multiplier: "2.0×", icon: Zap },
    { id: 2, title: "Streak Alert!", time: "Expires in 2d", type: "Warning", multiplier: "1.4×", icon: Clock },
    { id: 3, title: "New Milestone", time: "1 game away", type: "Goal", multiplier: "1.6×", icon: Star },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotifIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={appLogo} alt="Swamz x GT Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-gt-navy">Go Jackets!</h1>
            <p className="text-gray-500 text-sm">Welcome back, Jack</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowNotifications(true)}
            className="p-2 bg-white rounded-full shadow-sm border border-gray-100 relative active:scale-95 transition-all"
          >
            <Bell className="w-5 h-5 text-gt-navy" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-gt-gold rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {/* Auto-cycling Notification Banner */}
      <div className="h-14 relative overflow-hidden bg-gt-gold/10 rounded-2xl border border-gt-gold/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNotifIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-between px-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gt-gold rounded-lg flex items-center justify-center">
                {React.createElement(notifications[currentNotifIndex].icon, { className: "w-4 h-4 text-white fill-current" })}
              </div>
              <div>
                <p className="text-xs font-black text-gt-navy leading-none">{notifications[currentNotifIndex].title}</p>
                <p className="text-[10px] text-gt-gold font-bold uppercase mt-0.5">{notifications[currentNotifIndex].time}</p>
              </div>
            </div>
            <div className="bg-gt-navy text-gt-gold text-[10px] font-black px-2 py-1 rounded-full">
              {notifications[currentNotifIndex].multiplier} BOOST
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Notification Pop-up */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-gt-navy/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-24 left-4 right-4 bg-white rounded-[32px] p-6 shadow-2xl z-[70] max-w-md mx-auto border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-gt-navy uppercase tracking-widest">Upcoming Action</h3>
                <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                        notif.type === 'Warning' ? "bg-gt-metallic/10 text-gt-metallic" : "bg-gt-gold/10 text-gt-gold"
                      )}>
                        {notif.type === 'Warning' ? <Clock className="w-5 h-5" /> : <Zap className="w-5 h-5 fill-current" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gt-navy">{notif.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{notif.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-gt-gold">{notif.multiplier}</p>
                      <p className="text-[8px] text-gray-400 font-bold uppercase">Boost</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowNotifications(false)}
                className="w-full mt-6 py-4 bg-gt-navy text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs"
              >
                Let's get it!
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Streak Hero - Video Scene 2 Style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gt-navy rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gt-gold/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-50" />
        
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gt-gold rounded-2xl flex items-center justify-center shadow-lg shadow-gt-gold/20">
              <Flame className="w-7 h-7 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">4 Games</h2>
              <p className="text-gt-gold text-xs font-bold uppercase tracking-widest">Current Streak</p>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-xs font-black text-gt-gold">1.4× MULTIPLIER</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-xs font-bold text-white/60">NEXT MILESTONE: 5 GAMES</p>
            <p className="text-xs font-bold text-gt-gold">75%</p>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              className="h-full bg-gt-gold shadow-[0_0_10px_rgba(179,163,105,0.5)]"
            />
          </div>
          <div className="flex items-center gap-2 bg-gt-metallic/20 text-gt-metallic px-3 py-2 rounded-xl border border-gt-metallic/20">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Streak expires in 2 days</span>
          </div>
        </div>
      </motion.div>

      {/* Next Best Game Recommendation */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-gt-navy uppercase tracking-widest">Recommended for you</h3>
        <Link to="/calendar" className="block bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
              <img src={dukeLogo} alt="Duke" className="w-full h-full object-contain p-2" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">Streak Saver</span>
                  <span className="text-xs font-black text-gt-gold">2.0×</span>
                </div>
                <h4 className="text-base font-bold text-gt-navy mt-1">GT vs Duke</h4>
                <p className="text-xs text-gray-400">Sat, Mar 4 • 7:00 PM</p>
              </div>
              <div className="flex items-center text-gt-gold text-[10px] font-bold gap-1">
                Keep your streak alive <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Multipliers this week */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-gt-navy uppercase tracking-widest">Multipliers this week</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {[
            { label: "Women's Game", mult: "1.5×", color: "bg-gt-gold/5 text-gt-gold border-gt-gold/20" },
            { label: "Rivalry Night", mult: "2.0×", color: "bg-gt-navy text-gt-gold border-gt-navy" },
            { label: "Early Bird", mult: "1.2×", color: "bg-gt-metallic/10 text-gt-metallic border-gt-metallic/20" },
          ].map((item) => (
            <div key={item.label} className={cn("flex-shrink-0 px-4 py-3 rounded-2xl flex flex-col items-center gap-1 min-w-[120px] border", item.color)}>
              <span className="text-lg font-black">{item.mult}</span>
              <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/rsvp-manager" className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-[10px] font-bold text-gt-navy uppercase tracking-widest">Hangout</span>
        </Link>
        <Link to="/rewards" className="p-4 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-gt-navy/5 rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-gt-navy" />
          </div>
          <span className="text-[10px] font-bold text-gt-navy uppercase tracking-widest">Buzz Store</span>
        </Link>
      </div>
    </div>
  );
}
