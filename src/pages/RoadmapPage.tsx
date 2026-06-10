import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, ChevronRight, CheckCircle2, Circle, Trophy, Rocket, Target, Award, Star, BookOpen, Flag,
  Github, Cpu, Flame, ExternalLink, Quote, Sparkles, BookOpenCheck, Clock, Layers, Copy, Check, Info, Library, Youtube
} from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';
import { BackButton } from '../components/BackButton';

// Week Data Structures
interface Resource {
  name: string;
  url: string;
  type: 'yt' | 'book' | 'general' | 'cf' | 'atcoder';
}

interface WeekCardProps {
  label: string;
  title: string;
  topics: string[];
  resources: Resource[];
}

export const RoadmapPage = () => {
  const { stats } = useAppState();
  const [activeTab, setActiveTab] = useState<'overview' | 'month1' | 'month2' | 'month3' | 'git' | 'resources' | 'checklist'>('overview');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Checklist State loaded from localStorage
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('cp_roadmap_checklist_completed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const handleToggle = (id: string) => {
    setCompleted(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('cp_roadmap_checklist_completed', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => {
      setCopiedText(null);
    }, 1500);
  };

  // Structured list of checklist items grouped by phases
  const checklistData = {
    month1: [
      { id: 'm1_1', text: 'C++ setup and fast I/O template' },
      { id: 'm1_2', text: 'STL: vector, map, set, priority_queue' },
      { id: 'm1_3', text: 'Bit manipulation basics' },
      { id: 'm1_4', text: 'Prefix sums + difference arrays' },
      { id: 'm1_5', text: 'Binary search (4 template patterns)' },
      { id: 'm1_6', text: 'Two pointers + sliding window' },
      { id: 'm1_7', text: 'Sorting algorithms' },
      { id: 'm1_8', text: 'Linked lists' },
      { id: 'm1_9', text: 'Stacks and queues' },
      { id: 'm1_10', text: 'Monotonic stack' },
      { id: 'm1_11', text: 'Binary trees (DFS, BFS)' },
      { id: 'm1_12', text: 'BST operations' },
      { id: 'm1_13', text: 'First live Codeforces contest' },
      { id: 'm1_14', text: 'Git setup + first repo push' },
      { id: 'm1_15', text: '100 problems solved total' }
    ],
    month2: [
      { id: 'm2_1', text: 'Graph representation (adj list)' },
      { id: 'm2_2', text: 'DFS on graphs (components, cycles)' },
      { id: 'm2_3', text: 'BFS shortest path' },
      { id: 'm2_4', text: 'Dijkstra\'s algorithm' },
      { id: 'm2_5', text: 'Bellman-Ford + Floyd-Warshall' },
      { id: 'm2_6', text: 'DSU / Union-Find' },
      { id: 'm2_7', text: 'Topological sort' },
      { id: 'm2_8', text: 'DP: Knapsack, LCS, LIS' },
      { id: 'm2_9', text: 'DP: Grid, Interval, Bitmask' },
      { id: 'm2_10', text: 'Number theory: sieve, GCD, modular' },
      { id: 'm2_11', text: 'Binary exponentiation' },
      { id: 'm2_12', text: 'Combinatorics: nCr mod p' },
      { id: 'm2_13', text: 'Segment tree + Fenwick tree' },
      { id: 'm2_14', text: 'Greedy strategies' },
      { id: 'm2_15', text: '300 problems solved total' }
    ],
    month3: [
      { id: 'm3_1', text: 'Minimum spanning tree (Kruskal, Prim)' },
      { id: 'm3_2', text: 'Bridges + articulation points' },
      { id: 'm3_3', text: 'SCC (Tarjan / Kosaraju)' },
      { id: 'm3_4', text: 'LCA with binary lifting' },
      { id: 'm3_5', text: 'DP optimizations (CHT, D&C)' },
      { id: 'm3_6', text: 'SOS DP and bitmask DP' },
      { id: 'm3_7', text: 'Z-function + Aho-Corasick' },
      { id: 'm3_8', text: 'Suffix arrays' },
      { id: 'm3_9', text: 'Meet in the middle' },
      { id: 'm3_10', text: 'Mo\'s algorithm' },
      { id: 'm3_11', text: 'Matrix exponentiation' },
      { id: 'm3_12', text: 'Convex hull (Graham scan)' },
      { id: 'm3_13', text: 'Game theory (Grundy numbers)' },
      { id: 'm3_14', text: 'Solved 500+ problems total' },
      { id: 'm3_15', text: 'Reached CF Expert (1600+)' }
    ]
  };

  const totalCheckboxes = 45;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const completionPercentage = (completedCount / totalCheckboxes) * 100;

  // Active styles for tabs
  const tabClass = (tab: typeof activeTab) => cn(
    "px-4 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer rounded-xl transition-all duration-200 whitespace-nowrap",
    activeTab === tab
      ? "bg-primary-600 dark:bg-primary-500 text-white shadow-sm shadow-primary-600/10"
      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900/60"
  );

  return (
    <div className="relative pt-24 pb-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      {/* Subtle Grid Background Details */}
      <div className="absolute inset-0 max-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.03),transparent_40%)] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <BackButton />
        </motion.div>
        
        {/* HERO SECTION */}
        <header className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 dark:border-white/5 py-12 px-6 md:px-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
             <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-slate-800/80 border border-slate-700/50 text-[10px] font-mono tracking-widest text-[#00d4ff] uppercase">
               <Cpu className="h-3.5 w-3.5 animate-pulse text-sky-400" />
               // 3-Month CP Roadmap · C++ · 2026
             </div>
             
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-300">
               Competitive Programming Mastery
             </h1>
             
             <p className="text-sm md:text-base text-slate-300 dark:text-slate-400 max-w-2xl leading-relaxed mb-10 font-medium">
               A structured journey from beginner to Codeforces Expert — built on the practices of the world's top competitive programmers.
             </p>

             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-slate-800">
               <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-extrabold text-sky-400 font-mono">3</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Months</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-extrabold text-violet-400 font-mono">12</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Weeks</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">500+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Problems</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">1600+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">CF Rating Target</span>
               </div>
             </div>
          </div>
        </header>

        {/* LEARN FROM LEGENDS */}
        <section className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
             <Sparkles className="h-4 w-4 text-amber-500" />
             // Learn from the legends
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gennady */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800">
                 <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 font-bold font-mono text-lg">G</div>
                 <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Gennady "tourist" Korotkevich</h4>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1">
                      <strong>Rating 4009:</strong> Studies each topic fully before moving on. Limits practice to 3–4 focused hours/day to avoid burnout.
                    </span>
                 </div>
              </div>
              {/* Kamil */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800">
                 <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 font-bold font-mono text-lg">K</div>
                 <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Kamil "Errichto" Debowski</h4>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1">
                      <strong>Red Coder:</strong> "Solve problems 20-30 min above your level. If stuck, read editorial — then implement yourself."
                    </span>
                 </div>
              </div>
              {/* William Lin */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800">
                 <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-bold font-mono text-lg">W</div>
                 <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">William Lin (tmwilliamlin168)</h4>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1">
                      <strong>IOI Winner:</strong> "Start with AtCoder beginner contests. Upsolve every single problem you couldn't solve in contests."
                    </span>
                 </div>
              </div>
              {/* Benq */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200/60 dark:border-slate-800">
                 <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 font-bold font-mono text-lg">B</div>
                 <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Benjamin Qi (Benq)</h4>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1">
                      <strong>IOI 2× Gold:</strong> Shared legendary guides. Progress: USACO &rarr; Codeforces Div 2 &rarr; Div 1.
                    </span>
                 </div>
              </div>
           </div>
        </section>

        {/* TAB NAVIGATION BAR */}
        <div className="sticky top-[76px] z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-1.5 flex gap-1.5 mb-10 overflow-x-auto no-scrollbar shadow-sm">
           <button onClick={() => setActiveTab('overview')} className={tabClass('overview')}>Overview</button>
           <button onClick={() => setActiveTab('month1')} className={tabClass('month1')}>Foundation</button>
           <button onClick={() => setActiveTab('month2')} className={tabClass('month2')}>Core Algorithms</button>
           <button onClick={() => setActiveTab('month3')} className={tabClass('month3')}>Expert Push</button>
           <button onClick={() => setActiveTab('git')} className={tabClass('git')}>Git & GitHub</button>
           <button onClick={() => setActiveTab('resources')} className={tabClass('resources')}>Resources</button>
           <button onClick={() => setActiveTab('checklist')} className={tabClass('checklist')}>
             Checklist <span className={cn("ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] transition-all", activeTab === 'checklist' ? 'bg-white/20 text-white' : 'bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-300')}>{completedCount}/45</span>
           </button>
        </div>

        {/* MAIN TABS RENDER */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Visual Progress phases */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                   <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-4 flex items-center gap-1.5">
                     <Layers className="h-4 w-4" />
                     // Your 3-Month Journey at a Glance
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                         <div className="h-2 rounded-full bg-gradient-to-r from-sky-450 to-sky-500 shadow-sm" style={{ backgroundColor: '#00d4ff' }} />
                         <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-2">Month 1 · Foundation</span>
                         <span className="text-[11px] text-slate-400 mt-0.5">C++ basics, STL templates, sorting and lists</span>
                      </div>
                      <div className="flex flex-col">
                         <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 shadow-sm" />
                         <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-2">Month 2 · Core Algorithms</span>
                         <span className="text-[11px] text-slate-400 mt-0.5">Graphs, Dynamic Programming, segment trees, Math</span>
                      </div>
                      <div className="flex flex-col">
                         <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 shadow-sm" />
                         <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-2">Month 3 · Expert Push</span>
                         <span className="text-[11px] text-slate-400 mt-0.5">Advanced flows, tree lifting, optimization grinds</span>
                      </div>
                   </div>
                </div>

                {/* Wisdom Quote */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex gap-4 text-white relative overflow-hidden shadow-md">
                   <Quote className="h-8 w-8 text-indigo-500 opacity-60 flex-shrink-0" />
                   <div>
                      <p className="text-sm md:text-base font-semibold italic text-slate-100">
                        "Study each topic one by one, solving problems and thinking about how to merge them. A goal without a plan is just a wish."
                      </p>
                      <cite className="block text-xs text-[#00d4ff] font-mono mt-2 not-italic">
                        — Kamil "Errichto" Debowski, competitive programming wisdom
                      </cite>
                   </div>
                </div>

                {/* Milestones Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                   <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Codeforces Rating Milestones</h2>
                   <div className="divide-y divide-slate-100 dark:divide-slate-850">
                      {/* Newbie */}
                      <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 first:pt-0 last:pb-0">
                         <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-gray-400 flex-shrink-0" />
                            <span className="w-24 text-xs font-mono font-bold text-gray-500">0 – 1199</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Newbie</span>
                         </div>
                         <p className="text-xs text-slate-500 flex-1 md:pl-6 leading-relaxed">Start with Div. 3 Problem A and B. Get comfortable with basic syntax.</p>
                         <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Start</span>
                      </div>
                      {/* Pupil */}
                      <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 last:pb-0">
                         <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                            <span className="w-24 text-xs font-mono font-bold text-green-500">1200 – 1399</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Pupil</span>
                         </div>
                         <p className="text-xs text-slate-500 flex-1 md:pl-6 leading-relaxed">Solid DSA fundamentals. Solve Div 3 A-C and basic sorting puzzles.</p>
                         <span className="text-[10px] uppercase font-bold tracking-wider text-green-500 font-mono px-2 py-0.5 rounded-md bg-green-50 dark:bg-green-950/20">Month 1</span>
                      </div>
                      {/* Specialist */}
                      <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 last:pb-0">
                         <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-teal-500 flex-shrink-0" />
                            <span className="w-24 text-xs font-mono font-bold text-teal-500">1400 – 1599</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Specialist</span>
                         </div>
                         <p className="text-xs text-slate-500 flex-1 md:pl-6 leading-relaxed">Knows graphs, shortest search, and simple DP. Solves Div 2 A, B, C.</p>
                         <span className="text-[10px] uppercase font-bold tracking-wider text-teal-500 font-mono px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/20">Month 2</span>
                      </div>
                      {/* Expert */}
                      <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 last:pb-0">
                         <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0" />
                            <span className="w-24 text-xs font-mono font-bold text-blue-500">1600 – 1899</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Expert</span>
                         </div>
                         <p className="text-xs text-slate-500 flex-1 md:pl-6 leading-relaxed">Advanced DP, Segment trees. Solves Div 2 A-D, can compete inside Div 1 limits.</p>
                         <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/20">Month 3</span>
                      </div>
                      {/* Candidate Master */}
                      <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 last:pb-0">
                         <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-purple-500 flex-shrink-0" />
                            <span className="w-24 text-xs font-mono font-bold text-purple-500">1900 – 2099</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Candidate Master</span>
                         </div>
                         <p className="text-xs text-slate-500 flex-1 md:pl-6 leading-relaxed">Beyond this roadmap — highly optimized templates, rapid diagnostics.</p>
                         <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 font-mono px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/20">Beyond</span>
                      </div>
                   </div>
                </div>

                {/* Weekly Time Budget */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                   <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Time Budget</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-100 dark:border-sky-900/30">
                         <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-sky-500" />
                            <span className="text-xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">2-3h</span>
                         </div>
                         <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">Daily Practice</h4>
                         <p className="text-[11px] text-slate-400">Regular training maintains high diagnostic speed and code safety.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-100 dark:border-violet-900/30">
                         <div className="flex items-center gap-2 mb-2">
                            <Flag className="w-5 h-5 text-violet-500" />
                            <span className="text-xl font-extrabold text-violet-600 dark:text-violet-400 font-mono">1 – 2</span>
                         </div>
                         <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">Contests/Week</h4>
                         <p className="text-[11px] text-slate-400">Participate live on Saturdays & Sundays or run full virtual sessions.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-100 dark:border-emerald-900/30">
                         <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <span className="text-xl font-extrabold text-emerald-500 font-mono">5+</span>
                         </div>
                         <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">Solved/Day</h4>
                         <p className="text-[11px] text-slate-400">Push through target lists on CSES collection and active blogs.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-100 dark:border-amber-900/30">
                         <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <span className="text-xl font-extrabold text-amber-500 font-mono">100%</span>
                         </div>
                         <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">Upsolve Mode</h4>
                         <p className="text-[11px] text-slate-400">Never skip a contest upsolve. Resolving missed problems is how you grow.</p>
                      </div>
                   </div>
                </div>

                {/* Core Platforms */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                   <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Core Platforms You'll Use</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Codeforces</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              Main contest hosting and ranking platform. Solve Div. 3, Div. 2, and practice virtual logs.
                            </p>
                         </div>
                         <a href="https://codeforces.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-600 dark:text-sky-400 mt-3 hover:underline">
                           &rarr; codeforces.com <ExternalLink className="h-3 w-3" />
                         </a>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">CSES Problem Set</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              300+ gold-standard problems grouped by algorithms category. Highly recommended practices.
                            </p>
                         </div>
                         <a href="https://cses.fi/problemset" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-600 dark:text-sky-400 mt-3 hover:underline">
                           &rarr; cses.fi/problemset <ExternalLink className="h-3 w-3" />
                         </a>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">AtCoder</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              Extremely clean, mathematically structured tasks. Beginner series ABC every Saturday.
                            </p>
                         </div>
                         <a href="https://atcoder.jp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-600 dark:text-sky-400 mt-3 hover:underline">
                           &rarr; atcoder.jp <ExternalLink className="h-3 w-3" />
                         </a>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">USACO Guide</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              Structured curriculums containing explanations and tags for high-perf programmers.
                            </p>
                         </div>
                         <a href="https://usaco.guide" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-600 dark:text-sky-400 mt-3 hover:underline">
                           &rarr; usaco.guide <ExternalLink className="h-3 w-3" />
                         </a>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">CP-Algorithms</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              Complete index database of competitive programming structures, proofs, and templates.
                            </p>
                         </div>
                         <a href="https://cp-algorithms.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-600 dark:text-sky-400 mt-3 hover:underline">
                           &rarr; cp-algorithms.com <ExternalLink className="h-3 w-3" />
                         </a>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">VJudge</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              Aggregated judge platform to solve problems from multiple judges inside one profile view.
                            </p>
                         </div>
                         <a href="https://vjudge.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-600 dark:text-sky-400 mt-3 hover:underline">
                           &rarr; vjudge.net <ExternalLink className="h-3 w-3" />
                         </a>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'month1' && (
              <motion.div
                key="month1-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8"
              >
                {/* Month header */}
                <div className="bg-sky-500/5 border border-sky-500/15 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm">
                   <div className="h-14 w-14 rounded-xl bg-sky-500 flex items-center justify-center text-white text-xl font-bold font-mono flex-shrink-0">M1</div>
                   <div>
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Month 1 — Foundation</h2>
                      <p className="text-xs text-slate-400 mt-0.5">C++ syntax mastery, STL collections, basic arrays, sorting and sliding windows.</p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-sky-400 mt-2 bg-sky-500/10 px-2.5 py-0.5 rounded-full">
                         Target: CF Pupil (1200 - 1399) · Solve 100+ problems
                      </span>
                   </div>
                </div>

                {/* Week lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeekCard 
                    label="Week 1 · Days 1–3"
                    title="C++ Fundamentals for CP"
                    topics={[
                      "Setup: VS Code + GCC compiler + CP standard template",
                      "Standard variables, operations, and basic Input/Output features",
                      "Fast I/O template options (ios::sync_with_stdio(0))",
                      "Conditional logic, while loops, functions, basic Recursion",
                      "Complexity modeling: Time and Space Big-O notation",
                      "Bits operations: AND, OR, XOR, logical shifts, basic mask definitions"
                    ]}
                    resources={[
                      { name: "YT: freeCodeCamp C++", url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y", type: "yt" },
                      { name: "CP-Algorithms Site", url: "https://cp-algorithms.com", type: "general" },
                      { name: "CP Handbook PDF", url: "https://cses.fi/book/book.pdf", type: "book" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 1 · Days 4–7"
                    title="STL Mastery"
                    topics={[
                      "Standard arrays, dynamic vectors, operations, and custom sizes",
                      "Hashing systems: map vs unordered_map, set vs unordered_set",
                      "Structures: stack, standard queue, deque, priority_queue heaps",
                      "Helper pairs, nested tuples, arrays of tuples, sort custom lambda",
                      "Global actions: sort, reverse, binary lower_bound and upper_bound features"
                    ]}
                    resources={[
                      { name: "YT: Striver STL C++", url: "https://www.youtube.com/watch?v=RRVYpIET_RU", type: "yt" },
                      { name: "GFG STL Guide", url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/", type: "general" },
                      { name: "CSES introductory problems list", url: "https://cses.fi/problemset", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 2 · Days 1–4"
                    title="Arrays & Two Pointers"
                    topics={[
                      "Prefix sum arrays, 2D prefix checks and differential ranges",
                      "Sliding window concepts (fixed vs variable windows)",
                      "Two pointer systems for merging/index validation tasks",
                      "Standard Binary Search templates (for ranges and exact bounds)",
                      "Sorting algorithms modeling: merge sort, quick sort mechanics"
                    ]}
                    resources={[
                      { name: "YT: TakeUForward Algorithms", url: "https://www.youtube.com/c/takeUforward", type: "yt" },
                      { name: "CSES sorting problems", url: "https://cses.fi/problemset/list/", type: "cf" },
                      { name: "CP-Algorithms: Binary Search", url: "https://cp-algorithms.com/algebra/binary-search.html", type: "book" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 2 · Days 5–7"
                    title="Strings"
                    topics={[
                      "C++ string indexing, hashing properties, substrings, collections",
                      "String hashing templates for collision free search tests",
                      "KMP template mechanics and custom prefix arrays",
                      "Anagrams, palindrome tests, cyclic permutations checking",
                      "Week benchmark: run Codeforces Div. 3 virtual session, upsolve matching tasks"
                    ]}
                    resources={[
                      { name: "YT: Abdul Bari KMP", url: "https://www.youtube.com/watch?v=GTJr8OvyEVQ", type: "yt" },
                      { name: "CP-Algorithms KMP article", url: "https://cp-algorithms.com/string/kmp.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 3 · Days 1–3"
                    title="Linked Lists"
                    topics={[
                      "Singly list structure, double structures, circular list templates",
                      "Index movements, fast and slow pointers, and Floyd's cycle testing",
                      "Reversing linked lists, merging sorted items, segment splits",
                      "LeetCode vs CP structured linked list patterns"
                    ]}
                    resources={[
                      { name: "YT: MyCodeSchool lists", url: "https://www.youtube.com/watch?v=t_ro4ATdnDA", type: "yt" },
                      { name: "GFG Linked List index", url: "https://www.geeksforgeeks.org/data-structures/linked-list/", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 3 · Days 4–7"
                    title="Stacks, Queues & Monotonic Structures"
                    topics={[
                      "Stacks: sequence validations, balanced brackets, reverse steps",
                      "Monotonic stack systems: next greater element challenges",
                      "Deque properties: Sliding window maximum tracker algorithms",
                      "Queue systems and introductory Breadth First Tree checks"
                    ]}
                    resources={[
                      { name: "YT: Monotonic Stack lessons", url: "https://www.youtube.com/watch?v=P1bAPZCgYq8", type: "yt" },
                      { name: "CSES Stack/Queue puzzles", url: "https://cses.fi/problemset/list/", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 4 · Days 1–4"
                    title="Trees & Recursion"
                    topics={[
                      "Tree properties: preorder, inorder, and postorder DFS",
                      "Breadth-first-search on trees (layer / level counts)",
                      "Binary search trees: searches, inserts, balance checks",
                      "Standard recursion paths and backtracking templates",
                      "Segment Tree previews via simple dynamic range sum query"
                    ]}
                    resources={[
                      { name: "YT: Striver Tree playlist", url: "https://www.youtube.com/c/takeUforward", type: "yt" },
                      { name: "USACO binary trees guide", url: "https://usaco.guide/bronze/intro-graphs", type: "book" },
                      { name: "CPH: Tree topics Ch.9", url: "https://cses.fi/book/book.pdf", type: "book" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 4 · Days 5–7"
                    title="Live Contest + Review"
                    topics={[
                      "Contest prep: join live/virtual CF Div 3 or AtCoder ABC contest",
                      "Diagnostic metrics: map time spent/problem, target bottlenecks",
                      "Read full editorial logs post-contest, review alternative formats",
                      "Push reviewed solutions to GitHub repository for profiling",
                      "Establish Month 1 error log entries"
                    ]}
                    resources={[
                      { name: "Codeforces Contests", url: "https://codeforces.com/contests", type: "cf" },
                      { name: "AtCoder active list", url: "https://atcoder.jp/contests", type: "atcoder" }
                    ]}
                  />
                </div>

                {/* Contest schedule */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                   <h3 className="text-sm font-extrabold flex items-center gap-2 mb-4">
                     <Trophy className="h-5 w-5 text-[#00d4ff]" />
                     Month 1 Contest Schedule
                   </h3>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                         <span className="font-extrabold">Codeforces Div. 3</span>
                         <span className="text-slate-400">2x per week (Virtual Run)</span>
                         <span className="text-sky-400 font-mono">Focus: A, B, C</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                         <span className="font-extrabold">AtCoder ABC</span>
                         <span className="text-slate-400">Every Saturday (Live Participation)</span>
                         <span className="text-violet-400 font-mono font-bold">Focus: A, B, C</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-0">
                         <span className="font-extrabold">CSES problem solver</span>
                         <span className="text-slate-400">5 introductory problems/day</span>
                         <span className="text-emerald-400 font-mono">Target: 100 solved</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'month2' && (
              <motion.div
                key="month2-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8"
              >
                {/* Month header */}
                <div className="bg-violet-500/5 border border-violet-500/15 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm">
                   <div className="h-14 w-14 rounded-xl bg-violet-600 flex items-center justify-center text-white text-xl font-bold font-mono flex-shrink-0">M2</div>
                   <div>
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Month 2 — Core Algorithms</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Graphs search types, Dynamic Programming, modular calculations, Segment Trees and Fenwick Trees.</p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-violet-400 mt-2 bg-violet-500/10 px-2.5 py-0.5 rounded-full">
                         Target: CF Specialist (1400 - 1599) · Solve Div 2 A–C consistently
                      </span>
                   </div>
                </div>

                {/* Week lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeekCard 
                    label="Week 5 · Days 1–4"
                    title="Graph Fundamentals"
                    topics={[
                      "Representation: adjacency list versus adjacency matrix benchmarks",
                      "DFS recursion: connected component counts, cycle checks, paths",
                      "BFS queue: shortest paths in unweighted coordinate systems",
                      "Bipartite graph tests, standard topological sorting arrays",
                      "DSU (Disjoint Set Union) templates with path compression mechanics"
                    ]}
                    resources={[
                      { name: "YT: WilliamFiset Graphs", url: "https://www.youtube.com/watch?v=tWVWeAqZ0WU", type: "yt" },
                      { name: "CP-Algorithms DFS guide", url: "https://cp-algorithms.com/graph/dfs.html", type: "general" },
                      { name: "CSES Graphs problems", url: "https://cses.fi/problemset/list/", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 5 · Days 5–7"
                    title="Shortest Paths"
                    topics={[
                      "Dijkstra's priority_queue shortest paths template",
                      "Bellman-Ford paths and negative cycle reports",
                      "Floyd-Warshall all-pairs matrices calculations",
                      "0-1 BFS setups for zero weight edges",
                      "USACO shortest paths problem lists upsolving"
                    ]}
                    resources={[
                      { name: "YT: Dijkstra explanations", url: "https://www.youtube.com/watch?v=XB4MIexjvY0", type: "yt" },
                      { name: "CP-Algorithms Dijkstra", url: "https://cp-algorithms.com/graph/dijkstra.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 6 · Days 1–4"
                    title="DP Foundations"
                    topics={[
                      "DP core: memoization (top-down) vs tabulation (bottom-up)",
                      "Classic: 0/1 Knapsack, unbounded Knapsack systems",
                      "LCS (Longest Common Subsequence) double vectors",
                      "LIS (Longest Increasing Subsequence) via binary lower_bound checks",
                      "Partition subsets sums matching, Coin Change optimization"
                    ]}
                    resources={[
                      { name: "YT: freeCodeCamp Dynamic Prog", url: "https://www.youtube.com/watch?v=oBt53YbR9Kk", type: "yt" },
                      { name: "YT: Errichto DP advice", url: "https://www.youtube.com/c/Errichto", type: "yt" },
                      { name: "CPH: DP Ch 6", url: "https://cses.fi/book/book.pdf", type: "book" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 6 · Days 5–7"
                    title="DP Patterns"
                    topics={[
                      "Coordinate DP (Grid maximum path systems, paths metrics)",
                      "Interval DP: matrix chain multiplication, balloon burst checks",
                      "Introductory Bitmask DP steps (matching and allocations)",
                      "Trees DP: node values, node depths matching",
                      "Striver Dynamic Programming serial classes (56 video reviews)"
                    ]}
                    resources={[
                      { name: "YT: Striver DP playlist", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY", type: "yt" },
                      { name: "CSES DP Section problems", url: "https://cses.fi/problemset/list/", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 7 · Days 1–4"
                    title="Number Theory"
                    topics={[
                      "Sieve of Eratosthenes linear checks, prime list counts",
                      "Euclid GCD, Extended GCD coefficient lookups",
                      "Modular arithmetic operations and Modular Inverse lookup",
                      "Binary Exponentiation (Fast modular power operations)",
                      "Fermat's Little Theorem bounds and applications"
                    ]}
                    resources={[
                      { name: "YT: Errichto Modular Arithmetic", url: "https://www.youtube.com/c/Errichto", type: "yt" },
                      { name: "CP Sieve article", url: "https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html", type: "general" },
                      { name: "CSES Math problem set", url: "https://cses.fi/problemset/list/", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 7 · Days 5–7"
                    title="Combinatorics & Probability"
                    topics={[
                      "Permutations, combinations arrays (nCr mod P template)",
                      "Pigeonhole Principle puzzles and applications",
                      "Inclusion-Exclusion set properties",
                      "Competitions probability variables and expected value basics",
                      "Stars and Bars allocation proofs and uses"
                    ]}
                    resources={[
                      { name: "YT: nCr combinatorics", url: "https://www.youtube.com/watch?v=8RRo6Ti9d0U", type: "yt" },
                      { name: "CPH: Combinatorics section Ch 24", url: "https://cses.fi/book/book.pdf", type: "book" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 8 · Days 1–4"
                    title="Segment Tree & BIT"
                    topics={[
                      "Fenwick Tree (Binary Indexed Tree) sum indexes",
                      "Segment Tree ranges: min/max queries, sum calculations",
                      "Lazy Propagation on Segment Trees for range updates",
                      "Sparse Table RMQ index records in O(1) time"
                    ]}
                    resources={[
                      { name: "YT: WilliamFiset Segment Trees", url: "https://www.youtube.com/watch?v=ZBHKZF5w4YU", type: "yt" },
                      { name: "CP-Algorithms: Segment Tree", url: "https://cp-algorithms.com/data_structures/segment_tree.html", type: "general" },
                      { name: "CSES Range problem set", url: "https://cses.fi/problemset/list/", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 8 · Days 5–7"
                    title="Greedy + Contest"
                    topics={[
                      "Greedy strategy benchmarks, exchange arguments criteria",
                      "Interval scheduling puzzle (maximum compatible meetings)",
                      "Huffman coding, Fractional Knapsack tests",
                      "Contest: compete in 2 live Division 2 logs, upsolve tasks A-D",
                      "Benchmark 300 problems total solved checkpoint"
                    ]}
                    resources={[
                      { name: "YT: Greedy explanations", url: "https://www.youtube.com/watch?v=HzeK7g8cD0Y", type: "yt" },
                      { name: "Codeforces Contest lists", url: "https://codeforces.com/contests", type: "cf" }
                    ]}
                  />
                </div>

                {/* Contest schedule */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                   <h3 className="text-sm font-extrabold flex items-center gap-2 mb-4">
                     <Trophy className="h-5 w-5 text-[#a855f7]" />
                     Month 2 Contest Schedule
                   </h3>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                         <span className="font-extrabold">Codeforces Div. 2</span>
                         <span className="text-slate-400">2x per week (Live + Virtual)</span>
                         <span className="text-sky-400 font-mono">Focus: A, B, C, attempt D</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                         <span className="font-extrabold">AtCoder ABC</span>
                         <span className="text-slate-400">Every Saturday</span>
                         <span className="text-violet-400 font-mono">Focus: D, E problems</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-0">
                         <span className="font-extrabold">CSES Grouping</span>
                         <span className="text-slate-400">Graphs + DP Sections check-ins</span>
                         <span className="text-emerald-400 font-mono">Target: 300 solved</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'month3' && (
              <motion.div
                key="month3-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8"
              >
                {/* Month header */}
                <div className="bg-emerald-500/5 border border-emerald-500/15 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm">
                   <div className="h-14 w-14 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl font-bold font-mono flex-shrink-0">M3</div>
                   <div>
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Month 3 — Expert Push</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Heavy graphs structures, tree lift LCA indices, complex string search, DP optimizations, and speed grinds.</p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-400 mt-2 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                         Target: CF Expert (1600 - 1899) · Solve Div 2 A–D reliably
                      </span>
                   </div>
                </div>

                {/* Week lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeekCard 
                    label="Week 9 · Days 1–4"
                    title="MST & Network Flow"
                    topics={[
                      "Kruskal's MST, Prim's alternative MST template",
                      "Network Max Flow: Ford-Fulkerson, Dinic's high-perf flow algorithms",
                      "Bridges, Articulation Points Tarjan DFS templates",
                      "Strongly Connected Components (SCC) via Tarjan & Kosaraju proofs"
                    ]}
                    resources={[
                      { name: "YT: WilliamFiset MST classes", url: "https://www.youtube.com/watch?v=JZBQLXgSGfs", type: "yt" },
                      { name: "CP Kuhn Bipartite Matching", url: "https://cp-algorithms.com/graph/kuhn_algorithm.html", type: "general" },
                      { name: "CSES Advanced graph section", url: "https://cses.fi/problemset/list/", type: "cf" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 9 · Days 5–7"
                    title="Tree Algorithms"
                    topics={[
                      "LCA (Lowest Common Ancestor) binary lifting template",
                      "Euler Tour tree flattening algorithms",
                      "Heavy-Light Decomposition (HLD) concepts",
                      "Tree Centroid Decomposition introductory exercises"
                    ]}
                    resources={[
                      { name: "YT: LCA Binary Lifting", url: "https://www.youtube.com/watch?v=dOAxrhAUIhA", type: "yt" },
                      { name: "CP LCA article", url: "https://cp-algorithms.com/graph/lca.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 10 · Days 1–4"
                    title="DP Optimizations"
                    topics={[
                      "Divide and Conquer dynamic programming optimization benchmarks",
                      "Convex Hull Trick (CHT) lines dynamic slopes matching",
                      "Dynamic Programming on Directed Acyclic Graphs (DAGs)",
                      "Profile DP / broken profile dynamic systems checks",
                      "SOS DP (Sum over Subsets) bitmask indices actions"
                    ]}
                    resources={[
                      { name: "YT: Colin Galen DP lessons", url: "https://www.youtube.com/c/ColinGalen", type: "yt" },
                      { name: "CP D&C DP optimization", url: "https://cp-algorithms.com/dynamic_programming/divide-and-conquer-dp.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 10 · Days 5–7"
                    title="String Algorithms"
                    topics={[
                      "Z-function and search index lookups",
                      "Suffix Array SA-IS linear templates",
                      "Aho-Corasick multiple strings lookup automaton",
                      "Manacher's longest palindrome search in O(N)",
                      "Rolling polynomial string hashes templates"
                    ]}
                    resources={[
                      { name: "YT: Z-algorithm guides", url: "https://www.youtube.com/watch?v=V5-7GzOfADQ", type: "yt" },
                      { name: "CP Suffix Array article", url: "https://cp-algorithms.com/string/suffix-array.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 11 · Days 1–4"
                    title="Binary Search on Answer"
                    topics={[
                      "Binary Search on Answer boundary conditions setup",
                      "Ternary Search unimodal ranges checks",
                      "Meet-in-the-middle subset selections (O(2^(N/2)))",
                      "Sqrt decomposition (Mo's algorithm offline coordinate queries)",
                      "Offline query processing patterns"
                    ]}
                    resources={[
                      { name: "YT: Binary search answer guidelines", url: "https://www.youtube.com/watch?v=GU7DpgHINWQ", type: "yt" },
                      { name: "CP Ternary search article", url: "https://cp-algorithms.com/num_methods/ternary_search.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 11 · Days 5–7"
                    title="Advanced Math & Geometry"
                    topics={[
                      "Sprague-Grundy numbers (Nim game calculations, state matrices)",
                      "Matrix Exponentiation for linear recurrence relations in O(log N)",
                      "Computational Geometry coordinates sorting, cross products",
                      "Convex Hull Graham scan, Monotone chain formulas",
                      "Chinese Remainder Theorem modular solutions"
                    ]}
                    resources={[
                      { name: "CP Matrix exponentiation", url: "https://cp-algorithms.com/algebra/matrix-exp.html", type: "general" },
                      { name: "CP Convex Hull Graham", url: "https://cp-algorithms.com/geometry/convex_hull.html", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 12 · Days 1–4"
                    title="Virtual Contest Marathon"
                    topics={[
                      "Simulate under stress: join 5 virtual Div 1 + Div 2 runs this week",
                      "Enforce strict 2.5 hours contest time limit",
                      "Manage split targets: implement 15-minute diagnostic limits",
                      "Perform rigorous editorial upsolves for Div 2 problem D and E tasks exclusively"
                    ]}
                    resources={[
                      { name: "CF Virtual Contest lists", url: "https://codeforces.com/contests", type: "cf" },
                      { name: "VJudge Virtual runner", url: "https://vjudge.net", type: "general" }
                    ]}
                  />

                  <WeekCard 
                    label="Week 12 · Days 5–7"
                    title="Weak Spot Hunting"
                    topics={[
                      "Identify weakest topics using Month 1-2 error journal logs",
                      "Execute intensive 30-problem custom tag sprint",
                      "Compile full templates archive collections, commit to GitHub profile",
                      "Formulate next 3-month target schedule: candidate master CM 1900+ target"
                    ]}
                    resources={[
                      { name: "CF custom topic search", url: "https://codeforces.com/problemset?tags=dp", type: "cf" },
                      { name: "A2OJ Rating ladders", url: "https://a2oj.netlify.app", type: "general" }
                    ]}
                  />
                </div>

                {/* Contest schedule */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
                   <h3 className="text-sm font-extrabold flex items-center gap-2 mb-4">
                     <Trophy className="h-5 w-5 text-[#10b981]" />
                     Month 3 Contest Schedule
                   </h3>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                         <span className="font-extrabold">Codeforces Div. 1 + 2</span>
                         <span className="text-slate-400">3-4x per week (Virtual Sprint)</span>
                         <span className="text-sky-400 font-mono">Push for D every time</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                         <span className="font-extrabold">AtCoder ARC / AGC</span>
                         <span className="text-slate-400">Every 2 weeks</span>
                         <span className="text-violet-400 font-mono">ARC D & E problems</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-0">
                         <span className="font-extrabold">ICPC Regional Tests</span>
                         <span className="text-slate-400">Complete past year regionals</span>
                         <span className="text-emerald-400 font-mono">Target: 500+ solved total</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'git' && (
              <motion.div
                key="git-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8"
              >
                {/* Git Header */}
                <div className="bg-amber-500/5 border border-amber-500/15 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-sm">
                   <div className="h-14 w-14 rounded-xl bg-amber-500 flex items-center justify-center text-white text-xl font-bold font-mono flex-shrink-0">GIT</div>
                   <div>
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Git & GitHub for CP Portfolio</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Learn how to model folder structures, sync templates, log error archives, and showcase rating indices on user profile views.</p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-500 mt-2 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                         Practice from Week 1 to Month 3
                      </span>
                   </div>
                </div>

                {/* Git workflow cards */}
                <div className="space-y-6">
                   {/* Phase 1 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Phase 1 — Setup (Day 1)</h3>
                      <div className="relative">
                         <button 
                            onClick={() => handleCopy('git config --global user.name "Your Name"\ngit config --global user.email "you@email.com"\n\nmkdir competitive-programming && cd competitive-programming\ngit init\ngit remote add origin https://github.com/USERNAME/cp-solutions.git', 'git_setup')}
                            className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white transition-all active:scale-95"
                            title="Copy code"
                            aria-label="Copy code"
                         >
                            <AnimatePresence mode="wait">
                               {copiedText === 'git_setup' ? (
                                 <motion.div
                                    key="check"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                 >
                                    <Check className="h-4 w-4 text-emerald-400" />
                                 </motion.div>
                               ) : (
                                 <motion.div
                                    key="copy"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                 >
                                    <Copy className="h-4 w-4" />
                                 </motion.div>
                               )}
                            </AnimatePresence>
                         </button>
                         <pre className="p-4 rounded-xl bg-slate-950 text-sky-400 font-mono text-[11px] leading-relaxed overflow-x-auto">
                            <code>
{`# Install Git and configure identity
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

# Create your CP repository
mkdir competitive-programming && cd competitive-programming
git init
git remote add origin https://github.com/USERNAME/cp-solutions.git`}
                            </code>
                         </pre>
                      </div>
                      <ul className="list-disc pl-5 text-xs text-slate-500 mt-3 space-y-2 leading-relaxed">
                         <li>Install Git client, create free account on GitHub portal.</li>
                         <li>Set up authorization using secure SSH key sets.</li>
                      </ul>
                   </div>

                   {/* Phase 2 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Phase 2 — Repo Structure</h3>
                      <pre className="p-4 rounded-xl bg-slate-950 text-pink-400 font-mono text-[11px] leading-relaxed overflow-x-auto">
                         <code>
{`competitive-programming/
├── codeforces/
│   ├── div3/
│   └── div2/
├── cses/
│   ├── sorting/
│   └── graphs/
├── atcoder/
├── templates/   # contains your dynamic CP template.cpp
└── notes/       # markdown notes and problem WA diagnostics .md`}
                         </code>
                      </pre>
                   </div>

                   {/* Phase 3 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Phase 3 — Daily Commit Workflow</h3>
                      <div className="relative">
                         <button 
                            onClick={() => handleCopy('git add codeforces/div2/1900A.cpp\ngit commit -m "CF 1900A: prefix sum, O(n)"\ngit push origin main\n\ngit checkout -b feature/segment-tree', 'git_commit')}
                            className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white transition-all active:scale-95"
                            title="Copy code"
                            aria-label="Copy code"
                         >
                            <AnimatePresence mode="wait">
                               {copiedText === 'git_commit' ? (
                                 <motion.div
                                    key="check"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                 >
                                    <Check className="h-4 w-4 text-emerald-400" />
                                 </motion.div>
                               ) : (
                                 <motion.div
                                    key="copy"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                 >
                                    <Copy className="h-4 w-4" />
                                 </motion.div>
                               )}
                            </AnimatePresence>
                         </button>
                         <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto">
                            <code>
{`# After solving each problem, commit instantly
git add codeforces/div2/1900A.cpp
git commit -m "CF 1900A: prefix sum, O(n)"
git push origin main

# Standard branching to experiment
git checkout -b feature/segment-tree`}
                            </code>
                         </pre>
                      </div>
                   </div>

                   {/* Phase 4 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Phase 4 — GitHub Profile as CP Portfolio</h3>
                      <ul className="list-disc pl-5 text-xs text-slate-500 space-y-2 leading-relaxed">
                         <li>Pin your solutions repository to the landing page of your GitHub profile.</li>
                         <li>Write a comprehensive README.md. Showcase Codeforces handles, live level badges, and CSES count totals.</li>
                         <li>Use automated GitHub actions to build index metrics.</li>
                      </ul>
                   </div>
                </div>

                {/* Git Resources Grid */}
                <div>
                   <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Git Essential Resources</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                           <Library className="h-4 w-4 text-amber-500" />
                           Learning Links
                         </h4>
                         <div className="space-y-2">
                            <a href="https://learngitbranching.js.org" target="_blank" rel="noopener noreferrer" className="block text-xs text-primary-600 dark:text-sky-450 hover:underline">
                              &rarr; Learn Git Branching (Interactive Visualizer)
                            </a>
                            <a href="https://www.youtube.com/watch?v=RGOj5yH7evk" target="_blank" rel="noopener noreferrer" className="block text-xs text-primary-600 dark:text-sky-450 hover:underline">
                              &rarr; YT: freeCodeCamp Git Full Course (1 hour)
                            </a>
                         </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                           <Info className="h-4 w-4 text-indigo-500" />
                           Commands cheatsheets
                         </h4>
                         <div className="space-y-2">
                            <a href="https://education.github.com/git-cheat-sheet-education.pdf" target="_blank" rel="noopener noreferrer" className="block text-xs text-primary-600 dark:text-sky-450 hover:underline">
                              &rarr; GitHub Official Git Cheat Sheet PDF
                            </a>
                            <a href="https://ohshitgit.com" target="_blank" rel="noopener noreferrer" className="block text-xs text-primary-600 dark:text-sky-450 hover:underline">
                              &rarr; Oh Shit, Git! (Mistakes corrections guide)
                            </a>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                key="resources-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8"
              >
                {/* Book links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <BookOpenCheck className="h-5 w-5 text-sky-500" />
                        Core Written Books
                      </h3>
                      <div className="space-y-4">
                         <div>
                            <a href="https://cses.fi/book/book.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               Competitive Programmer's Handbook <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">By Antti Laaksonen — Completely FREE. Best introductory book index.</span>
                         </div>
                         <div>
                            <a href="https://usaco.guide" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               USACO Study Guide <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Modular problem indexes with step guidance from USACO team.</span>
                         </div>
                         <div>
                            <a href="https://cp-algorithms.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               CP-Algorithms Encyclopedia <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Essential database cataloging algorithms with proof codes.</span>
                         </div>
                      </div>
                   </div>

                   <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-violet-500" />
                        Problem Archives
                      </h3>
                      <div className="space-y-4">
                         <div>
                            <a href="https://cses.fi/problemset" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               CSES Gold-Collection Problemset <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Every category covered. Top curriculum for algorithm implementations.</span>
                         </div>
                         <div>
                            <a href="https://codeforces.com/problemset" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               Codeforces problems filter <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Filter using difficulty ratings (800 - 2200+) and topic tag collections.</span>
                         </div>
                         <div>
                            <a href="https://a2oj.netlify.app" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               A2OJ ladder system <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Problems sorted strictly based on rating ranges. Step up levels.</span>
                         </div>
                      </div>
                   </div>

                   <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-emerald-500" />
                        Aids & Templates
                      </h3>
                      <div className="space-y-4">
                         <div>
                            <a href="https://github.com/the-hyp0cr1t3/CC" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               CC Template Library (GitHub) <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Maintained C++ macro definitions and data structure templates.</span>
                         </div>
                         <div>
                            <a href="https://vjudge.net" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               Vjudge Virtual platform <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="block text-[10px] text-slate-400 mt-1">Bundle and host mock challenges importing sources from outer judges.</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Channels */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                   <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                     <Youtube className="h-5 w-5 text-red-500" />
                     Essential YouTube Educational Channels
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                         <div>
                            <a href="https://www.youtube.com/@Errichto" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               Errichto Algorithms <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">Advice segments, interactive contest streams, solutions visualizers, and complexity guidelines.</p>
                         </div>
                         <div>
                            <a href="https://www.youtube.com/@ColinGalen" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               Colin Galen channel <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">Explains intuition behind difficult steps. Highly educational Dynamic Programming logs.</p>
                         </div>
                         <div>
                            <a href="https://www.youtube.com/@WilliamFiset-videos" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               William Fiset videos <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">Pristine visual guides for graph searches, DAG topological processes, and MST logic.</p>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <div>
                            <a href="https://www.youtube.com/@takeUforward" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               TakeUForward (Striver) <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">Outstanding step-by-step algorithms, Knapsack matrices paths, and arrays searches.</p>
                         </div>
                         <div>
                            <a href="https://www.youtube.com/@AbdulBari_" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               Abdul Bari <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">Legendary core computer science algorithm models. Clear, diagrammatic blackboard guides.</p>
                         </div>
                         <div>
                            <a href="https://www.youtube.com/@NeetCode" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                               NeetCode <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">Detailed diagnostics for interview questions and classic arrays indices solutions.</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Communities */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                   <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Blogs & community coordinates</h3>
                   <div className="space-y-2 text-xs">
                      <a href="https://codeforces.com/blog" target="_blank" rel="noopener noreferrer" className="block text-primary-600 dark:text-sky-400 hover:underline">
                         &rarr; Codeforces Blog list (active catalog of algorithms tutorials and comments)
                      </a>
                      <a href="https://discord.gg/cp" target="_blank" rel="noopener noreferrer" className="block text-primary-600 dark:text-sky-400 hover:underline">
                         &rarr; Competitive Programming Discord channels (hints, editorials discussion rooms)
                      </a>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'checklist' && (
              <motion.div
                key="checklist-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-8"
              >
                {/* Master Checklist title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                   <div>
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Master Checklists</h2>
                      <p className="text-xs text-slate-400 mt-1">Cross off algorithm components as you gain comfort. Progress saves locally.</p>
                   </div>
                   <div className="text-left md:text-right min-w-[200px]">
                      <div className="font-mono text-sm font-bold text-slate-600 dark:text-slate-350">// completed topics</div>
                      <div className="flex items-baseline gap-1 mt-1">
                         <span className="text-2xl font-extrabold font-mono text-sky-500">{completedCount}</span>
                         <span className="text-xs text-slate-500 font-medium">of 45 complete</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
                         <div className="h-full bg-gradient-to-r from-sky-450 via-violet-500 to-emerald-500 transition-all duration-300" style={{ width: `${completionPercentage}%` }} />
                      </div>
                   </div>
                </div>

                {/* Checkboxes grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {/* Month 1 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-500 pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
                        🔵 Month 1 — Foundation
                      </h3>
                      <div className="space-y-2.5">
                         {checklistData.month1.map(item => {
                            const isDone = completed[item.id];
                            return (
                              <label key={item.id} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer group select-none">
                                 <input 
                                    type="checkbox" 
                                    checked={isDone || false}
                                    onChange={() => handleToggle(item.id)}
                                    className="mt-1 flex-shrink-0 h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-700 text-sky-500 focus:ring-sky-500/30 accent-sky-500"
                                 />
                                 <span className={cn(
                                   "leading-relaxed transition-all",
                                   isDone ? "text-emerald-500 font-medium line-through opacity-60" : "group-hover:text-slate-900 dark:group-hover:text-slate-200"
                                 )}>
                                   {item.text}
                                 </span>
                              </label>
                            );
                         })}
                      </div>
                   </div>

                   {/* Month 2 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#a855f7] pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4" style={{ color: '#a855f7' }}>
                        🟣 Month 2 — Core Algorithms
                      </h3>
                      <div className="space-y-2.5">
                         {checklistData.month2.map(item => {
                            const isDone = completed[item.id];
                            return (
                              <label key={item.id} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer group select-none">
                                 <input 
                                    type="checkbox" 
                                    checked={isDone || false}
                                    onChange={() => handleToggle(item.id)}
                                    className="mt-1 flex-shrink-0 h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-700 text-primary-500 focus:ring-primary-500/30 accent-violet-600"
                                 />
                                 <span className={cn(
                                   "leading-relaxed transition-all",
                                   isDone ? "text-emerald-500 font-medium line-through opacity-60" : "group-hover:text-slate-900 dark:group-hover:text-slate-200"
                                 )}>
                                   {item.text}
                                 </span>
                              </label>
                            );
                         })}
                      </div>
                   </div>

                   {/* Month 3 */}
                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
                        🟢 Month 3 — Expert Push
                      </h3>
                      <div className="space-y-2.5">
                         {checklistData.month3.map(item => {
                            const isDone = completed[item.id];
                            return (
                              <label key={item.id} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer group select-none">
                                 <input 
                                    type="checkbox" 
                                    checked={isDone || false}
                                    onChange={() => handleToggle(item.id)}
                                    className="mt-1 flex-shrink-0 h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-700 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500"
                                 />
                                 <span className={cn(
                                   "leading-relaxed transition-all",
                                   isDone ? "text-emerald-500 font-medium line-through opacity-60" : "group-hover:text-slate-900 dark:group-hover:text-slate-200"
                                 )}>
                                   {item.text}
                                 </span>
                              </label>
                            );
                         })}
                      </div>
                   </div>
                </div>

                {/* Expert Mindset tips */}
                <div>
                   <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Expert Mindset Tips</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                           <Clock className="h-4.5 w-4.5 text-primary-500" />
                           The 20-Minute Rule
                         </h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                           If you've been stuck completely on a single task for 20-30 minutes with zero progression angles, read the editorial. Implement the solution afterwards. Depth builds expertise.
                         </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                           <Trophy className="h-4.5 w-4.5 text-amber-500" />
                           Always Upsolve
                         </h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                           Make sure to expand your active limits. Upsolving what you failed to write in a contest is the highest ROI practice in CP. Settle every single block.
                         </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                           <Sparkles className="h-4.5 w-4.5 text-violet-500" />
                           Tourist's Secret
                         </h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                           Gennady tourist Korotkevich mastered single topics fully before transitioning. Depth first. Keep training sessions focused up to 3-4 hours to prevent burnouts.
                         </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                           <Target className="h-4.5 w-4.5 text-emerald-500" />
                           Solve by Difficulty
                         </h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                           Target problems resting slightly above your current comfort range. Re-solving easy targets doesn't expand cognitive bounds.
                         </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                           <BookOpen className="h-4.5 w-4.5 text-red-500" />
                           Error Journaling
                         </h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                           Keep a detailed log describing WA reasons, missed bounds, TLE occurrences. Catalog pattern errors to never repeat mistakes.
                         </p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                           <Flame className="h-4.5 w-4.5 text-orange-500" />
                           Compete Under Stress
                         </h4>
                         <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                           Diagnostic speeds under time pressure represent a core skill. Practicing in completely comfortable timelines hides actual benchmarks.
                         </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// HELPER WEEK CARD COMPONENT
const WeekCard: React.FC<WeekCardProps> = ({ label, title, topics, resources }) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
       <div>
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">// {label}</span>
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white mb-4">{title}</h3>
          <ul className="space-y-2 mb-6">
             {topics.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                   <ChevronRight className="h-3.5 w-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                   <span>{t}</span>
                </li>
             ))}
          </ul>
       </div>

       <div>
          {resources && resources.length > 0 && (
             <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block mb-2.5">Key Resources</span>
                <div className="flex flex-wrap gap-2">
                   {resources.map((res, idx) => {
                      const isYT = res.type === 'yt';
                      const isBook = res.type === 'book';
                      return (
                        <a 
                           key={idx} 
                           href={res.url} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className={cn(
                             "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md border",
                             isYT 
                               ? "bg-red-500/5 text-red-500 border-red-500/20 hover:bg-red-500/10" 
                               : isBook 
                                 ? "bg-amber-500/5 text-amber-500 border-amber-500/20 hover:bg-amber-500/10" 
                                 : "bg-sky-500/5 text-sky-500 border-sky-500/20 hover:bg-sky-500/10"
                           )}
                        >
                           {isYT ? <Youtube className="h-3 w-3" /> : isBook ? <BookOpen className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                           {res.name}
                        </a>
                      );
                   })}
                </div>
             </div>
          )}
       </div>
    </div>
  );
};
