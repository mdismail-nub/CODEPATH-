import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Send, CheckCircle2, ChevronRight, Github, Star, Loader2, AlertCircle } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { GitHubInfo } from '../types';
import { APP_NAME, GITHUB_REPO_OWNER, GITHUB_REPO_NAME } from '../constants';

interface GetCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicSlug: string;
  topicName: string;
}

type Step = 'identity' | 'github-auth' | 'github-star' | 'success';

export const GetCertificateModal: React.FC<GetCertificateModalProps> = ({ isOpen, onClose, topicSlug, topicName }) => {
  const { stats, requestCertificate, setGitHubInfo, checkGitHubStar, loginWithGitHub } = useAppState();
  const [recipientName, setRecipientName] = useState('');
  const [activeStep, setActiveStep] = useState<Step>('identity');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync with stats
  useEffect(() => {
    if (stats.github) {
       if (stats.github.isStarred) {
         if (activeStep === 'github-star' || activeStep === 'github-auth') {
           setActiveStep('identity'); 
         }
       } else if (activeStep === 'identity' || activeStep === 'github-auth') {
         setActiveStep('github-star');
       }
    }
  }, [stats.github, activeStep]);

  const handleGitHubLogin = async () => {
    setIsVerifying(true);
    await loginWithGitHub();
    setIsVerifying(false);
  };

  const handleVerifyStar = async () => {
    setIsVerifying(true);
    setError(null);
    const isStarred = await checkGitHubStar();
    if (isStarred) {
      setActiveStep('identity');
    } else {
      setError(`Please star the repository first.`);
    }
    setIsVerifying(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) return;
    
    setIsVerifying(true);
    try {
      await requestCertificate(topicSlug, topicName, recipientName);
      setActiveStep('success');
      setTimeout(() => {
        onClose();
        setActiveStep('identity');
        setRecipientName('');
      }, 3000);
    } catch (e) {
      setError("Failed to issue certificate");
    } finally {
      setIsVerifying(false);
    }
  };

  const needsGitHub = !stats.github;
  const needsStar = stats.github && !stats.github.isStarred;

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
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-colors duration-300"
          >
            {/* Header */}
            <div className="relative p-8 md:p-12">
              <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>

              <AnimatePresence mode="wait">
                {activeStep === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <div className="mb-10 h-24 w-24 rounded-3xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Cerificate Issued.</h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xs">
                      Congratulations! Your achievement in <span className="text-slate-900 dark:text-white font-bold">{topicName}</span> is now verified.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <header className="mb-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-primary-50 dark:bg-sky-400/10 border border-primary-100 dark:border-sky-400/20 flex items-center justify-center text-primary-600 dark:text-sky-400">
                          <Award className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">Claim Credential.</h3>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">Verified Registry System</p>
                        </div>
                      </div>
                      <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
                    </header>

                    {needsGitHub ? (
                       <div className="space-y-8">
                         <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-2">
                               <Github className="h-4 w-4" /> Step 1: GitHub Identity
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                               "We use GitHub to verify authorship and ensure credentials are tied to professional identities."
                            </p>
                         </div>
                         <button
                           onClick={handleGitHubLogin}
                           disabled={isVerifying}
                           className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50"
                         >
                           {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Github className="h-5 w-5" /> Connect GitHub</>}
                         </button>
                       </div>
                    ) : needsStar ? (
                       <div className="space-y-8">
                         <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-400 mb-2">
                               <Star className="h-4 w-4" /> Step 2: Show Support
                            </h4>
                            <p className="text-xs text-amber-600 dark:text-amber-500/80 leading-relaxed font-medium">
                               To qualify for certificates, please star our active repository. This helps support the curriculum and keeps it free.
                            </p>
                            <a 
                              href={`https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300 hover:opacity-80 decoration-amber-300 underline underline-offset-4"
                            >
                               Open Repository <Star className="h-3 w-3" />
                            </a>
                         </div>
                         
                         <button
                           onClick={handleVerifyStar}
                           disabled={isVerifying}
                           className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-amber-600 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-amber-700 disabled:opacity-50 shadow-xl shadow-amber-600/20"
                         >
                           {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Star className="h-5 w-5" /> I've Starred the Repo</>}
                         </button>

                         {error && (
                           <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest justify-center">
                              <AlertCircle className="h-3 w-3" /> {error}
                           </div>
                         )}
                       </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 flex items-center gap-4">
                           <img src={stats.github?.avatar} alt="Avatar" className="h-10 w-10 rounded-xl" />
                           <div>
                              <p className="text-[8px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Identity Verified</p>
                              <p className="text-xs font-bold text-slate-900 dark:text-white">@{stats.github?.username}</p>
                           </div>
                           <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-auto" />
                        </div>

                        <div className="group">
                          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-3 block group-focus-within:text-primary-600 dark:group-focus-within:text-sky-400 transition-colors">Legal Recipient Name</label>
                          <input
                            type="text"
                            required
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Full name for record"
                            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-800 focus:border-primary-600 dark:focus:border-sky-400 focus:outline-none transition-all shadow-inner"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isVerifying}
                          className="flex w-full items-center justify-center gap-4 rounded-2xl bg-emerald-600 p-5 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
                        >
                          {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Finalize Credential <ChevronRight className="h-4 w-4" /></>}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                 <span>Verification Node: PRD-01</span>
                 <span>Audit: SSL Secure</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
