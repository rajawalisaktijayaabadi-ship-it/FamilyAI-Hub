import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  PieChart
} from 'lucide-react';
import { useDeviceStore } from '../../../stores/useDeviceStore';
import { useEnergyStore } from '../../../stores/useEnergyStore';
import { useSecurityStore } from '../../../stores/useSecurityStore';

interface SmartHomeReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartHomeReportsModal: React.FC<SmartHomeReportsModalProps> = ({ isOpen, onClose }) => {
  const { devices, rooms } = useDeviceStore();
  const { usage, tariffPerKwhIdr } = useEnergyStore();
  const { securityEvents, maintenances } = useSecurityStore();

  const [reportType, setReportType] = useState<'All' | 'Energy' | 'Security' | 'Maintenance'>('All');

  if (!isOpen) return null;

  const handleDownloadReport = () => {
    alert(`Laporan Smart Home (${reportType}) berhasil diunduh dalam format PDF/JSON!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-5 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Laporan Berkala Smart Home & Otomasi</h3>
              <p className="text-xs text-slate-400">Ringkasan statistik konsumsi daya, log keamanan, dan jadwal perawatan.</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setReportType('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              reportType === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Semua Laporan
          </button>
          <button
            onClick={() => setReportType('Energy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              reportType === 'Energy' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Laporan Energi & Listrik
          </button>
          <button
            onClick={() => setReportType('Security')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              reportType === 'Security' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Laporan Keamanan
          </button>
          <button
            onClick={() => setReportType('Maintenance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              reportType === 'Maintenance' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Jadwal Perawatan
          </button>
        </div>

        {/* Report Preview Container */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
          
          {/* Executive Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ringkasan Eksekutif Sistem Kediaman</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Total Perangkat:</span>
                <span className="font-bold text-white">{devices.length} Perangkat</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Zona Ruangan:</span>
                <span className="font-bold text-white">{rooms.length} Ruangan</span>
              </div>
              <div>
                <span className="text-slate-500 block">Daya Listrik Bulan Ini:</span>
                <span className="font-bold text-amber-400">{usage.monthlyKwh} kWh</span>
              </div>
              <div>
                <span className="text-slate-500 block">Est. Tagihan Listrik:</span>
                <span className="font-bold text-emerald-400">Rp {usage.estimatedCostIdr.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Energy Breakdown Section */}
          {(reportType === 'All' || reportType === 'Energy') && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 text-xs flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Rincian Penggunaan Energi Listrik (PLN)</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Pemakaian rata-rata harian tercatat <strong className="text-white">{usage.todayKwh} kWh</strong>. Perangkat paling banyak mengonsumsi daya adalah <strong className="text-amber-300">{usage.mostConsumingDevice}</strong>. Penghematan energi mencapai <strong className="text-emerald-400">{usage.energySavingPercentage}%</strong>.
              </p>
            </div>
          )}

          {/* Security Log Section */}
          {(reportType === 'All' || reportType === 'Security') && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-300 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Log Aktivitas Keamanan & Sensor</span>
              </h4>
              <div className="space-y-1">
                {securityEvents.map((e) => (
                  <div key={e.id} className="text-[11px] text-slate-300 flex justify-between border-b border-slate-800 pb-1">
                    <span>{e.timestamp} • {e.location}</span>
                    <span className="font-bold text-indigo-300">{e.type} ({e.status})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Maintenance Section */}
          {(reportType === 'All' || reportType === 'Maintenance') && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-300 text-xs flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-400" />
                <span>Jadwal Perawatan Terdekat</span>
              </h4>
              <div className="space-y-1">
                {maintenances.map((m) => (
                  <div key={m.id} className="text-[11px] text-slate-300 flex justify-between border-b border-slate-800 pb-1">
                    <span>{m.deviceName} ({m.serviceType})</span>
                    <span className="font-bold text-amber-300">Jatuh Tempo: {m.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Laporan</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Unduh PDF / Excel</span>
          </button>
        </div>

      </div>
    </div>
  );
};
