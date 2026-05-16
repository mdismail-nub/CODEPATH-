import React from 'react';
import { BookOpen, Calendar, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface CertificateCanvasProps {
  recipientName: string;
  courseName: string;
  date: string;
  className?: string;
  id?: string;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  recipientName,
  courseName,
  date,
  className,
  id
}) => {
  return (
    <div 
      id={id}
      className={cn(
        "relative aspect-[1.41/1] w-full max-w-[1100px] mx-auto overflow-hidden shadow-2xl bg-[#f0f9ff] @container",
        className
      )}
      style={{ 
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #eff6ff 100%)'
      }}
    >
      {/* Background Abstract Shapes (Matching the image) */}
      {/* Top Left Gradient Sphere */}
      <div className="absolute -top-[10cqw] -left-[10cqw] w-[40cqw] h-[40cqw] rounded-full bg-gradient-to-br from-blue-600 via-blue-400 to-transparent opacity-60 blur-[4cqw]" />
      <div className="absolute top-[2cqw] -left-[5cqw] w-[30cqw] h-[30cqw] rounded-full bg-blue-500 opacity-80 blur-[6cqw]" />
      
      {/* Bottom Right Abstract Shape */}
      <div className="absolute -bottom-[10cqw] -right-[10cqw] w-[50cqw] h-[50cqw] rounded-full bg-gradient-to-tl from-blue-700 via-blue-500 to-transparent opacity-90 blur-[4cqw]" />
      <div className="absolute bottom-[5cqw] right-0 w-[40cqw] h-[40cqw] bg-blue-600 opacity-70 blur-[6cqw] transform rotate-45 rounded-full" />

      {/* Main Certificate White Body */}
      <div className="absolute inset-[4cqw] bg-white shadow-xl flex flex-col items-center justify-between py-[4cqw] px-[6cqw] z-10"
        style={{ 
          clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)'
        }}
      >
        
        {/* Certificate Title */}
        <div className="text-center flex flex-col items-center">
          <h1 className="text-[8cqw] font-gothic text-black leading-none mb-[1cqw]">Certificate</h1>
          <div className="flex items-center gap-[2cqw] w-full">
            <div className="h-[0.2cqw] flex-1 bg-blue-600 rounded-full" />
            <span className="text-[1.8cqw] font-bold tracking-[0.4em] text-black shrink-0">OF COMPLETION</span>
            <div className="h-[0.2cqw] flex-1 bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Recipient Section */}
        <div className="text-center w-full px-[4cqw]">
           <p className="text-[1.2cqw] font-medium text-gray-700 mb-[1cqw] font-sans uppercase tracking-wider">This certificate is proudly presented to</p>
           <div className="relative inline-block px-[4cqw]">
             <h3 className="text-[7cqw] font-elegant text-black leading-tight py-[1cqw]">
               {recipientName}
             </h3>
             <div className="absolute bottom-0 left-0 right-0 h-[0.2cqw] bg-blue-500 opacity-60" />
           </div>
        </div>

        {/* Course Info */}
        <div className="text-center">
           <p className="text-[1.6cqw] text-gray-800 font-sans">
             For completing <span className="font-bold text-gray-900 font-display">{courseName}</span> at <span className="font-bold text-gray-900 font-display">CodePath</span>
           </p>
        </div>

        {/* Footer: Date, Badge, Signature */}
        <div className="w-full flex items-end justify-between px-[4cqw]">
           {/* Date Section */}
           <div className="text-center w-[20cqw]">
              <div className="border-b-[0.2cqw] border-blue-200 pb-[1cqw] mb-[1cqw]">
                 <p className="text-[1.6cqw] font-bold text-gray-900 font-display">{date}</p>
              </div>
              <p className="text-[1cqw] font-black uppercase tracking-widest text-black font-display">Date</p>
           </div>

           {/* Badge Component */}
           <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-[1cqw] opacity-20 scale-125" />
                <div className="w-[10cqw] h-[10cqw] border-[0.4cqw] border-blue-600 rounded-full flex items-center justify-center bg-white relative z-10">
                   <ShieldCheck className="h-[6cqw] w-[6cqw] text-blue-600" />
                </div>
                {/* Ribbon effect */}
                <div className="absolute -bottom-[1.5cqw] left-1/2 -translate-x-1/2 w-[7cqw] h-[3.5cqw] bg-blue-600" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', opacity: 0.8 }} />
              </div>
           </div>

           {/* Signature Section */}
           <div className="text-center w-[20cqw]">
              <div className="border-b-[0.2cqw] border-blue-200 pb-[1cqw] mb-[1cqw]">
                 <p className="font-elegant text-[4.5cqw] text-gray-900" style={{ lineHeight: '0.8' }}>Md Ismail</p>
              </div>
              <p className="text-[1cqw] font-black uppercase tracking-widest text-black font-display">Md Ismail</p>
              <p className="text-[0.8cqw] font-medium text-gray-500 leading-none mt-[0.5cqw]">CEO, CodePath</p>
           </div>
        </div>

      </div>
    </div>
  );
};
