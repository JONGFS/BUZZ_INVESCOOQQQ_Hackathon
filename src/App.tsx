import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav } from './components/BottomNav';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import AttendanceConfirmation from './pages/AttendanceConfirmation';
import StingEm from './pages/StingEm';
import RSVPManager from './pages/RSVPManager';
import ReferralSystem from './pages/ReferralSystem';
import StreakSplash from './pages/StreakSplash';
import StreakExplanation from './pages/StreakExplanation';
import Calendar from './pages/Calendar';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<StreakSplash />} />
          <Route path="/streak-explanation" element={<PageTransition><StreakExplanation /></PageTransition>} />
          <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/calendar" element={<PageTransition><Calendar /></PageTransition>} />
          <Route path="/confirm-attendance" element={<PageTransition><AttendanceConfirmation /></PageTransition>} />
          <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
          <Route path="/rewards" element={<PageTransition><Rewards /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/sting-em" element={<PageTransition><StingEm /></PageTransition>} />
          <Route path="/rsvp-manager" element={<PageTransition><RSVPManager /></PageTransition>} />
          <Route path="/referral" element={<PageTransition><ReferralSystem /></PageTransition>} />
        </Routes>
        <ConditionalNav />
      </div>
    </Router>
  );
}

const ConditionalNav = () => {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname === '/streak-explanation') return null;
  return <BottomNav />;
};
