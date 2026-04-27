import React from 'react';
import { Award, ShieldCheck, Calendar, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface CertificateLayoutProps {
  userName: string;
  topicName: string;
  date: string;
  vjudgeId: string;
}

export const CertificateLayout: React.FC<CertificateLayoutProps> = ({ userName, topicName, date, vjudgeId }) => {
  return (
    <div id="certificate-content" className="relative h-[600px] w-[800px] overflow-hidden bg-white p-12 text-black border-[16px] border-blue-600">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/10 rounded-tl-full" />
      
      <div className="relative z-10 flex h-full flex-col items-center justify-between border-2 border-blue-200 p-8">
        <div className="flex flex-col items-center">
          <Award className="h-16 w-16 text-blue-600" />
          <h1 className="mt-4 text-sm font-black uppercase tracking-[0.3em] text-gray-500">Certificate of Completion</h1>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-600 italic">This is to certify that</p>
          <h2 className="mt-2 text-5xl font-black tracking-tight text-blue-600">{userName}</h2>
          <p className="mt-4 max-w-lg text-lg text-gray-700">
            has successfully completed all programming challenges in the topic of
          </p>
          <h3 className="mt-2 text-3xl font-bold uppercase tracking-wider text-black">{topicName}</h3>
        </div>

        <div className="w-full flex items-end justify-between px-10">
          <div className="flex flex-col items-center gap-1">
            <div className="h-[1px] w-32 bg-gray-400 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Academic Director</span>
            <span className="text-sm font-bold text-black">CodePath Academy</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/5 border-2 border-blue-600/20">
               <ShieldCheck className="h-10 w-10 text-blue-600" />
            </div>
            <span className="mt-2 text-[8px] font-bold uppercase text-gray-400">Verified Platform ID</span>
            <span className="text-xs font-mono font-bold text-blue-600">{vjudgeId}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
             <div className="h-[1px] w-32 bg-gray-400 mb-1" />
             <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Issued By</span>
             <span className="text-sm font-bold text-black italic">Md Ismail</span>
             <span className="text-[8px] text-gray-400 uppercase font-bold">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
