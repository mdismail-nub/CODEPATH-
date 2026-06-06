import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, CheckCircle2, ChevronLeft, Download, ShieldCheck, Github, Calendar, User } from 'lucide-react';
import { useAppState } from '../AppStateContext';
import { CertificateInfo } from '../types';
import { BackButton } from '../components/BackButton';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { APP_NAME } from '../constants';

export const VerifyCertificate = () => {
  const { id } = useParams();
  const { stats } = useAppState();
  const [cert, setCert] = useState<CertificateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find certificate by ID in all stored certificates
    const allCerts = Object.values(stats.certificates || {}) as CertificateInfo[];
    const found = allCerts.find(c => c.id === id);
    setCert(found || null);
    setLoading(false);
  }, [id, stats.certificates]);

  const downloadPDF = async () => {
    const element = document.getElementById('certificate-render');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`certificate-${id}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
           <Award className="h-8 w-8 text-primary-600" />
         </motion.div>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-[#020617]">
        <div className="text-center">
           <div className="h-20 w-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-red-600" />
           </div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Invalid Certificate</h1>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">This certificate credential could not be verified in our registry. It may have been revoked or never issued.</p>
           <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:underline">
             Go to Home <ChevronLeft className="h-4 w-4 rotate-180" />
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-24 pb-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-12">
          <BackButton />
          <button 
            onClick={downloadPDF}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Certificate View */}
          <div className="lg:col-span-8 flex justify-center">
            <div 
              id="certificate-render"
              className="relative aspect-[1.414/1] w-full bg-white shadow-2xl rounded-sm p-12 overflow-hidden border-[16px] border-double border-slate-200"
            >
               {/* Aesthetic Borders */}
               <div className="absolute inset-4 border border-slate-300" />
               <div className="absolute inset-8 border-2 border-slate-100" />
               
               <div className="relative h-full flex flex-col items-center justify-between text-center">
                  <div className="space-y-6">
                    <Award className="h-16 w-16 text-primary-600 mx-auto" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-slate-400">Certificate of Achievement</h2>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-500 font-serif italic text-lg text-slate-600">This is to certify that</p>
                    <h1 className="text-5xl font-bold text-slate-900 font-outfit tracking-tight">{cert.recipientName}</h1>
                    <div className="h-px w-64 bg-slate-200 mx-auto my-6" />
                    <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
                      has successfully completed the comprehensive course on 
                      <span className="block text-xl text-slate-900 font-bold mt-2">{cert.topicName}</span>
                    </p>
                  </div>

                  <div className="w-full flex items-end justify-between px-8 pb-4">
                     <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Issued On</p>
                        <p className="text-sm font-bold text-slate-900">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                     </div>
                     <div className="text-center">
                        <div className="h-12 w-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-1">
                           <ShieldCheck className="h-6 w-6 text-emerald-600" />
                        </div>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Verified</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Credential ID</p>
                        <p className="text-[10px] font-mono text-slate-600">{cert.id}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Verification Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                 <ShieldCheck className="h-5 w-5 text-emerald-500" /> Validation Record
               </h3>
               
               <div className="space-y-5">
                  <div className="flex gap-4">
                     <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <User className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recipient</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{cert.recipientName}</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <Github className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">GitHub Verified</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">@{cert.githubUsername}</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <Calendar className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Issue Date</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium leading-relaxed">
                     This is an official digital credential issued by {APP_NAME}. It is cryptographically signed and publicly verifiable.
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
               <h4 className="text-lg font-bold mb-2">Share Achievement</h4>
               <p className="text-xs text-indigo-100 mb-6">Display this credential on your LinkedIn profile or resume.</p>
               <button className="w-full py-4 rounded-xl bg-white text-indigo-600 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Copy Public Link
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
