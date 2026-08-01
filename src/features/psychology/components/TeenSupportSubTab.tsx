import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Target, 
  Zap, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  Smile,
  Flame
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const TeenSupportSubTab: React.FC = () => {
  const { teenData } = usePsychologyStore();
  const [newGoal, setNewGoal] = useState('');
  const [goals, setGoals] = useState(teenData.goalSetting);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, newGoal]);
    setNewGoal('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/90 border border-purple-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Ruang Dukungan Remaja (Teen Support & Growth Hub)</h2>
            <p className="text-xs text-slate-300">
              Ruang pribadi untuk mengurai cemas sekolah, penetapan target, keseimbangan belajar, dan motivasi diri
            </p>
          </div>
        </div>
      </div>

      {/* Motivation Quote Card */}
      <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-purple-950/50 border border-amber-500/30 rounded-3xl p-6 text-center space-y-2 shadow-xl">
        <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-400" /> Kata Motivasi Hari Ini
        </div>
        <p className="text-sm font-semibold text-white italic">{teenData.motivationQuote}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Study Balance & Goal Setting */}
        <div className="space-y-4">
          
          {/* Study Balance Score */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-400" /> Keseimbangan Belajar (Study Balance)
              </span>
              <span className="text-xs font-mono font-bold text-sky-300">{teenData.studyBalanceScore} / 100</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full" style={{ width: `${teenData.studyBalanceScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">
              Pengaturan waktu antara pelajaran sekolah, hobi, dan istirahat berada di kondisi sangat baik.
            </p>
          </div>

          {/* Goal Setting */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Target & Impianku (Goal Setting)</span>
            </h3>

            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Tambah target baru..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Tambah
              </button>
            </form>

            <div className="space-y-2">
              {goals.map((g, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Stress Tips & Emotion Awareness */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tips Meredakan Cemas & Kesadaran Emosi</span>
          </h3>

          <div className="space-y-3 text-xs">
            {teenData.stressTips.map((tip, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Smile className="w-4 h-4" /> Tip Meredakan Cemas #{idx + 1}
                </div>
                <p className="text-slate-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
