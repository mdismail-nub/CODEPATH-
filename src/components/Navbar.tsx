import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Rocket, LayoutGrid, BookOpen, BarChart3, Settings, LogOut, User, Award, Home as HomeIcon, Sun, Moon } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const { user, logout, stats, login, theme, toggleTheme } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Your Path', path: '/roadmap', icon: Rocket },
    { name: 'Courses', path: '/topics', icon: LayoutGrid },
    { name: 'My Progress', path: '/dashboard', icon: BarChart3 },
    { name: 'Certificates', path: '/certificates', icon: Award },
  ];

  if (stats.isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin', icon: Settings });
  }

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
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all mr-2"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/dashboard" className="flex items-center gap-3 p-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                    <div className="text-right hidden lg:block pr-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-0.5">Profile</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user.displayName?.split(' ')[0]}</p>
                    </div>
                    <img src={user.photoURL || ''} alt="" className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800" referrerPolicy="no-referrer" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className="bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm shadow-primary-600/10"
                >
                  Get Started
                </button>
              )}
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
              
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4">
                      <img src={user.photoURL || ''} alt="" className="h-10 w-10 rounded-full" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.displayName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="w-full bg-primary-600 text-white px-4 py-4 rounded-xl text-center text-base font-bold shadow-md shadow-primary-600/10"
                  >
                    Authenticate with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
