import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, User, TrendingUp, TrendingDown, Minus, Info, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';

type LeaderboardType = 'org' | 'solo';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('org');

  const handleConfetti = (color: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [color, '#B3A369', '#003057']
    });
  };

  const orgData = [
    { id: 1, name: 'Alpha Tau Omega', type: 'Fraternity', points: 2450, members: '48/52', trend: 'up' },
    { id: 2, name: 'West Village RAs', type: 'RA', points: 2120, members: '12/15', trend: 'down' },
    { id: 3, name: 'SGA', type: 'Club', points: 1980, members: '35/40', trend: 'up' },
    { id: 4, name: 'Coca-Cola Campus', type: 'Brand', points: 1850, members: '8/10', trend: 'stable' },
    { id: 5, name: 'Engineering Council', type: 'Club', points: 1720, members: '22/25', trend: 'up' },
  ];

  const soloData = [
    { id: 1, name: 'Alex Thompson', year: 'Senior', points: 840, games: 12, streak: 8, trend: 'up' },
    { id: 2, name: 'Sarah Miller', year: 'Junior', points: 790, games: 11, streak: 5, trend: 'up' },
    { id: 3, name: 'Jordan Lee', year: 'Sophomore', points: 750, games: 12, streak: 12, trend: 'down' },
    { id: 4, name: 'Chris Evans', year: 'Freshman', points: 680, games: 10, streak: 4, trend: 'stable' },
    { id: 5, name: 'Taylor Swift', year: 'Senior', points: 620, games: 9, streak: 3, trend: 'up' },
  ];

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-gt-navy">Rankings</h1>
        <p className="text-gray-500 text-sm">Compete for the top spot!</p>
      </div>

      {/* Toggle Switch */}
      <div className="bg-gray-100 p-1 rounded-xl flex">
        <button
          onClick={() => setActiveTab('org')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all",
            activeTab === 'org' ? "bg-gt-navy text-white shadow-md" : "text-gray-500"
          )}
        >
          <Users className="w-4 h-4" />
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('solo')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all",
            activeTab === 'solo' ? "bg-gt-navy text-white shadow-md" : "text-gray-500"
          )}
        >
          <User className="w-4 h-4" />
          Solo
        </button>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-2 pt-8 pb-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div 
            onClick={() => handleConfetti('#C0C0C0')}
            className="w-16 h-16 rounded-full bg-gray-200 border-4 border-white shadow-lg mb-2 overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-black text-gray-500">
                {getInitials(activeTab === 'org' ? orgData[1].name : soloData[1].name)}
              </span>
            </div>
          </div>
          <div className="w-20 h-24 bg-gray-300 rounded-t-xl flex flex-col items-center justify-center text-white relative">
            <span className="text-2xl font-black">2</span>
            <div className="absolute -bottom-6 text-[10px] font-bold text-gt-navy text-center w-24 truncate">
              {activeTab === 'org' ? orgData[1].name : soloData[1].name}
            </div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce">
              <Trophy className="w-8 h-8 fill-current" />
            </div>
            <div 
              onClick={() => handleConfetti('#FFD700')}
              className="w-20 h-20 rounded-full bg-gt-gold border-4 border-white shadow-xl mb-2 overflow-hidden cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-base font-black text-gray-500">
                  {getInitials(activeTab === 'org' ? orgData[0].name : soloData[0].name)}
                </span>
              </div>
            </div>
          </div>
          <div className="w-24 h-32 bg-gt-navy rounded-t-xl flex flex-col items-center justify-center text-white relative">
            <span className="text-4xl font-black text-gt-gold">1</span>
            <div className="absolute -bottom-6 text-[10px] font-bold text-gt-navy text-center w-28 truncate">
              {activeTab === 'org' ? orgData[0].name : soloData[0].name}
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div 
            onClick={() => handleConfetti('#CD7F32')}
            className="w-16 h-16 rounded-full bg-gt-metallic/10 border-4 border-white shadow-lg mb-2 overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-black text-gray-500">
                {getInitials(activeTab === 'org' ? orgData[2].name : soloData[2].name)}
              </span>
            </div>
          </div>
          <div className="w-20 h-20 bg-gt-metallic/20 rounded-t-xl flex flex-col items-center justify-center text-white relative">
            <span className="text-2xl font-black">3</span>
            <div className="absolute -bottom-6 text-[10px] font-bold text-gt-navy text-center w-24 truncate">
              {activeTab === 'org' ? orgData[2].name : soloData[2].name}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3 pt-4">
        {(activeTab === 'org' ? orgData : soloData).map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-gray-400 w-4">{index + 1}</span>
              <div className="w-10 h-10 rounded-full bg-gt-navy/5 flex items-center justify-center overflow-hidden">
                <span className="text-xs font-black text-gray-500">{getInitials(item.name)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-gt-navy">{item.name}</h4>
                  {'type' in item && (
                    <span className={cn(
                      "text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase",
                      item.type === 'Fraternity' ? "bg-blue-100 text-blue-600" :
                      item.type === 'RA' ? "bg-gt-gold/20 text-gt-gold" :
                      item.type === 'Club' ? "bg-gray-100 text-gray-600" :
                      "bg-green-100 text-green-600"
                    )}>
                      {item.type}
                    </span>
                  )}
                  {'year' in item && (
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-gt-navy/5 text-gt-navy font-bold uppercase">
                      {item.year}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400">
                  {'members' in item ? `${item.members} members attended` : `${item.games} games • ${item.streak} streak`}
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <p className="text-sm font-black text-gt-navy">{item.points.toLocaleString()} Buzzpoints</p>
                <p className="text-[8px] text-gray-400 uppercase font-bold tracking-wider">Buzzpoints</p>
              </div>
              {item.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : 
               item.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-500" /> : 
               <Minus className="w-4 h-4 text-gray-300" />}
            </div>
          </motion.div>
        ))}
      </div>

      {activeTab === 'org' && (
        <div className="bg-gt-navy/5 p-4 rounded-2xl flex items-start gap-3">
          <Info className="w-5 h-5 text-gt-navy mt-0.5" />
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Organization Buzzpoints are calculated based on total member attendance, Sting'Em accuracy, and group streaks. Top organizations earn exclusive group seating!
          </p>
        </div>
      )}
    </div>
  );
}
