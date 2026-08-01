import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Lock, 
  Users, 
  UserCheck, 
  Send, 
  Sun, 
  Heart, 
  TrendingUp, 
  Target 
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';
import { PrivacyLevel } from '../types/psychologyTypes';

export const DailyReflectionSubTab: React.FC = () => {
  const { reflections, addReflectionJournal } = usePsychologyStore();

  const [memberName, setMemberName] = useState('Budi Santoso');
  const [bestThing, setBestThing] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [improvement, setImprovement] = useState('');
  const [tomorrowTarget, setTomorrowTarget] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyLevel>('family_only');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bestThing.trim() && !gratitude.trim()) return;

    addReflectionJournal({
      memberName,
      date: new Date().toISOString().split('T')[0],
      bestThing: bestThing || 'Momen hangat bersama keluarga hari ini.',
      gratitude: gratitude || 'Bersyukur atas kesehatan seluruh anggota keluarga.',
      improvement: improvement || 'Mengurangi penggunaan HP saat jam makan malam.',
      tomorrowTarget: tomorrowTarget || 'Jalan pagi bersama 20 menit.',
      privacy
    });

    setBestThing('');
    setGratitude('');
    setImprovement('');
    setTomorrowTarget('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/90 border border-indigo-500/30 rounded-3xl p-6 text-white space-y-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Jurnal Refleksi Harian (Daily Reflection Journal)</h2>
            <p className="text-xs text-slate-300">
              Pertanyaan pemantik kesadaran diri harian untuk memperkuat rasa syukur dan perkembangan positif
            </p>
          </div>
        </div>
      </div>

      {/* Main Journal Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Isi Refleksi Harian Hari Ini</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Nama Anggota Keluarga:</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Pengaturan Privasi (Privacy Level):</label>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as PrivacyLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-indigo-500 font-semibold"
              >
                <option value="family_only">🔒 Tampil untuk Seluruh Keluarga</option>
                <option value="parent_only">🛡️ Hanya Orang Tua</option>
                <option value="private">🤫 Rahasia (Hanya Saya)</option>
              </select>
            </div>
          </div>

          {/* 4 Core Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <label className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-emerald-400" /> 1. Apa hal terbaik yang terjadi hari ini?
              </label>
              <textarea
                value={bestThing}
                onChange={(e) => setBestThing(e.target.value)}
                rows={2}
                placeholder="Ceritakan momen membahagiakan hari ini..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <label className="font-bold text-pink-300 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-400" /> 2. Apa yang sangat Anda syukuri hari ini?
              </label>
              <textarea
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                rows={2}
                placeholder="Hal sederhana atau ucapan terima kasih..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <label className="font-bold text-amber-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" /> 3. Apa yang ingin Anda perbaiki esok hari?
              </label>
              <textarea
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                rows={2}
                placeholder="Evaluasi diri dengan lembut..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <label className="font-bold text-sky-300 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-sky-400" /> 4. Apa target utama Anda untuk besok?
              </label>
              <textarea
                value={tomorrowTarget}
                onChange={(e) => setTomorrowTarget(e.target.value)}
                rows={2}
                placeholder="Satu langkah nyata besok..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Jurnal Refleksi Harian</span>
          </button>
        </form>
      </div>

      {/* History Journal List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Riwayat Catatan Refleksi Keluarga</span>
        </h3>

        <div className="space-y-4">
          {reflections.map((ref) => (
            <div key={ref.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>{ref.memberName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                    Privasi: {ref.privacy}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{ref.date}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>
                  <strong className="text-emerald-400 block mb-0.5">Momen Terbaik:</strong>
                  <span>{ref.bestThing}</span>
                </div>
                <div>
                  <strong className="text-pink-400 block mb-0.5">Rasa Syukur:</strong>
                  <span>{ref.gratitude}</span>
                </div>
                <div>
                  <strong className="text-amber-400 block mb-0.5">Area Perbaikan:</strong>
                  <span>{ref.improvement}</span>
                </div>
                <div>
                  <strong className="text-sky-400 block mb-0.5">Target Besok:</strong>
                  <span>{ref.tomorrowTarget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
