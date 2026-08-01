import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  MessageSquare, 
  Lightbulb, 
  Bot,
  Filter,
  Send
} from 'lucide-react';
import { Child, ParentingTip } from '../types';

interface AICoachTipsTabProps {
  child: Child;
  tips: ParentingTip[];
}

export const AICoachTipsTab: React.FC<AICoachTipsTabProps> = ({ child, tips }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [query, setQuery] = useState('Bagaimana cara mengurangi screen time gadget tanpa tantrum?');
  const [loading, setLoading] = useState(false);

  const [coachResponse, setCoachResponse] = useState<any>({
    developmentalContext: `Anak usia ${child.age} tahun (${child.grade}) sedang mengembangkan regulasi emosi mandiri dan respon logika.`,
    immediateResponse: 'Atur alarm pengingat visual bersama 10 menit sebelum waktu layar berakhir, lalu berikan pilihan aktivitas fisik/kreatif pengganti.',
    longTermStrategy: 'Sepakati area bebas gadget di rumah (kamar & meja makan) yang ditaati seluruh anggota keluarga.',
    doList: [
      'Gunakan countdown timer yang disepakati anak.',
      'Ajak anak bersepeda atau merakit lego setelah selesai screen time.'
    ],
    dontList: [
      'Merebut gadget secara langsung tanpa pemberitahuan.',
      'Melanggar aturan screen time yang dibuat oleh orang tua sendiri.'
    ],
    quote: 'Pengasuhan dengan batas yang konsisten & hangat membentuk kedisiplinan internal anak.'
  });

  const categories = [
    'Semua',
    'Komunikasi',
    'Disiplin Positif',
    'Belajar',
    'Motivasi',
    'Screen Time',
    'Tidur',
    'Nutrisi',
    'Aktivitas Keluarga'
  ];

  const filteredTips = tips.filter((t) =>
    selectedCategory === 'Semua' ? true : t.category === selectedCategory
  );

  const handleConsultCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/parenting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childAge: child.age,
          childName: child.name,
          behaviorQuery: query
        })
      });
      const data = await res.json();
      if (data && data.doList) {
        setCoachResponse(data);
      } else {
        // Fallback response
        setCoachResponse({
          developmentalContext: `Anak usia ${child.age} tahun membutuhkan komunikasi terbuka dan validasi emosi.`,
          immediateResponse: 'Berikan perhatian penuh dan dengarkan cerita anak tanpa menyela.',
          longTermStrategy: 'Bangun kebiasaan refleksi malam sebelum tidur selama 10 menit.',
          doList: ['Apresiasi usaha positif anak secara langsung.', 'Gunakan kata-kata hangat dan tenang.'],
          dontList: ['Membandingkan anak dengan teman atau saudaranya.', 'Membentak atau menaikkan suara.'],
          quote: 'Cinta tanpa syarat dan batasan yang sehat adalah kunci perkembangan anak.'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner AI Coach */}
      <div className="bg-gradient-to-r from-purple-950 via-pink-950/60 to-slate-900 border border-purple-500/30 rounded-3xl p-6 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Parenting Coach</h2>
              <p className="text-xs text-purple-200">
                Konsultasikan pola asuh, regulasi emosi, kedisiplinan, & kebiasaan belajar untuk {child.name} ({child.age} Thn).
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
            Psikologi Positif
          </span>
        </div>

        {/* Coach Query Form */}
        <form onSubmit={handleConsultCoach} className="space-y-3 pt-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-950/90 border border-purple-500/30 focus:border-pink-500 rounded-2xl py-3 pl-4 pr-24 text-xs text-slate-100 outline-none shadow-inner"
              placeholder="Tanyakan penanganan tantrum, motivasi belajar, jadwal tidur..."
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Menyusun...' : 'Tanya AI'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* AI Coach Guidance Output */}
      {coachResponse && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bot className="w-5 h-5 text-pink-400" />
            <h3 className="font-bold text-white text-base">Rekomendasi AI Parenting Coach</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">Konteks Perkembangan Usia {child.age} Tahun</span>
              <p className="text-xs text-slate-200 mt-1">{coachResponse.developmentalContext}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Aksi Seketika (Saat Ini)</span>
                <p className="text-xs text-slate-300">{coachResponse.immediateResponse}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Strategi Jangka Panjang</span>
                <p className="text-xs text-slate-300">{coachResponse.longTermStrategy}</p>
              </div>
            </div>

            {/* Do vs Dont */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Disarankan (DO)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {coachResponse.doList.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-950/30 border border-rose-500/30 p-4 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Hindari (DON'T)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {coachResponse.dontList.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl text-center text-xs text-pink-200 italic">
              "{coachResponse.quote}"
            </div>
          </div>
        </div>
      )}

      {/* Library Parenting Tips */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Perpustakaan Panduan & Tips Parenting</h3>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white border-pink-400/50'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {tip.category}
                </span>
                <span className="text-[10px] text-slate-400">{tip.ageRange}</span>
              </div>

              <h4 className="text-sm font-bold text-white">{tip.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{tip.content}</p>

              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Kunci Utama:</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {tip.doList.slice(0, 2).map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
