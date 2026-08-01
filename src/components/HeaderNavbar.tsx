import React from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Tv, 
  Monitor, 
  Tablet as TabletIcon, 
  Smartphone, 
  User, 
  Volume2, 
  Bell, 
  Bot,
  HeartPulse
} from 'lucide-react';
import { FamilyMember, DeviceViewMode } from '../types';

interface HeaderNavbarProps {
  currentMember: FamilyMember;
  familyMembers: FamilyMember[];
  onSelectMember: (member: FamilyMember) => void;
  viewMode: DeviceViewMode;
  onChangeViewMode: (mode: DeviceViewMode) => void;
  onOpenSOS: () => void;
  onOpenAssistant: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  currentMember,
  familyMembers = [],
  onSelectMember,
  viewMode,
  onChangeViewMode,
  onOpenSOS,
  onOpenAssistant
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Tagline */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChangeViewMode('desktop')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  FamilyAI <span className="text-indigo-400">Hub</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  v2.5 Smart AI
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Asisten Digital Keluarga Masa Depan</p>
            </div>
          </div>

          {/* Quick SOS Panic Button Mobile */}
          <button
            onClick={onOpenSOS}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md shadow-red-600/30 animate-bounce"
            id="sos-btn-mobile"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS</span>
          </button>
        </div>

        {/* View Mode Simulator & Active Profile */}
        <div className="flex items-center flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto">
          
          {/* Device Responsive View Mode Selector */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => onChangeViewMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'desktop' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan PC/Laptop"
              id="view-pc-btn"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PC/Laptop</span>
            </button>
            <button
              onClick={() => onChangeViewMode('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'tablet' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan Tablet"
              id="view-tablet-btn"
            >
              <TabletIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => onChangeViewMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'mobile' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan Mobile (iOS/Android)"
              id="view-mobile-btn"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HP/Mobile</span>
            </button>
            <button
              onClick={() => onChangeViewMode('smart_tv')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'smart_tv' ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'text-amber-400 hover:text-amber-300'
              }`}
              title="Mode Smart TV Dashboard"
              id="view-tv-btn"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Smart TV</span>
            </button>
          </div>

          {/* Quick Voice Assistant Launcher */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all border border-purple-400/30"
            id="ai-quick-trigger"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Voice & AI</span>
          </button>

          {/* SOS Panic Button Desktop */}
          <button
            onClick={onOpenSOS}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/25 border border-red-500/40 transition-all hover:scale-105"
            id="sos-btn-desktop"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS Darurat</span>
          </button>

          {/* Member Profile Switcher Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-medium transition-all"
              id="member-profile-btn"
            >
              <img 
                src={currentMember.avatar} 
                alt={currentMember.name} 
                className="w-6 h-6 rounded-full object-cover ring-2 ring-indigo-500" 
              />
              <div className="text-left hidden sm:block">
                <div className="text-slate-200 font-semibold leading-none">{currentMember.name}</div>
                <div className="text-[10px] text-slate-400">{currentMember.relationship}</div>
              </div>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                Ganti Anggota Keluarga
              </div>
              {familyMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-left transition-all ${
                    member.id === currentMember.id 
                      ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover" />
                  <div className="flex-1 truncate">
                    <div className="font-medium text-slate-200">{member.name}</div>
                    <div className="text-[10px] text-slate-400">{member.roleTitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
