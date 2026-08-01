import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Search,
  CheckCircle2,
  X,
  Send,
  HelpCircle
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';

interface AIPolicyExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIPolicyExplainerModal: React.FC<AIPolicyExplainerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { policies, analyzePolicy } = useInsuranceStore();

  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(policies[0]?.id || '');
  const [queryInput, setQueryInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const selectedPolicy = policies.find((p) => p.id === selectedPolicyId);
      const title = selectedPolicy ? selectedPolicy.title : 'Polis Pilihan';

      const res = analyzePolicy(
        title,
        queryInput || 'Jelaskan manfaat utama, pengecualian klaim, dan masa tunggu polis ini.'
      );
      setAnalysisResult(res);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto my-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-slate-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Konsultasi AI Policy Explainer & Risk Audit</h3>
              <p className="text-[11px] text-slate-400">
                Penerjemah klausul polis, analisis celah klaim, dan masa tunggu (waiting period).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block">PENTING: AI Bukan Agen Asuransi Resmi</strong>
            <span>
              Jawaban AI bersifat edukatif untuk mempermudah pemahaman klausa polis. Selalu konfirmasi ke agen atau provider resmi sebelum mengajukan klaim.
            </span>
          </div>
        </div>

        {/* Form Selector */}
        <form onSubmit={handleRunAnalysis} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Pilih Polis Keluarga untuk Dianalisis:</label>
            <select
              value={selectedPolicyId}
              onChange={(e) => setSelectedPolicyId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-xs text-white outline-none"
            >
              {policies.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.policyNumber} - {p.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Pertanyaan / Topik Penjelasan Khusus (Opsional):</label>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="misal: Apakah penyakit kronis ditanggung tanpa masa tunggu?"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-xs text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Menganalisis Klausa Polis...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analisis Polis Sekarang</span>
              </>
            )}
          </button>
        </form>

        {/* Results Box */}
        {analysisResult && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-4 text-xs">
            
            <div className="border-b border-slate-800 pb-2">
              <h4 className="font-bold text-amber-400 text-sm">
                Rangkuman Analisis AI: {analysisResult.policyTitle}
              </h4>
            </div>

            {/* Main Explanation */}
            <div className="space-y-1">
              <span className="font-bold text-slate-300">Penjelasan Sederhana Manfaat:</span>
              <p className="text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                {analysisResult.summary}
              </p>
            </div>

            {/* Exclusions */}
            <div className="space-y-1">
              <span className="font-bold text-rose-400">Pengecualian Utama Klaim (Hal yang Tidak Ditanggung):</span>
              <ul className="space-y-1 bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300">
                {analysisResult.exclusions.map((exc: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Waiting Period */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-300">Masa Tunggu (Waiting Period):</span>
              <span className="font-bold text-amber-400">{analysisResult.waitingPeriod}</span>
            </div>

            {/* Deductible */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-300">Potongan / Deductible per Klaim:</span>
              <span className="font-bold text-cyan-400">{analysisResult.deductible}</span>
            </div>

            {/* AI Advice */}
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-1">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Saran Optimasi AI:
              </span>
              <p className="text-slate-300">{analysisResult.advice}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
