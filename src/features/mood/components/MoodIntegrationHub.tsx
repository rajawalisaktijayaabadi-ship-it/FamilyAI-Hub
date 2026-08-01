import React from 'react';
import { 
  Bot, 
  Brain, 
  Calendar as CalendarIcon, 
  Bell, 
  Users, 
  Heart, 
  Wallet, 
  BookOpen, 
  ShieldCheck, 
  Utensils, 
  ShoppingBag, 
  Home, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

export const MoodIntegrationHub: React.FC = () => {
  const activeIntegrations = [
    { title: 'AI Assistant', icon: <Bot className="w-4 h-4 text-amber-400" />, desc: 'Pertukaran konteks mood untuk balasan empati AI', status: 'Active' },
    { title: 'AI Memory & Context', icon: <Brain className="w-4 h-4 text-purple-400" />, desc: 'Riwayat emosi disimpan dalam memori jangka panjang AI', status: 'Active' },
    { title: 'Smart Family Dashboard', icon: <Users className="w-4 h-4 text-blue-400" />, desc: 'Ringkasan kebahagiaan keluarga tampil di halaman utama', status: 'Active' },
    { title: 'Family Members', icon: <Users className="w-4 h-4 text-indigo-400" />, desc: 'Relasi antar profil anggota keluarga terhubung', status: 'Active' },
    { title: 'Smart Calendar', icon: <CalendarIcon className="w-4 h-4 text-sky-400" />, desc: 'Saran waktu istirahat otomatis masuk ke kalender', status: 'Active' },
    { title: 'Notification Engine', icon: <Bell className="w-4 h-4 text-rose-400" />, desc: 'Reminder check-in dan peringatan cemas anak', status: 'Active' },
  ];

  const pendingPlaceholders = [
    { title: 'AI Family Psychology (Prompt 6)', icon: <Brain className="w-4 h-4 text-purple-400" />, desc: 'Service & data mood siap dipakai oleh Prompt 6' },
    { title: 'Health Center', icon: <Heart className="w-4 h-4 text-rose-400" />, desc: 'Korelasi mood dengan kesehatan fisik & vitalitas' },
    { title: 'Finance Center', icon: <Wallet className="w-4 h-4 text-emerald-400" />, desc: 'Analisis dampak keuangan terhadap kestabilan emosi' },
    { title: 'Education & Parenting', icon: <BookOpen className="w-4 h-4 text-amber-400" />, desc: 'Korelasi mood anak dengan prestasi belajar' },
    { title: 'Insurance & Safety', icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />, desc: 'Wellness score untuk program perlindungan keluarga' },
    { title: 'Meal Planner & Nutrition', icon: <Utensils className="w-4 h-4 text-orange-400" />, desc: 'Rekomendasi makanan penambah mood' },
    { title: 'Shopping List', icon: <ShoppingBag className="w-4 h-4 text-pink-400" />, desc: 'Daftar belanja kebutuhan rileksasi' },
    { title: 'Smart Home Control', icon: <Home className="w-4 h-4 text-cyan-400" />, desc: 'Penyesuaian lampu & musik kamar sesuai mood' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-2xl">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Hub Integrasi Ekosistem Mood Center</h3>
          <p className="text-xs text-slate-400">
            Jembatan arsitektur modular yang menghubungkan AI Mood Detection dengan seluruh modul FamilyAI Hub
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Integrations */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Integrasi Aktif Terhubung
          </div>
          <div className="space-y-2">
            {activeIntegrations.map((item) => (
              <div key={item.title} className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <div>
                    <div className="font-bold text-slate-200">{item.title}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ready Placeholders for Next Prompts */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Placeholder Siap Digunakan (Ready for Prompt 6+)
          </div>
          <div className="space-y-2">
            {pendingPlaceholders.map((item) => (
              <div key={item.title} className="bg-slate-950/40 border border-slate-800/60 p-2.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <div>
                    <div className="font-bold text-slate-300">{item.title}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  Ready Service
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
