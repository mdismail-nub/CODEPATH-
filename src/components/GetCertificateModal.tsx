import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAppState } from '../AppStateContext';

interface GetCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicSlug: string;
  topicName: string;
}

export const GetCertificateModal: React.FC<GetCertificateModalProps> = ({ isOpen, onClose, topicSlug, topicName }) => {
  const { stats, requestCertificate } = useAppState();
  const [vjudgeId, setVjudgeId] = useState(stats.vjudgeId || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vjudgeId.trim()) return;
    await requestCertificate(topicSlug, vjudgeId);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-12 shadow-2xl transition-colors duration-300"
          >
            <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="mb-10 h-24 w-24 rounded-3xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-2xl dark:shadow-emerald-500/10">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-6">Request Logs.</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-xs">
                  Your audit request for <span className="text-slate-900 dark:text-white">{topicName}</span> has been queued for verification.
                </p>
                
                <div className="mt-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                   Processing Node
                </div>
              </div>
            ) : (
              <>
                <header className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary-50 dark:bg-sky-400/10 border border-primary-100 dark:border-sky-400/20 flex items-center justify-center text-primary-600 dark:text-sky-400">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Claim Credential.</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">Verification Registry</p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
                </header>

                <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed max-w-sm">
                  Module curriculum completed. Provide your <span className="text-slate-900 dark:text-white font-bold">VJudge Identity</span> to finalize technical verification.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="group">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-3 block group-focus-within:text-primary-600 dark:group-focus-within:text-sky-400 transition-colors">VJudge Identification</label>
                    <input
                      type="text"
                      required
                      value={vjudgeId}
                      onChange={(e) => setVjudgeId(e.target.value)}
                      placeholder="Enter VJudge Handle..."
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-800 focus:border-primary-600 dark:focus:border-sky-400 focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-4 rounded-2xl bg-primary-600 dark:bg-sky-400 p-5 text-xs font-bold uppercase tracking-widest text-white dark:text-slate-950 shadow-xl shadow-primary-600/20 dark:shadow-sky-500/20 transition-all hover:bg-primary-700 dark:hover:bg-sky-300 active:scale-[0.98]"
                  >
                    Transmit Request <Send className="h-4 w-4" />
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                   <span>Node: Production-01</span>
                   <span>Audit Status: Pending Sync</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
