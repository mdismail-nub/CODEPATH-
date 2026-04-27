import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppStateProvider } from './AppStateContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Topics } from './pages/Topics';
import { TopicDetail } from './pages/TopicDetail';
import { RoadmapPage } from './pages/RoadmapPage';
import { Certificates } from './pages/Certificates';
import { AdminDashboard } from './pages/AdminDashboard';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <AppStateProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-primary-500/30 selection:text-primary-900 dark:selection:bg-sky-500/30 dark:selection:text-sky-200 transition-colors duration-300">
          <Navbar />
          <main className="mx-auto max-w-screen-2xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topic/:slug" element={<TopicDetail />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          <footer className="mt-40 border-t border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50 py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 subtle-grid opacity-5" />
            <div className="mx-auto max-w-7xl px-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-10">
                   <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary-600 dark:bg-sky-400 text-white dark:text-slate-950 font-bold shadow-lg shadow-primary-600/20 dark:shadow-sky-500/20">CP</div>
                   <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">CodePath.</span>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed font-medium">
                  Practice coding problems and follow learning paths to become a better software engineer.
                </p>

                <div className="h-px w-20 bg-slate-200 dark:bg-slate-800 my-12" />
                
                <div className="flex flex-wrap justify-center gap-12">
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-6 font-mono">Learning</h4>
                    <ul className="space-y-4">
                       <li><Link to="/topics" className="text-sm font-bold text-slate-600 dark:text-slate-500 hover:text-primary-600 dark:hover:text-sky-400 transition-colors">All Courses</Link></li>
                       <li><Link to="/roadmap" className="text-sm font-bold text-slate-600 dark:text-slate-500 hover:text-primary-600 dark:hover:text-sky-400 transition-colors">Your Path</Link></li>
                    </ul>
                  </div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-6 font-mono">My Account</h4>
                    <ul className="space-y-4">
                       <li><Link to="/dashboard" className="text-sm font-bold text-slate-600 dark:text-slate-500 hover:text-primary-600 dark:hover:text-sky-400 transition-colors">My Progress</Link></li>
                       <li><Link to="/certificates" className="text-sm font-bold text-slate-600 dark:text-slate-500 hover:text-primary-600 dark:hover:text-sky-400 transition-colors">My Certificates</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 w-full flex flex-col md:flex-row items-center justify-between gap-6">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-700 font-mono">© 2026 CodePath</span>
                   <div className="flex gap-8">
                     <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-700 hover:text-primary-600 dark:hover:text-sky-400 transition-colors">Privacy</a>
                     <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-700 hover:text-primary-600 dark:hover:text-sky-400 transition-colors">Terms</a>
                   </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppStateProvider>
  );
}
