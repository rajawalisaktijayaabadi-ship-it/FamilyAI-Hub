import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Play, 
  Plus, 
  Trash2, 
  X, 
  Clock, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  Sun, 
  Moon, 
  Film, 
  Tv, 
  AlertOctagon, 
  History,
  Sliders
} from 'lucide-react';
import { useAutomationStore } from '../../../stores/useAutomationStore';
import { AutomationRule } from '../../../types';
import { automationRuleSchema, AutomationRuleFormValues } from '../schemas';

export const AutomationCenterTab: React.FC = () => {
  const { rules, scenes, history, toggleRule, addRule, deleteRule, activateScene, runSimulation } = useAutomationStore();

  const [isRuleModalOpen, setIsRuleModalOpen] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'rules' | 'scenes' | 'history'>('rules');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AutomationRuleFormValues>({
    resolver: zodResolver(automationRuleSchema),
    defaultValues: {
      name: '',
      triggerType: 'Waktu',
      triggerDetail: 'Setiap hari pukul 19:00',
      actionType: 'Nyalakan Perangkat',
      actionDetail: 'Nyalakan Lampu Taman 100%'
    }
  });

  const onSubmitRule = (data: AutomationRuleFormValues) => {
    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: data.name,
      triggerType: data.triggerType,
      triggerDetail: data.triggerDetail,
      actionType: data.actionType,
      actionDetail: data.actionDetail,
      isEnabled: true,
      lastTriggered: 'Belum pernah'
    };

    addRule(newRule);
    setIsRuleModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-indigo-400" />
            <span>Pusat Otomasi & Skenario Pintar (Rule Builder)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Atur skenario bersyarat (Pemicu → Aksi), simulasi otomatisasi tanpa risiko, dan skenario instan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRuleModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Aturan Otomasi</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs Toggle */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'rules' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Aturan Otomasi ({rules.length})
        </button>

        <button
          onClick={() => setActiveSubTab('scenes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'scenes' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Skenario Preset ({scenes.length})
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'history' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Riwayat & Simulasi ({history.length})
        </button>
      </div>

      {/* SUB TAB 1: Automation Rules */}
      {activeSubTab === 'rules' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-5 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
                  rule.isEnabled 
                    ? 'bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-500/50 shadow-xl' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Pemicu: {rule.triggerType}
                    </span>

                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                        rule.isEnabled ? 'bg-indigo-600' : 'bg-slate-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        rule.isEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <h4 className="font-bold text-white text-base">{rule.name}</h4>

                  {/* Trigger & Action Details */}
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300 text-[10px] block uppercase">Pemicu Syarat:</span>
                        <span>{rule.triggerDetail}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-start gap-2">
                      <Play className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-300 text-[10px] block uppercase">Aksi Perangkat:</span>
                        <span>{rule.actionDetail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500">Terakhir: {rule.lastTriggered}</span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        runSimulation(rule.id);
                        alert(`Simulasi untuk aturan '${rule.name}' berhasil dijalankan!`);
                      }}
                      className="px-3 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl font-bold text-[11px] transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Simulasi Rule
                    </button>

                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: Scene Presets */}
      {activeSubTab === 'scenes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((sc) => (
            <div
              key={sc.id}
              className={`p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
                sc.isActive 
                  ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 border-indigo-500 shadow-xl' 
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {sc.name === 'Good Morning' && <Sun className="w-5 h-5 text-amber-400" />}
                    {sc.name === 'Good Night' && <Moon className="w-5 h-5 text-indigo-400" />}
                    {sc.name === 'Movie Time' && <Film className="w-5 h-5 text-purple-400" />}
                    {sc.name === 'Away Mode' && <ShieldAlert className="w-5 h-5 text-rose-400" />}
                    {sc.name === 'Emergency Mode' && <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />}
                  </div>

                  {sc.isActive && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      Sedang Aktif
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-white text-lg">{sc.name}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{sc.description}</p>

                <div className="mt-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-indigo-200">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase mb-0.5">Daftar Eksekusi:</span>
                  {sc.actionDescription}
                </div>
              </div>

              <button
                onClick={() => {
                  activateScene(sc.id);
                  alert(`Skenario '${sc.name}' diaktifkan secara instan!`);
                }}
                className={`w-full py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  sc.isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-800 text-white border border-slate-800'
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Eksekusi Skenario</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SUB TAB 3: History & Simulation Logs */}
      {activeSubTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Log Eksekusi & Hasil Simulasi Otomasi</span>
          </h4>

          <div className="space-y-3">
            {history.map((h) => (
              <div 
                key={h.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      h.status === 'Simulated' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {h.status}
                    </span>
                    <h5 className="font-bold text-white text-xs">{h.ruleName}</h5>
                  </div>
                  <p className="text-xs text-slate-300">{h.resultDetail}</p>
                </div>

                <span className="text-[10px] text-slate-500 shrink-0">{h.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Rule Builder */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Buat Aturan Otomasi Baru</span>
              </h3>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitRule)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Aturan:</label>
                <input
                  {...register('name')}
                  placeholder="Contoh: Lampu Teras Senja Hari"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Jenis Pemicu (Trigger):</label>
                  <select
                    {...register('triggerType')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  >
                    <option value="Waktu">Waktu Jam</option>
                    <option value="Tanggal">Tanggal</option>
                    <option value="Lokasi">Lokasi GPS Geofence</option>
                    <option value="Sensor">Sensor Pintar</option>
                    <option value="Kehadiran Anggota">Kehadiran Anggota</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Detail Pemicu Syarat:</label>
                  <input
                    {...register('triggerDetail')}
                    placeholder="Pukul 18:00 WIB"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Jenis Aksi (Action):</label>
                  <select
                    {...register('actionType')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  >
                    <option value="Nyalakan Perangkat">Nyalakan Perangkat</option>
                    <option value="Matikan Perangkat">Matikan Perangkat</option>
                    <option value="Kirim Notifikasi">Kirim Alert Notifikasi</option>
                    <option value="Jalankan Skenario">Jalankan Skenario Preset</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Detail Aksi Perangkat:</label>
                  <input
                    {...register('actionDetail')}
                    placeholder="Nyalakan Lampu Teras 100%"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Simpan Aturan Otomasi
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
