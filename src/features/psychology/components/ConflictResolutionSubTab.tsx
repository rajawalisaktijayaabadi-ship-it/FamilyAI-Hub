import React, { useState } from 'react';
import { 
  Scale, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileText, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';
import { ConflictCase } from '../types/psychologyTypes';

export const ConflictResolutionSubTab: React.FC = () => {
  const { conflictCases, addConflictCase, updateConflictCaseStatus } = usePsychologyStore();

  const [isNewCaseOpen, setNewCaseOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Parenting & Boundaries');
  const [p1Name, setP1Name] = useState('Ayah (Budi)');
  const [p1Persp, setP1Persp] = useState('');
  const [p2Name, setP2Name] = useState('Rizky (Anak Remaja)');
  const [p2Persp, setP2Persp] = useState('');
  const [reflection, setReflection] = useState('');
  const [solutionsInput, setSolutionsInput] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-08-10');

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const solutions = solutionsInput.split('\n').filter((s) => s.trim().length > 0);

    addConflictCase({
      title,
      category,
      status: 'reflecting',
      participants: [p1Name, p2Name],
      reflectionNotes: reflection || 'Perbedaan sudut pandang dan ekspektasi yang belum terkomunikasikan dengan tenang.',
      perspectives: {
        [p1Name]: p1Persp || 'Ingin ketertiban dan disiplin rumah tangga.',
        [p2Name]: p2Persp || 'Ingin kebebasan dan dipahami perasaannya.'
      },
      solutions: solutions.length > 0 ? solutions : ['Lakukan sesi bincang hangat tanpa interupsi selama 20 menit.'],
      agreementNotes: 'Disepakati untuk dicoba dan dievaluasi bersama minggu depan.',
      followUpDate
    });

    setTitle('');
    setP1Persp('');
    setP2Persp('');
    setReflection('');
    setSolutionsInput('');
    setNewCaseOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <span>Resolusi Konflik Mediasi AI (Conflict Resolution Hub)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Kerangka kerja netral berbasis psikologi untuk memetakan perspektif, refleksi bersama, dan kesepakatan damai
          </p>
        </div>

        <button
          onClick={() => setNewCaseOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Lembar Mediasi Konflik Baru</span>
        </button>
      </div>

      {/* New Case Form Modal / Expandable */}
      {isNewCaseOpen && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" /> Formulir Mediasi Kasus Konflik Baru
            </h3>
            <button onClick={() => setNewCaseOpen(false)} className="text-xs text-slate-400 hover:text-white">
              Batal
            </button>
          </div>

          <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Judul Isu / Sengketa:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pembagian Tugas Rumah Tangga Saat Akhir Pekan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Kategori Isu:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="Parenting & Boundaries">Parenting & Batasan Anak</option>
                  <option value="Couple Communication">Komunikasi Pasangan Suami Istri</option>
                  <option value="Financial & House chores">Keuangan & Tugas Rumah</option>
                  <option value="Generation Gap">Perbedaan Generasi</option>
                </select>
              </div>
            </div>

            {/* Perspectives Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-300">Pihak Pertama:</div>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                  placeholder="Nama Pihak 1"
                />
                <textarea
                  value={p1Persp}
                  onChange={(e) => setP1Persp(e.target.value)}
                  rows={2}
                  placeholder="Sudut pandang, kekhawatiran, atau perasaan Pihak 1..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                />
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-purple-300">Pihak Kedua:</div>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                  placeholder="Nama Pihak 2"
                />
                <textarea
                  value={p2Persp}
                  onChange={(e) => setP2Persp(e.target.value)}
                  rows={2}
                  placeholder="Sudut pandang, kekhawatiran, atau perasaan Pihak 2..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Catatan Refleksi Bersama:</label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={2}
                placeholder="Apa titik temu atau pembelajaran utama dari situasi ini?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Opsi Solusi / Kesepakatan (per baris):</label>
              <textarea
                value={solutionsInput}
                onChange={(e) => setSolutionsInput(e.target.value)}
                rows={2}
                placeholder="Solusi 1&#10;Solusi 2"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setNewCaseOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Simpan Kasus Mediasi</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Conflict Cases List */}
      <div className="space-y-4">
        {conflictCases.map((c) => (
          <div key={c.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  {c.category}
                </span>
                <h3 className="font-bold text-base text-white mt-1">{c.title}</h3>
                <div className="text-[11px] text-slate-400">Pihak Terlibat: {c.participants?.join(' & ') || '-'}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                  c.status === 'resolved' 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {c.status === 'resolved' ? '✓ Damai / Tuntas' : '⏳ Dalam Masa Refleksi'}
                </span>

                {c.status !== 'resolved' && (
                  <button
                    onClick={() => updateConflictCaseStatus(c.id, 'resolved')}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-[11px] transition-colors"
                  >
                    Tandai Damai
                  </button>
                )}
              </div>
            </div>

            {/* Reflection & Perspectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {Object.entries(c.perspectives).map(([person, text]) => (
                <div key={person} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Perspective {person}
                  </div>
                  <p className="text-slate-300 italic">"{text}"</p>
                </div>
              ))}
            </div>

            {/* Possible Solutions & Agreement */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Kesepakatan & Solusi Bersama
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {c.solutions.map((sol, i) => (
                  <li key={i}>{sol}</li>
                ))}
              </ul>
              {c.agreementNotes && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong>Catatan Kesepakatan:</strong> {c.agreementNotes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
              <span>Dibuat: {c.createdAt}</span>
              <span>Jadwal Evaluasi Lanjutan (Follow Up): {c.followUpDate}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
