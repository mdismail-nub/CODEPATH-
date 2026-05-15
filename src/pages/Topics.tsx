import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS } from '../data';
import { TopicCard } from '../components/TopicCard';
import { LayoutGrid, Search, X } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export const Topics = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = TOPICS.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.problems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <BackButton />
        </motion.div>
        
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20 mb-6">
                Learning Paths
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 font-outfit">
                Explore All Courses
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                Choose a course to start your practice. Each lesson is carefully picked to help you learn core coding ideas.
              </p>
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search topics or problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 pl-11 pr-11 py-4 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </header>

        <section>
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTopics.map((topic, index) => (
                <TopicCard key={topic.id} topic={topic} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center rounded-3xl border-2 border-dashed border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
              <Search className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No matching topics</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search terms to find what you're looking for.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
