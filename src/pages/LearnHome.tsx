import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Rocket, Star, Trophy, ArrowRight, Brain, Zap } from 'lucide-react';
import { COURSES } from '../learnData';
import { useAppState } from '../AppStateContext';

export const LearnHome = () => {
  const { stats } = useAppState();

  return (
    <div className="relative pt-24 pb-32 bg-white dark:bg-[#020617] transition-colors duration-300 min-h-screen">
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] bg-blue-grain pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary-600/10 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Rocket className="h-3 w-3" />
                Interative Learning
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 font-outfit">
              Learn by <span className="text-primary-600 dark:text-primary-400">Doing</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Step-by-step interactive lessons designed to take you from absolute beginner to advanced problem solver. Earn XP, unlock badges, and master new skills.
            </p>
          </motion.div>
          
          {/* User Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex flex-wrap gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-4 px-4 border-r border-slate-200 dark:border-slate-800">
              <div className="h-10 w-10 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total XP</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.xp || 0}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-4 border-r border-slate-200 dark:border-slate-800">
              <div className="h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lessons</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.completedLessonIds?.length || 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4">
              <div className="h-10 w-10 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rank</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {(stats.xp || 0) < 500 ? 'Novice' : (stats.xp || 0) < 2000 ? 'Apprentice' : 'Scholar'}
                </p>
              </div>
            </div>
          </motion.div>
        </header>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Brain className="h-6 w-6 text-primary-600" />
              Choose Your Path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-14 w-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <BookOpen className="h-7 w-7" />
                </div>
                
                <div className="mb-4">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                     {course.level}
                   </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Star className="h-3 w-3" />
                    {course.lessons.length} Lessons
                  </div>
                  <Link
                    to={`/learn/${course.slug}`}
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group/btn"
                  >
                    Explore Path
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
