import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  ChevronRight, 
  Flame, 
  Calendar, 
  Target, 
  Award,
  Users,
  Share2,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Profile() {
  const stats = [
    { label: 'Attended', value: '12', icon: Calendar, color: 'text-gt-navy', bg: 'bg-gray-50' },
    { label: 'Streak', value: '5', icon: Flame, color: 'text-gt-gold', bg: 'bg-gt-gold/10' },
    { label: 'Accuracy', value: '72%', icon: Target, color: 'text-gt-navy', bg: 'bg-gray-50' },
    { label: 'Points', value: '340', icon: Award, color: 'text-gt-gold', bg: 'bg-gt-gold/10' },
  ];

  const menuItems = [
    { label: 'RSVP Manager', description: 'Track org attendance & earn buzzpoints', icon: Users, path: '/rsvp-manager', color: 'text-gt-navy' },
    { label: 'Referral System', description: 'Invite friends & earn group buzzpoints', icon: Share2, path: '/referral', color: 'text-gt-navy' },
    { label: 'Settings', description: 'Notifications & Privacy', icon: Settings, path: '#', color: 'text-gt-navy' },
  ];

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gt-navy p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-white overflow-hidden border-2 border-white">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jack" alt="Profile" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-gt-navy">Jack Thompson</h1>
            <p className="text-sm text-gray-400 font-bold">Senior • Engineering</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="px-3 py-1 bg-gt-gold text-gt-navy text-[10px] font-black rounded-full uppercase tracking-wider">
                Gold Buzzer Member
              </span>
            </div>
          </div>
        </div>
        <button className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 active:scale-90 transition-all">
          <Settings className="w-5 h-5 text-gt-navy" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-xl font-black text-gt-navy leading-none">{stat.value}</p>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Sections */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gt-navy">Management</h2>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-xl bg-gray-50 group-hover:bg-white transition-colors", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gt-navy">{item.label}</h4>
                  <p className="text-[10px] text-gray-400">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gt-navy transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="w-full py-4 flex items-center justify-center gap-2 text-red-500 text-sm font-bold">
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      {/* Version */}
      <div className="flex flex-col items-center gap-2">
        <img src="/input_file_3.png" alt="GT Logo" className="w-6 h-6 object-contain opacity-30" />
        <p className="text-center text-[10px] text-gray-300">BuzzGT v2.4.0 • Georgia Tech Athletics</p>
      </div>
    </div>
  );
}
