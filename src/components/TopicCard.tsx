import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Topic } from '../types';
import { cn } from '../lib/utils';
import { useAppState } from '../AppStateContext';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, index }) => {
  const { stats } = useAppState();
  const Icon = (Icons as any)[topic.icon] || Icons.HelpCircle;
  
  const solvedCount = topic.problems.filter(p => stats.solvedIds.includes(p.id)).length;
  const totalCount = topic.problems.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100) || 0;
  const isCompleted = progressPercent === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/topic/${topic.slug}`}
        className="group relative block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md dark:shadow-none hover:border-primary-200 dark:hover:border-sky-400/50 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between mb-8">
          <div className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300",
            isCompleted 
              ? "bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" 
              : "bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-slate-400 group-hover:bg-primary-600 dark:group-hover:bg-sky-400 group-hover:text-white dark:group-hover:text-slate-950"
          )}>
            <Icon className={cn("h-5 w-5", isCompleted ? "stroke-[2.5px]" : "stroke-[2px]")} />
          </div>
          {isCompleted && (
            <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-100 dark:border-emerald-400/20 text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Completed
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
            {topic.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {topic.description}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
            <span className="text-slate-400 dark:text-slate-500">Progress</span>
            <span className={cn(isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-primary-600 dark:text-sky-400")}>{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn("h-full transition-colors", isCompleted ? "bg-emerald-500 dark:bg-emerald-500" : "bg-primary-500 dark:bg-sky-500")}
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {solvedCount} / {totalCount} Solved
            </span>
            <div className="h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-500 group-hover:bg-primary-50 dark:group-hover:bg-sky-400/20 group-hover:text-primary-600 dark:group-hover:text-sky-400 transition-all">
              <Icons.ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
