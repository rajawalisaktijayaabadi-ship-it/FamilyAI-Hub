import React from 'react';
import { 
  Activity, Heart, Droplets, Moon, Dumbbell, Pill, Calendar, 
  Stethoscope, Sparkles, CheckCircle2, AlertCircle, Clock, ChevronRight, 
  TrendingUp, ShieldCheck
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface HealthDashboardTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
  onNavigateToTab: (tabKey: string) => void;
}

export const HealthDashboardTab: React.FC<HealthDashboardTabProps> = ({
  familyMembers,
  activeMemberId,
  onNavigateToTab,
}) => {
  const { 
    vitalRecords, medications, medicationHistories, medicalAppointments, 
    exerciseLogs, sleepLogs, waterTrackers, healthInsights,
    toggleMedicationTaken, logWaterIntake 
  } = useHealthStore();

  const todayStr = new Date().toISOString().split('T')[0];

  // Filter items based on activeMemberId
  const filterByMember = <T extends { memberId?: string }>(items: T[]): T[] => {
    if (activeMemberId === 'all') return items;
    return items.filter((item) => item.memberId === activeMemberId);
  };

  const filteredVitals = filterByMember(vitalRecords);
  const filteredMeds = filterByMember(medications);
  const filteredAppts = filterByMember(medicalAppointments).filter(a => a.status === 'scheduled');
  const filteredExercises = filterByMember(exerciseLogs);
  const filteredSleep = filterByMember(sleepLogs);
  const filteredInsights = filterByMember(healthInsights);

  // Water Calculation
  const getMemberWaterProgress = (memberId: string) => {
    const tracker = waterTrackers[`${memberId}_${todayStr}`];
    if (!tracker) return { current: 0, target: 2200, percent: 0 };
    const percent = Math.min(100, Math.round((tracker.currentMl / tracker.targetMl) * 100));
    return { current: tracker.currentMl, target: tracker.targetMl, percent };
  };

  const mainWaterMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const waterStats = getMemberWaterProgress(mainWaterMemberId);

  // Health Score Calculation
  const familyHealthScore = 92;
  const activeMemberObj = familyMembers.find(m => m.id === activeMemberId);

  return (
    <div className="space-y-6">
      
      {/* Top Stat Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Family Wellness Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Skor Kesehatan Keluarga</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{familyHealthScore}</span>
            <span className="text-xs font-semibold text-emerald-400">/ 100 (Prima)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[92%]" />
          </div>
          <p className="text-[11px] text-slate-400">
            {activeMemberId === 'all' 
              ? 'Tensi & vitals 5 anggota keluarga stabil minggu ini' 
              : `Status kesehatan ${activeMemberObj?.name || 'anggota'} sangat prima`}
          </p>
        </div>

        {/* Water Intake Quick Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Konsumsi Air Harian</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{(waterStats.current / 1000).toFixed(1)}L</span>
            <span className="text-xs font-semibold text-cyan-400">/ {(waterStats.target / 1000).toFixed(1)}L ({waterStats.percent}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${waterStats.percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Sisa: {Math.max(0, waterStats.target - waterStats.current)} ml</span>
            <button 
              onClick={() => logWaterIntake(mainWaterMemberId, 250)}
              className="text-cyan-400 hover:text-cyan-300 font-bold underline"
            >
              +250ml Minum
            </button>
          </div>
        </div>

        {/* Sleep Summary Quick Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Rata-Rata Durasi Tidur</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Moon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">7.4</span>
            <span className="text-xs font-semibold text-indigo-400">Jam / Malam</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Kualitas tidur: <strong className="text-indigo-300">Baik (Wearable Synced)</strong>
          </p>
          <button 
            onClick={() => onNavigateToTab('sleep')}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 pt-1"
          >
            <span>Detail Log Tidur</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Exercise Progress Quick Stat */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Aktivitas Fisik Hari Ini</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">160</span>
            <span className="text-xs font-semibold text-amber-400">Menit / 950 Kalori</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Jogging, Yoga, dan Basket Sekolah tercatat.
          </p>
          <button 
            onClick={() => onNavigateToTab('exercise')}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 pt-1"
          >
            <span>Catat Olahraga Baru</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Medication Reminders + Vital Signs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Medication Reminder & Intake Center */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Jadwal Minum Obat Hari Ini</h3>
                  <p className="text-xs text-slate-400">Pengingat tepat waktu obat rutin anggota keluarga</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab('medication')}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
              >
                <span>Kelola Kelengkapan Obat</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {filteredMeds.length === 0 ? (
              <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs">
                Tidak ada jadwal obat khusus untuk filter ini.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMeds.map((med) => {
                  const memberObj = familyMembers.find(m => m.id === med.memberId);
                  const isTakenToday = medicationHistories.some(
                    mh => mh.medicationId === med.id && mh.takenAt.includes('Hari ini')
                  );

                  return (
                    <div 
                      key={med.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isTakenToday 
                          ? 'bg-slate-950/60 border-emerald-500/20 text-slate-400' 
                          : 'bg-slate-950 border-slate-800 text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {memberObj && (
                          <img src={memberObj.avatar} alt={memberObj.name} className="w-10 h-10 rounded-full object-cover mt-0.5" />
                        )}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{med.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">
                              {med.dosage}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Aturan: <strong className="text-rose-300">{med.frequency}</strong> • Jam: {med.timesOfDay.join(', ') || 'Sesuai Kebutuhan'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Pasien: <strong className="text-slate-300">{memberObj?.name}</strong> • Sisa stok: {med.remainingPills ?? 15} pill
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {isTakenToday ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Sudah Diminum</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleMedicationTaken(med.id, med.memberId, 'taken')}
                            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 flex items-center gap-1.5 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Tandai Minum</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Vital Signs Overview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Ringkasan Tanda Vital (Vitals)</h3>
                  <p className="text-xs text-slate-400">Tekanan darah, detak jantung, gula darah, dan suhu tubuh</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab('vitals')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <span>Lihat Semua Vital</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredVitals.slice(0, 4).map((vital) => {
                const memberObj = familyMembers.find(m => m.id === vital.memberId);
                return (
                  <div key={vital.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {memberObj && (
                          <img src={memberObj.avatar} alt={memberObj.name} className="w-6 h-6 rounded-full object-cover" />
                        )}
                        <span className="text-xs font-bold text-slate-200">{memberObj?.name}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        vital.isNormal 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {vital.isNormal ? 'Normal' : 'Perhatian'}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white">{vital.value}</span>
                      <span className="text-xs text-slate-400 font-semibold">{vital.unit}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                      <span className="capitalize">{vital.type.replace('_', ' ')}</span>
                      <span>{vital.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): AI Health Insights + Medical Appointments */}
        <div className="space-y-6">
          
          {/* AI Health Insight Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">AI Health Insights</h3>
                <p className="text-[11px] text-slate-400">Analisis kebiasaan & kesehatan AI</p>
              </div>
            </div>

            <div className="space-y-3">
              {filteredInsights.map((insight) => (
                <div 
                  key={insight.id}
                  className={`p-3.5 rounded-2xl border space-y-1.5 text-xs ${
                    insight.severity === 'warning' 
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-100'
                      : insight.severity === 'success'
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{insight.title}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{insight.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Medical Appointments */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">Janji Dokter Mendatang</h3>
              </div>
              <button 
                onClick={() => onNavigateToTab('appointments')}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-bold"
              >
                + Tambah
              </button>
            </div>

            {filteredAppts.length === 0 ? (
              <div className="p-6 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs">
                Tidak ada janji dokter mendatang.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAppts.map((appt) => {
                  const memberObj = familyMembers.find(m => m.id === appt.memberId);
                  return (
                    <div key={appt.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {memberObj && <img src={memberObj.avatar} alt={memberObj.name} className="w-5 h-5 rounded-full object-cover" />}
                          <span className="text-xs font-bold text-white">{appt.doctorName}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                          {appt.date} • {appt.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-medium">{appt.hospitalClinic}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{appt.notes}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
