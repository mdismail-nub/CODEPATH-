import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { TOPICS } from '../data';
import { useAppState } from '../AppStateContext';
import { Difficulty } from '../types';
import { cn } from '../lib/utils';
import { GetCertificateModal } from '../components/GetCertificateModal';
import { BackButton } from '../components/BackButton';

export const TopicDetail = () => {
  const { slug } = useParams();
  const { isSolved, toggleSolved, user, login, stats } = useAppState();
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const topic = TOPICS.find(t => t.slug === slug);
  if (!topic) return <Navigate to="/topics" />;

  const Icon = (Icons as any)[topic.icon] || Icons.HelpCircle;

  const filteredProblems = difficultyFilter === 'All'
    ? topic.problems
    : topic.problems.filter(p => p.difficulty === difficultyFilter);

  const solvedCount = topic.problems.filter(p => isSolved(p.id)).length;
  const totalCount = topic.problems.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100) || 0;
  const isAllSolved = solvedCount === totalCount && totalCount > 0;
  
  const existingCert = stats.certificates[topic.slug];

  return (
    <div className="pt-24 pb-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BackButton />
        
        {/* Header Section */}
        <header className="mb-20 pt-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-primary-600 dark:bg-primary-400 rounded-full" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">Lesson List</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-sm">
                  <Icon className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">{topic.name}</h1>
              </div>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {topic.description}
              </p>
            </div>

            <div className="w-full lg:w-80 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">My Progress</div>
                  <div className={cn("text-lg font-bold", isAllSolved ? "text-emerald-600 dark:text-emerald-400" : "text-primary-600 dark:text-primary-400")}>{progressPercent}%</div>
               </div>
               
               <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full", isAllSolved ? "bg-emerald-500 dark:bg-emerald-400" : "bg-primary-500 dark:bg-primary-400")}
                  />
               </div>

               <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{solvedCount}</span>
                  <span className="text-slate-400 dark:text-slate-500 font-semibold italic text-sm">of {totalCount} completed</span>
               </div>

               {isAllSolved && (
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                     {!user ? (
                      <button 
                        onClick={login}
                        className="w-full py-4 rounded-xl bg-amber-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                      >
                        Log in to get certificate
                      </button>
                    ) : existingCert ? (
                      <div className={cn(
                        "w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3",
                        existingCert.status === 'issued' ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30" : "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800/30"
                      )}>
                        {existingCert.status === 'issued' ? <Icons.Award className="h-4 w-4" /> : <Icons.Clock className="h-4 w-4" />}
                        {existingCert.status === 'issued' ? 'Certificate Earned' : 'Checking...'}
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsCertModalOpen(true)}
                        className="w-full py-4 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-md shadow-emerald-600/20"
                      >
                        <Icons.Award className="h-4 w-4" /> Claim Certificate
                      </button>
                    )}
                  </div>
               )}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section>
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={cn(
                    "px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                    difficultyFilter === diff 
                      ? "bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  )}
                >
                  {diff}
                </button>
              ))}
            </div>
            
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Available Problems: <span className="text-slate-900 dark:text-white ml-1">{filteredProblems.length}</span>
            </div>
          </div>

          {/* Problem List */}
          <div className="space-y-3">
            {filteredProblems.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "group p-4 md:px-8 md:py-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all flex items-center gap-6",
                  isSolved(problem.id) ? "border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-900/10" : "hover:border-primary-200 dark:hover:border-primary-400/30 hover:shadow-sm"
                )}
              >
                <button
                  onClick={() => toggleSolved(problem.id)}
                  className={cn(
                    "flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300",
                    isSolved(problem.id)
                      ? "bg-emerald-500 dark:bg-emerald-400 border-emerald-500 dark:border-emerald-400 text-white"
                      : "border-slate-200 dark:border-slate-800 text-transparent group-hover:border-primary-300 dark:group-hover:border-primary-700"
                  )}
                >
                  <Icons.Check className={cn("h-5 w-5 stroke-[2.5px]", isSolved(problem.id) ? "opacity-100" : "opacity-0")} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className={cn(
                      "text-base md:text-lg font-bold transition-all",
                      isSolved(problem.id) ? "text-slate-400 dark:text-slate-600 line-through" : "text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                    )}>
                      {problem.name}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest",
                      problem.difficulty === 'Easy' ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" :
                      problem.difficulty === 'Medium' ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20" :
                      "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20"
                    )}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">{problem.platform}</span>
                    <span>Problem ID: {problem.id}</span>
                  </div>
                </div>

                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white dark:hover:text-slate-900 transition-all transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Icons.ExternalLink className="h-5 w-5" />
                </a>
              </motion.div>
            ))}

            {filteredProblems.length === 0 && (
              <div className="py-24 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <Icons.Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No results</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Try changing your filters to see more problems.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <GetCertificateModal 
        isOpen={isCertModalOpen} 
        onClose={() => setIsCertModalOpen(false)}
        topicSlug={topic.slug}
        topicName={topic.name}
      />
    </div>
  );
};
