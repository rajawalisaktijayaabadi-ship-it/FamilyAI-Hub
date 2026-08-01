import React, { useState } from 'react';
import { 
  FileCheck, Download, Printer, Calendar, Sparkles, 
  CheckCircle2, ShieldCheck, Activity, Heart, Droplet 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface HealthReportTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const HealthReportTab: React.FC<HealthReportTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { generateHealthReport } = useHealthStore();

  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const selectedMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];

  const report = generateHealthReport(selectedMemberId, period);

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <span>Laporan Rekapitulasi Kesehatan (PDF Ready)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Laporan medis berkala untuk dikonsultasikan dengan dokter keluarga atau klaim asuransi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['daily', 'weekly', 'monthly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  period === p ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'daily' ? 'Harian' : p === 'weekly' ? 'Mingguan' : 'Bulanan'}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrintDownload}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Cetak / Download PDF</span>
          </button>
        </div>
      </div>

      {/* Report Document Box (Print Ready Layout) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl print:bg-white print:text-black print:border-none print:p-0">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 print:border-black gap-4">
          <div className="flex items-center gap-4">
            <img src={currentMember.avatar} alt={currentMember.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30" />
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">FAMILY AI HEALTH REPORT</span>
              <h2 className="text-xl font-black text-white print:text-black">{report.title}</h2>
              <p className="text-xs text-slate-400 print:text-gray-600">Rentang Waktu: <strong>{report.dateRange}</strong></p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-emerald-400">{report.healthScore} <span className="text-xs font-semibold text-slate-400">/ 100</span></span>
            <span className="text-xs font-bold text-emerald-300 block">Kategori: SANGAT PRIMA</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 print:bg-gray-100 print:border-gray-300">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Ringkasan Eksekutif AI Medis</span>
          </h4>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            {report.summaryText}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 print:bg-gray-100">
            <span className="text-xs text-slate-400 print:text-gray-600 font-bold block">Rata-Rata Tensi</span>
            <span className="text-xl font-extrabold text-white print:text-black mt-1 block">{report.vitalAverageBP}</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 print:bg-gray-100">
            <span className="text-xs text-slate-400 print:text-gray-600 font-bold block">Detak Jantung</span>
            <span className="text-xl font-extrabold text-rose-400 mt-1 block">{report.vitalAverageHR} bpm</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 print:bg-gray-100">
            <span className="text-xs text-slate-400 print:text-gray-600 font-bold block">Total Olahraga</span>
            <span className="text-xl font-extrabold text-amber-400 mt-1 block">{report.exerciseMinutesTotal} mnt</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 print:bg-gray-100">
            <span className="text-xs text-slate-400 print:text-gray-600 font-bold block">Rata-Rata Tidur</span>
            <span className="text-xl font-extrabold text-indigo-400 mt-1 block">{report.sleepAvgHours} jam</span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Rekomendasi Gaya Hidup & Tindak Lanjut Medis</span>
          </h4>
          <div className="space-y-2">
            {report.recommendations.map((rec, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 print:bg-gray-100 flex items-start gap-2.5 text-xs text-slate-300 print:text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stamp */}
        <div className="pt-6 border-t border-slate-800 print:border-gray-300 flex items-center justify-between text-[11px] text-slate-500 print:text-gray-600">
          <span>Diterbitkan Oleh: FamilyAI Hub Health System</span>
          <span>Tanggal Terbit: {report.generatedAt}</span>
        </div>

      </div>

    </div>
  );
};
