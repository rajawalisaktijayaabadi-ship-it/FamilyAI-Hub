import React, { useState } from 'react';
import { 
  UserCheck, Shield, Phone, Building2, User, Heart, AlertCircle, 
  Plus, Edit, Check, X, FileText, Lock, Sparkles, Stethoscope
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface HealthProfileTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const HealthProfileTab: React.FC<HealthProfileTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { healthProfiles, updateHealthProfile } = useHealthStore();

  const selectedMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];
  const profile = healthProfiles[selectedMemberId];

  const [isEditing, setIsEditing] = useState(false);
  const [bloodType, setBloodType] = useState(profile?.bloodType || 'O+');
  const [heightCm, setHeightCm] = useState(profile?.heightCm || 170);
  const [weightKg, setWeightKg] = useState(profile?.weightKg || 65);
  const [allergiesText, setAllergiesText] = useState((profile?.allergies || []).join(', '));
  const [medHistoryText, setMedHistoryText] = useState((profile?.medicalHistory || []).join(', '));
  const [surgeryHistoryText, setSurgeryHistoryText] = useState((profile?.surgeryHistory || []).join(', '));
  const [routineMedsText, setRoutineMedsText] = useState((profile?.routineMedications || []).join(', '));
  const [doctorName, setDoctorName] = useState(profile?.familyDoctor?.name || '');
  const [doctorPhone, setDoctorPhone] = useState(profile?.familyDoctor?.phone || '');
  const [hospitalName, setHospitalName] = useState(profile?.favoriteHospital?.name || '');
  const [hospitalPhone, setHospitalPhone] = useState(profile?.favoriteHospital?.phone || '');
  const [emergencyName, setEmergencyName] = useState(profile?.emergencyContact?.name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(profile?.emergencyContact?.phone || '');
  const [healthNotes, setHealthNotes] = useState(profile?.healthNotes || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateHealthProfile(selectedMemberId, {
      bloodType: bloodType as any,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      allergies: allergiesText.split(',').map(s => s.trim()).filter(Boolean),
      medicalHistory: medHistoryText.split(',').map(s => s.trim()).filter(Boolean),
      surgeryHistory: surgeryHistoryText.split(',').map(s => s.trim()).filter(Boolean),
      routineMedications: routineMedsText.split(',').map(s => s.trim()).filter(Boolean),
      familyDoctor: { ...profile?.familyDoctor, name: doctorName, phone: doctorPhone, specialty: 'Dokter Keluarga' },
      favoriteHospital: { ...profile?.favoriteHospital, name: hospitalName, phone: hospitalPhone, address: 'Rumah Sakit Rujukan' },
      emergencyContact: { ...profile?.emergencyContact, name: emergencyName, phone: emergencyPhone, relationship: 'Kerabat' },
      healthNotes
    });
    setIsEditing(false);
  };

  if (!currentMember || !profile) return null;

  return (
    <div className="space-y-6">
      
      {/* Header Profile Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={currentMember.avatar} 
            alt={currentMember.name} 
            className="w-16 h-16 rounded-full object-cover ring-4 ring-rose-500/30" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{currentMember.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                {currentMember.relationship}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Peran: <strong className="text-slate-200">{currentMember.roleTitle}</strong> • Status Medis: <span className="text-emerald-400 font-semibold">Tercatat Aktif</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all self-start md:self-center"
        >
          {isEditing ? <X className="w-4 h-4 text-rose-400" /> : <Edit className="w-4 h-4 text-cyan-400" />}
          <span>{isEditing ? 'Batal Edit' : 'Edit Rekam Medis Profil'}</span>
        </button>
      </div>

      {isEditing ? (
        /* Edit Form Mode */
        <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <Edit className="w-4 h-4 text-cyan-400" />
            <span>Form Edit Profil Kesehatan</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Golongan Darah</label>
              <select 
                value={bloodType} 
                onChange={(e) => setBloodType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Tinggi Badan (cm)</label>
              <input 
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Berat Badan (kg)</label>
              <input 
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Alergi (pisahkan koma)</label>
              <input 
                type="text"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                placeholder="Debu, Seafood, Penisilin..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Riwayat Penyakit (pisahkan koma)</label>
              <input 
                type="text"
                value={medHistoryText}
                onChange={(e) => setMedHistoryText(e.target.value)}
                placeholder="Hipertensi, Asma..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Riwayat Operasi / Tindakan</label>
              <input 
                type="text"
                value={surgeryHistoryText}
                onChange={(e) => setSurgeryHistoryText(e.target.value)}
                placeholder="Apendektomi (2018)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Obat Rutin</label>
              <input 
                type="text"
                value={routineMedsText}
                onChange={(e) => setRoutineMedsText(e.target.value)}
                placeholder="Amlodipine 5mg..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border-t border-slate-800 pt-4">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Dokter Keluarga</label>
              <input 
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Rumah Sakit Rujukan</label>
              <input 
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Kontak Darurat</label>
              <input 
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1 text-xs">Catatan Tambahan Kesehatan</label>
            <textarea
              value={healthNotes}
              onChange={(e) => setHealthNotes(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-rose-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      ) : (
        /* Read Only Display Cards */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Vital & Physical Card */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Physical Bio Stats */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Indikator Fisik & Bio-Metrik</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-medium block">Gol. Darah</span>
                  <span className="text-2xl font-black text-rose-400 mt-1 block">{profile.bloodType}</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-medium block">Tinggi Badan</span>
                  <span className="text-2xl font-black text-cyan-400 mt-1 block">{profile.heightCm} <span className="text-xs">cm</span></span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-medium block">Berat Badan</span>
                  <span className="text-2xl font-black text-amber-400 mt-1 block">{profile.weightKg} <span className="text-xs">kg</span></span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-medium block">Indeks Massa Tubuh (BMI)</span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">{profile.bmi}</span>
                  <span className="text-[10px] text-emerald-300 font-semibold">Normal</span>
                </div>
              </div>
            </div>

            {/* Medical History & Allergies */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Alergi & Riwayat Kesehatan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Allergies */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-400 uppercase tracking-wider block">Daftar Alergi Rekam Medis</span>
                  {(!profile?.allergies || profile.allergies.length === 0) ? (
                    <p className="text-slate-500">Tidak ada riwayat alergi tercatat.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {profile.allergies.map((a, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
                          ⚠️ {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Chronic / Disease History */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400 uppercase tracking-wider block">Riwayat Penyakit & Kondisi</span>
                  {(!profile?.medicalHistory || profile.medicalHistory.length === 0) ? (
                    <p className="text-slate-500">Bebas penyakit kronis.</p>
                  ) : (
                    <ul className="space-y-1 text-slate-300">
                      {profile.medicalHistory.map((m, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Surgery & Routine Meds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Riwayat Operasi</span>
                  <p className="text-slate-200">
                    {(profile?.surgeryHistory?.length || 0) > 0 ? profile?.surgeryHistory?.join(', ') : 'Tidak ada riwayat operasi.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Obat Rutin Dipakai</span>
                  <p className="text-slate-200">
                    {(profile?.routineMedications?.length || 0) > 0 ? profile?.routineMedications?.join(', ') : 'Tidak ada obat rutin.'}
                  </p>
                </div>
              </div>

              {/* Health Notes */}
              {profile.healthNotes && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider block">Catatan Tambahan Kesehatan</span>
                  <p className="text-slate-300 italic">"{profile.healthNotes}"</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Doctor & Emergency Info */}
          <div className="space-y-6">
            
            {/* Family Doctor & Hospital */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-purple-400" />
                <span>Dokter & Faskes Favorit</span>
              </h3>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
                  <UserCheck className="w-4 h-4 text-purple-400" />
                  <span>{profile.familyDoctor.name}</span>
                </div>
                <p className="text-slate-400">{profile.familyDoctor.specialty}</p>
                <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-slate-300 font-mono">
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>{profile.familyDoctor.phone}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{profile.favoriteHospital.name}</span>
                </div>
                <p className="text-slate-400">{profile.favoriteHospital.address}</p>
                <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-slate-300 font-mono">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{profile.favoriteHospital.phone}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400" />
                <span>Kontak Utama Darurat</span>
              </h3>

              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl space-y-2">
                <div className="font-bold text-rose-300 text-sm">{profile.emergencyContact.name}</div>
                <p className="text-slate-300">Hubungan: <strong>{profile.emergencyContact.relationship}</strong></p>
                <div className="pt-2 border-t border-rose-900/50 flex items-center gap-2 text-rose-400 font-mono font-bold text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{profile.emergencyContact.phone}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
