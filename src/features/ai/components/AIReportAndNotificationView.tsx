import React from 'react';
import { 
  FileText, 
  Bell, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Share2 
} from 'lucide-react';
import { useAIStore } from '../stores/useAIStore';
import { useInsightStore } from '../stores/useInsightStore';

export const AIReportAndNotificationView: React.FC = () => {
  const { notifications, markNotificationRead } = useAIStore();
  const { reports, generateReportNow } = useInsightStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Report Generator Center */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>AI Automated Report Generator</span>
          </h3>
          <span className="text-xs text-slate-400">Format: PDF / CSV / JSON</span>
        </div>

        <p className="text-xs text-slate-300">
          Buat ringkasan eksekutif keluarga secara otomatis dengan analisis komprehensif:
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => generateReportNow('Weekly Summary')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
          >
            + Report Mingguan
          </button>

          <button
            onClick={() => generateReportNow('Monthly Summary')}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md"
          >
            + Report Bulanan
          </button>

          <button
            onClick={() => generateReportNow('Health Summary')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
          >
            + Report Kesehatan
          </button>

          <button
            onClick={() => generateReportNow('Finance Summary')}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md"
          >
            + Report Keuangan
          </button>
        </div>

        {/* Generated Reports List */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Laporan Tersedia ({reports.length}):</div>

          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">{rep.reportType}</span>
                <span className="text-[10px] text-slate-400">{rep.generatedDate}</span>
              </div>

              <p className="text-xs text-amber-300 font-semibold">{rep.periodText}</p>

              <ul className="space-y-1">
                {(rep.keyHighlights || []).map((hl, i) => (
                  <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => alert(`Mengunduh PDF Laporan ${rep.reportType}...`)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Notification Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <span>AI Priority Notification Engine</span>
          </h3>
          <span className="text-xs text-slate-400">Push / In-App / Email</span>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                notif.isRead 
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-60'
                  : 'bg-slate-950 border-slate-800 hover:border-amber-500/40 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    notif.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    notif.priority === 'Important' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {notif.priority}
                  </span>
                  <h5 className="font-extrabold text-white text-xs">{notif.title}</h5>
                </div>
                <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
