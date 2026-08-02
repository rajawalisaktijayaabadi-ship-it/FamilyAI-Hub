import React, { useRef, useState } from 'react';
import { 
  Brain, 
  LayoutDashboard, 
  ClipboardCheck, 
  MessageSquareHeart, 
  Scale, 
  HeartHandshake, 
  Baby, 
  GraduationCap, 
  HeartPulse, 
  Trophy, 
  BookOpen, 
  FileText,
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';
import { PsychologySubTab } from '../types/psychologyTypes';

export const PsychologyHeaderNav: React.FC = () => {
  const { activeSubTab, setActiveSubTab } = usePsychologyStore();
  const navRef = useRef<HTMLDivElement>(null);

  // Mouse Drag to Scroll State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = 260;
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - navRef.current.offsetLeft);
    setScrollLeft(navRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    navRef.current.scrollLeft = scrollLeft - walk;
  };

  const navItems: { id: PsychologySubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'assessment', label: 'Asesmen Psikologi', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'communication', label: 'Coach Komunikasi', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { id: 'conflict', label: 'Resolusi Konflik', icon: <Scale className="w-4 h-4" /> },
    { id: 'couple', label: 'Keharmonisan Pasangan', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'parenting', label: 'Parenting Wellness', icon: <Baby className="w-4 h-4" /> },
    { id: 'teen', label: 'Dukungan Remaja', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'senior', label: 'Lansia (Senior Care)', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'challenge', label: 'Tantangan & Achievement', icon: <Trophy className="w-4 h-4" /> },
    { id: 'reflection', label: 'Refleksi Harian', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'report', label: 'Laporan Lanjutan', icon: <FileText className="w-4 h-4" /> },
    { id: 'database', label: 'Schema DB', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-2xl text-purple-400 shadow-lg shadow-purple-500/10">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI Family Psychology Center</span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Well-being Intelligence
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Pusat kecerdasan psikologi keluarga untuk meningkatkan komunikasi, keharmonisan, pengasuhan, dan kesejahteraan emosional.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar with Scroll Arrows & Drag-to-Scroll */}
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-800/90 text-purple-300 border border-purple-500/30 shadow-xl hover:bg-purple-600 hover:text-white transition-all opacity-80 group-hover:opacity-100"
          title="Geser Kiri"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={navRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-900/40 scrollbar-track-slate-950/60 scroll-smooth px-2 cursor-grab active:cursor-grabbing select-none"
        >
          {navItems.map((item) => {
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 font-bold scale-[1.02]'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-800/90 text-purple-300 border border-purple-500/30 shadow-xl hover:bg-purple-600 hover:text-white transition-all opacity-80 group-hover:opacity-100"
          title="Geser Kanan"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
