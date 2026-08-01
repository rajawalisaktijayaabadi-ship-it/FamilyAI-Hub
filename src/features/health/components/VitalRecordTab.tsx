import React, { useState } from 'react';
import { 
  Activity, Heart, Thermometer, Droplet, Scale, Ruler, 
  Wind, Plus, Trash2, CheckCircle2, AlertTriangle, Filter, Sparkles 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';
import { VitalType, VitalRecord } from '../types';

interface VitalRecordTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const VitalRecordTab: React.FC<VitalRecordTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { vitalRecords, addVitalRecord, deleteVitalRecord } = useHealthStore();

  const [selectedType, setSelectedType] = useState<VitalType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formMemberId, setFormMemberId] = useState(activeMemberId === 'all' ? 'm1' : activeMemberId);
  const [formType, setFormType] = useState<VitalType>('blood_pressure');
  const [formValue, setFormValue] = useState('');
  const [formNote, setFormNote] = useState('');

  const filteredVitals = vitalRecords.filter((v) => {
    const matchesMember = activeMemberId === 'all' || v.memberId === activeMemberId;
    const matchesType = selectedType === 'all' || v.type === selectedType;
    return matchesMember && matchesType;
  });

  const getVitalTypeDetails = (type: VitalType) => {
    switch (type) {
      case 'blood_pressure':
        return { label: 'Tekanan Darah', unit: 'mmHg', icon: Activity, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'heart_rate':
        return { label: 'Detak Jantung', unit: 'bpm', icon: Heart, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' };
      case 'temperature':
        return { label: 'Suhu Tubuh', unit: '°C', icon: Thermometer, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'blood_sugar':
        return { label: 'Gula Darah', unit: 'mg/dL', icon: Droplet, color: 'text-red-400 bg-red-500/10 border-red-500/20' };
      case 'spo2':
        return { label: 'Saturasi Oksigen', unit: '%', icon: Wind, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
      case 'weight':
        return { label: 'Berat Badan', unit: 'kg', icon: Scale, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      case 'height':
        return { label: 'Tinggi Badan', unit: 'cm', icon: Ruler, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
      case 'waist':
        return { label: 'Lingkar Pinggang', unit: 'cm', icon: Ruler, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' };
      default:
        return { label: 'Pemeriksaan', unit: '', icon: Activity, color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' };
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValue.trim()) return;

    const typeMeta = getVitalTypeDetails(formType);
    const numVal = parseFloat(formValue);
    
    addVitalRecord({
      memberId: formMemberId,
      type: formType,
      value: formValue.trim(),
      numericValue: isNaN(numVal) ? undefined : numVal,
      unit: typeMeta.unit,
      timestamp: `Hari ini, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      note: formNote.trim() || undefined,
      isNormal: true
    });

    setFormValue('');
    setFormNote('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Pencatatan Tanda Vital (Vital Records)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Riwayat pengukuran tekanan darah, detak jantung, suhu tubuh, gula darah, dan SpO2.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Hasil Vitals</span>
        </button>
      </div>

      {/* Filter Tabs by Vital Type */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedType === 'all'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          Semua Jenis Pemeriksaan
        </button>

        {(['blood_pressure', 'heart_rate', 'temperature', 'blood_sugar', 'spo2', 'weight', 'height', 'waist'] as VitalType[]).map((t) => {
          const meta = getVitalTypeDetails(t);
          const Icon = meta.icon;
          const isSelected = selectedType === t;

          return (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>

      {/* Vital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVitals.map((vital) => {
          const meta = getVitalTypeDetails(vital.type);
          const Icon = meta.icon;
          const memberObj = familyMembers.find((m) => m.id === vital.memberId);

          return (
            <div 
              key={vital.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 shadow-lg transition-all group relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${meta.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block">{meta.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{vital.timestamp}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteVitalRecord(vital.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  title="Hapus data vital"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-black text-white">{vital.value}</span>
                <span className="text-xs font-bold text-slate-400">{vital.unit}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5">
                  {memberObj && <img src={memberObj.avatar} alt={memberObj.name} className="w-5 h-5 rounded-full object-cover" />}
                  <span className="text-slate-300 font-semibold">{memberObj?.name}</span>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  vital.isNormal 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {vital.isNormal ? 'Normal' : 'Perhatian'}
                </span>
              </div>

              {vital.note && (
                <p className="text-[11px] text-slate-400 italic bg-slate-950 p-2 rounded-xl border border-slate-800">
                  "{vital.note}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Vital Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-400" />
                <span>Catat Pemeriksaan Vital Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Anggota Keluarga</label>
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
                <label className="font-semibold text-slate-300 block mb-1">Jenis Pemeriksaan</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as VitalType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                >
                  <option value="blood_pressure">Tekanan Darah (mmHg)</option>
                  <option value="heart_rate">Detak Jantung (bpm)</option>
                  <option value="temperature">Suhu Tubuh (°C)</option>
                  <option value="blood_sugar">Gula Darah (mg/dL)</option>
                  <option value="spo2">Saturasi Oksigen (%)</option>
                  <option value="weight">Berat Badan (kg)</option>
                  <option value="height">Tinggi Badan (cm)</option>
                  <option value="waist">Lingkar Pinggang (cm)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nilai Pengukuran</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 120/80 atau 72 atau 36.5"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Diukur sebelum sarapan pagi"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
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
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Hasil Vital</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
