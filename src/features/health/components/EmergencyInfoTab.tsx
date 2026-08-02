import React, { useState } from 'react';
import { 
  ShieldAlert, QrCode, Phone, AlertCircle, Heart, 
  FileText, Check, Edit, Building2 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface EmergencyInfoTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
  onOpenEmergencyQR: () => void;
}

export const EmergencyInfoTab: React.FC<EmergencyInfoTabProps> = ({
  familyMembers,
  activeMemberId,
  onOpenEmergencyQR,
}) => {
  const { emergencyInfos, updateEmergencyInfo } = useHealthStore();

  const selectedMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];
  const emergency = emergencyInfos[selectedMemberId] || {
    memberId: selectedMemberId,
    primaryContact: { name: 'Siti Rahma', relation: 'Istri', phone: '0811-9876-5432' },
    bloodType: 'O+',
    allergies: ['Debu', 'Seafood'],
    chronicConditions: ['Hipertensi Ringan'],
    routineMeds: ['Amlodipine 5mg'],
    insuranceProvider: 'BPJS Kesehatan',
    insuranceNumber: '0001234567891'
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-rose-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-6 h-6" />
            </span>
            <h3 className="text-xl font-bold text-white">Emergency Information & QR Card</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Akses cepat informasi kritis medis saat kondisi darurat: golongan darah, alergi fatal, penyakit kronis, kontak keluarga, dan kartu digital QR.
          </p>
        </div>

        <button
          onClick={onOpenEmergencyQR}
          className="px-5 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-rose-600/40 flex items-center gap-2 border border-rose-400/30 transition-all hover:scale-105 self-start md:self-center"
        >
          <QrCode className="w-5 h-5" />
          <span>Tampilkan Kartu QR Darurat</span>
        </button>
      </div>

      {/* Emergency Data Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (2 Cols): Critical Med Info */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h4 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Informasi Kritis Pertolongan Pertama ({currentMember.name})</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30">
                <span className="text-xs font-bold text-slate-400 block uppercase">Golongan Darah</span>
                <span className="text-3xl font-black text-rose-400 mt-1 block">{emergency.bloodType}</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 col-span-2">
                <span className="text-xs font-bold text-slate-400 block uppercase text-left">Asuransi Kesehatan</span>
                <span className="text-base font-extrabold text-white block text-left mt-1">{emergency.insuranceProvider}</span>
                <span className="text-xs text-cyan-400 font-mono block text-left">No: {emergency.insuranceNumber}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider block">⚠️ Alergi Reaksi Cepat / Obat Fatal</span>
                <div className="flex flex-wrap gap-2">
                  {(emergency.allergies || []).map((a, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider block">Kondisi Kronis & Obat Rutin</span>
                <p className="text-slate-200">
                  Penyakit: <strong>{emergency.chronicConditions?.join(', ') || 'Tidak Ada'}</strong> • Obat: <strong>{emergency.routineMeds?.join(', ') || 'Tidak Ada'}</strong>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Primary Emergency Contact */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h4 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-400" />
              <span>Kontak Darurat Utama</span>
            </h4>

            <div className="p-5 bg-rose-950/30 border border-rose-500/40 rounded-2xl space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Nama Kontak:</span>
                <span className="font-black text-white text-base">{emergency.primaryContact.name}</span>
                <span className="text-rose-300 font-bold block">({emergency.primaryContact.relation})</span>
              </div>

              <div className="pt-2 border-t border-rose-900/50 flex items-center justify-between">
                <span className="font-mono text-rose-400 font-extrabold text-sm">{emergency.primaryContact.phone}</span>
                <a 
                  href={`tel:${emergency.primaryContact.phone}`}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all text-xs flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Panggil</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
