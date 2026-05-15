import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Play, CheckCircle2, Lock, ArrowRight, Zap, Clock } from 'lucide-react';
import { COURSES } from '../learnData';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

export const CoursePage = () => {
  const { slug } = useParams();
  const { isLessonCompleted } = useAppState();
  const course = COURSES.find(c => c.slug === slug);

  if (!course) return <Navigate to="/learn" />;

  const completedCount = course.lessons.filter(l => isLessonCompleted(l.id)).length;
  const progress = Math.round((completedCount / course.lessons.length) * 100) || 0;

  return (
    <div className="relative pt-24 pb-32 bg-white dark:bg-[#020617] min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to paths
        </Link>

        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-outfit">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {course.description}
              </p>
            </div>
            
            <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center min-w-[200px]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{progress}%</p>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary-600"
                  />
                </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6">
          {course.lessons.map((lesson, idx) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isLocked = idx > 0 && !isLessonCompleted(course.lessons[idx - 1].id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={isLocked ? '#' : `/learn/${course.slug}/${lesson.slug}`}
                  className={cn(
                    "group relative flex items-center justify-between p-6 rounded-3xl border transition-all duration-300",
                    isCompleted 
                      ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30" 
                      : isLocked
                        ? "bg-slate-50/30 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50 opacity-60 cursor-not-allowed"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-lg"
                  )}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "h-12 w-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all",
                      isCompleted 
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600" 
                        : isLocked
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-primary-600 group-hover:text-white"
                    )}>
                      {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : isLocked ? <Lock className="h-5 w-5" /> : idx + 1}
                    </div>
                    
                    <div>
                      <h3 className={cn(
                        "text-lg font-bold transition-colors",
                        isLocked ? "text-slate-400" : "text-slate-900 dark:text-white"
                      )}>
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Zap className="h-3 w-3 text-amber-500" />
                          {lesson.xpReward} XP
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Clock className="h-3 w-3" />
                          10-15m
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isLocked && (
                    <div className={cn(
                      "flex items-center gap-2 text-sm font-bold transition-all",
                      isCompleted ? "text-emerald-600" : "text-primary-600 group-hover:translate-x-1"
                    )}>
                      {isCompleted ? 'Review' : 'Start Lesson'}
                      {!isCompleted && <ArrowRight className="h-4 w-4" />}
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}

          {course.lessons.length === 0 && (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Coming Soon!</h3>
              <p className="text-slate-500 dark:text-slate-400">We're currently crafting these lessons for you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
