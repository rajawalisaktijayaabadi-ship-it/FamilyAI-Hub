import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Bell, 
  Calendar, 
  SlidersHorizontal 
} from 'lucide-react';
import { useAutomationStore } from '../stores/useAutomationStore';
import { AutomationTrigger, AutomationAction, PrivacyLevel } from '../../../types/aiSuperAssistant';

export const AIAutomationCenter: React.FC = () => {
  const { automations, toggleAutomation, addAutomation, deleteAutomation, runAutomationNow } = useAutomationStore();

  const [title, setTitle] = useState('');
  const [trigger, setTrigger] = useState<AutomationTrigger>('Inventory');
  const [triggerCondition, setTriggerCondition] = useState('');
  const [action, setAction] = useState<AutomationAction>('Create Task');
  const [actionPayload, setActionPayload] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('Family');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !triggerCondition.trim() || !actionPayload.trim()) return;

    addAutomation({
      title,
      trigger,
      triggerCondition,
      action,
      actionPayload,
      isActive: true,
      lastExecuted: 'Belum pernah',
      privacyLevel
    });

    setTitle('');
    setTriggerCondition('');
    setActionPayload('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Automation Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              <span>AI Automation Rules & Trigger Engine</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Aturan otomatisasi pintar lintas modul tanpa coding: pemicu jadwal, mood, stok, & anggaran.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Aturan Otomasi</span>
          </button>
        </div>

        {/* Automations List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automations.map((auto) => (
            <div
              key={auto.id}
              className={`p-5 rounded-3xl border transition-all space-y-4 shadow-xl relative ${
                auto.isActive
                  ? 'bg-slate-950 border-slate-800 hover:border-amber-500/40'
                  : 'bg-slate-950/50 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Trigger: {auto.trigger}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {auto.privacyLevel}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-white text-sm">{auto.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAutomation(auto.id)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                      auto.isActive ? 'bg-amber-500' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      auto.isActive ? 'translate-x-4' : 'translate-x-0'
                    }`}></div>
                  </button>
                  <button
                    onClick={() => deleteAutomation(auto.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Syarat Kondisi:</span>
                  <p className="text-slate-200 mt-0.5">{auto.triggerCondition}</p>
                </div>
                <div className="pt-1 border-t border-slate-800">
                  <span className="text-amber-400 font-semibold">Tindakan AI ({auto.action}):</span>
                  <p className="text-slate-200 mt-0.5">{auto.actionPayload}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Dieksekusi: {auto.executionCount}x • {auto.lastExecuted}</span>
                <button
                  onClick={() => runAutomationNow(auto.id)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-xl flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Jalankan Seketika</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal New Automation */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-white text-lg">Tambah Aturan Otomasi Baru</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Judul Aturan Otomasi:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Otomatis Pengingat Vitamin Saat Hujan..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Tipe Trigger (Pemicu):</label>
                  <select
                    value={trigger}
                    onChange={(e) => setTrigger(e.target.value as AutomationTrigger)}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  >
                    <option value="Inventory">Inventory (Stok Dapur)</option>
                    <option value="Calendar">Calendar (Kalender)</option>
                    <option value="Jam">Jam / Waktu Harian</option>
                    <option value="Mood">Mood Keluarga</option>
                    <option value="Budget">Anggaran Keuangan</option>
                    <option value="Health">Kesehatan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Tindakan AI (Action):</label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value as AutomationAction)}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  >
                    <option value="Create Task">Create Task (Buat Tugas)</option>
                    <option value="Create Reminder">Create Reminder</option>
                    <option value="Send Notification">Kirim Notifikasi</option>
                    <option value="Suggest Meal">Rekomendasikan Resep</option>
                    <option value="Suggest Shopping">Tambah Daftar Belanja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Deskripsi Kondisi Pemicu:</label>
                <input
                  type="text"
                  value={triggerCondition}
                  onChange={(e) => setTriggerCondition(e.target.value)}
                  placeholder="misal: Ketika persediaan telur kurang dari 5 butir..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Instruksi Tindakan AI:</label>
                <input
                  type="text"
                  value={actionPayload}
                  onChange={(e) => setActionPayload(e.target.value)}
                  placeholder="misal: Masukkan 1 tray telur ke daftar belanja utama..."
                  className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-xl outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl"
                >
                  Simpan Aturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
