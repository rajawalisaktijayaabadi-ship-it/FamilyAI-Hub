import React from 'react';
import { 
  Database, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Cpu, 
  Layers 
} from 'lucide-react';
import { AIContextModuleState } from '../../../types/aiSuperAssistant';

export const AIContextEngineView: React.FC = () => {
  const contextModules: AIContextModuleState[] = [
    { moduleName: 'Mood Detection', summary: 'Mood energi keluarga tinggi (88%), stabil', itemCount: 12, lastUpdated: '10 menit lalu', keyInsights: ['Anak tampak gembira', 'Ibu butuh relaksasi malam'], status: 'optimal' },
    { moduleName: 'Smart Calendar', summary: '1 event penting hari ini: Ujian Sekolah', itemCount: 8, lastUpdated: '5 menit lalu', keyInsights: ['H-1 Ujian Matematika'], status: 'optimal' },
    { moduleName: 'Shopping & Inventory', summary: '1 item habis: Susu kalsium dapur', itemCount: 15, lastUpdated: '1 jam lalu', keyInsights: ['Stok beras aman 2 minggu'], status: 'attention_needed' },
    { moduleName: 'Health & Wellness', summary: 'Aktivitas jalan harian tercapai 85%', itemCount: 6, lastUpdated: 'Baru saja', keyInsights: ['Suplemen vitamin diminum'], status: 'optimal' },
    { moduleName: 'Finance & Budget', summary: 'Surplus anggaran belanja Rp 650.000', itemCount: 24, lastUpdated: '3 jam lalu', keyInsights: ['Pengeluaran kuliner 78%'], status: 'optimal' },
    { moduleName: 'Insurance & Protection', summary: 'Premi asuransi jatuh tempo besok', itemCount: 4, lastUpdated: 'Kemarin', keyInsights: ['BPJS & Asuransi Jiwa Aktif'], status: 'action_required' },
    { moduleName: 'Meal Planner', summary: 'Menu malam: Sup Ayam Brokoli Sehat', itemCount: 7, lastUpdated: '2 jam lalu', keyInsights: ['Resep kaya protein & serat'], status: 'optimal' },
    { moduleName: 'Travel & Event', summary: 'Target liburan Bali terencana 80%', itemCount: 3, lastUpdated: '2 hari lalu', keyInsights: ['Penginapan dikonfirmasi'], status: 'optimal' },
    { moduleName: 'Parenting & Psychology', summary: 'Fase eksplorasi mandiri anak 8 thn', itemCount: 9, lastUpdated: 'Hari ini', keyInsights: ['Pujian empati disarankan'], status: 'optimal' },
    { moduleName: 'Education Center', summary: 'Modul aljabar dasar selesai diuji', itemCount: 14, lastUpdated: '4 jam lalu', keyInsights: ['Skor latihan kuis 88'], status: 'optimal' },
    { moduleName: 'Family Memories', summary: 'Album Foto Bali dimasukkan minggu ini', itemCount: 42, lastUpdated: '3 hari lalu', keyInsights: ['120 foto disimpan'], status: 'optimal' },
    { moduleName: 'Smart Home & IoT', summary: '12 gawai terhubung, Kunci Otomatis Aktif', itemCount: 12, lastUpdated: 'Baru saja', keyInsights: ['Lampu teras nyala otomatis'], status: 'optimal' },
    { moduleName: 'Tasks & Reminders', summary: '18 tugas keluarga selesai minggu ini', itemCount: 22, lastUpdated: '15 menit lalu', keyInsights: ['3 prioritas tinggi tersisa'], status: 'optimal' },
    { moduleName: 'Family Achievement', summary: 'Lencana "Pencerdas Keluarga" diraih', itemCount: 5, lastUpdated: '1 minggu lalu', keyInsights: ['Streak membaca 7 hari'], status: 'optimal' },
    { moduleName: 'Emergency & Safety', summary: 'Sinyal SOS & GPS darurat tersambung', itemCount: 2, lastUpdated: 'Baru saja', keyInsights: ['Lokasi Rumah Utama'], status: 'optimal' },
    { moduleName: 'Notification Engine', summary: '3 notifikasi prioritas terkirim', itemCount: 3, lastUpdated: '1 jam lalu', keyInsights: ['FCM Push Active'], status: 'optimal' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Multi-Module Live Context Matrix</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  16 Modul Terhubung
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Layar agregasi status konteks real-time yang dibaca oleh AI Core sebelum memberikan saran.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('Sinkronisasi matriks konteks AI 16 modul berhasil diperbarui!')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <span>Resync Context Matrix</span>
          </button>
        </div>
      </div>

      {/* Grid Matrix Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contextModules.map((mod, idx) => (
          <div
            key={idx}
            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-indigo-500/40 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{mod.moduleName}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  mod.status === 'optimal' ? 'bg-emerald-500/20 text-emerald-300' :
                  mod.status === 'attention_needed' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-rose-500/20 text-rose-300'
                }`}>
                  {mod.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-300">{mod.summary}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span>{mod.itemCount} Record</span>
              <span>Diperbarui: {mod.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
