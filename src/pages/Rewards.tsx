import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star, ChevronRight, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Rewards() {
  const rewards = [
    { id: 1, title: 'GT Basketball Hoodie', points: 1500, category: 'Merch', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80', status: 'locked' },
    { id: 2, title: 'Free Concessions Voucher', points: 300, category: 'Food', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80', status: 'available' },
    { id: 3, title: 'Courtside Upgrade', points: 2500, category: 'Experience', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=200&q=80', status: 'locked' },
    { id: 4, title: 'Player Meet & Greet', points: 5000, category: 'Exclusive', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=200&q=80', status: 'locked' },
  ];

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/home" className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <ChevronLeft className="w-5 h-5 text-gt-navy" />
        </Link>
        <div className="flex-1 text-center pr-9">
          <h1 className="text-2xl font-black text-gt-navy">Buzz Store</h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Redeem Points</p>
        </div>
      </div>

      {/* Points Card */}
      <div className="bg-gt-navy rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gt-gold/20 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-gt-gold text-xs font-bold uppercase tracking-wider mb-1">Available Balance</p>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-gt-gold fill-current" />
              <span className="text-4xl font-black">1,240</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-[10px] uppercase font-bold">Lifetime Points</p>
            <p className="text-lg font-bold">4,850</p>
          </div>
        </div>
      </div>


      {/* Rewards List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gt-navy">Available for You</h2>
        <div className="grid grid-cols-1 gap-4">
          {rewards.map((reward) => (
            <motion.div
              whileTap={{ scale: 0.98 }}
              key={reward.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex"
            >
              <div className="w-24 h-24 relative">
                <img src={reward.image} alt={reward.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {reward.status === 'locked' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-bold text-gt-gold uppercase bg-gt-gold/10 px-1.5 py-0.5 rounded">
                      {reward.category}
                    </span>
                    {reward.status === 'available' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gt-navy mt-1">{reward.title}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-gt-gold fill-current" />
                    <span className="text-xs font-black text-gt-navy">{reward.points} buzzpoints</span>
                  </div>
                  <button className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold transition-all",
                    reward.status === 'available' 
                      ? "bg-gt-navy text-white" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}>
                    {reward.status === 'available' ? 'Redeem' : 'Locked'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
