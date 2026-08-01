import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Sparkles, 
  ChevronRight, 
  CheckCircle, 
  ArrowLeft, 
  RotateCcw,
  MessageCircle,
  Activity,
  Users,
  Briefcase,
  Heart,
  Smile,
  Moon,
  Brain,
  Sun
} from 'lucide-react';
import { usePsychologyStore } from '../stores/usePsychologyStore';
import { Assessment, AssessmentCategory, AssessmentResult } from '../types/psychologyTypes';

export const PsychologyAssessmentSubTab: React.FC = () => {
  const { assessments, submitAssessment, assessmentResults } = usePsychologyStore();

  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [completedResult, setCompletedResult] = useState<AssessmentResult | null>(null);

  const getCategoryIcon = (category: AssessmentCategory) => {
    switch (category) {
      case 'Communication': return <MessageCircle className="w-5 h-5 text-amber-400" />;
      case 'Stress': return <Activity className="w-5 h-5 text-rose-400" />;
      case 'Family Time': return <Users className="w-5 h-5 text-indigo-400" />;
      case 'Work-Life Balance': return <Briefcase className="w-5 h-5 text-sky-400" />;
      case 'Parenting': return <Heart className="w-5 h-5 text-pink-400" />;
      case 'Relationship': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Self Care': return <Smile className="w-5 h-5 text-emerald-400" />;
      case 'Sleep Habit': return <Moon className="w-5 h-5 text-indigo-300" />;
      case 'Emotion Awareness': return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'Gratitude': return <Sun className="w-5 h-5 text-amber-300" />;
      default: return <ClipboardCheck className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleStartAssessment = (a: Assessment) => {
    setSelectedAssessment(a);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCompletedResult(null);
  };

  const handleAnswerSelect = (questionId: string, val: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleNextQuestion = async () => {
    if (!selectedAssessment) return;

    if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit assessment
      setSubmitting(true);
      try {
        const result = await submitAssessment(selectedAssessment.id, answers);
        setCompletedResult(result);
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-purple-400" />
            <span>Asesmen Psikologi Ringan (Psychology Assessment)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Evaluasi kesehatan hubungan dan dinamika emosi tanpa diagnosis medis (Edukatif & Reflektif)
          </p>
        </div>
      </div>

      {/* Main View Flow */}
      {!selectedAssessment ? (
        /* Assessment Category List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((a) => (
            <div
              key={a.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 space-y-4 shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                    {getCategoryIcon(a.category)}
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                    {a.timeEstimate}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white leading-snug">{a.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{a.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleStartAssessment(a)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
              >
                <span>Mulai Asesmen</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : completedResult ? (
        /* Assessment Completed View */
        <div className="bg-slate-900 border border-purple-500/40 rounded-3xl p-8 space-y-6 shadow-2xl animate-fadeIn max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/40 text-purple-300 rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg">
              ✨
            </div>
            <h3 className="text-xl font-bold text-white">Hasil Asesmen Berhasil Dianalisis AI</h3>
            <p className="text-xs text-slate-400">Kategori: {completedResult.category}</p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase">Skor Kesejahteraan</div>
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-emerald-300 font-mono">
              {completedResult.score} / 100
            </div>
            <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-full">
              Level: {completedResult.level}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Ringkasan AI:</h4>
            <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
              {completedResult.summary}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Rekomendasi Langkah Nyata:</h4>
            <ul className="space-y-2">
              {completedResult.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setSelectedAssessment(null)}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Kembali ke Daftar Asesmen</span>
          </button>
        </div>
      ) : (
        /* Assessment Question Execution View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl max-w-2xl mx-auto">
          {/* Header & Progress */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <button
              onClick={() => setSelectedAssessment(null)}
              className="p-2 bg-slate-950 text-slate-400 hover:text-white rounded-xl border border-slate-800 flex items-center gap-1 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Batal</span>
            </button>

            <div className="text-xs font-bold text-slate-300">
              Pertanyaan {currentQuestionIndex + 1} dari {selectedAssessment.questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100}%`
              }}
            />
          </div>

          {/* Current Question Body */}
          {(() => {
            const q = selectedAssessment.questions[currentQuestionIndex];
            if (!q) return null;

            return (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-white leading-relaxed">{q.text}</h3>

                {/* Multiple Choice */}
                {q.type === 'multiple_choice' && (
                  <div className="space-y-2">
                    {q.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswerSelect(q.id, opt)}
                        className={`w-full p-3.5 rounded-2xl text-xs text-left border transition-all ${
                          answers[q.id] === opt
                            ? 'bg-purple-600 border-purple-500 text-white font-bold shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Rating Scale */}
                {q.type === 'rating' && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                      <span>{q.minLabel || '1'}</span>
                      <span>{q.maxLabel || '5'}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleAnswerSelect(q.id, num)}
                          className={`flex-1 py-3 rounded-2xl font-bold font-mono text-sm border transition-all ${
                            answers[q.id] === num
                              ? 'bg-purple-600 border-purple-500 text-white shadow-lg'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emoji Selector */}
                {q.type === 'emoji' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {q.options?.map((eOpt) => (
                      <button
                        key={eOpt}
                        onClick={() => handleAnswerSelect(q.id, eOpt)}
                        className={`p-3 rounded-2xl text-xs font-semibold border text-center transition-all ${
                          answers[q.id] === eOpt
                            ? 'bg-purple-600 border-purple-500 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        {eOpt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Slider */}
                {q.type === 'slider' && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono text-purple-300">
                      <span>{q.minLabel}</span>
                      <span className="font-bold text-sm bg-purple-950 px-3 py-1 rounded-xl border border-purple-500/30">
                        Level: {answers[q.id] || 5}
                      </span>
                      <span>{q.maxLabel}</span>
                    </div>
                    <input
                      type="range"
                      min={q.minVal || 1}
                      max={q.maxVal || 10}
                      value={answers[q.id] || 5}
                      onChange={(e) => handleAnswerSelect(q.id, Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Checkbox */}
                {q.type === 'checkbox' && (
                  <div className="space-y-2">
                    {q.options?.map((cOpt) => {
                      const currentArr = (answers[q.id] as string[]) || [];
                      const isChecked = currentArr.includes(cOpt);
                      const toggleCheck = () => {
                        if (isChecked) {
                          handleAnswerSelect(
                            q.id,
                            currentArr.filter((item) => item !== cOpt)
                          );
                        } else {
                          handleAnswerSelect(q.id, [...currentArr, cOpt]);
                        }
                      };

                      return (
                        <button
                          key={cOpt}
                          onClick={toggleCheck}
                          className={`w-full p-3 rounded-2xl text-xs text-left border flex items-center justify-between transition-all ${
                            isChecked
                              ? 'bg-purple-950/60 border-purple-500 text-white font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{cOpt}</span>
                          <input type="checkbox" checked={isChecked} readOnly className="accent-purple-500" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Next Button */}
                <button
                  onClick={handleNextQuestion}
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all mt-6"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {submitting
                      ? 'Menganalisis Jawaban...'
                      : currentQuestionIndex < selectedAssessment.questions.length - 1
                      ? 'Pertanyaan Selanjutnya'
                      : 'Lihat Hasil Asesmen AI'}
                  </span>
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* History of Past Results */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-indigo-400" />
          <span>Riwayat Asesmen Sebelumnya</span>
        </h3>

        <div className="space-y-3">
          {assessmentResults.map((res) => (
            <div key={res.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>Asesmen {res.category}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    {res.level}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">{res.summary}</p>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">Tanggal: {res.date}</div>
              </div>

              <div className="text-right sm:text-right">
                <div className="text-2xl font-extrabold text-purple-300 font-mono">{res.score}/100</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
