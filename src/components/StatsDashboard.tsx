import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, CheckCircle2, CircleDashed, LayoutGrid } from 'lucide-react';
import { TOPICS } from '../data';
import { useAppState } from '../AppStateContext';

export const StatsDashboard = () => {
  const { stats, theme } = useAppState();

  const data = useMemo(() => {
    const totalProblems = TOPICS.reduce((sum, topic) => sum + topic.problems.length, 0);
    const solvedCount = stats.solvedIds.length;
    const remainingCount = totalProblems - solvedCount;
    const isDark = theme === 'dark';

    return [
      { name: 'Solved', value: solvedCount, color: isDark ? '#38bdf8' : '#0284c7' },
      { name: 'Remaining', value: remainingCount, color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)' },
    ];
  }, [stats.solvedIds, theme]);

  const total = TOPICS.reduce((sum, topic) => sum + topic.problems.length, 0);
  const solved = stats.solvedIds.length;
  const percent = Math.round((solved / total) * 100) || 0;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="col-span-1 rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 lg:col-span-2 group relative overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-400/5 dark:bg-sky-400/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Analytics.</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">Real-time aggregate data review.</p>
          </div>
          <div className="h-16 w-16 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary-600 dark:text-sky-400 shadow-sm dark:shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Trophy className="h-8 w-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group/card transition-all hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none">
            <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter mb-2">{total}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">Inventory</span>
          </div>
          <div className="p-8 rounded-[2rem] bg-primary-50 dark:bg-sky-400/5 border border-primary-100 dark:border-sky-400/10 flex flex-col items-center justify-center text-center group/card transition-all hover:bg-primary-100 dark:hover:bg-sky-400/10 hover:border-primary-200 dark:hover:border-sky-400/20 shadow-sm dark:shadow-xl dark:shadow-sky-500/5">
            <div className="flex items-center gap-3 text-primary-600 dark:text-sky-400">
              <span className="text-5xl font-bold tracking-tighter mb-2">{solved}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-sky-500">Solved</span>
          </div>
          <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group/card transition-all hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none">
            <span className="text-5xl font-bold text-slate-400 dark:text-slate-700 tracking-tighter mb-2">{total - solved}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">Unsolved</span>
          </div>
        </div>
      </div>

      <div className="rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm dark:shadow-none transition-colors duration-300">
        <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
          <LayoutGrid className="h-40 w-40 text-slate-900 dark:text-white" />
        </div>
        
        <div className="relative h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                  border: theme === 'dark' ? '1px solid #1e293b' : '1px solid #e2e8f0', 
                  borderRadius: '16px', 
                  padding: '12px' 
                }}
                itemStyle={{ color: theme === 'dark' ? '#f8fafc' : '#0f172a', fontWeight: 'bold', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">{percent}%</span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Audit</span>
          </div>
        </div>
        
        <div className="mt-8 w-full space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Solved</span>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{solved}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.02] shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-800" />
              <span className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Unsolved</span>
            </div>
            <span className="text-sm font-bold text-slate-500">{total - solved}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
