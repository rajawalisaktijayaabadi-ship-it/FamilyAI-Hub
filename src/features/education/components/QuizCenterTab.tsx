import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Plus,
  X,
  Loader2,
  Sliders,
  Brain
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { Quiz, QuizQuestion } from '../types';

interface QuizCenterTabProps {
  childName: string;
}

export const QuizCenterTab: React.FC<QuizCenterTabProps> = ({ childName }) => {
  const { selectedChildId, profiles, quizzes, quizResults, addQuizResult, addQuiz } = useEducationStore();

  const childProfile = profiles[selectedChildId];
  const childResults = quizResults.filter((r) => r.childId === selectedChildId);

  // Active quiz session state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // AI Quiz Generator Modal state
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [subjectInput, setSubjectInput] = useState('Matematika');
  const [materiInput, setMateriInput] = useState('');
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Sedang' | 'Sangat Sukar'>('Sedang');
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const startQuizSession = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserScore(0);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materiInput.trim()) {
      setGenerateError('Silakan masukkan topik / materi kuis yang ingin dipelajari.');
      return;
    }

    setIsGenerating(true);
    setGenerateError(null);

    try {
      const res = await fetch('/api/ai/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quiz',
          subject: subjectInput,
          materi: materiInput,
          gradeLevel: childProfile?.grade || 'SD / SMA',
          difficulty,
          questionCount
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newQuiz: Omit<Quiz, 'id'> = {
          subject: data.subject || subjectInput,
          topic: data.topic || materiInput,
          difficulty: (data.difficulty as Quiz['difficulty']) || difficulty,
          questions: data.questions && data.questions.length > 0 ? data.questions : [
            {
              id: 1,
              question: `Soal Latihan Dasar tentang ${materiInput}: Manakah konsep utama yang benar?`,
              options: [
                'Memahami konsep dasar dan latihan konsisten',
                'Mengabaikan rumus dasar',
                'Hanya membaca tanpa mengerjakan soal',
                'Tidak perlu memeriksa jawaban'
              ],
              correctIndex: 0,
              explanation: `Latihan konsisten pada ${materiInput} memperkuat pemahaman logika.`
            }
          ]
        };

        addQuiz(newQuiz);
        setIsGenerateModalOpen(false);
        setMateriInput('');

        // Start created quiz immediately
        const createdQuizWithId: Quiz = {
          ...newQuiz,
          id: `qz-${Date.now()}`
        };
        startQuizSession(createdQuizWithId);
      } else {
        setGenerateError('Gagal membuat kuis. Mencoba kembali...');
      }
    } catch (err) {
      setGenerateError('Terjadi kesalahan koneksi saat membuat kuis AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !activeQuiz) return;
    setIsSubmitted(true);

    const q = activeQuiz.questions[currentQuestionIdx];
    if (selectedOption === q.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Quiz Finished
      const finalCorrect = selectedOption === activeQuiz.questions[currentQuestionIdx].correctIndex ? correctCount : correctCount;
      const total = activeQuiz.questions.length;
      const score = Math.round((finalCorrect / total) * 100);

      setUserScore(score);
      setIsFinished(true);

      addQuizResult({
        childId: selectedChildId,
        quizId: activeQuiz.id,
        subject: activeQuiz.subject,
        topic: activeQuiz.topic,
        score,
        totalQuestions: total,
        correctCount: finalCorrect
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Pusat Kuis & Latihan Soal AI ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Uji pemahaman materi dengan kuis pilihan ganda interaktif & penjelasan komprehensif.
          </p>
        </div>

        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>Buat Kuis AI Baru</span>
        </button>
      </div>

      {/* Available Quizzes & Active Session */}
      {!activeQuiz ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      {quiz.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{quiz.questions.length} Soal</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{quiz.topic}</h3>
                  <p className="text-xs text-slate-400">Tingkat Kesulitan: <span className="text-amber-400 font-semibold">{quiz.difficulty}</span></p>
                </div>

                <button
                  onClick={() => startQuizSession(quiz)}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Mulai Kuis Sekarang</span>
                </button>
              </div>
            ))}
          </div>

          {/* History Results */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Riwayat Hasil Kuis</span>
            </h3>

            {childResults.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">Belum ada riwayat kuis yang diselesaikan.</p>
            ) : (
              <div className="space-y-2">
                {childResults.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-white">{res.topic} ({res.subject})</h4>
                      <p className="text-[11px] text-slate-400">{res.date} • {res.correctCount} / {res.totalQuestions} Benar</p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-sm">
                      {res.score} %
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Active Quiz Modal / Area */
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6 max-w-2xl mx-auto">
          {!isFinished ? (
            <>
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    {activeQuiz.subject} - {activeQuiz.topic}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    Soal {currentQuestionIdx + 1} dari {activeQuiz.questions.length}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveQuiz(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Keluar
                </button>
              </div>

              {/* Question Box */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {activeQuiz.questions[currentQuestionIdx].question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {activeQuiz.questions[currentQuestionIdx].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === activeQuiz.questions[currentQuestionIdx].correctIndex;

                    let optionStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                    if (isSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isSubmitted}
                        className={`w-full p-3.5 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation when submitted */}
                {isSubmitted && (
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1 text-xs text-slate-300 animate-fade-in">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <HelpCircle className="w-4 h-4" />
                      <span>Penjelasan Solusi:</span>
                    </span>
                    <p className="pt-1">{activeQuiz.questions[currentQuestionIdx].explanation}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-2 border-t border-slate-800">
                {!isSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold"
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Result Screen */
            <div className="text-center space-y-4 py-4 animate-fade-in">
              <Award className="w-16 h-16 text-amber-400 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-white">Kuis Selesai!</h3>
                <p className="text-xs text-slate-400">Skor Akhir Kamu Untuk {activeQuiz.topic}</p>
              </div>

              <div className="text-4xl font-black text-amber-300">{userScore} %</div>

              <p className="text-xs text-slate-300">
                {userScore >= 80 ? 'Luar biasa! Pemahaman materi kamu sangat tajam!' : 'Bagus! Tetap tingkatkan latihan kuis kamu.'}
              </p>

              <button
                onClick={() => setActiveQuiz(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Kembali ke Daftar Kuis
              </button>
            </div>
          )}
        </div>
      )}

      {/* AI Quiz Generator Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Generate Kuis AI Baru</h3>
                  <p className="text-[11px] text-slate-400">Input mata pelajaran & materi untuk buat soal kuis otomatis</p>
                </div>
              </div>

              <button
                onClick={() => setIsGenerateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateQuiz} className="space-y-4">
              {generateError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                  {generateError}
                </div>
              )}

              {/* Mata Pelajaran */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  1. Pilih / Input Mata Pelajaran
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {['Matematika', 'Fisika', 'IPA', 'B. Indonesia', 'B. Inggris', 'Coding Python'].map((subj) => (
                    <button
                      type="button"
                      key={subj}
                      onClick={() => setSubjectInput(subj)}
                      className={`py-1.5 px-2.5 text-[11px] font-bold rounded-xl border transition-all ${
                        subjectInput === subj
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  placeholder="Ketik Mata Pelajaran (Contoh: Biologi / Sejarah)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500 font-medium"
                />
              </div>

              {/* Materi / Topik */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  2. Topik / Materi Khusus Kuis <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={materiInput}
                  onChange={(e) => setMateriInput(e.target.value)}
                  placeholder="Contoh: Kalkulus Limit, Termodinamika, Grammar Past Tense, Pecahan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500 font-medium placeholder:text-slate-600"
                />
              </div>

              {/* Tingkat Kesulitan & Jumlah Soal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    3. Tingkat Kesulitan
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sangat Sukar">Sangat Sukar</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    4. Jumlah Soal
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value={3}>3 Soal (Cepat)</option>
                    <option value={5}>5 Soal (Standar)</option>
                    <option value={10}>10 Soal (Lengkap)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyusun Soal AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" />
                      <span>Generate Kuis AI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

