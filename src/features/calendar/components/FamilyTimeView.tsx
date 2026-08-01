import React, { useState } from 'react';
import { 
  Tv, Utensils, Palmtree, Gamepad2, Compass, Plus, CheckCircle2, 
  Circle, Calendar, Clock, MapPin, Users, Sparkles 
} from 'lucide-react';
import { usePlannerStore } from '../stores/usePlannerStore';
import { initialFamilyMembers } from '../../../data/mockData';

export const FamilyTimeView: React.FC = () => {
  const { familyTimePlans, addFamilyTimePlan, toggleChecklistItem } = usePlannerStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [activityType, setActivityType] = useState<'Movie Night' | 'Dinner' | 'Vacation' | 'Game Night' | 'Picnic' | 'Custom'>('Movie Night');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:00');
  const [location, setLocation] = useState('Ruang Keluarga');

  const presetTemplates = [
    { type: 'Movie Night', icon: <Tv className="w-5 h-5 text-indigo-400" />, label: 'Nonton Film', desc: 'Popcorn, minuman hangat, & film favorit' },
    { type: 'Dinner', icon: <Utensils className="w-5 h-5 text-amber-400" />, label: 'Makan Malam', desc: 'Kuliner favorit keluarga / masak bersama' },
    { type: 'Picnic', icon: <Palmtree className="w-5 h-5 text-emerald-400" />, label: 'Piknik Santai', desc: 'Tikar, bekal sandwich, & jalan-jalan sore' },
    { type: 'Game Night', icon: <Gamepad2 className="w-5 h-5 text-purple-400" />, label: 'Game / Monopoli', desc: 'Board game & kompetisi seru keluarga' }
  ];

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addFamilyTimePlan({
      activityType,
      title,
      description,
      date,
      time,
      location,
      participants: initialFamilyMembers.map(m => m.name),
      preparedChecklist: [
        { id: `chk-${Date.now()}-1`, item: 'Konfirmasi ketersediaan anggota', completed: true },
        { id: `chk-${Date.now()}-2`, item: 'Siapkan hidangan/camilan', completed: false }
      ],
      status: 'planned'
    });

    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Family Quality Time Hub</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Rencanakan momen kebersamaan tak terlupakan bersama seluruh anggota keluarga. Pilih preset kegiatan atau buat rencana khusus.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
        >
          + Rencanakan Family Time Baru
        </button>
      </div>

      {/* Activity Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyTimePlans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 backdrop-blur-xl hover:border-indigo-500/50 transition-all shadow-xl"
          >
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase tracking-wider">
                  {plan.activityType}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{plan.title}</h3>
              </div>
              <span className="text-xs font-mono text-indigo-300 bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                {plan.date} @ {plan.time}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{plan.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> {plan.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" /> {plan.participants.length} Anggota
              </span>
            </div>

            {/* Checklist Persiapan */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="text-xs font-bold text-slate-300">Checklist Persiapan:</div>
              <div className="space-y-1.5">
                {plan.preparedChecklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(plan.id, item.id)}
                    className="w-full flex items-center gap-2 text-xs text-left text-slate-300 hover:text-white group transition-colors"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500 shrink-0 group-hover:text-indigo-400" />
                    )}
                    <span className={item.completed ? 'line-through text-slate-500' : ''}>{item.item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Plan */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Buat Rencana Family Time</h3>

            <form onSubmit={handleCreatePlan} className="space-y-3 text-xs text-slate-300">
              <div>
                <label className="block mb-1 font-medium">Jenis Kegiatan</label>
                <div className="grid grid-cols-2 gap-2">
                  {presetTemplates.map((t) => (
                    <button
                      key={t.type}
                      type="button"
                      onClick={() => {
                        setActivityType(t.type as any);
                        setTitle(t.label);
                        setDescription(t.desc);
                      }}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        activityType === t.type
                          ? 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {t.icon}
                      <div>
                        <div className="font-bold text-xs">{t.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Judul Acara</label>
                <input
                  type="text"
                  required
                  placeholder="mis. Movie Night & Popcorn Spesial"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Deskripsi Kegiatan</label>
                <textarea
                  rows={2}
                  placeholder="Detail rencana..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 font-medium">Tanggal</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Jam</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Lokasi</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Simpan Rencana
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
