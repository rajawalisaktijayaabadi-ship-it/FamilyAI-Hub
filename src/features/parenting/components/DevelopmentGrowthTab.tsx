import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Activity, 
  Ruler, 
  Scale, 
  Smile, 
  Heart, 
  Brain, 
  BookOpen, 
  Save,
  Calendar
} from 'lucide-react';
import { Child, GrowthRecord } from '../types';

interface DevelopmentGrowthTabProps {
  child: Child;
  growthRecords: GrowthRecord[];
  onAddGrowthRecord: (record: Omit<GrowthRecord, 'id'>) => void;
}

export const DevelopmentGrowthTab: React.FC<DevelopmentGrowthTabProps> = ({
  child,
  growthRecords,
  onAddGrowthRecord
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [height, setHeight] = useState(138.5);
  const [weight, setWeight] = useState(32.4);
  const [headCirc, setHeadCirc] = useState(52.1);
  const [category, setCategory] = useState<GrowthRecord['category']>('Physical Growth');
  const [notes, setNotes] = useState('');

  const childRecords = growthRecords.filter((g) => g.childId === child.id);
  const latestHeight = childRecords[0]?.heightCm || child.heightCm || 140;
  const latestWeight = childRecords[0]?.weightKg || child.weightKg || 35;
  const latestHead = childRecords[0]?.headCircumferenceCm || 52;
  const heightM = latestHeight / 100;
  const latestBmi = childRecords[0]?.bmi || Number((latestWeight / (heightM * heightM)).toFixed(1));

  const latestRecord = {
    heightCm: latestHeight,
    weightKg: latestWeight,
    bmi: latestBmi,
    headCircumferenceCm: latestHead
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const heightM = height / 100;
    const computedBmi = Number((weight / (heightM * heightM)).toFixed(1));

    onAddGrowthRecord({
      childId: child.id,
      date: new Date().toISOString().split('T')[0],
      heightCm: Number(height),
      weightKg: Number(weight),
      headCircumferenceCm: Number(headCirc),
      bmi: computedBmi,
      category,
      notes: notes || 'Pencatatan pertumbuhan rutin.',
      recordedBy: 'Orang Tua'
    });

    setShowAddModal(false);
  };

  const developmentCategories = [
    { title: 'Physical Growth', icon: Ruler, color: 'text-pink-400', desc: 'Tinggi badan, berat badan, lingkar kepala, postur & kebugaran fisik' },
    { title: 'Emotional Development', icon: Heart, color: 'text-rose-400', desc: 'Regulasi emosi, empati, manajemen cemas & pengenalan perasaan' },
    { title: 'Social Development', icon: Smile, color: 'text-amber-400', desc: 'Interaksi teman sebaya, kerjasama tim & kemampuan berbagi' },
    { title: 'Language Development', icon: BookOpen, color: 'text-purple-400', desc: 'Kosakata, struktur kalimat, pemahaman bacaan & keberanian berpendapat' },
    { title: 'Learning Development', icon: Brain, color: 'text-indigo-400', desc: 'Logika matematika, rasa ingin tahu sains & pemecahan masalah' },
    { title: 'Motor Skills', icon: Activity, color: 'text-emerald-400', desc: 'Motorik kasar (sepeda, lari) & motorik halus (menulis, origami)' },
    { title: 'Creativity', icon: TrendingUp, color: 'text-teal-400', desc: 'Seni menggambar, imajinasi koding, musik & ekspresi bebas' },
    { title: 'Life Skills', icon: Scale, color: 'text-blue-400', desc: 'Merapikan tempat tidur, menyiapkan perlengkapan & kebersihan mandiri' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <span>Pemantauan Tumbuh Tumbuh & Perkembangan 8 Domain</span>
          </h2>
          <p className="text-xs text-slate-400">
            Catat pertumbuhan fisik (tinggi, berat, BMI) serta 8 kategori perkembangan holistik untuk {child.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Pertumbuhan Baru</span>
        </button>
      </div>

      {/* Metrics Cards: Height, Weight, BMI, Head */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tinggi Badan</span>
            <Ruler className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">{latestRecord.heightCm} <span className="text-xs font-normal text-slate-400">cm</span></div>
          <div className="text-[10px] text-emerald-400 font-semibold">Ideal sesuai grafik WHO</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Berat Badan</span>
            <Scale className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{latestRecord.weightKg} <span className="text-xs font-normal text-slate-400">kg</span></div>
          <div className="text-[10px] text-emerald-400 font-semibold">Gizi seimbang & sehat</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Indeks BMI</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{latestRecord.bmi}</div>
          <div className="text-[10px] text-emerald-400 font-semibold">Kategori Normal</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lingkar Kepala</span>
            <Brain className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{latestRecord.headCircumferenceCm || 52} <span className="text-xs font-normal text-slate-400">cm</span></div>
          <div className="text-[10px] text-slate-400">Pemeriksaan rutin</div>
        </div>
      </div>

      {/* 8 Categories Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
          8 Kategori Perkembangan Anak
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {developmentCategories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${cat.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">{cat.title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Growth History Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span>Riwayat Catatan Pertumbuhan & Perkembangan</span>
        </h3>

        {childRecords.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">Belum ada catatan pertumbuhan.</p>
        ) : (
          <div className="space-y-3">
            {childRecords.map((rec) => (
              <div key={rec.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{rec.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                      {rec.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{rec.notes}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-200 shrink-0">
                  <span className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">Tinggi: {rec.heightCm} cm</span>
                  <span className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">Berat: {rec.weightKg} kg</span>
                  <span className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">BMI: {rec.bmi}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add Growth Record */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Catat Pertumbuhan & Perkembangan</h3>

            <form onSubmit={handleSaveRecord} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Kategori Perkembangan</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  {developmentCategories.map((c) => (
                    <option key={c.title} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Berat Badan (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Lingkar Kepala (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={headCirc}
                  onChange={(e) => setHeadCirc(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Pengamatan Perkembangan</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  placeholder="Catatan perkembangan fisik, kebugaran, emosi..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-pink-600 text-white font-bold rounded-xl shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
