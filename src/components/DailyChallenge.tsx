import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Globe } from 'lucide-react';
import { TOPICS } from '../data';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

export const DailyChallenge = () => {
  const { isSolved, toggleSolved } = useAppState();

  const unsolvedProblems = React.useMemo(() => {
    return TOPICS.flatMap(t => t.problems).filter(p => !isSolved(p.id));
  }, [isSolved]);

  const dailyProblem = React.useMemo(() => {
    if (unsolvedProblems.length === 0) return null;
    const today = new Date().toDateString();
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return unsolvedProblems[hash % unsolvedProblems.length];
  }, [unsolvedProblems]);

  if (!dailyProblem) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 h-full shadow-sm dark:shadow-none transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
        <Sparkles className="h-40 w-40 text-primary-600 dark:text-sky-400 rotate-12" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-5 w-1 bg-primary-600 dark:bg-sky-400 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Daily Recommendation</span>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            {dailyProblem.name}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className={cn(
              "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border",
              dailyProblem.difficulty === 'Easy' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" :
              dailyProblem.difficulty === 'Medium' ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" :
              "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            )}>
              {dailyProblem.difficulty}
            </span>
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest bg-white dark:bg-slate-800/50 px-3 py-1 rounded-md border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
              <Globe className="h-3 w-3" />
              {dailyProblem.platform}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={dailyProblem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary-600 dark:bg-sky-400 text-white dark:text-slate-950 text-xs font-bold uppercase tracking-widest hover:bg-primary-700 dark:hover:bg-sky-300 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary-600/20 dark:shadow-sky-500/20"
          >
            Solve Problem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => toggleSolved(dailyProblem.id)}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-200 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-sm dark:shadow-none"
          >
            Mark Solved
          </button>
        </div>
      </div>
    </motion.div>
  );
};
