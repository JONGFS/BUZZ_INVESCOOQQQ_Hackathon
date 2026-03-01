import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, ChevronLeft, Share2, MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import gtLogo from '@buzz_source_img/gt.png';

export default function AttendanceConfirmation() {
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState<'idle' | 'checking' | 'loc_confirmed' | 'att_confirmed'>('idle');

  const handleConfirm = () => {
    setConfirmationStep('checking');
    setTimeout(() => {
      setConfirmationStep('loc_confirmed');
      setTimeout(() => {
        setConfirmationStep('att_confirmed');
        setConfirmed(true);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/home" className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <ChevronLeft className="w-5 h-5 text-gt-navy" />
        </Link>
        <h1 className="text-xl font-bold text-gt-navy">Confirm Attendance</h1>
      </div>

      <AnimatePresence>
        {confirmationStep !== 'idle' && confirmationStep !== 'att_confirmed' && (
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
                      width: confirmationStep === 'checking' ? '50%' : '100%' 
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
                    {confirmationStep === 'loc_confirmed' && (
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
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    {confirmationStep === 'checking' && "Verifying your proximity to McCamish Pavilion..."}
                    {confirmationStep === 'loc_confirmed' && "You're in the right spot! Securing your buzzpoints..."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!confirmed ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
        >
          <div className="h-48 bg-gt-navy relative">
            <img 
              src={gtLogo}
              alt="McCamish Pavilion" 
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gt-navy to-transparent" />
            <div className="absolute bottom-4 left-6">
              <h2 className="text-2xl font-black text-white">GT vs Duke</h2>
              <p className="text-gt-gold text-sm font-bold">McCamish Pavilion • Atlanta, GA</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-400 font-bold uppercase text-[10px]">Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gt-gold" />
                  <p className="font-bold text-gt-navy text-sm">Sat, Mar 4</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 font-bold uppercase text-[10px]">Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gt-gold" />
                  <p className="font-bold text-gt-navy text-sm">7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Confirming your attendance helps your organization earn buzzpoints and secures your spot in the student section. Please only confirm if you are certain you can attend.
              </p>
            </div>

            <button 
              onClick={handleConfirm}
              className="w-full py-4 bg-gt-gold text-gt-navy font-black rounded-2xl shadow-lg shadow-gt-gold/20 active:scale-95 transition-all"
            >
              CONFIRM ATTENDANCE
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
            <div className="bg-green-500 p-8 text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-black">Attendance Confirmed!</h2>
              <p className="text-white/80 text-sm font-bold mt-1">GT vs Duke • Mar 4, 7:00 PM</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-gt-navy rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gt-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                    <p className="text-sm font-bold text-gt-navy">Student Entrance • Gate 4</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-gt-navy rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-gt-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
                    <p className="text-sm font-bold text-gt-navy">Verified Student Account</p>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Confirmation ID</p>
                <p className="text-lg font-black text-gt-navy">#GT-ATT-903456</p>
              </div>

              <div className="w-full h-px bg-dashed bg-gray-200" />

              <p className="text-[10px] text-gray-400 text-center italic">
                Show this screen at the student entrance to receive your physical wristband.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/home" className="flex-1 py-4 bg-gt-navy text-white rounded-2xl shadow-sm font-bold text-center flex items-center justify-center">
              Back to Home
            </Link>
            <button className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gt-navy">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
