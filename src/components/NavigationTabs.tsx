import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users,
  Calendar as CalendarIcon,
  Bell,
  Bot, 
  Smile, 
  Brain, 
  Baby, 
  GraduationCap, 
  HeartPulse, 
  ShieldCheck, 
  Wallet, 
  Utensils, 
  ShoppingCart, 
  Home, 
  MapPin, 
  MessageSquare, 
  Camera, 
  BarChart3, 
  Settings,
  Plane,
  ChevronRight,
  Menu,
  X,
  Search,
  Lock,
  Eye,
  Shield,
  User
} from 'lucide-react';
import { ActiveTab, FamilyMember } from '../types';
import { getRoleAllowedTabs, getRoleBadgeInfo } from '../utils/rolePermissions';

interface NavigationTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentMember?: FamilyMember;
}

export const tabItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string; category: string }[] = [
  // Utama
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, category: 'Utama' },
  { id: 'family', label: 'Family Management', icon: <Users className="w-4 h-4 text-blue-400" />, badge: 'Baru', category: 'Utama' },
  { id: 'calendar', label: 'Smart Calendar', icon: <CalendarIcon className="w-4 h-4 text-indigo-400" />, badge: 'AI Plan', category: 'Utama' },
  { id: 'reminders', label: 'Reminder Center', icon: <Bell className="w-4 h-4 text-amber-400" />, category: 'Utama' },
  { id: 'assistant', label: 'AI Assistant & Voice', icon: <Bot className="w-4 h-4 text-amber-400" />, badge: 'AI Live', category: 'Utama' },
  
  // Mental & Edu
  { id: 'mood', label: 'AI Mood Detection', icon: <Smile className="w-4 h-4 text-blue-400" />, category: 'Mental & Edu' },
  { id: 'psychology', label: 'AI Psikologi', icon: <Brain className="w-4 h-4 text-purple-400" />, category: 'Mental & Edu' },
  { id: 'parenting', label: 'AI Parenting', icon: <Baby className="w-4 h-4 text-pink-400" />, category: 'Mental & Edu' },
  { id: 'education', label: 'AI Pendidikan Anak', icon: <GraduationCap className="w-4 h-4 text-emerald-400" />, category: 'Mental & Edu' },
  
  // Proteksi & Fin
  { id: 'health', label: 'AI Health', icon: <HeartPulse className="w-4 h-4 text-red-400" />, category: 'Proteksi & Fin' },
  { id: 'insurance', label: 'AI Proteksi & Asuransi', icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />, category: 'Proteksi & Fin' },
  { id: 'finance', label: 'AI Keuangan', icon: <Wallet className="w-4 h-4 text-green-400" />, category: 'Proteksi & Fin' },
  
  // Rumah & Gaya Hidup
  { id: 'meals', label: 'AI Meal Planner', icon: <Utensils className="w-4 h-4 text-amber-500" />, category: 'Rumah & Gaya Hidup' },
  { id: 'shopping', label: 'AI Shopping & Inventory', icon: <ShoppingCart className="w-4 h-4 text-orange-400" />, badge: 'Smart', category: 'Rumah & Gaya Hidup' },
  { id: 'smarthome', label: 'Smart Home IoT', icon: <Home className="w-4 h-4 text-indigo-400" />, category: 'Rumah & Gaya Hidup' },
  { id: 'travel', label: 'AI Travel & Events', icon: <Plane className="w-4 h-4 text-amber-400" />, badge: 'Vacation', category: 'Rumah & Gaya Hidup' },
  { id: 'safety', label: 'Family Safety & GPS', icon: <MapPin className="w-4 h-4 text-rose-400" />, badge: 'GPS', category: 'Rumah & Gaya Hidup' },
  
  // Komunikasi
  { id: 'communication', label: 'Family Chat & Notes', icon: <MessageSquare className="w-4 h-4 text-teal-400" />, category: 'Komunikasi' },
  { id: 'memories', label: 'Family Memories', icon: <Camera className="w-4 h-4 text-fuchsia-400" />, category: 'Komunikasi' },
  
  // Manajemen
  { id: 'analytics', label: 'Analytics Insights', icon: <BarChart3 className="w-4 h-4 text-sky-400" />, category: 'Manajemen' },
  { id: 'admin', label: 'Admin Panel', icon: <Settings className="w-4 h-4 text-slate-400" />, category: 'Manajemen' }
];

