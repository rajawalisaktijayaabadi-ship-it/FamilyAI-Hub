import React, { useState } from 'react';
import {
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Calendar,
  X,
  Sparkles
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';

export const InsuranceReminderTab: React.FC = () => {
  const { reminders, dismissReminder, addReminder } = useInsuranceStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'premi' | 'renewal' | 'document' | 'review'>('premi');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const activeReminders = reminders.filter((r) => !r.isDismissed);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addReminder({
      title,
      type,
      dueDate,
      isDismissed: false
    });

    setShowAddModal(false);
  };

  const getTypeBadge = (t: string) => {
    switch (t) {
      case 'premi':
        return 'bg-amber-950 text-amber-300 border-amber-500/30';
      case 'renewal':
        return 'bg-rose-950 text-rose-300 border-rose-500/30';
      case 'document':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-purple-950 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Pengingat & Agenda Asuransi (Smart Reminders)</h2>
          </div>
          <p className="text-xs text-slate-300">
            Pengingat otomatis untuk pembayaran premi, perpanjangan polis tahunan, dan peninjauan ulang polis.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengingat Custom</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {activeReminders.map((rem) => (
          <div
            key={rem.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-between gap-4 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getTypeBadge(rem.type)}`}>
                    {rem.type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Jatuh Tempo: {rem.dueDate}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{rem.title}</h4>
              </div>
            </div>

            <button
              onClick={() => dismissReminder(rem.id)}
              className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 text-xs font-bold rounded-2xl border border-emerald-500/30 flex items-center gap-1.5 transition-all shrink-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tandai Selesai</span>
            </button>
          </div>
        ))}

        {activeReminders.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <p className="text-sm">Tidak ada pengingat aktif yang perlu ditindaklanjuti.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Buat Pengingat Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Judul Pengingat:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="misal: Cek ulang polis asuransi rumah tahunan"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Tipe Pengingat:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                >
                  <option value="premi">Tagihan Premi</option>
                  <option value="renewal">Perpanjangan Polis</option>
                  <option value="document">Pembaruan Dokumen</option>
                  <option value="review">Evaluasi Finansial</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Tanggal Tanggat:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all"
              >
                Simpan Pengingat
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
