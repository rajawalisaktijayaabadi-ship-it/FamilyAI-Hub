import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  ShieldCheck, 
  Share2 
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const WellnessReportSubTab: React.FC = () => {
  const { reports } = usePsychologyStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');

  const currentReport = reports.find((r) => r.period === selectedPeriod) || reports[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/90 border border-purple-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Laporan Kesejahteraan Psikologi AI (Wellness Report)</h2>
              <p className="text-xs text-slate-300">
                Sintesis berkala mengenai dinamika hubungan, komunikasi, dan perkembangan emosi keluarga
              </p>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            {(['weekly', 'monthly', 'quarterly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition-all ${
                  selectedPeriod === p
                    ? 'bg-purple-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'weekly' ? 'Mingguan' : p === 'monthly' ? 'Bulanan' : 'Triwulan'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Report Document Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Laporan Resmi Lanjutan AI
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Laporan Kesejahteraan Keluarga - Periode {selectedPeriod.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" /> Range Tanggal: {currentReport.dateRange}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Laporan Kesejahteraan berhasil diunduh sebagai PDF!')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Unduh PDF</span>
            </button>
          </div>
        </div>

        {/* Report Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Ringkasan Kesejahteraan Keseluruhan
            </div>
            <p className="text-slate-300 leading-relaxed">{currentReport.familyWellnessSummary}</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Analisis Komunikasi & Empati
            </div>
            <p className="text-slate-300 leading-relaxed">{currentReport.communicationSummary}</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Keharmonisan Pasangan Suami Istri
            </div>
            <p className="text-slate-300 leading-relaxed">{currentReport.relationshipSummary}</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4" /> Evaluasi Quality Time Bersama
            </div>
            <p className="text-slate-300 leading-relaxed">{currentReport.qualityTimeSummary}</p>
          </div>

        </div>

        {/* Highlights List */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Pencapaian Utama (Highlights) Periode Ini</span>
          </h4>

          <ul className="space-y-2 text-xs">
            {currentReport.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
