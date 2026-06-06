import React, { useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, Share2, ChevronLeft, Printer, Twitter, Linkedin, Facebook, Award, Loader2 } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { TOPICS } from '../data';
import { CertificateCanvas } from '../components/CertificateCanvas';
import { toPng } from 'html-to-image';

export const CertificateView = () => {
  const { topicSlug } = useParams();
  const { stats } = useAppState();
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const topic = TOPICS.find(t => t.slug === topicSlug);
  const cert = stats.certificates[topicSlug || ''];

  if (!topic || !cert || cert.status !== 'issued') {
    return <Navigate to="/certificates" />;
  }

  const handleDownload = async () => {
    if (!certificateRef.current || isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      // Give a tiny delay for layout stabilization
      await new Promise(resolve => setTimeout(resolve, 200));

      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        // html-to-image sometimes needs a bit of help with fonts
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `CodePath_Certificate_${topic.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Certificate download failed:", error);
      alert("Failed to generate certificate image. Please try the Print PDF option instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `I just earned a certificate in ${topic.name} from CodePath! Check it out.`;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-24 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Certificate Preview */}
          <div className="flex-1 w-full overflow-hidden pb-8 lg:pb-0">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full"
             >
                <Link to="/certificates" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Certificates
                </Link>

                <div className="bg-white p-4 shadow-2xl rounded-sm">
                   <CertificateCanvas 
                      id="certificate-to-copy"
                      recipientName={cert.recipientName}
                      courseName={topic.name}
                      date={new Date(cert.issuedAt || Date.now()).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      className="w-full"
                   />
                </div>
                
                {/* Hidden container for html2canvas to capture full size */}
                <div style={{ position: 'absolute', left: '-9999px', top: '0', width: '1200px' }}>
                     <div ref={certificateRef}>
                        <CertificateCanvas 
                            recipientName={cert.recipientName}
                            courseName={topic.name}
                            date={new Date(cert.issuedAt || Date.now()).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                            className="w-[1200px]"
                        />
                    </div>
                </div>
             </motion.div>
          </div>

          {/* Right: Actions */}
          <aside className="w-full lg:w-96 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Credential Details</span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">Verified Achievement.</h2>
              
              <div className="space-y-6 mb-10">
                 <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 block mb-1">Recipient</label>
                    <p className="text-slate-900 dark:text-slate-100 font-bold">{cert.recipientName}</p>
                 </div>
                 <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 block mb-1">Course</label>
                    <p className="text-slate-900 dark:text-slate-100 font-bold">{topic.name}</p>
                 </div>
                 <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 block mb-1">Issue Date</label>
                    <p className="text-slate-900 dark:text-slate-100 font-bold">{new Date(cert.issuedAt || Date.now()).toLocaleDateString()}</p>
                 </div>
                 <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 block mb-1">Credential ID</label>
                    <p className="text-[10px] font-mono text-slate-900 dark:text-slate-100 font-bold break-all">{cert.id}</p>
                 </div>
              </div>

              <div className="grid gap-4">
                 <Link
                   to={`/certificate/${cert.id}`}
                   className="w-full mb-2 h-14 rounded-2xl border-2 border-primary-600/20 dark:border-sky-400/20 text-primary-600 dark:text-sky-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary-50 dark:hover:bg-sky-400/5 transition-all text-center"
                 >
                   Public Verify Page
                 </Link>
                 <button 
                   onClick={handleDownload}
                   disabled={isDownloading}
                   className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 h-14 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isDownloading ? (
                     <>
                       <Loader2 className="h-5 w-5 animate-spin" /> Generating...
                     </>
                   ) : (
                     <>
                       <Download className="h-5 w-5" /> Download Image
                     </>
                   )}
                 </button>
                 <button 
                   onClick={() => window.print()}
                   disabled={isDownloading}
                   className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 h-14 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all font-mono"
                 >
                   <Printer className="h-5 w-5" /> Print PDF
                 </button>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 font-mono">Share Achievement</h4>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="h-12 w-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare('linkedin')}
                      className="h-12 w-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-700 hover:border-blue-700 transition-all"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="h-12 w-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                 </div>
              </div>
            </motion.div>
            
            <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/30">
               <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-center text-emerald-600">
                     <Award className="h-5 w-5" />
                  </div>
                  <div>
                     <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-400 mb-1">Permanent Record</h4>
                     <p className="text-xs text-emerald-600/80 leading-relaxed font-medium">This certificate is verified by GitHub and support-checked.</p>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
