import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Download,
  Star,
  Terminal,
  Code,
  LayoutGrid,
  Search,
  BrainCircuit
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../data';

export const LandingPage = () => {
  // Take a few key topics to show real data
  const sampleTopics = TOPICS.slice(0, 6);
  const totalProblems = TOPICS.reduce((acc, t) => acc + t.problems.length, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-10 shadow-xl shadow-blue-500/5">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                Learn by doing. Not just watching.
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white tracking-tight mb-8 md:mb-10 leading-[1.05]">
                Learn programming <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">the right way.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-400 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                CodePath gives you a structured path to master everything from basic loops to complex algorithms. Practice with {totalProblems}+ problems and earn certificates along the way.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/topics"
                  className="group relative w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3 overflow-hidden"
                >
                  Start Learning <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/discover"
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 backdrop-blur-md text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 hover:border-white/20"
                >
                  See What's Inside
                </Link>
              </div>

              {/* Real Platforms We Use */}
              <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-all duration-500">
                <div className="text-lg font-bold tracking-widest text-slate-400">CODEFORCES</div>
                <div className="text-lg font-bold tracking-widest text-slate-400">LEETCODE</div>
                <div className="text-lg font-bold tracking-widest text-slate-400">GEEKSFORGEEKS</div>
                <div className="text-lg font-bold tracking-widest text-slate-400">ATCODER</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Topics we cover */}
      <section className="py-32 bg-[#020617] relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">Master every <br /><span className="text-blue-500">core concept</span></h2>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed">We've broken down programming into bite-sized topics. Each one comes with a set of hand-picked problems and a certificate of completion.</p>
            </div>
            <div className="flex-shrink-0">
               <Link to="/topics" className="text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors group">
                 View all {TOPICS.length} topics <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
               </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleTopics.map((topic) => (
              <Link 
                key={topic.id}
                to={`/topic/${topic.slug}`}
                className="group p-8 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]"
              >
                <div className="mb-6 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                   {getIcon(topic.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{topic.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-400 font-bold uppercase tracking-wider">{topic.problems.length} Problems</span>
                  <span className="text-slate-600 group-hover:text-blue-400 transition-colors">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-10 md:p-20 overflow-hidden relative backdrop-blur-xl">
            <div className="absolute inset-0 -z-10 opacity-20 bg-blue-grain pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-black mb-8 border border-blue-500/20">
                  <Award className="h-5 w-5" />
                  REAL CERTIFICATES
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-8 leading-tight">
                  Get recognized <br /> for your work.
                </h2>
                <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-medium">
                  Finish a topic and get a certificate instantly. You can download them as high-quality PNGs or PDFs to share with others or add to your LinkedIn profile.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                   <div className="flex items-center gap-4 text-slate-300 font-bold text-lg">
                     <ShieldCheck className="text-blue-500 h-6 w-6" />
                     Verified Achievement
                   </div>
                   <div className="flex items-center gap-4 text-slate-300 font-bold text-lg">
                     <Download className="text-blue-500 h-6 w-6" />
                     Easy Downloads
                   </div>
                </div>
                <Link 
                  to="/certificates"
                  className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all inline-flex items-center gap-3 shadow-2xl shadow-white/10"
                >
                  See My Certificates <ChevronRight className="h-6 w-6" />
                </Link>
              </div>
              
              <div className="lg:w-1/2 relative perspective-1000">
                <motion.div 
                  initial={{ opacity: 0, rotateY: 15 }}
                  whileInView={{ opacity: 1, rotateY: -10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-[60px] opacity-10" />
                  <div className="relative bg-[#f8fafc] p-1.5 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] border-4 border-slate-900 overflow-hidden transform-gpu">
                    <div className="aspect-[1.41/1] w-full bg-white flex flex-col items-center justify-between p-10">
                      <div className="w-full flex justify-between items-start">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">CP</div>
                        <div className="text-[6px] font-black text-slate-900 tracking-widest">ID: CP-2026-X99</div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-[12px] font-black text-slate-900 mb-1 border-b border-slate-900 pb-1 px-4">CERTIFICATE OF MASTERY</h3>
                        <p className="text-[5px] text-slate-400 font-bold uppercase tracking-widest mt-4">THIS IS PRESENTED TO</p>
                        <p className="text-[14px] font-serif italic text-slate-900 my-2">Your Name Here</p>
                        <p className="text-[6px] text-slate-600 font-medium">For completing all problems in {TOPICS[0].name}</p>
                      </div>
                      <div className="w-full flex justify-between items-end">
                        <div className="text-[5px] text-slate-400 font-black">MAY 2026</div>
                        <div className="h-8 w-8 border border-blue-600 rounded-full flex items-center justify-center">
                           <ShieldCheck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-right">
                          <div className="h-[0.5px] w-12 bg-slate-900 mb-1" />
                          <div className="text-[5px] text-slate-900 font-bold">Director CodePath</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden bg-blue-600">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[150px] -ml-96 -mt-96 animate-pulse" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-black text-white mb-10 tracking-tight">Ready to start?</h2>
          <p className="text-blue-100 text-lg md:text-2xl mb-12 md:mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
            Jump in and start solving your first problem. No account needed to get started. Just pick a topic and go.
          </p>
          <Link 
            to="/topics"
            className="px-10 py-5 md:px-14 md:py-7 bg-white text-blue-600 rounded-[2rem] font-black text-xl md:text-3xl hover:bg-blue-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] inline-flex items-center gap-4 group"
          >
            Go to Topics <ChevronRight className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#020617] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">CodePath</span>
            </div>
            <div className="text-slate-600 text-sm font-bold">
              © 2026 CodePath Engineering.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-slate-600 hover:text-white text-sm font-bold uppercase tracking-widest">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-white text-sm font-bold uppercase tracking-widest">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Terminal': return <Terminal className="h-6 w-6 text-blue-400" />;
    case 'Split': return <Code className="h-6 w-6 text-blue-400" />;
    case 'RefreshCw': return <BrainCircuit className="h-6 w-6 text-blue-400" />;
    case 'Box': return <LayoutGrid className="h-6 w-6 text-blue-400" />;
    case 'LayoutGrid': return <LayoutGrid className="h-6 w-6 text-blue-400" />;
    case 'Type': return <Search className="h-6 w-6 text-blue-400" />;
    default: return <Terminal className="h-6 w-6 text-blue-400" />;
  }
};


const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group p-10 rounded-[2rem] border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed font-medium">{description}</p>
  </div>
);


const CertFeatureItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <li className="flex items-start gap-4">
    <div className="mt-1 flex-shrink-0">{icon}</div>
    <div>
      <h4 className="text-lg font-bold text-white mb-1 tracking-tight">{title}</h4>
      <p className="text-slate-400">{text}</p>
    </div>
  </li>
);
