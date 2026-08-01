import React from 'react';
import { QrCode, ShieldAlert, Phone, Heart, X, AlertTriangle, Printer } from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface EmergencyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const EmergencyCardModal: React.FC<EmergencyCardModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  activeMemberId,
}) => {
  const { emergencyInfos, healthProfiles } = useHealthStore();

  if (!isOpen) return null;

  const selectedMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const currentMember = familyMembers.find((m) => m.id === selectedMemberId) || familyMembers[0];
  const emergency = emergencyInfos[selectedMemberId] || {
    primaryContact: { name: 'Siti Rahma', relation: 'Istri', phone: '0811-9876-5432' },
    bloodType: 'O+',
    allergies: ['Debu', 'Seafood'],
    chronicConditions: ['Hipertensi'],
    routineMeds: ['Amlodipine 5mg'],
    insuranceProvider: 'BPJS Kesehatan',
    insuranceNumber: '0001234567891',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FAMILY_AI_EMERGENCY_DATA'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-rose-500/30 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-base text-white">Kartu Darurat Medis QR</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-xs p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Canvas */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 border border-rose-500/40 rounded-3xl p-6 space-y-4 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-rose-900/50 pb-3 text-left">
            <div className="flex items-center gap-3">
              <img src={currentMember.avatar} alt={currentMember.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-500" />
              <div>
                <h4 className="font-extrabold text-base text-white">{currentMember.name}</h4>
                <p className="text-xs text-rose-300 font-semibold">{currentMember.relationship}</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-sm border border-rose-400">
              GOL: {emergency.bloodType}
            </span>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-3 rounded-2xl w-40 h-40 mx-auto shadow-xl flex items-center justify-center">
            <img 
              src={emergency.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FAMILY_AI_EMERGENCY_DATA'} 
              alt="Emergency QR Code" 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Pindai QR untuk rekam medis darurat paramedis</p>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-left text-xs space-y-1">
            <p className="text-slate-300">Alergi Kritis: <strong className="text-amber-400">{emergency.allergies.join(', ') || 'Nihil'}</strong></p>
            <p className="text-slate-300">Kontak Darurat: <strong className="text-rose-400">{emergency.primaryContact.name} ({emergency.primaryContact.phone})</strong></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-rose-400" />
            <span>Cetak Kartu Fisik</span>
          </button>
        </div>

      </div>
    </div>
  );
};
