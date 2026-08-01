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
  ArrowRight
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { Quiz, QuizQuestion } from '../types';

interface QuizCenterTabProps {
  childName: string;
}

export const QuizCenterTab: React.FC<QuizCenterTabProps> = ({ childName }) => {
  const { selectedChildId, quizzes, quizResults, addQuizResult } = useEducationStore();

  const childResults = quizResults.filter((r) => r.childId === selectedChildId);

  // Active quiz session state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startQuizSession = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserScore(0);
    setCorrectCount(0);
    setIsFinished(false);
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
                  <p className="text-xs text-slate-400">Tingkat Kesulitan: {quiz.difficulty}</p>
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
    </div>
  );
};
