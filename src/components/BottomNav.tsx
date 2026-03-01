import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, Gift, User, Zap, Calendar } from 'lucide-react';
import { BuzzBee } from './Icons';
import { cn } from '../lib/utils';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: BuzzBee, label: "Sting'Em", path: '/sting-em' },
    { icon: Trophy, label: 'Rankings', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-gray-200 safe-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors duration-200",
                isActive ? "text-gt-gold" : "text-gray-400"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
