import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  TrendingUp, 
  Heart, 
  Sparkles, 
  Lock, 
  Users, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { useMoodStore } from '../stores/useMoodStore';
import { MOOD_META_MAP } from '../utils/moodData';

export const ParentDashboardSubTab: React.FC = () => {
  const { familyMoods, updateMemberPrivacy } = useMoodStore();

  // Filter kids members (e.g. Rizky Santoso)
  const childMembers = familyMoods.filter((m) => m.detailedRole.includes('Anak') || m.memberId === 'mem_3');

  const [consentGranted, setConsentGranted] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Parent Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/90 border border-purple-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600/30 border border-purple-500/40 rounded-2xl text-purple-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Parent Mood Monitoring & Parent Assistant
              </h2>
              <p className="text-xs text-slate-300">
                Akses pendampingan khusus orang tua untuk memahami iklim emosional anak dengan persetujuan privasi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/70 px-3.5 py-2 rounded-2xl border border-slate-800 text-xs">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Izin Akses Anak:</span>
            <span className="font-bold text-emerald-400">Persetujuan Aktif</span>
          </div>
        </div>
      </div>

      {/* Child Mood Alert & Insight */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <span>Status Kebahagiaan & Peringatan Dini Anak</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {childMembers.map((child) => {
            const meta = MOOD_META_MAP[child.currentMood] || MOOD_META_MAP.anxious;
            return (
              <div key={child.memberId} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={child.avatar} alt={child.memberName} className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{child.memberName}</h4>
                      <p className="text-xs text-slate-400">{child.detailedRole} • 16 Tahun</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-full animate-pulse">
                    Membutuhkan Dukungan
                  </span>
                </div>

                <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${meta.color}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{meta.emoji}</span>
                    <div>
                      <div className="text-xs font-bold">{child.moodLabel}</div>
                      <div className="text-[10px] opacity-80">Catatan: "{child.todayNote}"</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Tingkat Cemas</div>
                    <div className="text-rose-400 font-bold">{child.stressLevel} / 10 ⚡</div>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Energi Belajar</div>
                    <div className="text-amber-400 font-bold">{child.energyLevel} / 10 ⚡</div>
                  </div>
                </div>

                {/* AI Guidance for Parents */}
                <div className="bg-purple-950/40 border border-purple-500/30 p-3.5 rounded-2xl space-y-1.5 text-xs">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Panduan Komunikasi Orang Tua dari AI</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Rizky saat ini mengalami kecemasan akibat jadwal ujian esok hari. Tanyakan dengan lembut kabar harinya tanpa langsung menanyakan kesiapan nilai ujian. Berikan pelukan hangat dan sediakan camilan kesukaannya.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
