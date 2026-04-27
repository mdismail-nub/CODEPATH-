import React from 'react';
import { motion } from 'motion/react';
import { Map as MapIcon, Flag, ChevronRight, CheckCircle2, Circle, Trophy, Rocket, Target, Award, Star, BookOpen } from 'lucide-react';
import { ROADMAP_STEPS, TOPICS } from '../data';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';
import { BackButton } from '../components/BackButton';

export const RoadmapPage = () => {
  const { stats } = useAppState();

  const getTopicProgress = (topicSlug: string) => {
    const topic = TOPICS.find(t => t.slug === topicSlug);
    if (!topic) return 0;
    const solved = topic.problems.filter(p => stats.solvedIds.includes(p.id)).length;
    return Math.round((solved / topic.problems.length) * 100);
  };

  const icons = [Rocket, Target, Award, Star];

  return (
    <div className="relative pt-24 pb-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <BackButton />
        
        <header className="text-center mb-24 pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex h-16 w-16 mb-8 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20"
          >
            <MapIcon className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Learning Path</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Follow these steps to learn coding from the beginning to a professional level.
          </p>
        </header>

        <div className="relative space-y-20">
          {/* Central Line */}
          <div className="absolute left-[27.5px] md:left-1/2 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          {ROADMAP_STEPS.map((step, idx) => {
            const stepTopics = step.topics.map(slug => TOPICS.find(t => t.slug === slug)).filter(Boolean);
            const isLatestUnlocked = idx === 0 || getTopicProgress(ROADMAP_STEPS[idx-1].topics[0]) > 0;
            const PhaseIcon = icons[idx % icons.length];

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Milestone Node */}
                <div className={cn(
                  "absolute left-[27.5px] md:left-1/2 -translate-x-1/2 h-14 w-14 rounded-2xl border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center z-10 transition-all duration-500 shadow-sm",
                  isLatestUnlocked ? "bg-primary-600 dark:bg-primary-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                )}>
                  <PhaseIcon className="h-6 w-6" />
                </div>

                <div className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-24",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}>
                  <div className="w-full md:w-1/2 pl-20 md:pl-0">
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center gap-3 mb-6">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Phase 0{idx + 1}</span>
                         <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                       </div>
                       
                       <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{step.title}</h2>
                       <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">{step.description}</p>
                       
                       <div className="space-y-2">
                         {stepTopics.map((topic: any) => {
                           const progress = getTopicProgress(topic.slug);
                           const isDone = progress === 100;
                           return (
                             <Link
                                key={topic.id}
                                to={`/topic/${topic.slug}`}
                                className={cn(
                                  "flex items-center justify-between p-4 rounded-xl border transition-all group/item",
                                  isDone ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-400/30 hover:bg-white dark:hover:bg-slate-800"
                                )}
                             >
                                <div className="flex items-center gap-3">
                                   <div className={cn(
                                     "h-6 w-6 rounded-md flex items-center justify-center transition-all",
                                     isDone ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500 group-hover/item:text-primary-600"
                                   )}>
                                      {isDone ? <CheckCircle2 className="h-5 w-5" /> : <BookOpen className="h-4 w-4" />}
                                   </div>
                                   <span className={cn(
                                     "text-sm font-semibold transition-colors",
                                     isDone ? "text-emerald-800 dark:text-emerald-300" : "text-slate-700 dark:text-slate-300 group-hover/item:text-primary-800 dark:group-hover:text-white"
                                   )}>{topic.name}</span>
                                </div>
                                <ChevronRight className={cn(
                                  "h-4 w-4 transition-all group-hover/item:translate-x-0.5",
                                  isDone ? "text-emerald-300 dark:text-emerald-700" : "text-slate-300 dark:text-slate-700 group-hover/item:text-primary-400"
                                )} />
                             </Link>
                           );
                         })}
                       </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 pt-20 pb-20"
          >
             <div className="h-20 w-20 rounded-3xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                <Trophy className="h-10 w-10" />
             </div>
             <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-display">Finish for Certification</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
