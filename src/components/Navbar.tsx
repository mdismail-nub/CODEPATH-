import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutGrid, BookOpen, BarChart3, Settings, LogOut, User, Award, Home as HomeIcon, Sun, Moon, Calendar, Target, ChevronRight, Github } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const { stats, theme, toggleTheme, loginWithGitHub, logout } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Problems', path: '/topics', icon: LayoutGrid },
    { name: 'Path', path: '/roadmap', icon: Target },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Certificates', path: '/certificates', icon: Award },
  ];

  const isLandingPage = location.pathname === '/';

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isLandingPage 
        ? "bg-transparent border-transparent py-4" 
        : "bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-0"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-600/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight transition-colors",
              isLandingPage ? "text-white" : "text-slate-900 dark:text-white"
            )}>CodePath</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  location.pathname === link.path
                    ? (isLandingPage ? "bg-white/10 text-white" : "bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400")
                    : (isLandingPage ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white")
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}

            <div className={cn(
              "h-6 w-px mx-4 transition-colors",
              isLandingPage ? "bg-white/10" : "bg-slate-200 dark:bg-slate-800"
            )} />

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  isLandingPage 
                    ? "text-slate-300 hover:text-white hover:bg-white/5" 
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' || isLandingPage ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {stats.github ? (
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 dark:border-slate-800">
                   <div className="flex flex-col items-end">
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest", isLandingPage ? "text-slate-400" : "text-slate-500")}>@{stats.github.username}</span>
                      <button 
                        onClick={logout}
                        className={cn("text-[9px] font-bold uppercase tracking-tighter hover:underline", isLandingPage ? "text-white/60" : "text-slate-400 hover:text-red-500")}
                      >
                        Sign Out
                      </button>
                   </div>
                   <img 
                    src={stats.github.avatar} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-lg border border-slate-200 dark:border-white/10 ring-2 ring-primary-500/20"
                   />
                </div>
              ) : (
                <button
                  onClick={loginWithGitHub}
                  className={cn(
                    "ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                    isLandingPage 
                      ? "bg-white text-slate-900 hover:bg-slate-100" 
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 shadow-lg shadow-slate-900/10"
                  )}
                >
                  <Github className="h-4 w-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isLandingPage ? "text-slate-300 hover:bg-white/5" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' || isLandingPage ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-3 rounded-xl transition-colors",
                isLandingPage ? "text-slate-300 hover:bg-white/10" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 top-16 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden absolute top-16 left-4 right-4 z-50 bg-white dark:bg-[#020617] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/20 overflow-hidden mt-2"
            >
              <div className="p-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all border border-transparent",
                    location.pathname === '/' ? "bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-sky-400 border-slate-200 dark:border-slate-700" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <HomeIcon className="h-5 w-5" />
                  </div>
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold transition-all border border-transparent",
                      location.pathname === link.path
                        ? "bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-sky-400 border-slate-200 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "h-9 w-9 flex items-center justify-center rounded-xl border transition-colors",
                      location.pathname === link.path ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700" : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800"
                    )}>
                      <link.icon className="h-4 w-4" />
                    </div>
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  {stats.github ? (
                    <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={stats.github.avatar} alt="Avatar" className="h-10 w-10 rounded-xl" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">@{stats.github.username}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Logged in</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { loginWithGitHub(); setIsOpen(false); }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                    >
                      <Github className="h-5 w-5" />
                      Sign In with GitHub
                    </button>
                  )}

                  <button
                    onClick={() => { toggleTheme(); setIsOpen(false); }}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold"
                    aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-indigo-500" />}
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
