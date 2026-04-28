import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useAppState } from '../AppStateContext';
import { TOPICS } from '../data';
import { 
  Trophy, 
  Flame, 
  Target, 
  Download, 
  ShieldCheck,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Dashboard = () => {
  const { stats, user } = useAppState();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const totalSolved = stats.solvedIds.length;
  const totalProblems = TOPICS.reduce((acc, topic) => acc + topic.problems.length, 0);
  const totalProgress = Math.round((totalSolved / totalProblems) * 100);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const history = stats.solvedAt || {};
  const solvesByDate: Record<string, number> = {};
  Object.values(history).forEach((timestamp: any) => {
    if (timestamp) {
      const dateStr = formatDate(new Date(timestamp));
      solvesByDate[dateStr] = (solvesByDate[dateStr] || 0) + 1;
    }
  });

  const calculateStreak = () => {
    let streak = 0;
    let current = new Date();
    
    if (solvesByDate[formatDate(current)]) {
      streak++;
    } else {
      current.setDate(current.getDate() - 1);
      if (!solvesByDate[formatDate(current)]) return 0;
      streak++;
    }

    while (true) {
      current.setDate(current.getDate() - 1);
      if (solvesByDate[formatDate(current)]) {
        streak++;
      } else {
        break;
      }
      if (streak > 365) break;
    }
    return streak;
  };

  const streak = calculateStreak();

  const heatmapData = Array.from({ length: 154 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (153 - i));
    const dateStr = formatDate(d);
    const count = solvesByDate[dateStr] || 0;
    return {
      active: count > 0,
      value: Math.min(count, 4),
      date: dateStr
    };
  });

  const downloadProgress = async () => {
    if (!reportRef.current) return;

    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 3,
      logging: false,
      useCORS: true,
      allowTaint: true,
      ignoreElements: (element) => element.classList.contains('no-export'),
      onclone: (clonedDoc) => {
        const style = clonedDoc.createElement('style');
        style.innerHTML = `
          * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; transition: none !important; animation: none !important; }
          .text-gray-500 { color: #6b7280 !important; }
          .text-gray-900 { color: #111827 !important; }
          .bg-blue-600 { background-color: #2563eb !important; }
          .bg-gray-50 { background-color: #f9fafb !important; }
          .border-gray-100 { border-color: #f3f4f6 !important; }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${user.displayName || 'User'}_Progress_Report.pdf`);
  };

  const topicsCompleted = TOPICS.filter(t => 
    t.problems.every(p => stats.solvedIds.includes(p.id))
  ).length;

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <header className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 pt-12">
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20 mb-6">
              User Dashboard
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 font-outfit">My Progress</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              Track your learning journey, view your stats, and monitor your consistency.
            </p>
          </div>
          <button
            onClick={downloadProgress}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-6 py-4 text-sm font-semibold text-white dark:text-slate-900 shadow-sm hover:bg-gray-700 dark:hover:bg-slate-100 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Stats Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 mb-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Target className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{totalSolved}</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Solved</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 mb-6 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{streak} Days</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Streak</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 mb-6 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{topicsCompleted}</div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Mastery</div>
              </motion.div>
            </div>

            {/* Heatmap */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                 <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Activity Graph</h3>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0.2, 0.4, 0.7, 1].map(v => (
                        <div key={v} className="h-3 w-3 rounded-[2px] bg-blue-600 dark:bg-blue-400" style={{ opacity: v }} />
                      ))}
                    </div>
                    <span>More</span>
                 </div>
               </div>

               <div className="flex flex-wrap gap-[3px]">
                 {heatmapData.map((day, i) => (
                   <div
                     key={i}
                     className={cn(
                       "h-[13px] w-[13px] rounded-[2px] transition-all relative group cursor-help",
                       !day.active ? "bg-gray-100 dark:bg-slate-800" :
                       day.value === 1 ? "bg-blue-600/30 dark:bg-blue-400/30" :
                       day.value === 2 ? "bg-blue-600/55 dark:bg-blue-400/55" :
                       day.value === 3 ? "bg-blue-600/80 dark:bg-blue-400/80" :
                       "bg-blue-600 dark:bg-blue-400"
                     )}
                   >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-900 text-[10px] text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20 shadow-lg">
                        {day.date}: {solvesByDate[day.date] || 0} solved
                      </div>
                   </div>
                 ))}
               </div>
               <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">Practice consistency over the last six months.</p>
            </div>
          </div>

          {/* Sub Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Proficiency</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Overall Progress</p>
                 </div>
              </div>

              <div className="space-y-6">
                {TOPICS.slice(0, 6).map((topic) => {
                  const solvedCount = topic.problems.filter(p => stats.solvedIds.includes(p.id)).length;
                  const percent = Math.round((solvedCount / topic.problems.length) * 100);
                  
                  return (
                    <div key={topic.id}>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{topic.name}</span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">{percent}%</span>
                       </div>
                       <div className="h-2 w-full bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 1 }}
                            className={cn(
                              "h-full rounded-full bg-blue-600 dark:bg-blue-400",
                              percent === 100 && "bg-green-500 dark:bg-green-500"
                            )} 
                          />
                       </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-center">
                 <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Success Rate</div>
                 <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalProgress}%</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Progress Report PDF (Hidden) */}
      <div className="fixed -left-[4000px] top-0">
        <div ref={reportRef} className="w-[800px] bg-white p-20 text-gray-900 font-sans border-[20px] border-gray-50">
          <div className="flex items-start justify-between border-b-2 border-gray-100 pb-12 mb-12">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Progress Report</p>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-8 font-outfit">My Progress.</h1>
              <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full" />
                Authenticated Record: {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="h-20 w-20 bg-gray-900 rounded-3xl flex items-center justify-center">
              <Trophy className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="mb-16">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Participant</p>
            <h2 className="text-4xl font-bold text-gray-900">{user.displayName}</h2>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-20">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Overall Progress</div>
              <div className="text-5xl font-bold text-gray-900">{totalProgress}%</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Total Solved</div>
              <div className="text-5xl font-bold text-gray-900">{totalSolved}</div>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Active Streak</div>
              <div className="text-5xl font-bold text-gray-900">{streak}d</div>
            </div>
          </div>

          <div>
             <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-8 pb-4 border-b border-gray-100">Top Module Performance</h3>
             <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {TOPICS.slice(0, 10).map(topic => {
                  const solvedCount = topic.problems.filter(p => stats.solvedIds.includes(p.id)).length;
                  const percent = Math.round((solvedCount / topic.problems.length) * 100);
                  return (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">{topic.name}</span>
                        <div className="h-1.5 w-32 bg-gray-100 rounded-full">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600 font-mono">{percent}%</span>
                    </div>
                  );
                })}
             </div>
          </div>

          <div className="mt-32 pt-12 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                <ShieldCheck className="h-7 w-7 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Verification ID</p>
                <p className="text-sm font-mono text-gray-900">CP-AUTH-{user.uid.slice(0, 8).toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Platform Verification</p>
              <div className="text-2xl font-bold text-gray-900">CodePath Archive</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
