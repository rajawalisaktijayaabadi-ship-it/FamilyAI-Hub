import React, { useState } from 'react';
import { 
  Droplets, Plus, GlassWater, Clock, Sparkles, CheckCircle2, 
  TrendingUp, Award 
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface WaterTrackerTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const WaterTrackerTab: React.FC<WaterTrackerTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { waterTrackers, logWaterIntake, updateWaterTarget } = useHealthStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const selectedMemberId = activeMemberId === 'all' ? 'm1' : activeMemberId;
  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];

  const trackerKey = `${selectedMemberId}_${todayStr}`;
  const currentTracker = waterTrackers[trackerKey] || {
    id: `wt_${trackerKey}`,
    memberId: selectedMemberId,
    date: todayStr,
    targetMl: 2500,
    currentMl: 1750,
    logs: [
      { id: 'wl1', amountMl: 500, timestamp: '07:00' },
      { id: 'wl2', amountMl: 500, timestamp: '10:30' },
      { id: 'wl3', amountMl: 250, timestamp: '12:45' },
      { id: 'wl4', amountMl: 500, timestamp: '15:15' }
    ]
  };

  const percentage = Math.min(100, Math.round((currentTracker.currentMl / currentTracker.targetMl) * 100));

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Stat */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Droplets className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-white">Water Intake & Hydration Tracker</h3>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Pantau kebiasaan konsumsi air putih harian untuk menjaga kesehatan ginjal, pencernaan, dan kesegaran tubuh.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => logWaterIntake(selectedMemberId, 250)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition-all"
          >
            <GlassWater className="w-4 h-4" />
            <span>+250 ml (Gelas)</span>
          </button>

          <button
            onClick={() => logWaterIntake(selectedMemberId, 500)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-500/30 flex items-center gap-2 transition-all"
          >
            <Droplets className="w-4 h-4" />
            <span>+500 ml (Botol)</span>
          </button>
        </div>
      </div>

      {/* Main Hydration Visual Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Progress Ring */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-center flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="72"
                stroke="currentColor"
                strokeWidth="16"
                className="text-slate-950"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="72"
                stroke="currentColor"
                strokeWidth="16"
                className="text-cyan-400 transition-all duration-700 ease-out"
                fill="transparent"
                strokeDasharray={452}
                strokeDashoffset={452 - (452 * percentage) / 100}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <Droplets className="w-6 h-6 text-cyan-400 animate-bounce mb-1" />
              <span className="text-3xl font-black text-white">{percentage}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tercapai</span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-base text-white">{currentMember.name}</h4>
            <p className="text-xs text-slate-400">
              Target Harian: <strong className="text-cyan-300">{currentTracker.targetMl} ml</strong> • Diminum: <strong className="text-white">{currentTracker.currentMl} ml</strong>
            </p>
          </div>
        </div>

        {/* Drink History Timeline */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Riwayat Minum Hari Ini ({currentMember.name})</span>
            </h4>
            <span className="text-xs text-slate-400">
              Total Log: <strong className="text-white">{currentTracker.logs.length} kali</strong>
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
            {currentTracker.logs.map((log) => (
              <div key={log.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <GlassWater className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">+{log.amountMl} ml</span>
                    <span className="text-[10px] text-slate-400">Asupan Air Putih Segar</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-cyan-300 font-bold bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                  {log.timestamp} WIB
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
