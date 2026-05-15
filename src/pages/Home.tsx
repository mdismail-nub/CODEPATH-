import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Zap, Target, Award, Trophy, Globe, Map as MapIcon, LayoutDashboard, X, ChevronRight, Star, Rocket, LayoutGrid, BookOpen, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import { TOPICS } from '../data';
import { TopicCard } from '../components/TopicCard';
import { StatsDashboard } from '../components/StatsDashboard';
import { DailyChallenge } from '../components/DailyChallenge';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { stats, isSolved, toggleSolved } = useAppState();

  const dailyTopic = TOPICS.find(t => t.id === 'daily');
  const dailyProblems = dailyTopic ? dailyTopic.problems : [];

  const featuredTopics = TOPICS.filter(t => t.id !== 'daily').slice(0, 8);
  const filteredTopics = searchQuery 
    ? TOPICS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.problems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : featuredTopics;

  return (
    <div className="relative pt-24 bg-white dark:bg-[#020617] transition-colors duration-300 min-h-screen">
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] bg-blue-grain pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative pb-16 pt-10 sm:pb-24 sm:pt-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-400/10 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-400/20">
                <Star className="h-3 w-3" />
                <span>The future of technical learning</span>
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6 leading-tight">
              Master the world of <br />
              <span className="text-primary-600 dark:text-primary-400">Problem Solving</span>
            </h1>
            
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Follow structured paths, build your technical portfolio, and track your progress locally.
              Start practicing immediately, no account needed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/learn"
                className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-3"
              >
                <BookOpen className="h-5 w-5" />
                Start Learning
              </Link>
              <Link
                to="/topics"
                className="bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              >
                View Problems
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 pb-32">
        <header>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">Welcome Back</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Continue your journey
              </h2>
            </motion.div>

            <div className="lg:w-96">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search topics or problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all font-medium text-sm shadow-sm"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-16">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DailyChallenge />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 font-display">Shortcuts</h3>
                <div className="space-y-1">
                  {[
                    { name: 'Interactive Learn', path: '/learn', icon: BookOpen },
                    { name: 'Your Path', path: '/roadmap', icon: Target },
                    { name: 'All Problems', path: '/topics', icon: LayoutGrid }
                  ].map((item) => (
                    <Link key={item.path} to={item.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{item.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-700 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium italic">"Progress is tracked locally in your browser."</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-6 w-1 bg-primary-600 dark:bg-primary-400 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Your Stats</h2>
            </div>
            <StatsDashboard />
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-primary-600 dark:bg-primary-400 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Daily Problem Set</h2>
              </div>
              <Link to={`/topic/${dailyTopic?.slug}`} className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 group">
                View All <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {dailyProblems.map((problem, idx) => {
                const solved = isSolved(problem.id);
                return (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "group relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300",
                      solved 
                        ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30" 
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-lg"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{problem.platform}</span>
                         {solved && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <h3 className={cn(
                        "text-sm font-bold mb-6 line-clamp-2 transition-colors",
                        solved ? "text-slate-500" : "text-slate-900 dark:text-white"
                      )}>
                        {problem.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                       <a 
                         href={problem.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className={cn(
                           "flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                           solved 
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400" 
                            : "bg-primary-600 text-white hover:bg-primary-700"
                         )}
                       >
                         Solve <ExternalLink className="h-3 w-3" />
                       </a>
                       <button
                         onClick={() => toggleSolved(problem.id)}
                         className={cn(
                           "w-10 h-10 rounded-lg flex items-center justify-center transition-all border",
                           solved 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary-600"
                         )}
                       >
                         <CheckCircle2 className="h-4 w-4" />
                       </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-primary-600 dark:bg-primary-400 rounded-full" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Explore Topics</h2>
              </div>
              <Link to="/topics" className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 group">
                Browse All <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredTopics.map((topic, index) => (
                <TopicCard key={topic.id} topic={topic} index={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

