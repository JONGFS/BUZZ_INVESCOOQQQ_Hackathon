import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Calendar, 
  Users, 
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Share2,
  Copy,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

type Step = 'intro' | 'game' | 'share' | 'confirm';

export default function ReferralSystem() {
  const [step, setStep] = useState<Step>('intro');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const games = [
    { id: '1', name: 'GT vs Duke', date: 'Mar 4', location: 'McCamish Pavilion' },
    { id: '2', name: 'GT vs UNC', date: 'Mar 11', location: 'McCamish Pavilion' },
    { id: '3', name: 'GT vs Clemson', date: 'Mar 18', location: 'McCamish Pavilion' },
  ];

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gt-gold/10 rounded-full mx-auto flex items-center justify-center">
                <UserPlus className="w-10 h-10 text-gt-gold" />
              </div>
              <h2 className="text-2xl font-black text-gt-navy">Refer a Friend</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Invite your friends to attend a game with you. When both of you confirm attendance, you'll both earn <span className="text-gt-gold font-bold">+100 bonus buzzpoints</span>!
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-gt-navy uppercase tracking-widest">How it works</h3>
              <div className="space-y-4">
                {[
                  { icon: Calendar, text: "Select a game you're attending" },
                  { icon: Share2, text: "Send your unique referral link" },
                  { icon: CheckCircle2, text: "Both attend and earn buzzpoints!" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-gt-navy" />
                    </div>
                    <p className="text-xs font-bold text-gt-navy">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep('game')}
              className="w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              GET STARTED
            </button>
          </div>
        );
      case 'game':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gt-navy">Select Game</h2>
            <div className="space-y-3">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => { setSelectedGame(game.name); setStep('share'); }}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gt-gold active:scale-95 transition-all text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gt-navy">{game.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{game.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        );
      case 'share':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-gt-navy">Invite Friends</h2>
              <p className="text-gray-500 text-sm">Sharing for {selectedGame}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <p className="text-xs font-mono text-gt-navy truncate mr-4">buzzgt.app/ref/jack-123</p>
                <button 
                  onClick={copyLink}
                  className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 active:scale-90 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gt-navy" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> WhatsApp
                </button>
                <button className="py-3 bg-gt-navy text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> iMessage
                </button>
              </div>
            </div>

            <div className="bg-gt-gold/10 p-4 rounded-2xl border border-gt-gold/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-gt-gold mt-0.5" />
              <p className="text-[10px] text-gt-navy/70 leading-relaxed font-bold">
                PRO TIP: Share this link in your group chats! You get buzzpoints for EVERY friend who attends using your link.
              </p>
            </div>

            <button 
              onClick={() => setStep('confirm')}
              className="w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              DONE
            </button>
          </div>
        );
      case 'confirm':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-gt-navy">Link Active!</h2>
              <p className="text-gray-500 text-sm">Your referral link is now live. We'll notify you when your friends confirm their attendance.</p>
            </div>
            <Link 
              to="/profile"
              className="block w-full py-4 bg-gt-navy text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              BACK TO PROFILE
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => step === 'intro' ? window.history.back() : setStep('intro')}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-gt-navy" />
        </button>
        <h1 className="text-xl font-bold text-gt-navy">Referral System</h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
