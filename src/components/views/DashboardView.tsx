import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus,
  Calendar, 
  Bot, 
  Smile, 
  Wallet, 
  HeartPulse, 
  GraduationCap, 
  ShoppingCart, 
  ShieldCheck, 
  AlertTriangle, 
  CloudSun, 
  Activity, 
  Bell, 
  CheckCircle2, 
  MapPin, 
  Home as HomeIcon, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Clock,
  Cake,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { AIHomeCard } from '../../features/ai/assistant/AIHomeCard';
import { SmartCalendarDashboardCard } from '../../features/calendar/components/SmartCalendarDashboardCard';
import { FamilyMember, TaskItem, SmartDevice, MealPlanDay, ActiveTab } from '../../types';
import { useFamilyStore } from '../../store/useFamilyStore';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardViewProps {
  familyMembers?: FamilyMember[];
  tasks?: TaskItem[];
  onToggleTask?: (taskId: string) => void;
  smartDevices?: SmartDevice[];
  onToggleDevice?: (deviceId: string) => void;
  mealPlan?: MealPlanDay;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenSOS?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  familyMembers: propsMembers,
  tasks = [],
  onToggleTask,
  smartDevices = [],
  onToggleDevice,
  mealPlan,
  onNavigateTab,
  onOpenSOS
}) => {
  const { user } = useAuth();
  const { 
    familyMembers: storeMembers, 
    familyProfile, 
    familyActivities, 
    setAddMemberOpen 
  } = useFamilyStore();

  const members = propsMembers && propsMembers.length > 0 ? propsMembers : storeMembers;

  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('Selamat Pagi');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour >= 3 && hour < 11) setGreeting('Selamat Pagi');
      else if (hour >= 11 && hour < 15) setGreeting('Selamat Siang');
      else if (hour >= 15 && hour < 19) setGreeting('Selamat Sore');
      else setGreeting('Selamat Malam');

      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Category counters for Overview
  const parentsCount = members.filter(m => m.role === 'parents' || m.detailedRole === 'Ayah' || m.detailedRole === 'Ibu').length;
  const kidsCount = members.filter(m => m.role === 'kids' || m.detailedRole === 'Anak').length;
  const seniorsCount = members.filter(m => m.role === 'seniors' || m.detailedRole === 'Kakek' || m.detailedRole === 'Nenek').length;
  const petsCount = 2; // Cat & Dog

  const quickActions = [
    { label: 'Tambah Anggota', icon: <UserPlus className="w-5 h-5 text-indigo-400" />, action: () => { onNavigateTab('family'); setAddMemberOpen(true); }, color: 'hover:border-indigo-500' },
    { label: 'Kalender & Agenda', icon: <Calendar className="w-5 h-5 text-sky-400" />, action: () => onNavigateTab('calendar'), color: 'hover:border-sky-500' },
    { label: 'Chat AI Assistant', icon: <Bot className="w-5 h-5 text-amber-400" />, action: () => onNavigateTab('assistant'), color: 'hover:border-amber-500' },
    { label: 'Keuangan Keluarga', icon: <Wallet className="w-5 h-5 text-emerald-400" />, action: () => onNavigateTab('finance'), color: 'hover:border-emerald-500' },
    { label: 'Kesehatan (Health)', icon: <HeartPulse className="w-5 h-5 text-rose-400" />, action: () => onNavigateTab('health'), color: 'hover:border-rose-500' },
    { label: 'Edukasi & Tugas', icon: <GraduationCap className="w-5 h-5 text-purple-400" />, action: () => onNavigateTab('education'), color: 'hover:border-purple-500' },
    { label: 'Deteksi Mood', icon: <Smile className="w-5 h-5 text-blue-400" />, action: () => onNavigateTab('mood'), color: 'hover:border-blue-500' },
    { label: 'Daftar Belanja', icon: <ShoppingCart className="w-5 h-5 text-orange-400" />, action: () => onNavigateTab('shopping'), color: 'hover:border-orange-500' },
    { label: 'Asuransi Proteksi', icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />, action: () => onNavigateTab('insurance'), color: 'hover:border-cyan-500' },
    { label: 'Emergency SOS', icon: <AlertTriangle className="w-5 h-5 text-red-500" />, action: () => onOpenSOS?.(), color: 'hover:border-red-500 bg-red-950/20' }
  ];

  return (
    <div className="space-y-6">

      {/* 1. Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 lg:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={user?.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'} 
              alt={user?.displayName || 'User'} 
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/80 shadow-lg"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{greeting}, {user?.displayName || 'Budi Santoso'}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Selamat Datang di {familyProfile.familyName}
              </h2>
              <p className="text-slate-300 text-xs max-w-xl">
                One Smart AI Platform for Your Entire Family — {familyProfile.motto}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            <div className="text-left">
              <div className="text-2xl font-black text-amber-400 font-mono tracking-wider flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>{currentTime || '08:00:00'}</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">{currentDate}</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <button
              onClick={() => onNavigateTab('assistant')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              <Bot className="w-4 h-4" />
              <span>Tanya AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Family Overview Card & Weather Widget Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Family Overview */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-lg text-white">Ringkasan Keluarga (Family Overview)</h3>
            </div>
            <button 
              onClick={() => onNavigateTab('family')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              <span>Kelola Keluarga</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl text-center space-y-1">
              <div className="text-2xl font-black text-white">{members.length}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Total Anggota</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl text-center space-y-1">
              <div className="text-2xl font-black text-blue-400">{parentsCount}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Orang Tua</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl text-center space-y-1">
              <div className="text-2xl font-black text-emerald-400">{kidsCount}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Anak</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl text-center space-y-1">
              <div className="text-2xl font-black text-amber-400">{seniorsCount}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Lansia</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1">
              <div className="text-2xl font-black text-purple-400">{petsCount}</div>
              <div className="text-[11px] text-slate-400 font-semibold">Peliharaan</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Kediaman / Rumah</div>
                  <div className="text-sm font-bold text-white">{familyProfile.homeCount} Rumah Terdaftar</div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">Kebayoran</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Family Harmony Score</div>
                  <div className="text-sm font-bold text-amber-400">{familyProfile.familyScore} / 100 (Sangat Baik)</div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full">Harmonis</span>
            </div>
          </div>
        </div>

        {/* 8. Weather Widget Placeholder */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">Cuaca & Kualitas Udara</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live IoT</span>
          </div>

          <div className="space-y-2 my-2">
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-extrabold text-white">31°C</span>
              <span className="text-sm font-semibold text-amber-300">Cerah Berawan</span>
            </div>
            <div className="text-xs text-slate-300 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Jakarta Selatan, DKI Jakarta</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">Kelembapan</div>
              <div className="font-bold text-slate-200">65% RH</div>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400">Kualitas Udara</div>
              <div className="font-bold text-emerald-400">38 AQI (Bagus)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Calendar & AI Planner Dashboard Section */}
      <SmartCalendarDashboardCard
        onNavigateToCalendar={() => onNavigateTab('calendar')}
        onNavigateToReminders={() => onNavigateTab('reminders')}
      />

      {/* 3. Today's Summary & 5. AI Assistant Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Summary */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-lg text-white">Hari Ini (Today's Summary)</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Jadwal & Agenda Terpadu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Agenda */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Jadwal Kerja & Sekolah</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="font-medium">• Ayah: Meeting Proyek Gedung (10:00 WIB)</p>
                <p className="font-medium">• Ahmad: Kelas Ekstrakurikuler Basket (15:00 WIB)</p>
                <p className="font-medium">• Nayla: Les Bahasa Inggris Online (16:30 WIB)</p>
              </div>
            </div>

            {/* Birthday & Reminder */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider">
                <Cake className="w-4 h-4 text-pink-400" />
                <span>Ulang Tahun & Acara</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="font-medium text-amber-300">🎂 Ulang Tahun Kakek Hadi (3 hari lagi)</p>
                <p className="font-medium">• Syukuran Keluarga Akhir Minggu ini</p>
              </div>
            </div>

            {/* General Reminders */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span>Reminder Penting</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="font-medium">• Bayar Tagihan Listrik & WiFi (Jatuh tempo tgl 5)</p>
                <p className="font-medium">• Beli Vitamin Kakek Hadi</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Preview Card */}
        <AIHomeCard onOpenChatWithPrompt={(promptText) => {
          onNavigateTab('assistant');
        }} />
      </div>

      {/* 4. Quick Actions Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Akses Cepat (Quick Actions)</span>
          </h3>
          <span className="text-xs text-slate-400">Navigasi Modul Pintar</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {quickActions.map((act, idx) => (
            <button
              key={idx}
              onClick={act.action}
              className={`p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all transform hover:-translate-y-1 ${act.color} group`}
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                {act.icon}
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover:text-white">{act.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. Family Activity Timeline & 7. Notification Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <span>Aktivitas Terkini Keluarga (Activity Timeline)</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">Realtime Log</span>
          </div>

          <div className="space-y-3">
            {familyActivities.slice(0, 5).map((act) => (
              <div key={act.id} className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 flex items-center gap-3">
                <img src={act.actorAvatar} alt={act.actorName} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{act.actorName}</span>
                    <span className="text-slate-400 text-[10px]">{act.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-300 truncate mt-0.5">{act.action}</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-indigo-300 rounded-full">
                  {act.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Notification Center & 9. Family Statistics */}
        <div className="space-y-6">
          {/* Notification Center */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Pusat Notifikasi</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">3 Baru</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Cake className="w-3.5 h-3.5" />
                  <span>Pengingat Ulang Tahun</span>
                </div>
                <p className="text-slate-300">Ulang tahun Kakek Hadi tinggal 3 hari lagi. Jangan lupa siapkan kado!</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tugas Selesai</span>
                </div>
                <p className="text-slate-300">Ahmad telah menyelesaikan tugas Matematika & Latihan Basket.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Acara Mendatang</span>
                </div>
                <p className="text-slate-300">Syukuran keluarga dijadwalkan hari Sabtu pkl 18:00 WIB.</p>
              </div>
            </div>
          </div>

          {/* 9. Family Statistics Placeholder */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Statistik Aktivitas</span>
              </h3>
              <span className="text-xs text-slate-400">Minggu Ini</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Penyelesaian Tugas</span>
                  <span className="font-bold text-emerald-400">88%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Kehadiran Agenda</span>
                  <span className="font-bold text-sky-400">95%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Cek Kesehatan Bersama</span>
                  <span className="font-bold text-purple-400">100%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
