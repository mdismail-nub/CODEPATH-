import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Check, X, Clock, User, Award, ShieldCheck, Database, Filter } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { TOPICS } from '../data';
import { cn } from '../lib/utils';
import { BackButton } from '../components/BackButton';

interface CertRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  topicSlug: string;
  vjudgeId: string;
  status: 'pending' | 'issued' | 'rejected';
  requestedAt: any;
}

export const AdminDashboard = () => {
  const { stats } = useAppState();
  const [requests, setRequests] = useState<CertRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stats.isAdmin) return;

    const q = query(collection(db, 'certificate_requests'), orderBy('requestedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CertRequest));
      setRequests(reqs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'certificate_requests');
    });

    return () => unsubscribe();
  }, [stats.isAdmin]);

  const approveRequest = async (req: CertRequest) => {
    try {
      await updateDoc(doc(db, 'certificate_requests', req.id), {
        status: 'issued',
        issuedAt: new Date().toISOString()
      });

      await updateDoc(doc(db, 'users', req.userId), {
        [`certificates.${req.topicSlug}.status`]: 'issued',
        [`certificates.${req.topicSlug}.issuedAt`]: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `certificate_requests/${req.id}`);
    }
  };

  const rejectRequest = async (req: CertRequest) => {
    if (!window.confirm('Confirm rejection of this audit request?')) return;
    try {
      await updateDoc(doc(db, 'certificate_requests', req.id), {
        status: 'rejected'
      });

      await updateDoc(doc(db, 'users', req.userId), {
        [`certificates.${req.topicSlug}.status`]: 'rejected'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `certificate_requests/${req.id}`);
    }
  };

  if (!stats.isAdmin) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="absolute inset-0 -z-10 subtle-grid opacity-10" />
        <div className="text-center p-8">
           <div className="mx-auto mb-8 h-20 w-20 rounded-3xl bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-900 flex items-center justify-center text-red-600 dark:text-red-500 shadow-2xl">
              <ShieldCheck className="h-10 w-10" />
           </div>
           <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Unauthorized Access.</h1>
           <p className="max-w-md mx-auto text-slate-600 dark:text-slate-400">Your profile lacks the necessary clearance level to access system administrative tools.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 -z-10 subtle-grid opacity-10" />
      
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
        <BackButton />
        
        <header className="mb-20 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-5 w-1 bg-primary-600 dark:bg-sky-400 rounded-full" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Infrastructure Control</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Audit Hub.</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">Centralized verification and credential management interface.</p>
             </div>

             <div className="flex gap-4">
               {[
                 { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-slate-900' },
                 { label: 'Verified', value: requests.filter(r => r.status === 'issued').length, color: 'text-primary-600 dark:text-sky-400', bg: 'bg-primary-50 dark:bg-slate-900' }
               ].map((stat, i) => (
                 <div key={i} className={cn("p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[140px]", stat.bg)}>
                    <div className={cn("text-3xl font-bold mb-1 tracking-tight", stat.color)}>{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</div>
                 </div>
               ))}
             </div>
          </div>
        </header>

        {/* Table Section */}
        <div className="rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Engineer / Audit ID</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Module Path</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Timestamp</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Authorization</th>
                  <th className="px-8 py-6 text-right text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {requests.map((req) => {
                  const topic = TOPICS.find(t => t.slug === req.topicSlug);
                  return (
                    <tr key={req.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-sky-400 transition-colors">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{req.userName}</div>
                            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 tracking-tighter">ID: {req.vjudgeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{topic?.name}</div>
                        <div className="flex items-center gap-2">
                           <div className="h-1 w-20 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-primary-600 dark:bg-sky-400" style={{ width: '100%' }} />
                           </div>
                           <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">Certified</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {req.requestedAt?.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-8">
                        <div className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                          req.status === 'issued' ? "bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border-emerald-400/20" : 
                          req.status === 'rejected' ? "bg-red-400/10 text-red-600 dark:text-red-400 border-red-400/20" :
                          "bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-400/20"
                        )}>
                          {req.status}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex justify-end gap-3">
                          {req.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => rejectRequest(req)}
                                className="h-10 w-10 rounded-xl bg-red-400/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-red-400/20"
                                title="Reject Audit"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => approveRequest(req)}
                                className="h-10 px-6 rounded-xl bg-primary-600 dark:bg-sky-400 text-white dark:text-slate-950 text-[10px] font-bold uppercase tracking-widest hover:bg-primary-700 dark:hover:bg-sky-300 transition-all flex items-center gap-2 shadow-lg shadow-primary-600/20 dark:shadow-sky-500/20"
                              >
                                <Check className="h-4 w-4" /> Verify Credentials
                              </button>
                            </>
                          ) : (
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 p-2 px-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent">
                               {req.status === 'issued' ? <Award className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> : <X className="h-3 w-3 text-red-600 dark:text-red-400" />}
                               Operation Finalized
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {requests.length === 0 && !loading && (
            <div className="py-24 text-center">
               <Database className="h-12 w-12 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">No data records found in buffer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
