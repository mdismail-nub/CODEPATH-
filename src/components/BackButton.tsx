import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className="group mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-950 dark:hover:text-white"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 transition-colors group-hover:border-slate-300 dark:group-hover:border-white/20 group-hover:bg-slate-100 dark:group-hover:bg-white/10">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      </div>
      <span>Go Back</span>
    </button>
  );
};
