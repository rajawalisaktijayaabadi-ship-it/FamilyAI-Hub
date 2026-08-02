import React, { useState } from 'react';
import { 
  Sparkles, Stethoscope, AlertTriangle, ShieldAlert, 
  CheckCircle2, X, Send, HeartPulse 
} from 'lucide-react';
import { GeminiService } from '../../../providers/gemini/GeminiService';

interface AIHealthCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIHealthCoachModal: React.FC<AIHealthCoachModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [symptoms, setSymptoms] = useState('Anak pusing dan demam 38°C sejak tadi sore setelah olahraga.');
  const [ageGroup, setAgeGroup] = useState('Anak-anak (6-12 Thn)');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    disclaimer: "PERHATIAN: Hasil analisis AI ini hanya untuk pertolongan pertama & edukasi, BUKAN diagnosis medis resmi.",
    possibleCauses: [
      "Demam ringan akibat kelelahan fisik usai latihan olahraga",
      "Gejala awal Infeksi Saluran Pernapasan Atas (ISPA)",
      "Dehidrasi ringan pasca aktivitas luar ruangan"
    ],
    firstAidSteps: [
      "Kompres hangat di area dahi atau lipatan ketiak anak.",
      "Berikan asupan air minum hangat yang cukup.",
      "Istirahatkan anak di ruangan sejuk yang tenang."
    ],
    urgencyLevel: "Rendah ke Sedang",
    whenToSeeDoctor: "Segera konsultasi ke Dokter/IGD bila demam > 39°C, anak kejang, atau timbul sesak napas berat."
  });

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || loading) return;

    setLoading(true);
    try {
      const data = await GeminiService.checkHealth(symptoms, ageGroup);
      if (data && data.possibleCauses) {
        setAnalysisResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl text-white relative max-h-[90vh] overflow-y-auto scrollbar-thin animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <h3 className="font-bold text-base text-white">Dokter AI & Analisis Gejala Pertolongan Pertama</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-xs p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Warning Box */}
        <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>{analysisResult.disclaimer}</span>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleAnalyze} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Kelompok Usia Pasien</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
              >
                <option value="Balita (1-5 Thn)">Balita (1-5 Thn)</option>
                <option value="Anak-anak (6-12 Thn)">Anak-anak (6-12 Thn)</option>
                <option value="Remaja (13-18 Thn)">Remaja (13-18 Thn)</option>
                <option value="Dewasa (19-59 Thn)">Dewasa (19-59 Thn)</option>
                <option value="Lansia (60+ Thn)">Lansia (60+ Thn)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Tingkat Urgensi AI</label>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-rose-300 font-bold">
                {analysisResult.urgencyLevel}
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Deskripsi Keluhan / Gejala Fisik</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={3}
              placeholder="Ceritakan keluhan, suhu tubuh, atau gejala yang dirasakan..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'Dianalisis AI Medis...' : 'Analisis Pertolongan Pertama AI'}</span>
          </button>
        </form>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 uppercase tracking-wider block">Kemungkinan Penyebab Awam</span>
              <ul className="space-y-1 text-slate-300">
                {analysisResult.possibleCauses.map((cause: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block">Langkah Pertolongan Pertama di Rumah</span>
              <div className="space-y-1.5">
                {analysisResult.firstAidSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-1">
              <span className="font-bold text-rose-400 uppercase tracking-wider block">Kapan Harus Ke Dokter / IGD</span>
              <p className="text-rose-200 font-medium">{analysisResult.whenToSeeDoctor}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
