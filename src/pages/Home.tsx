import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Zap, Target, Award, Trophy, Globe, Map as MapIcon, LayoutDashboard, X, ChevronRight, Star, Rocket, LayoutGrid } from 'lucide-react';
import { TOPICS } from '../data';
import { TopicCard } from '../components/TopicCard';
import { StatsDashboard } from '../components/StatsDashboard';
import { DailyChallenge } from '../components/DailyChallenge';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppStateContext';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, login } = useAppState();

  const featuredTopics = TOPICS.slice(0, 8);
  const filteredTopics = searchQuery 
    ? TOPICS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.problems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : featuredTopics;

  // Landing Page for Guests
  if (!user) {
    return (
      <div className="relative pt-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Simplified Hero Section */}
        <section className="relative bg-blue-grain noise-overlay pb-24 pt-20 sm:pb-32 sm:pt-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto max-w-3xl"
            >
              <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-400/10 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-400/20">
                  <Star className="h-3 w-3" />
                  <span>The future of technical learning</span>
                </span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-8 leading-tight">
                Master the world of <br />
                <span className="text-primary-600 dark:text-primary-400">Problem Solving</span>
              </h1>
              
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
                Discover a world-class training platform for competitive programming. 
                Follow structured paths, build your technical portfolio, and earn recognized rewards.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={login}
                  className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                >
                  Start Learning Free
                </button>
                <Link
                  to="/roadmap"
                  className="bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  View Learning Path
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-warm-grain noise-overlay border-y border-slate-200 dark:border-slate-800/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Structured Learning', desc: 'Step-by-step paths designed to take you from basics to advanced coding skills.', icon: Rocket, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-400/10' },
                { title: 'Earn Certificates', desc: 'Finish learning sets to get digital certificates that prove what you know.', icon: Award, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-400/10' },
                { title: 'Track Progress', desc: 'See all your solved problems from different platforms in one easy place.', icon: Globe, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-400/10' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900/60"
                >
                  <div className={`h-12 w-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 py-32 text-center bg-white dark:bg-slate-950">
          <div className="p-12 rounded-[3rem] bg-blue-grain noise-overlay border border-slate-200 dark:border-white/5 max-w-4xl mx-auto relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-400 to-sky-400" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Ready to reach the next level?</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 font-medium">Sign in to start your personalized journey today.</p>
              <button
                 onClick={login}
                 className="px-10 py-4 rounded-xl bg-primary-600 dark:bg-white text-white dark:text-slate-950 font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Dashboard for Members
  return (
    <div className="relative pt-24 pb-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
       <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] bg-blue-grain pointer-events-none" />
       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <header className="mb-16">
             <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                   <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">Member Home</p>
                   <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                     Hello, <br className="md:hidden" />
                     {user.displayName?.split(' ')[0]}
                   </h1>
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
                           { name: 'Your Path', path: '/roadmap', icon: Target },
                           { name: 'My Certificates', path: '/certificates', icon: Award },
                           { name: 'All Courses', path: '/topics', icon: LayoutGrid }
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
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium italic">"Every day is a chance to learn something new."</p>
                   </div>
                </div>
             </section>

             <section>
                <div className="flex items-center gap-3 mb-8">
                   <div className="h-6 w-1 bg-primary-600 dark:bg-primary-400 rounded-full" />
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Overview</h2>
                </div>
                <StatsDashboard />
             </section>

             <section>
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="h-6 w-1 bg-primary-600 dark:bg-primary-400 rounded-full" />
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Topics</h2>
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

