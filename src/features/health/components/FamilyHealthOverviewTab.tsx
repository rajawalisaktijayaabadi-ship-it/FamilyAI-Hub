import React from 'react';
import { 
  Users, HeartPulse, Pill, Stethoscope, Activity, ShieldCheck, 
  ChevronRight, AlertTriangle, Battery, Phone, User
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface FamilyHealthOverviewTabProps {
  familyMembers: FamilyMember[];
  onSelectMember: (id: string) => void;
  onNavigateToTab: (tabKey: string) => void;
}

export const FamilyHealthOverviewTab: React.FC<FamilyHealthOverviewTabProps> = ({
  familyMembers,
  onSelectMember,
  onNavigateToTab,
}) => {
  const { 
    healthProfiles, vitalRecords, medications, 
    medicalAppointments, emergencyInfos 
  } = useHealthStore();

  return (
    <div className="space-y-6">
      
      {/* Title & Info Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Family Health Overview Dashboard</h3>
            <p className="text-xs text-slate-400">Ringkasan status kesehatan Ayah, Ibu, Anak, dan Lansia dalam satu tampilan terpadu.</p>
          </div>
        </div>
      </div>

      {/* Grid of Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {familyMembers.map((member) => {
          const profile = healthProfiles[member.id];
          const memberVitals = vitalRecords.filter(v => v.memberId === member.id);
          const memberMeds = medications.filter(m => m.memberId === member.id);
          const memberAppts = medicalAppointments.filter(a => a.memberId === member.id && a.status === 'scheduled');
          const emergency = emergencyInfos[member.id];

          const bpVital = memberVitals.find(v => v.type === 'blood_pressure');
          const hrVital = memberVitals.find(v => v.type === 'heart_rate');

          return (
            <div 
              key={member.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 space-y-4 flex flex-col justify-between shadow-xl transition-all group"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-500/30 group-hover:ring-rose-500 transition-all" 
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white group-hover:text-rose-300 transition-colors">
                      {member.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-bold text-rose-400">{member.relationship}</span>
                      <span>•</span>
                      <span>{member.roleTitle}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Status: Prima
                </span>
              </div>

              {/* Body Details */}
              <div className="space-y-3 text-xs flex-1">
                
                {/* Physical Bio Quick Stat */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Gol. Darah</span>
                    <span className="font-extrabold text-rose-400 text-sm">{profile?.bloodType || 'O+'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">BMI</span>
                    <span className="font-extrabold text-cyan-400 text-sm">{profile?.bmi || '22.5'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Tinggi/Berat</span>
                    <span className="font-bold text-slate-200 text-xs">{profile?.heightCm || 170}c/{profile?.weightKg || 65}k</span>
                  </div>
                </div>

                {/* Vitals Summary */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Vitals Terakhir</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {bpVital?.timestamp || 'Hari ini'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold pt-0.5">
                    Tensi: <strong className="text-white">{bpVital?.value || '120/80 mmHg'}</strong> • Detak: <strong className="text-white">{hrVital?.value || '72'} bpm</strong>
                  </p>
                </div>

                {/* Medications List */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Pill className="w-3.5 h-3.5" />
                      <span>Obat Rutin ({memberMeds.length})</span>
                    </span>
                  </div>
                  {memberMeds.length === 0 ? (
                    <p className="text-[11px] text-slate-500">Tidak ada obat rutin khusus.</p>
                  ) : (
                    <ul className="space-y-1 pt-1">
                      {memberMeds.map((m) => (
                        <li key={m.id} className="text-[11px] text-slate-300 flex items-center justify-between">
                          <span>{m.name}</span>
                          <span className="text-[10px] text-rose-300 font-semibold">{m.dosage}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Upcoming Appointment */}
                {memberAppts.length > 0 && (
                  <div className="bg-slate-950 p-3 rounded-2xl border border-purple-500/20 text-purple-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] text-purple-400">
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Janji Dokter Mendatang</span>
                    </div>
                    <p className="text-[11px] font-semibold text-white">
                      {memberAppts[0].doctorName} • {memberAppts[0].date}
                    </p>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectMember(member.id);
                    onNavigateToTab('profile');
                  }}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-rose-500 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lihat Profil Medis {member.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
