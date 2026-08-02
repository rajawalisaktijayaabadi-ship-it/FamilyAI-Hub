import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  X,
  Send,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
  HelpCircle as QuestionIcon,
  RotateCcw,
  Bot
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface AIHomeworkAssistantModalProps {
  homeworkId?: string;
  onClose: () => void;
}

export const AIHomeworkAssistantModal: React.FC<AIHomeworkAssistantModalProps> = ({
  homeworkId,
  onClose
}) => {
  const { homeworks, incrementAiHelpCount } = useEducationStore();
  const selectedHw = homeworks.find((h) => h.id === homeworkId);

  const [prompt, setPrompt] = useState(
    selectedHw ? `Bantu jelaskan konsep tentang PR: ${selectedHw.title}` : ''
  );
  const [subject, setSubject] = useState(selectedHw?.subjectName || 'Matematika');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<null | {
    concept: string;
    steps: string[];
    exampleQuestion: string;
    exampleSolution: string;
    practiceQuestion: string;
  }>(null);

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null);

    if (homeworkId) {
      incrementAiHelpCount(homeworkId);
    }

    try {
      const res = await fetch('/api/ai/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt, subject, gradeLevel: 'Tingkat Sekolah', type: 'homework' })
      });

      if (res.ok) {
        const data = await res.json();
        setResponse({
          concept: data.directAnswer || `Konsep Utama (${subject}): Bimbingan Logika & Teori`,
          steps: data.stepByStep || [
            '1. Pahami apa yang diketahui dan apa yang ditanyakan dalam soal.',
            '2. Gunakan aturan dasar yang berlaku secara sistematis.',
            '3. Kerjakan langkah demi langkah dengan teliti.'
          ],
          exampleQuestion: data.funFact ? `Fakta Menarik: ${data.funFact}` : 'Contoh Soal Serupa: Memahami prinsip penyelesaian soal.',
          exampleSolution: 'Pendekatan edukatif: Pahami pola soal sebelum mengeksekusi rumus.',
          practiceQuestion: data.practicePrompt || 'Uji Mandiri: Coba selesaikan 1 latihan serupa!'
        });
      } else {
        // Fallback rich structure if network/API error
        setResponse({
          concept: `Konsep Utama (${subject}): Bimbingan Logika & Dasar Teori`,
          steps: [
            '1. Pahami apa yang diketahui dan apa yang ditanyakan dalam soal.',
            '2. Gunakan rumus/aturan dasar yang berlaku tanpa langsung menyalin jawaban.',
            '3. Kerjakan langkah demi langkah dengan mengecek ulang hasil perhitungan/penulisan.'
          ],
          exampleQuestion: 'Contoh Soal Serupa: Jika A = 1/2 dan B = 3/4, berapakah A + B?',
          exampleSolution: 'Langkah: Samakan penyebut menjadi 4, yaitu 2/4 + 3/4 = 5/4 = 1 1/4.',
          practiceQuestion: 'Uji Mandiri: Coba selesaikan 1/3 + 2/6 sendiri sekarang!'
        });
      }
    } catch (err) {
      setResponse({
        concept: `Konsep Dasar Pemahaman (${subject})`,
        steps: [
          '1. Identifikasi variabel kunci atau kata kunci utama dalam pertanyaan.',
          '2. Hubungkan dengan materi yang telah dipelajari di sekolah minggu ini.',
          '3. Tuliskan draf jawaban kamu terlebih dahulu sebelum meminta bantuan oranjtua.'
        ],
        exampleQuestion: 'Soal Latihan Serupa: Bagaimanakah cara menentukan ide pokok paragraf?',
        exampleSolution: 'Penjelasan: Ide pokok biasanya terletak pada kalimat utama di awal atau akhir paragraf.',
        practiceQuestion: 'Cobalah temukan ide pokok dari 1 paragraf pada buku PR kamu!'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 w-full max-w-2xl space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-amber-300 rounded-2xl border border-indigo-500/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI Homework Assistant (Pendamping PR)</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  Pedoman Edukasi
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI memberikan bimbingan konsep & soal serupa, bukan jawaban langsung instan.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anti-cheating principle callout */}
        <div className="bg-slate-950/80 border border-indigo-500/20 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Prinsip Anti-Kecurangan:</strong> AI didesain untuk menerangkan metode, rumus, dan logika penyelesaian agar anak paham mandiri.
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAskAi} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Mata Pelajaran</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Matematika">Matematika</option>
                <option value="IPA">IPA (Sains)</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Coding">Coding & Komputer</option>
                <option value="IPS">IPS</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Pertanyaan / Topik PR yang Membingungkan</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="misal: Bagaimana cara menghitung penjumlahan pecahan campuran?"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  <span>AI Sedang Menganalisis Konsep...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4 text-amber-300" />
                  <span>Dapatkan Penjelasan AI</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* AI Output Result */}
        {response && (
          <div className="space-y-4 bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 animate-fade-in">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Panduan Belajar AI untuk {subject}
              </h4>
            </div>

            {/* Concept */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                1. Pemahaman Konsep Dasar:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {response.concept}
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                2. Langkah Penyelesaian Bertahap:
              </span>
              <div className="space-y-1 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {response.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Question & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-indigo-300 uppercase">Contoh Soal Serupa:</span>
                <p className="text-xs font-semibold text-white">{response.exampleQuestion}</p>
                <p className="text-[11px] text-slate-300 pt-1">{response.exampleSolution}</p>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase">Soal Uji Mandiri:</span>
                <p className="text-xs font-semibold text-white">{response.practiceQuestion}</p>
                <p className="text-[10px] text-slate-400 pt-1">
                  Cobalah kerjakan di buku tulis kamu dan minta orangtua memeriksa hasilnya!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
