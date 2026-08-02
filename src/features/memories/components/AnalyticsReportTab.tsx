import React, { useState } from 'react';
import { BarChart3, HardDrive, Heart, FolderHeart, FileText, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { MemoryService } from '../services/memoryService';
import { MemoryReport } from '../../../types/memories';

export const AnalyticsReportTab: React.FC = () => {
  const { analytics, albums, photos, videos, timelines } = useMemoryStore();
  const [report, setReport] = useState<MemoryReport | null>(null);

  const handleGenerateReport = () => {
    const rep = MemoryService.generateMemoryReport(albums, photos, videos, timelines);
    setReport(rep);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <span>Media Analytics & Memory Report Center</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Analisis penggunaan media penyimpanan, statistik pengunggahan bulanan, album terpopuler, dan ikhtisar laporan ringkasan
            </p>
          </div>

          <button
            onClick={handleGenerateReport}
            className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Laporan AI Ringkasan</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Storage Usage Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" /> Storage Capacity
            </h3>
            <span className="text-xs font-bold text-cyan-300">
              {analytics.storageUsage.usedGB} GB / {analytics.storageUsage.totalGB} GB
            </span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" 
              style={{ width: `${(analytics.storageUsage.usedGB / analytics.storageUsage.totalGB) * 100}%` }} 
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="text-[10px] text-slate-400 block">Kapasitas Foto</span>
              <span className="font-bold text-fuchsia-300">{analytics.storageUsage.photoGB} GB</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
              <span className="text-[10px] text-slate-400 block">Kapasitas Video</span>
              <span className="font-bold text-purple-300">{analytics.storageUsage.videoGB} GB</span>
            </div>
          </div>
        </div>

        {/* Popular Albums Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl md:col-span-2">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <FolderHeart className="w-4 h-4 text-amber-400" /> Album Terpopuler & Paling Sering Dilihat
          </h3>

          <div className="space-y-3">
            {(analytics.popularAlbums || []).map((alb) => (
              <div key={alb.albumId} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white">{alb.name}</h4>
                  <span className="text-[10px] text-slate-400">{alb.photos} Foto Tersimpan</span>
                </div>
                <div className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-xl border border-amber-500/30">
                  {alb.views} x Dilihat
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Generated Report View */}
      {report && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/40 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Laporan Ringkasan Memori Keluarga</h3>
              </div>
              <p className="text-xs text-slate-400">Periode {report.period} • Dibuat pada {report.generatedAt}</p>
            </div>

            <button
              onClick={() => alert('Laporan PDF berhasil diunduh ke direktori lokal!')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Export PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-bold text-fuchsia-300">1. Ringkasan Media:</span>
              <p className="text-slate-300 leading-relaxed">{report.memorySummary}</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-bold text-amber-300">2. Ringkasan Album:</span>
              <p className="text-slate-300 leading-relaxed">{report.albumSummary}</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-bold text-cyan-300">3. Kapasitas & Storage:</span>
              <p className="text-slate-300 leading-relaxed">{report.mediaSummary}</p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="font-bold text-indigo-300">4. Timeline Life Milestone:</span>
              <p className="text-slate-300 leading-relaxed">{report.timelineSummary}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
