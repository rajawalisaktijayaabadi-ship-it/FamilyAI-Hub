import React from 'react';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Printer, 
  Plane, 
  Award,
  Users
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';

interface TravelHistoryReportTabProps {
  onOpenReportModal: () => void;
}

export const TravelHistoryReportTab: React.FC<TravelHistoryReportTabProps> = ({
  onOpenReportModal
}) => {
  const { travelHistory } = useTravelStore();

  const totalDestinations = travelHistory.length;
  const totalDays = travelHistory.reduce((acc, h) => acc + h.durationDays, 0);
  const totalSpent = travelHistory.reduce((acc, h) => acc + h.totalCostIdr, 0);

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
            Travel Archive & PDF Reports
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Riwayat Perjalanan & Laporan Ringkasan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Arsip destinasi liburan keluarga lampau dan cetak dokumen ringkasan perjalanan.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Laporan Perjalanan</span>
        </button>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Destinasi dikunjungi</span>
          <div className="text-2xl font-black text-white">{totalDestinations} Kota / Negara</div>
          <p className="text-[10px] text-indigo-400">Arsip Kenangan Keluarga</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Hari Liburan</span>
          <div className="text-2xl font-black text-amber-400">{totalDays} Hari</div>
          <p className="text-[10px] text-slate-400">Waktu Berkualitas Bersama</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Pengeluaran Travel</span>
          <div className="text-2xl font-black text-emerald-400">
            Rp {(totalSpent / 1000000).toFixed(1)} Juta
          </div>
          <p className="text-[10px] text-slate-400">Terekam Dalam Laporan Keuangan</p>
        </div>

      </div>

      {/* Travel History List */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Arsip Riwayat Perjalanan Selesai</span>
        </h3>

        <div className="space-y-3">
          {travelHistory.map((his) => (
            <div
              key={his.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] uppercase">
                    Trip Selesai
                  </span>
                  <span className="text-xs text-slate-400">• {his.startDate.split('-')[0]}</span>
                </div>
                <h4 className="font-bold text-white text-base">{his.tripName}</h4>
                <div className="text-xs text-slate-300 flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1 text-amber-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{his.destination}</span>
                  </span>
                  <span className="flex items-center gap-1 text-indigo-300">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{his.durationDays} Hari</span>
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block">Total Pengeluaran:</span>
                <span className="font-black text-emerald-400 text-sm">
                  Rp {his.totalCostIdr.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
