import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Rocket, LayoutGrid, BookOpen, BarChart3, Settings, LogOut, User, Award, Home as HomeIcon, Sun, Moon, Calendar } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const { stats, theme, toggleTheme } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Daily Problems', path: '/topic/daily-problems', icon: Calendar },
    { name: 'Your Path', path: '/roadmap', icon: Rocket },
    { name: 'Problems', path: '/topics', icon: LayoutGrid },
    { name: 'My Progress', path: '/dashboard', icon: BarChart3 },
    { name: 'Certificates', path: '/certificates', icon: Award },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-primary-600/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CodePath</span>
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
                    ? "bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4" />

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                  location.pathname === '/' ? "bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-400"
                )}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                    location.pathname === link.path
                      ? "bg-slate-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
