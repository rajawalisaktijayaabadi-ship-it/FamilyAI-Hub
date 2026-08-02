import React, { useState } from 'react';
import { 
  Pill, Plus, CheckCircle2, Clock, Calendar, AlertCircle, 
  Trash2, FileText, Upload, Paperclip, Check
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface MedicationCenterTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const MedicationCenterTab: React.FC<MedicationCenterTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { 
    medications, medicationHistories, addMedication, 
    deleteMedication, toggleMedicationTaken 
  } = useHealthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formMemberId, setFormMemberId] = useState(activeMemberId === 'all' ? 'm1' : activeMemberId);
  const [formName, setFormName] = useState('');
  const [formDosage, setFormDosage] = useState('1 Tablet (500mg)');
  const [formFrequency, setFormFrequency] = useState('3x Sehari setelah makan');
  const [formTimes, setFormTimes] = useState('07:00, 13:00, 19:00');
  const [formPills, setFormPills] = useState(30);
  const [formNotes, setFormNotes] = useState('');

  const filteredMeds = medications.filter((m) => activeMemberId === 'all' || m.memberId === activeMemberId);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    addMedication({
      memberId: formMemberId,
      name: formName.trim(),
      dosage: formDosage.trim(),
      frequency: formFrequency.trim(),
      timesOfDay: formTimes.split(',').map(t => t.trim()).filter(Boolean),
      scheduleDays: 'Setiap Hari',
      reminderEnabled: true,
      remainingPills: Number(formPills) || 30,
      notes: formNotes.trim() || undefined
    });

    setFormName('');
    setFormNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-rose-400" />
            <span>Medication Center & Jadwal Obat</span>
          </h3>
          <p className="text-xs text-slate-400">
            Atur jadwal konsumsi obat, dosis, frekuensi, pengingat otomatis, dan resep dokter keluarga.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Obat Baru</span>
        </button>
      </div>

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMeds.map((med) => {
          const memberObj = familyMembers.find((m) => m.id === med.memberId);
          const isTakenToday = medicationHistories.some(
            (mh) => mh.medicationId === med.id && mh.takenAt.includes('Hari ini')
          );

          return (
            <div 
              key={med.id} 
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-4 shadow-xl transition-all relative group flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Top Member & Actions */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    {memberObj && (
                      <img src={memberObj.avatar} alt={memberObj.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-rose-500/30" />
                    )}
                    <div>
                      <span className="font-bold text-xs text-white block">{memberObj?.name}</span>
                      <span className="text-[10px] text-slate-400">{memberObj?.relationship}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {med.remainingPills !== undefined && med.remainingPills < 10 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        <span>Stok Menipis ({med.remainingPills})</span>
                      </span>
                    )}

                    <button
                      onClick={() => deleteMedication(med.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Med Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-base text-white">{med.name}</h4>
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-lg border border-rose-500/20">
                      {med.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-semibold pt-1">
                    Aturan: <span className="text-emerald-400">{med.frequency}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Jam Konsumsi: {med.timesOfDay?.join(', ') || 'Sesuai Kebutuhan'}</span>
                  </p>
                </div>

                {med.notes && (
                  <p className="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                    "{med.notes}"
                  </p>
                )}

              </div>

              {/* Bottom Action / History Status */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  Sisa: <strong className="text-white">{med.remainingPills ?? 15}</strong> tablet
                </span>

                {isTakenToday ? (
                  <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold flex items-center gap-1 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sudah Diminum Hari Ini</span>
                  </span>
                ) : (
                  <button
                    onClick={() => toggleMedicationTaken(med.id, med.memberId, 'taken')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 flex items-center gap-1.5 transition-all text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Minum Obat</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal Add Medication */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-rose-400" />
                <span>Tambah Jadwal Obat Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Pasien / Anggota Keluarga</label>
                <select
                  value={formMemberId}
                  onChange={(e) => setFormMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Obat</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Paracetamol 500mg, Amoxicillin..."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Dosis</label>
                  <input
                    type="text"
                    value={formDosage}
                    onChange={(e) => setFormDosage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Stok Awal (Tablet)</label>
                  <input
                    type="number"
                    value={formPills}
                    onChange={(e) => setFormPills(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Aturan & Frekuensi</label>
                <input
                  type="text"
                  value={formFrequency}
                  onChange={(e) => setFormFrequency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Jam Pengingat (pisahkan koma)</label>
                <input
                  type="text"
                  value={formTimes}
                  onChange={(e) => setFormTimes(e.target.value)}
                  placeholder="07:00, 13:00, 19:00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Tambahan</label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Contoh: Diminum sesudah makan siang"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Obat</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
