import React from 'react';
import {
  ShieldCheck,
  Heart,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Plane,
  Dog,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import { InsuranceCategoryType } from '../../../types';

export const CoverageSummaryTab: React.FC = () => {
  const { policies, getCoverageSummary } = useInsuranceStore();
  const summaryList = getCoverageSummary();

  const activePolicies = policies.filter((p) => p.status === 'active');
  const totalLimitAll = activePolicies.reduce((acc, p) => acc + p.coverageLimit, 0);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Kesehatan':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Jiwa':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'Rumah':
        return <Home className="w-5 h-5 text-amber-400" />;
      case 'Kendaraan':
        return <Car className="w-5 h-5 text-blue-400" />;
      case 'Pendidikan':
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'Perjalanan':
        return <Plane className="w-5 h-5 text-purple-400" />;
      case 'Usaha':
        return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Pet Insurance':
        return <Dog className="w-5 h-5 text-orange-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Ringkasan Batas Pertanggungan (Coverage Summary)</h2>
          </div>
          <p className="text-xs text-slate-300">
            Nilai maksimal klaim dan proteksi finansial yang aktif untuk tiap sektor kehidupan keluarga.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right min-w-[220px]">
          <div className="text-xs text-slate-400 font-medium">Total Uang Pertanggungan</div>
          <div className="text-2xl font-black text-emerald-400">
            Rp {(totalLimitAll / 1000000).toLocaleString('id-ID')} Juta
          </div>
        </div>
      </div>

      {/* Coverage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryList.map((cov) => {
          const policiesInCat = policies.filter((p) => p.category === cov.category && p.status === 'active');

          let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
          if (cov.status === 'Optimal') badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-500/30';
          else if (cov.status === 'Cukup') badgeColor = 'bg-blue-950 text-blue-300 border-blue-500/30';
          else if (cov.status === 'Kurang') badgeColor = 'bg-amber-950 text-amber-300 border-amber-500/30';

          return (
            <div
              key={cov.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800">
                      {getCategoryIcon(cov.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{cov.category}</h3>
                      <span className="text-[10px] text-slate-400">{cov.activePoliciesCount} Polis Terhubung</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                    {cov.status}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Uang Pertanggungan Maksimun:</div>
                  <div className="text-xl font-black text-cyan-300">
                    Rp {cov.totalLimit.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Policies inside category */}
                {policiesInCat.length > 0 ? (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-400">Polis Aktif:</div>
                    {policiesInCat.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-slate-200 truncate max-w-[160px]">{p.title}</span>
                        <span className="font-mono text-emerald-400 font-bold">
                          Rp {(p.coverageLimit / 1000000).toLocaleString('id-ID')} Jt
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Belum ada polis aktif di sektor ini.</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" /> 4 Anggota Keluarga
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">100% Sisa Limit</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
