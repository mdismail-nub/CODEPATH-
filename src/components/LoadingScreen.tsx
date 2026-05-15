import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-white dark:bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Falling Drop Animation */}
        <motion.div
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            damping: 15, 
            stiffness: 100,
            duration: 1.2
          }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              borderRadius: ["50% 50% 50% 50%", "50% 50% 20% 80%", "12px 12px 12px 12px"],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-16 w-16 bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <BookOpen className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Logo Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
            CodePath
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase mt-2">
            Make it possible
          </p>
        </motion.div>

        {/* Loading Bar Container */}
        <div className="w-64 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-indigo-600"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-4 font-mono text-[10px] text-slate-400 dark:text-slate-600 font-bold"
        >
          {progress}% INITIALIZING SYSTEM...
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-blue-grain noise-overlay opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_50%)]" />
    </motion.div>
  );
};
