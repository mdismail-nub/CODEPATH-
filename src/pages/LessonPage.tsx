import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, CheckCircle2, ChevronRight, X, Play, 
  Lightbulb, HelpCircle, Trophy, Sparkles, MessageCircle, ArrowLeft,
  Copy, Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { COURSES } from '../learnData';
import { useAppState } from '../AppStateContext';
import { cn } from '../lib/utils';
import { Exercise } from '../types';

export const LessonPage = () => {
  const { courseSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { completeLesson, isLessonCompleted } = useAppState();

  const course = COURSES.find(c => c.slug === courseSlug);
  const lessonIndex = course?.lessons.findIndex(l => l.slug === lessonSlug) ?? -1;
  const lesson = course?.lessons[lessonIndex];

  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!course || !lesson) return <Navigate to="/learn" />;

  const handleCopy = () => {
    if (!lesson.codeExample) return;
    navigator.clipboard.writeText(lesson.codeExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentExercise = lesson.exercises[currentExerciseIdx];
  const totalExercises = lesson.exercises.length;
  const progressPercent = Math.round(((currentExerciseIdx) / totalExercises) * 100);

  const [activeTab, setActiveTab] = useState<'content' | 'practice'>('content');

  const checkAnswer = () => {
    if (!currentExercise) return;
    
    const isCorrect = userAnswer.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase();
    
    if (isCorrect) {
      setShowFeedback('correct');
      if (currentExerciseIdx === totalExercises - 1) {
        handleLessonComplete();
      } else {
        setTimeout(() => {
          setCurrentExerciseIdx(prev => prev + 1);
          setUserAnswer('');
          setShowFeedback(null);
          setShowHint(false);
          // Auto switch to practice tab if it's a new exercise on mobile
          if (width < 1024) setActiveTab('practice');
        }, 1500);
      }
    } else {
      setShowFeedback('incorrect');
      setTimeout(() => setShowFeedback(null), 1500);
    }
  };

  const handleLessonComplete = () => {
    setShowConfetti(true);
    setIsCompleted(true);
    completeLesson(lesson.id, lesson.xpReward);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const isLastLesson = lessonIndex === course.lessons.length - 1;
  const nextLesson = course.lessons[lessonIndex + 1];

  return (
    <div className="relative flex flex-col h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden pt-16">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.15} colors={['#2563eb', '#3b82f6', '#60a5fa', '#fbbf24', '#10b981']} />}
      
      {/* Top Header & Progress Bar */}
      <div className="absolute top-16 left-0 right-0 z-50 bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800">
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isCompleted ? '100%' : `${progressPercent}%` }}
            className="h-full bg-primary-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          />
        </div>
        
        {/* Mobile Tab Switcher */}
        {!isCompleted && (
          <div className="flex lg:hidden h-12">
            <button 
              onClick={() => setActiveTab('content')}
              className={cn(
                "flex-1 text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === 'content' ? "text-primary-600 border-b-2 border-primary-600" : "text-slate-400"
              )}
            >
              Lesson
            </button>
            <button 
              onClick={() => setActiveTab('practice')}
              className={cn(
                "flex-1 text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === 'practice' ? "text-primary-600 border-b-2 border-primary-600" : "text-slate-400"
              )}
            >
              Practice {totalExercises > 0 && `(${currentExerciseIdx + 1}/${totalExercises})`}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden pt-12 lg:pt-1.5">
        {/* Left Column: Lesson Content */}
        <div className={cn(
          "w-full lg:w-1/2 overflow-y-auto lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] custom-scrollbar transition-all duration-300",
          !isCompleted && width < 1024 && activeTab !== 'content' ? 'hidden' : 'block'
        )}>
          <div className="max-w-[700px] mx-auto px-6 py-10 md:px-8 md:py-12 lg:px-12">
            <Link to={`/learn/${courseSlug}`} className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 md:mb-10 uppercase tracking-widest transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {course.title}
            </Link>

            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-outfit prose-headings:tracking-tight prose-p:leading-relaxed prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-primary-50 dark:prose-code:bg-primary-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none font-sans">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>

            {lesson.codeExample && (
              <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400/40" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/40" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">Example: {lesson.codeExample.language}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                        copied
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800 border border-transparent"
                      )}
                      aria-label="Copy code to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <Play className="h-3 w-3 text-slate-600" />
                  </div>
                </div>
                <pre className="p-6 text-sm font-mono text-slate-300 leading-relaxed overflow-x-auto">
                  <code>{lesson.codeExample.code}</code>
                </pre>
              </div>
            )}
            
            <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Stuck? Read carefully, the answer is often highlighted.
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Layer */}
        <div className={cn(
          "w-full lg:w-1/2 flex flex-col bg-[#F8FAFC] dark:bg-[#020617] relative flex-1 transition-all duration-300",
          !isCompleted && width < 1024 && activeTab !== 'practice' ? 'hidden' : 'block'
        )}>
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-blue-grain pointer-events-none" />
          
          <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 lg:px-16 relative z-10 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center max-w-md"
                >
                  <div className="mb-8 relative">
                    <div className="h-24 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto relative z-10">
                      <Trophy className="h-12 w-12 text-emerald-600" />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-4 -right-4 h-12 w-12 bg-amber-400 rounded-full flex items-center justify-center text-white"
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-outfit">Lesson Complete!</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                    You've mastered the basics of {lesson.title}. Congratulations on earning <span className="text-primary-600 dark:text-primary-400 font-bold">{lesson.xpReward} XP</span> toward your goal!
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    {nextLesson ? (
                      <button
                        onClick={() => navigate(`/learn/${course.slug}/${nextLesson.slug}`)}
                        className="w-full bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 group"
                      >
                        Next Lesson: {nextLesson.title}
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <Link
                        to="/learn"
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Browse More Paths
                      </Link>
                    )}
                    <Link
                      to={`/learn/${courseSlug}`}
                      className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Back to Overview
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentExerciseIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-xl"
                >
                  <div className="mb-12">
                    <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                      Exercise {currentExerciseIdx + 1} of {totalExercises}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-outfit leading-snug">
                      {currentExercise.question}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-12">
                    {currentExercise.type === 'multiple-choice' ? (
                      <div className="grid gap-3">
                        {currentExercise.options?.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => setUserAnswer(option)}
                            className={cn(
                              "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-sm flex items-center gap-4",
                              userAnswer === option 
                                ? "bg-primary-600 text-white border-primary-600" 
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400"
                            )}
                          >
                            <div className={cn(
                              "h-6 w-6 rounded-lg flex items-center justify-center text-xs border font-bold flex-shrink-0",
                              userAnswer === option ? "bg-white/20 border-white/20" : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            )}>
                              {String.fromCharCode(65 + i)}
                            </div>
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : currentExercise.type === 'fill-in-the-blank' ? (
                      <div className="relative group">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Type the answer here..."
                          className="w-full p-6 text-xl font-bold rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none focus:border-primary-600 transition-all font-outfit"
                          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        />
                         <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <HelpCircle className="h-5 w-5 text-slate-300" />
                         </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 focus-within:ring-2 focus-within:ring-primary-600/20 transition-shadow">
                           <div className="px-4 py-2 bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                             Editor
                           </div>
                           <textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-full h-40 p-6 font-mono text-sm bg-transparent border-none text-slate-200 focus:outline-none resize-none"
                            placeholder={currentExercise.inputTemplate}
                            onKeyDown={(e) => e.ctrlKey && e.key === 'Enter' && checkAnswer()}
                          />
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected: {currentExercise.correctAnswer}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Press Ctrl + Enter to run</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={checkAnswer}
                      disabled={!userAnswer}
                      className={cn(
                        "flex-1 py-5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2",
                        !userAnswer 
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed" 
                          : "bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 hover:scale-[1.01] active:scale-[0.99]"
                      )}
                    >
                      {showFeedback === 'correct' ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Correct!
                        </>
                      ) : showFeedback === 'incorrect' ? (
                        <>
                          <X className="h-5 w-5" />
                          Try Again
                        </>
                      ) : (
                        <>
                          Check Answer
                          <ChevronRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                    
                    <button 
                       onClick={() => setShowHint(!showHint)}
                       className="h-16 w-16 flex items-center justify-center bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-2 border-amber-100 dark:border-amber-900/30 rounded-2xl hover:bg-amber-100 transition-colors"
                       title="Get a hint"
                    >
                       <Lightbulb className="h-6 w-6" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 p-5 rounded-xl bg-amber-50 text-amber-900 text-sm font-medium border border-amber-100 flex items-start gap-4"
                      >
                         <MessageCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                         <div>
                            <p className="font-bold mb-1">Hint</p>
                            {currentExercise.hint || "Take another look at the lesson content on the left. The answer is usually explicitly mentioned there!"}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
