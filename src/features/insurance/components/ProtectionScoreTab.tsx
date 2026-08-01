import React from 'react';
import {
  Award,
  ShieldCheck,
  Heart,
  Home,
  GraduationCap,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';

export const ProtectionScoreTab: React.FC = () => {
  const { getProtectionScore } = useInsuranceStore();
  const scoreData = getProtectionScore();

  const categories = [
    {
      title: 'Health Protection (Proteksi Kesehatan)',
      score: scoreData.healthScore,
      icon: Heart,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      barColor: 'bg-rose-500',
      desc: 'Meliputi BPJS Kesehatan & Asuransi Rawat Inap Swasta untuk seluruh anggota.'
    },
    {
      title: 'Life Protection (Proteksi Jiwa)',
      score: scoreData.lifeScore,
      icon: ShieldCheck,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      barColor: 'bg-cyan-500',
      desc: 'Perlindungan finansial untuk pencari nafkah utama keluarga.'
    },
    {
      title: 'Property Protection (Proteksi Aset & Rumah)',
      score: scoreData.propertyScore,
      icon: Home,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      barColor: 'bg-amber-500',
      desc: 'Perlindungan terhadap kebakaran, banjir, dan kerusakan fisik rumah.'
    },
    {
      title: 'Education Protection (Proteksi Dana Pendidikan)',
      score: scoreData.educationScore,
      icon: GraduationCap,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      barColor: 'bg-emerald-500',
      desc: 'Jaminan masa depan sekolah anak jika terjadi risiko tidak terduga.'
    },
    {
      title: 'Emergency Readiness (Kesiapan Berkas Darurat)',
      score: scoreData.emergencyReadinessScore,
      icon: ShieldAlert,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      barColor: 'bg-blue-500',
      desc: 'Kelengkapan Kartu Darurat, nomor agen, dan vault dokumen digital.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Main Score Card */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
              Tingkat Ketahanan Finansial
            </span>
            <h2 className="text-2xl font-black">AI Protection Score Audit</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Skor dievaluasi secara otomatis berdasarkan keberadaan polis aktif, cakupan uang pertanggungan, dan kesiapan berkas darurat keluarga.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-950/80 p-6 rounded-3xl border border-slate-800 shrink-0">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Skor Proteksi Total</div>
              <div className="text-4xl font-black text-emerald-400">
                {scoreData.overallScore} <span className="text-base text-slate-400">/ 100</span>
              </div>
              <div className="text-xs font-bold text-slate-300 mt-1">Level: {scoreData.level}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Breakdown per category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Category Bars */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>Rincian Evaluasi Kategori Proteksi</span>
          </h3>

          <div className="space-y-5">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${cat.bgColor} ${cat.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-200">{cat.title}</span>
                    </div>
                    <span className={`font-mono font-bold ${cat.color}`}>{cat.score}/100</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${cat.barColor} transition-all duration-500`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Recommendations to reach 100/100 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-amber-400 text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Langkah Mencapai Skor Proteksi 100/100</span>
          </h3>

          <div className="space-y-3">
            {scoreData.recommendations.map((rec, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Rekomendasi Prioritas {idx + 1}</span>
                </div>
                <p className="text-slate-300 pl-4">{rec}</p>
              </div>
            ))}

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasi Perpanjangan Rutin</span>
              </div>
              <p className="text-slate-300 pl-6">
                Pastikan seluruh tagihan premi BPJS dan asuransi swasta dikonfirmasi sebelum tanggal jatuh tempo.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
