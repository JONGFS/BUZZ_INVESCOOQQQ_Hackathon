import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Bell, 
  ChevronDown,
  Info,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function RSVPManager() {
  const [selectedOrg, setSelectedOrg] = useState('Alpha Tau Omega');
  const [reminded, setReminded] = useState(false);

  const orgs = [
    'Alpha Tau Omega',
    'SGA',
    'West Village RAs',
    'Coca-Cola Campus'
  ];

  const members = [
    { id: 1, name: 'Alex Thompson', email: 'athompson@gatech.edu', status: 'yes', lastReminder: '2h ago' },
    { id: 2, name: 'Sarah Miller', email: 'smiller@gatech.edu', status: 'pending', lastReminder: '1d ago' },
    { id: 3, name: 'Jordan Lee', email: 'jlee@gatech.edu', status: 'no', lastReminder: '3h ago' },
    { id: 4, name: 'Chris Evans', email: 'cevans@gatech.edu', status: 'pending', lastReminder: 'Never' },
    { id: 5, name: 'Taylor Swift', email: 'tswift@gatech.edu', status: 'yes', lastReminder: '5h ago' },
  ];

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
            <ChevronLeft className="w-5 h-5 text-gt-navy" />
          </Link>
          <h1 className="text-xl font-bold text-gt-navy">RSVP Manager</h1>
        </div>
        <div className="relative">
          <select 
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className="appearance-none bg-white border border-gray-100 rounded-full px-4 py-1.5 pr-8 text-[10px] font-bold text-gt-navy shadow-sm focus:outline-none"
          >
            {orgs.map(org => <option key={org} value={org}>{org}</option>)}
          </select>
          <ChevronDown className="w-3 h-3 text-gt-navy absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="bg-gt-navy rounded-3xl p-6 text-white space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gt-gold text-[10px] font-bold uppercase tracking-wider mb-1">Next Game Attendance</p>
            <h2 className="text-2xl font-black">GT vs Duke</h2>
          </div>
          <Link to="/leaderboard" className="flex items-center gap-1.5 bg-gt-gold/20 px-2 py-1 rounded-lg">
            <Trophy className="w-3 h-3 text-gt-gold" />
            <span className="text-[10px] font-bold text-gt-gold">#2 in rankings</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-black">42</p>
            <p className="text-[8px] text-white/60 uppercase font-bold">Attending</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-2xl font-black">10</p>
            <p className="text-[8px] text-white/60 uppercase font-bold">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black">84%</p>
            <p className="text-[8px] text-white/60 uppercase font-bold">Org Rate</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold">
            <span>Response Rate</span>
            <span>92%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              className="h-full bg-gt-gold"
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <p className="text-[10px] text-blue-700 leading-relaxed">
          Member RSVPs directly impact your organization's leaderboard buzzpoints. Ensure all members respond to maximize your score!
        </p>
      </div>

      {/* Quick Actions */}
      <button 
        onClick={() => setReminded(true)}
        className={cn(
          "w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95",
          reminded ? "bg-green-500 text-white" : "bg-gt-gold text-gt-navy shadow-lg shadow-gt-gold/20"
        )}
      >
        {reminded ? (
          <>
            <CheckCircle2 className="w-5 h-5" /> REMINDERS SENT
          </>
        ) : (
          <>
            <Bell className="w-5 h-5" /> SEND RSVP REMINDER
          </>
        )}
      </button>

      {/* Member List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-gt-navy">Member List</h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase">52 Total</span>
        </div>
        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gt-navy/5 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gt-navy">{member.name}</h4>
                  <p className="text-[10px] text-gray-400">{member.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "flex items-center gap-1.5 justify-end mb-1",
                  member.status === 'yes' ? "text-green-500" :
                  member.status === 'no' ? "text-red-500" :
                  "text-orange-500"
                )}>
                  {member.status === 'yes' ? <CheckCircle2 className="w-3 h-3" /> :
                   member.status === 'no' ? <XCircle className="w-3 h-3" /> :
                   <Clock className="w-3 h-3" />}
                  <span className="text-[10px] font-black uppercase">
                    {member.status === 'yes' ? 'Yes' : member.status === 'no' ? 'No' : 'Pending'}
                  </span>
                </div>
                <p className="text-[8px] text-gray-400 font-bold uppercase">Last: {member.lastReminder}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
