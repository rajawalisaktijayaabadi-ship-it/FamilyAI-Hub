import React from 'react';
import { BarChart3, TrendingUp, Heart, Wallet, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-2 shadow-xl">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-sky-400" />
          <h2 className="text-xl font-bold">Analytics & Insight Rangkuman Keluarga</h2>
        </div>
        <p className="text-xs text-slate-300">
          Metrik kesehatan emosi, efisiensi anggaran, pencapaian tugas rumah, dan penggunaan energi smart home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Stabilitas Emosi</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">92%</div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full w-[92%]" />
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold">+4% dibanding minggu lalu</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Disiplin Anggaran</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">88%</div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[88%]" />
          </div>
          <p className="text-[10px] text-slate-400">Hemat Rp 1.200.000 bulan ini</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Penyelesaian Agenda</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">95%</div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[95%]" />
          </div>
          <p className="text-[10px] text-amber-400 font-semibold">18/19 Tugas selesai tepat waktu</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Efisiensi Energi IoT</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">82%</div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full w-[82%]" />
          </div>
          <p className="text-[10px] text-indigo-400">Mode hemat daya malam hari aktif</p>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Analisis Tren Mingguan Kebersamaan Keluarga</h3>
        <p className="text-xs text-slate-400">
          Grafik menunjukkan peningkatan konsistensi makan malam bersama, waktu tidur anak tepat waktu, dan aktivitas fisik luar ruangan secara berkala.
        </p>

        <div className="h-48 w-full bg-slate-950 rounded-2xl border border-slate-800 flex items-end justify-between p-6 gap-2">
          {[
            { day: 'Senin', score: 85 },
            { day: 'Selasa', score: 90 },
            { day: 'Rabu', score: 88 },
            { day: 'Kamis', score: 92 },
            { day: 'Jumat', score: 96 },
            { day: 'Sabtu', score: 98 },
            { day: 'Minggu', score: 95 },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div 
                className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-xl transition-all"
                style={{ height: `${item.score}%` }}
              />
              <span className="text-[10px] text-slate-400 font-semibold">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