const categories = ['Utama', 'Mental & Edu', 'Proteksi & Fin', 'Rumah & Gaya Hidup', 'Komunikasi', 'Manajemen'];

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange, currentMember }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllMenus, setShowAllMenus] = useState(false);

  const allowedTabs = getRoleAllowedTabs(currentMember);
  const roleInfo = getRoleBadgeInfo(currentMember);

  // Filter items by allowed tabs (unless showAllMenus is true) AND search term
  const visibleItems = tabItems.filter((item) => {
    const matchesSearch = 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (showAllMenus) return true;
    return allowedTabs.includes(item.id);
  });

  const activeItemObj = tabItems.find(i => i.id === activeTab);

  return (
    <>
      {/* Mobile Sidebar Toggle Header (Visible on smaller screens) */}
      <div className="md:hidden flex items-center justify-between p-3 bg-slate-900 border-b border-slate-800 text-slate-200">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700"
        >
          {mobileOpen ? <X className="w-4 h-4 text-rose-400" /> : <Menu className="w-4 h-4 text-indigo-400" />}
          <span>{mobileOpen ? 'Tutup Menu' : 'Menu Navigasi Sidebar'}</span>
        </button>

        {activeItemObj && (
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/30">
            {activeItemObj.icon}
            <span className="truncate max-w-[150px]">{activeItemObj.label}</span>
          </div>
        )}
      </div>

      {/* Left Sidebar Navigation Container */}
      <aside
        className={`
          w-full md:w-64 lg:w-72 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/80
          flex flex-col shrink-0 transition-all duration-300 z-30
          ${mobileOpen ? 'block' : 'hidden md:flex'}
        `}
      >
        {/* Active Role Status & Permissions Banner */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              {currentMember ? (
                <img 
                  src={currentMember.avatar} 
                  alt={currentMember.name} 
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/50 shrink-0" 
                />
              ) : (
                <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
              )}
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 truncate">
                  {currentMember ? currentMember.name : 'Profil Pengguna'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentMember ? currentMember.roleTitle : 'Orang Tua'}
                </div>
              </div>
            </div>

            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border uppercase shrink-0 ${roleInfo.color}`}>
              {roleInfo.badge}
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-800">
            <span className="truncate">
              Akses: <strong className="text-indigo-300">{allowedTabs.length}</strong> / {tabItems.length} Modul
            </span>
            <button
              onClick={() => setShowAllMenus(!showAllMenus)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline flex items-center gap-1 shrink-0 ml-1"
              title={showAllMenus ? 'Sembunyikan menu yang tidak diizinkan untuk role ini' : 'Tampilkan semua menu (Lihat status terkunci)'}
            >
              {showAllMenus ? <Eye className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              <span>{showAllMenus ? 'Dibatasi' : 'Semua'}</span>
            </button>
          </div>
        </div>

        {/* Sidebar Header & Search Filter */}
        <div className="p-3.5 border-b border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Menu Navigasi
            </span>
            <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              {visibleItems.length} Modul
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari fitur/modul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2 text-[10px] text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-4 max-h-[calc(100vh-220px)] md:max-h-none custom-scrollbar">
          {categories.map((cat) => {
            const itemsInCat = visibleItems.filter((item) => item.category === cat);
            if (itemsInCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>{cat}</span>
                  <span className="text-[9px] text-slate-600 font-normal">({itemsInCat.length})</span>
                </div>

                <div className="space-y-0.5">
                  {itemsInCat.map((item) => {
                    const isActive = activeTab === item.id;
                    const isAllowed = allowedTabs.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        id={`tab-nav-${item.id}`}
                        onClick={() => {
                          onTabChange(item.id);
                          setMobileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group text-left ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-indigo-400/30'
                            : isAllowed
                              ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                              : 'text-slate-500 hover:bg-slate-900 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          {!isAllowed && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-950/80 text-rose-400 border border-rose-800/40 flex items-center gap-0.5" title="Menu ini dibatasi untuk role aktif">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Dibatasi</span>
                            </span>
                          )}
                          {isAllowed && item.badge && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                              isActive
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : 'bg-slate-800/90 text-amber-400 border border-amber-400/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white opacity-100' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer Status */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-slate-300">System Ready</span>
          </div>
          <span className="text-[10px] text-indigo-400 font-bold">Role: {roleInfo.name.split(' ')[0]}</span>
        </div>
      </aside>
    </>
  );
};


