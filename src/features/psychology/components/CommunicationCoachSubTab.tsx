import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  ShieldCheck, 
  Ear, 
  Heart, 
  AlertTriangle,
  Send,
  Copy,
  Check
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';

export const CommunicationCoachSubTab: React.FC = () => {
  const { communicationHistory, translateCommunication } = usePsychologyStore();

  const [inputPhrase, setInputPhrase] = useState('');
  const [translating, setTranslating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleInputs = [
    'Aku kesal sama kamu, kamu ga pernah perhatiin aku!',
    'Kenapa sih main HP terus? Ga mikirin rumah tangga!',
    'Kamu selalu terlambat, ga hargai waktu orang lain!',
    'Anak ini susah banget diatur, bikin capek aja!'
  ];

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPhrase.trim() || translating) return;

    setTranslating(true);
    try {
      await translateCommunication(inputPhrase);
      setInputPhrase('');
    } catch (err) {
      console.error(err);
    } finally {
      setTranslating(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-amber-400" />
            <span>Penerjemah Bahasa Emosi (Communication Coach AI)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Ubah ungkapan emosi tajam/marah menjadi komunikasi empati "Saya merasa..." yang hangat dan mempererat hubungan
          </p>
        </div>
      </div>

      {/* Main Translator Box */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Uji Reframing Kalimat Emosi Anda</span>
        </h3>

        <form onSubmit={handleTranslate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Masukkan Kalimat Kekesalan / Keluhan Asli Anda:
            </label>
            <div className="relative">
              <textarea
                value={inputPhrase}
                onChange={(e) => setInputPhrase(e.target.value)}
                rows={3}
                placeholder="Contoh: 'Aku kesal sama kamu, ga pernah bantu beres-beres!'"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-3.5 text-xs text-slate-200 outline-none placeholder:text-slate-600"
                required
              />
              <button
                type="submit"
                disabled={translating || !inputPhrase.trim()}
                className="absolute right-3 bottom-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{translating ? 'Penerjemahan AI...' : 'Terjemahkan ke Bahasa Empati'}</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Prompts */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Atau Coba Contoh Kalimat Berikut:</div>
            <div className="flex flex-wrap gap-2">
              {sampleInputs.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputPhrase(sample)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Translation Results History */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MessageSquareHeart className="w-5 h-5 text-indigo-400" />
          <span>Hasil Rekomendasi Reframing Komunikasi</span>
        </h3>

        {communicationHistory.map((item) => (
          <div key={item.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Tone: {item.tone}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Harsh Input */}
              <div className="bg-rose-950/30 border border-rose-500/30 p-4 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Kalimat Asli (Berpotensi Defensif)
                </div>
                <p className="text-xs text-rose-200 italic">"{item.originalInput}"</p>
              </div>

              {/* Empathetic AI Suggestion */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Sugesti Empati AI (Saran Pengucapan)
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.empathyRewrite, item.id)}
                    className="p-1 text-slate-400 hover:text-white bg-slate-950 rounded-lg text-[10px] flex items-center gap-1 border border-slate-800"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Tersalin' : 'Salin Teks'}</span>
                  </button>
                </div>
                <p className="text-xs text-emerald-100 font-semibold leading-relaxed">
                  "{item.empathyRewrite}"
                </p>
              </div>
            </div>

            {/* AI Explanation & Tips */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
              <div className="font-bold text-indigo-300">Mengapa Perubahan Ini Bekerja?</div>
              <p className="text-slate-300">{item.explanation}</p>
              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <div className="text-[10px] text-amber-300 font-bold uppercase">Tips Diskusi:</div>
                <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                  {item.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support Modules Grid: Active Listening & Conflict Prevention */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
            <Ear className="w-4 h-4" /> Active Listening
          </div>
          <h4 className="text-sm font-bold text-white">Mendengarkan Tanpa Interupsi</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Biarkan anggota keluarga menyelesaikan kalimatnya selama 2 menit penuh sebelum memberikan tanggapan atau saran.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Heart className="w-4 h-4" /> Empathy Reminder
          </div>
          <h4 className="text-sm font-bold text-white">Validasi Emosi Dahulu</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Katakan "Aku paham kamu sedang capek/cewa" sebelum membahas logik atau solusi teknis masalah.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" /> Conflict Prevention
          </div>
          <h4 className="text-sm font-bold text-white">Aturan Jeda 10 Detik</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Saat emosi meninggi, ambil nafas dalam 3 kali dan tunda merespons selama 10 detik agar korteks prefrontal bekerja.
          </p>
        </div>
      </div>

    </div>
  );
};
