import React, { useState } from 'react';
import {
  PhoneCall,
  ShieldCheck,
  QrCode,
  User,
  Heart,
  Building2,
  Edit2,
  CheckCircle2,
  Copy,
  Printer,
  X
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import { FamilyMember } from '../../../types';

interface EmergencyCardTabProps {
  familyMembers: FamilyMember[];
}

export const EmergencyCardTab: React.FC<EmergencyCardTabProps> = ({ familyMembers }) => {
  const { insuranceMembers, updateMemberInsuranceInfo, policies } = useInsuranceStore();

  const [selectedMemberId, setSelectedMemberId] = useState<string>(familyMembers[0]?.id || '');
  const [showEditModal, setShowEditModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Edit Form State
  const [bloodType, setBloodType] = useState('O+');
  const [emergencyContact, setEmergencyContact] = useState('0812-3456-7890 (Siti Rahma)');
  const [favoriteHospital, setFavoriteHospital] = useState('RS Siloam Kebon Jeruk');
  const [specialMedicalNotes, setSpecialMedicalNotes] = useState('Alergi Penisilin');

  const selectedMemberObj = familyMembers.find((m) => m.id === selectedMemberId);
  const selectedInsuranceInfo = insuranceMembers.find((im) => im.memberId === selectedMemberId);

  // Active policies for this member
  const memberPolicies = policies.filter((p) => p.insuredMemberIds.includes(selectedMemberId));

  const handleOpenEdit = () => {
    if (selectedInsuranceInfo) {
      setBloodType(selectedInsuranceInfo.bloodType || 'O+');
      setEmergencyContact(selectedInsuranceInfo.emergencyContact || '');
      setFavoriteHospital(selectedInsuranceInfo.favoriteHospital || '');
      setSpecialMedicalNotes(selectedInsuranceInfo.specialMedicalNotes || '');
    }
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMemberId) {
      updateMemberInsuranceInfo(selectedMemberId, {
        memberName: selectedMemberObj?.name || 'Anggota',
        bloodType,
        emergencyContact,
        favoriteHospital,
        specialMedicalNotes
      });
    }
    setShowEditModal(false);
  };

  const handleCopyCard = () => {
    const text = `
========================================
KARTU DARURAT RS - FAMILY AI HUB
========================================
Nama: ${selectedMemberObj?.name}
Peran: ${selectedMemberObj?.role}
Golongan Darah: ${selectedInsuranceInfo?.bloodType || 'O+'}
Kontak Darurat: ${selectedInsuranceInfo?.emergencyContact || '-'}
RS Favorit: ${selectedInsuranceInfo?.favoriteHospital || '-'}
Catatan Medis: ${selectedInsuranceInfo?.specialMedicalNotes || 'Tidak Ada'}

POLIS ASURANSI AKTIF:
${memberPolicies.map((p) => `- ${p.title} (${p.policyNumber} - ${p.providerName})`).join('\n')}
========================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-rose-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white">Kartu Darurat RS Keluarga (Emergency Card)</h2>
          </div>
          <p className="text-xs text-slate-300">
            Akses instan nomor polis, rujukan rumah sakit favorit, golongan darah, dan kontak darurat saat kondisi medis mendesak.
          </p>
        </div>

        {/* Member Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          {familyMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMemberId(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedMemberId === m.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Digital Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card Component */}
        <div className="lg:col-span-2 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 border-2 border-rose-500/40 rounded-3xl p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
          {/* Card Watermark */}
          <ShieldCheck className="w-64 h-64 text-rose-500/5 absolute -right-12 -bottom-12 pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-rose-500/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-600 rounded-2xl text-white shadow-lg shadow-rose-950">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest">
                  FAMILY EMERGENCY MEDICAL CARD
                </span>
                <h3 className="text-xl font-black text-white">{selectedMemberObj?.name}</h3>
                <p className="text-xs text-slate-300">{selectedMemberObj?.role}</p>
              </div>
            </div>

            <button
              onClick={handleOpenEdit}
              className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Data RS
            </button>
          </div>

          {/* Emergency Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" /> Golongan Darah
              </span>
              <div className="text-lg font-black text-rose-300">
                {selectedInsuranceInfo?.bloodType || 'O+'}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" /> Kontak Darurat Utama
              </span>
              <div className="text-sm font-bold text-white">
                {selectedInsuranceInfo?.emergencyContact || '0812-3456-7890'}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Rujukan Rumah Sakit Favorit
              </span>
              <div className="text-sm font-bold text-cyan-300">
                {selectedInsuranceInfo?.favoriteHospital || 'RS Siloam Kebon Jeruk'}
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-rose-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Catatan Medis Khusus</span>
              <div className="text-xs text-amber-300 font-semibold">
                {selectedInsuranceInfo?.specialMedicalNotes || 'Tidak ada alergi obat'}
              </div>
            </div>

          </div>

          {/* Active Policies List on Card */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-300">Polis Asuransi Kesehatan Aktif:</div>
            <div className="space-y-2">
              {memberPolicies.map((pol) => (
                <div key={pol.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{pol.title}</div>
                    <div className="text-[11px] text-slate-400">
                      No: <span className="font-mono text-cyan-300 font-bold">{pol.policyNumber}</span> • {pol.providerName}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-full font-bold text-[10px]">
                    CASHLESS
                  </span>
                </div>
              ))}
              {memberPolicies.length === 0 && (
                <p className="text-xs text-slate-400 italic">Belum ada polis yang dikaitkan ke anggota ini.</p>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-rose-500/30 flex items-center justify-between">
            <button
              onClick={handleCopyCard}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks Darurat RS'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Kartu Darurat</span>
            </button>
          </div>
        </div>

        {/* Right QR Code Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-center shadow-lg flex flex-col justify-center items-center">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-cyan-400">
            <QrCode className="w-32 h-32 mx-auto text-slate-200" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">QR Code Verifikasi Medis</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Scan oleh petugas administrasi Rumah Sakit untuk memverifikasi keabsahan data polis digital keluarga.
            </p>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Edit Data Darurat RS</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Golongan Darah:</label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
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
                <label className="text-xs font-semibold text-slate-400 block mb-1">Kontak Darurat Utama:</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  required
                  placeholder="0812-xxxx-xxxx (Nama Kontak)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Rumah Sakit Rujukan Favorit:</label>
                <input
                  type="text"
                  value={favoriteHospital}
                  onChange={(e) => setFavoriteHospital(e.target.value)}
                  placeholder="RS Siloam / RS Pondok Indah"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Catatan Medis Khusus (Alergi/Obat):</label>
                <input
                  type="text"
                  value={specialMedicalNotes}
                  onChange={(e) => setSpecialMedicalNotes(e.target.value)}
                  placeholder="Alergi Obat, Asma, Diabetes, dll..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
