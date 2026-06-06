import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Clock, Download, Share2, Search, ChevronRight, LayoutGrid, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppStateContext';
import { TOPICS } from '../data';
import { cn } from '../lib/utils';
import { BackButton } from '../components/BackButton';
import { CertificateInfo } from '../types';

export const Certificates = () => {
  const { stats } = useAppState();

  const myCertificates = Object.values(stats.certificates || {}) as CertificateInfo[];
  const issuedCerts = myCertificates.filter(c => c.status === 'issued');

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#020617] transition-colors duration-300">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <BackButton />
        </motion.div>
        
        <header className="mb-24 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="h-5 w-1 bg-primary-600 dark:bg-sky-400 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Your Record</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Certificates.</h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              View and download the certificates you've earned from completing courses.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary-600 dark:text-sky-400" />
                  My Certificates
                </h2>
                <span className="w-fit px-3 py-1 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Count: {issuedCerts.length}
                </span>
              </div>

              {issuedCerts.length === 0 ? (
                <div className="py-24 text-center rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800">
                  <Award className="h-16 w-16 text-slate-300 dark:text-slate-800 mx-auto mb-6" />
                  <p className="text-slate-500 dark:text-slate-600 font-bold uppercase tracking-widest text-[10px]">No credentials issued yet</p>
                </div>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2">
                  {issuedCerts.map((cert) => {
                    const topic = TOPICS.find(t => t.slug === cert.topicSlug);
                    return (
                      <motion.div
                        key={cert.topicSlug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl hover:shadow-md transition-all"
                      >
                        <div className="aspect-[1.5/1] bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 dark:from-sky-400/5 to-transparent pointer-events-none" />
                           <div className="h-20 w-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-primary-600/50 dark:text-sky-400/50 group-hover:text-primary-600 dark:group-hover:text-sky-400 transition-all group-hover:scale-110 shadow-sm">
                             <Award className="h-10 w-10" />
                           </div>
                           <div className="mt-8 text-center">
                             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Course Module</p>
                             <p className="text-xl font-bold text-slate-900 dark:text-slate-300 tracking-tight">{topic?.name}</p>
                           </div>
                        </div>
                        <div className="p-8 border-t border-slate-200 dark:border-slate-800">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                               <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Issued On</p>
                               <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{new Date(cert.issuedAt || Date.now()).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Audit Status</p>
                               <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Verified</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Link 
                              to={`/certificates/${cert.topicSlug}`}
                              className="flex-1 px-6 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 dark:hover:bg-slate-200 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-900/10"
                            >
                              <ExternalLink className="h-4 w-4" /> View Certificate
                            </Link>
                            <Link 
                                to={`/certificates/${cert.topicSlug}`}
                                className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                title="Share"
                            >
                              <Share2 className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="space-y-12">
            <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Award className="h-32 w-32 text-slate-900 dark:text-white" />
               </div>
               
               <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-8">How it works.</h3>
               <div className="space-y-6">
                 {[
                   "Complete all lessons and problems in a module.",
                   "Claim your certificate by entering your name.",
                   "Download or share your verified achievement."
                 ].map((text, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="h-6 w-6 rounded-md bg-primary-600 dark:bg-sky-400 flex items-center justify-center text-white dark:text-slate-950 text-[10px] font-bold flex-shrink-0">{i+1}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{text}</p>
                   </div>
                 ))}
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
