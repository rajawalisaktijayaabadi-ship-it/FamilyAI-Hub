import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, Circle, Gift, Calendar, Plus, Trash2, 
  AlertCircle, Shield, Clock, User 
} from 'lucide-react';
import { useReminderStore } from '../stores/useReminderStore';
import { useCalendarStore } from '../stores/useCalendarStore';
import { useFamilyStore } from '../../../store/useFamilyStore';

export const ReminderCenterView: React.FC = () => {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useReminderStore();
  const { events } = useCalendarStore();
  const { familyMembers } = useFamilyStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('12:00');
  const [assignedMemberId, setAssignedMemberId] = useState('u-1');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const upcomingBirthdays = events.filter(e => e.category === 'Ulang Tahun');

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedMember = familyMembers.find(m => m.id === assignedMemberId);

    addReminder({
      title,
      category: 'Reminder',
      type: 'reminder',
      dueDate,
      dueTime,
      assignedMemberId,
      assignedMemberName: assignedMember ? assignedMember.name : 'Seluruh Anggota',
      isCompleted: false,
      priority,
      reminderOption: '30m'
    });

    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900/40 via-rose-900/30 to-slate-900 border border-amber-500/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Pusat Pengingat & Reminder Keluarga</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Kelola pengingat obat, ulang tahun, tugas rumah tangga, dan notifikasi kegiatan penting.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-2xl text-xs shadow-lg shadow-amber-500/20 transition-all"
        >
          + Buat Pengingat Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reminders List */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Daftar Pengingat Aktif
            </h3>
            <span className="text-xs text-slate-400">{reminders.filter(r => !r.isCompleted).length} belum selesai</span>
          </div>

          <div className="space-y-3">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  rem.isCompleted
                    ? 'bg-slate-950/40 border-slate-800 opacity-50'
                    : 'bg-slate-800/40 border-slate-700/60 hover:border-amber-500/50 shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleReminder(rem.id)}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {rem.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <h4 className={`text-sm font-bold ${rem.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                      {rem.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="font-mono text-amber-300">{rem.dueDate} @ {rem.dueTime}</span>
                      <span>•</span>
                      <span className="text-indigo-300">{rem.assignedMemberName}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteReminder(rem.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ulang Tahun Mendatang */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Gift className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">Ulang Tahun Mendatang</h3>
          </div>

          <div className="space-y-3">
            {upcomingBirthdays.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-800/30 text-center text-xs text-slate-500">
                Tidak ada agenda ulang tahun terdaftar bulan ini.
              </div>
            ) : (
              upcomingBirthdays.map((bday) => (
                <div key={bday.id} className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300">{bday.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/40">
                      {bday.startDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{bday.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Add Reminder */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Tambah Pengingat Baru</h3>

            <form onSubmit={handleCreateReminder} className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="block mb-1 font-medium">Judul Pengingat *</label>
                <input
                  type="text"
                  required
                  placeholder="mis. Ambil Obat Kakek / Tagihan Listrik"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 font-medium">Tanggal Jatuh Tempo</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Jam</label>
                  <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Tugaskan Kepada</label>
                <select
                  value={assignedMemberId}
                  onChange={(e) => setAssignedMemberId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                >
                  {familyMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Simpan Pengingat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
