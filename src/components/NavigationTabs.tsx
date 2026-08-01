import React from 'react';
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
  Plane
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const tabItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string; category: string }[] = [
  // Utama
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, category: 'Utama' },
  { id: 'family', label: 'Family Management', icon: <Users className="w-4 h-4 text-blue-400" />, badge: 'Baru', category: 'Utama' },
  { id: 'calendar', label: 'Smart Calendar', icon: <CalendarIcon className="w-4 h-4 text-indigo-400" />, badge: 'AI Plan', category: 'Utama' },
  { id: 'reminders', label: 'Reminder Center', icon: <Bell className="w-4 h-4 text-amber-400" />, category: 'Utama' },
  { id: 'assistant', label: 'AI Assistant & Voice', icon: <Bot className="w-4 h-4 text-amber-400" />, badge: 'AI Live', category: 'Utama' },
  
  // Psikologi & Parenting
  { id: 'mood', label: 'AI Mood Detection', icon: <Smile className="w-4 h-4 text-blue-400" />, category: 'Mental & Edu' },
  { id: 'psychology', label: 'AI Psikologi', icon: <Brain className="w-4 h-4 text-purple-400" />, category: 'Mental & Edu' },
  { id: 'parenting', label: 'AI Parenting', icon: <Baby className="w-4 h-4 text-pink-400" />, category: 'Mental & Edu' },
  { id: 'education', label: 'AI Pendidikan Anak', icon: <GraduationCap className="w-4 h-4 text-emerald-400" />, category: 'Mental & Edu' },
  
  // Kesehatan & Keuangan
  { id: 'health', label: 'AI Health', icon: <HeartPulse className="w-4 h-4 text-red-400" />, category: 'Proteksi & Fin' },
  { id: 'insurance', label: 'AI Proteksi & Asuransi', icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />, category: 'Proteksi & Fin' },
  { id: 'finance', label: 'AI Keuangan', icon: <Wallet className="w-4 h-4 text-green-400" />, category: 'Proteksi & Fin' },
  
  // Makanan & Rumah
  { id: 'meals', label: 'AI Meal Planner', icon: <Utensils className="w-4 h-4 text-amber-500" />, category: 'Rumah & Gaya Hidup' },
  { id: 'shopping', label: 'AI Shopping & Smart Inventory', icon: <ShoppingCart className="w-4 h-4 text-orange-400" />, badge: 'Smart', category: 'Rumah & Gaya Hidup' },
  { id: 'smarthome', label: 'Smart Home IoT', icon: <Home className="w-4 h-4 text-indigo-400" />, category: 'Rumah & Gaya Hidup' },
  { id: 'travel', label: 'AI Travel & Events', icon: <Plane className="w-4 h-4 text-amber-400" />, badge: 'Vacation', category: 'Rumah & Gaya Hidup' },
  { id: 'safety', label: 'Family Safety & GPS', icon: <MapPin className="w-4 h-4 text-rose-400" />, badge: 'Live GPS', category: 'Rumah & Gaya Hidup' },
  
  // Komunikasi & Kenangan
  { id: 'communication', label: 'Family Chat & Notes', icon: <MessageSquare className="w-4 h-4 text-teal-400" />, category: 'Komunikasi' },
  { id: 'memories', label: 'Family Memories', icon: <Camera className="w-4 h-4 text-fuchsia-400" />, category: 'Komunikasi' },
  
  // Analisis & Admin
  { id: 'analytics', label: 'Analytics Insights', icon: <BarChart3 className="w-4 h-4 text-sky-400" />, category: 'Manajemen' },
  { id: 'admin', label: 'Admin Panel', icon: <Settings className="w-4 h-4 text-slate-400" />, category: 'Manajemen' }
];


export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-300 px-4 overflow-x-auto no-scrollbar py-2">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
        {tabItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              id={`tab-nav-${item.id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40 scale-102'
                  : 'hover:bg-slate-800/80 hover:text-white text-slate-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-amber-400 border border-amber-400/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
