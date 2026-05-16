import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Play, CheckCircle2, Lock, ArrowRight, Zap, Clock, Globe, Terminal, Code2, Layout, Layers, BookOpen } from 'lucide-react';
import { COURSES } from '../learnData';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Terminal': return <Terminal className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Layout': return <Layout className={className} />;
    case 'Layers': return <Layers className={className} />;
    default: return <BookOpen className={className} />;
  }
};

export const CoursePage = () => {
  const { slug } = useParams();
  const { isLessonCompleted } = useAppState();
  const course = COURSES.find(c => c.slug === slug);

  if (!course) return <Navigate to="/learn" />;

  const completedCount = course.lessons.filter(l => isLessonCompleted(l.id)).length;
  const progress = Math.round((completedCount / course.lessons.length) * 100) || 0;

  return (
    <div className="relative pt-24 pb-32 bg-white dark:bg-[#020617] min-h-screen">
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] bg-blue-grain pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to paths
        </Link>

        <header className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center">
                  <IconComponent name={course.icon} className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                   {course.level} Path
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-outfit tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {course.description}
              </p>
            </div>

            <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 text-center min-w-[240px] shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Progress</p>
                <div className="flex items-baseline justify-center gap-1">
                   <p className="text-4xl font-bold text-slate-900 dark:text-white leading-none">{progress}</p>
                   <p className="text-xl font-bold text-slate-400">%</p>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full mt-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                  {completedCount} of {course.lessons.length} Completed
                </p>
            </div>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-6">
          {course.lessons.map((lesson, idx) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isLocked = idx > 0 && !isLessonCompleted(course.lessons[idx - 1].id);

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={isLocked ? '#' : `/learn/${course.slug}/${lesson.slug}`}
                  className={cn(
                    "group relative flex items-center justify-between p-5 sm:p-6 rounded-[2rem] border transition-all duration-300",
                    isCompleted
                      ? "bg-emerald-50/30 dark:bg-emerald-900/5 border-emerald-100 dark:border-emerald-800/20"
                      : isLocked
                        ? "bg-slate-50/30 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50 opacity-60 cursor-not-allowed"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-xl hover:-translate-x-1"
                  )}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className={cn(
                      "h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all",
                      isCompleted
                        ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600"
                        : isLocked
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-primary-600 group-hover:text-white shadow-sm"
                    )}>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" /> : isLocked ? <Lock className="h-4 w-4 sm:h-5 sm:w-5" /> : idx + 1}
                    </div>

                    <div>
                      <h3 className={cn(
                        "text-base sm:text-lg font-bold transition-colors leading-tight",
                        isLocked ? "text-slate-400" : "text-slate-900 dark:text-white"
                      )}>
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-3 sm:gap-4 mt-1.5">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <Zap className="h-3 w-3 text-amber-500" />
                          {lesson.xpReward} XP
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <Clock className="h-3 w-3" />
                          10m
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isLocked && (
                    <div className={cn(
                      "flex items-center gap-2 text-xs sm:text-sm font-bold transition-all",
                      isCompleted ? "text-emerald-600" : "text-primary-600 group-hover:translate-x-1"
                    )}>
                      <span className="hidden sm:inline">{isCompleted ? 'Review' : 'Start Lesson'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}

          {course.lessons.length === 0 && (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800">
               <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-slate-400" />
               </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-outfit">Cooking New Lessons...</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm">We're currently crafting these lessons to help you master {course.title}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
