import React from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Trophy,
  BrainCircuit,
  GraduationCap,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  BookMarked,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface EducationDashboardTabProps {
  childName: string;
  onNavigateTab: (tab: string) => void;
  onOpenAiAssistant: (hwId?: string) => void;
  onStartQuiz: () => void;
}

export const EducationDashboardTab: React.FC<EducationDashboardTabProps> = ({
  childName,
  onNavigateTab,
  onOpenAiAssistant,
  onStartQuiz
}) => {
  const {
    selectedChildId,
    profiles,
    subjects,
    homeworks,
    studyPlans,
    exams,
    readingLogs,
    insights,
    certificates,
    toggleStudyPlan,
    getAnalyticsForChild
  } = useEducationStore();

  const profile = profiles[selectedChildId];
  const analytics = getAnalyticsForChild(selectedChildId);
  const childHomeworks = homeworks.filter((h) => h.childId === selectedChildId);
  const pendingHomeworks = childHomeworks.filter((h) => h.status !== 'Selesai');
  const childExams = exams.filter((e) => e.childId === selectedChildId && e.status === 'Mendatang');
  const childStudyPlans = studyPlans.filter((p) => p.childId === selectedChildId);
  const childReading = readingLogs.filter((r) => r.childId === selectedChildId);
  const childCertificates = certificates.filter((c) => c.childId === selectedChildId);
  const latestInsight = insights.find((i) => i.childId === selectedChildId) || insights[0];

  return (
    <div className="space-y-6">
      {/* Quick Action Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30">
                Dashboard Pendidikan
              </span>
              <span className="text-xs text-slate-400">• {profile?.schoolName || 'Sekolah'} ({profile?.grade || 'SD'})</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Semangat Belajar, {childName}!</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400">
              {pendingHomeworks.length > 0
                ? `Ada ${pendingHomeworks.length} tugas PR yang perlu diselesaikan minggu ini.`
                : 'Luar biasa! Semua tugas PR kamu saat ini tuntas.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onOpenAiAssistant()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition-all"
            >
              <BrainCircuit className="w-4 h-4 text-amber-300" />
              <span>Tanya AI Assistant</span>
            </button>
            <button
              onClick={onStartQuiz}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Latihan Kuis AI</span>
            </button>
          </div>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Rata-Rata Nilai</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{analytics.averageGrade} <span className="text-xs font-normal text-slate-400">/ 100</span></div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
              <span>Target: 92</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>PR Tuntas</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{analytics.homeworkCompletionRate}%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              {pendingHomeworks.length} PR Pending
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Jam Belajar Minggu Ini</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{(analytics.totalStudyMinutesThisWeek / 60).toFixed(1)} <span className="text-xs font-normal text-slate-400">Jam</span></div>
            <div className="text-[11px] text-purple-300 mt-1">
              ~45 Menit / Hari
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Buku Dibaca</span>
              <BookMarked className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{analytics.booksReadCount} <span className="text-xs font-normal text-slate-400">Buku</span></div>
            <div className="text-[11px] text-amber-300 mt-1">
              Literasi Aktif
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Learning Coach Insight Card */}
          {latestInsight && (
            <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/50 border border-indigo-500/30 rounded-3xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-indigo-500/20 text-amber-300 rounded-2xl border border-indigo-500/30 shrink-0">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Rekomendasi AI Coach Belajar</span>
                    </span>
                    <button
                      onClick={() => onNavigateTab('coach')}
                      className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Lihat Semua Insights</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">{latestInsight.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{latestInsight.summary}</p>

                  <div className="bg-slate-950/60 rounded-xl p-3 border border-indigo-500/20 space-y-1.5 mt-2">
                    <span className="text-[11px] font-bold text-indigo-300">Saran Aktivitas Hari Ini:</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {latestInsight.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pending Homework Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Tugas PR & Proyek Sekolah</h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  {pendingHomeworks.length} Pending
                </span>
              </div>
              <button
                onClick={() => onNavigateTab('homework')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>Kelola PR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pendingHomeworks.length === 0 ? (
              <div className="bg-slate-950/50 rounded-2xl p-6 text-center border border-slate-800/80">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-white">Semua PR Tuntas!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Kamu telah menyelesaikan seluruh PR minggu ini. Waktunya eksplorasi kuis atau membaca buku!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingHomeworks.slice(0, 3).map((hw) => (
                  <div
                    key={hw.id}
                    className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                          {hw.subjectName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            hw.priority === 'Tinggi'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : hw.priority === 'Sedang'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          Prioritas {hw.priority}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{hw.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{hw.description}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1 text-rose-300 font-medium">
                          <Clock className="w-3 h-3" />
                          <span>Tenggat: {hw.dueDate} jam {hw.dueTime}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      <button
                        onClick={() => onOpenAiAssistant(hw.id)}
                        className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
                        <span>Bantuan AI</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's Study Planner Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Jadwal Belajar Mandiri Hari Ini</h3>
              </div>
              <button
                onClick={() => onNavigateTab('study')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>Kelola Jadwal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {childStudyPlans.length === 0 ? (
              <div className="bg-slate-950/50 rounded-2xl p-6 text-center border border-slate-800/80">
                <p className="text-xs text-slate-400">Belum ada target belajar mandiri yang didaftarkan.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {childStudyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => toggleStudyPlan(plan.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      plan.completed
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-950/80 border-slate-800 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          plan.completed
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {plan.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            plan.completed ? 'line-through text-slate-500' : 'text-white'
                          }`}
                        >
                          {plan.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="text-purple-300">{plan.subjectName}</span>
                          <span>•</span>
                          <span>{plan.timeOfDay} ({plan.targetDurationMinutes} Menit)</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        plan.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {plan.completed ? 'Selesai' : 'Belum'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Upcoming Exam Countdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Jadwal Ujian Mendatang</h3>
              </div>
              <button
                onClick={() => onNavigateTab('exams')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                Lihat Semua
              </button>
            </div>

            {childExams.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">Belum ada ujian terjadwal.</p>
            ) : (
              <div className="space-y-3">
                {childExams.slice(0, 2).map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                        {exam.examType} - {exam.subjectName}
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{exam.date}</span>
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white">{exam.title}</h4>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <p className="text-slate-400">Materi Topik:</p>
                      <div className="flex flex-wrap gap-1">
                        {exam.topicsCovered.map((topic, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-900 rounded text-[10px] text-slate-300">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Target Nilai:</span>
                      <span className="font-bold text-emerald-400">{exam.targetGrade} / 100</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reading Log Quick Progress */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Buku Sedang Dibaca</h3>
              </div>
              <button
                onClick={() => onNavigateTab('reading')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Pojok Baca
              </button>
            </div>

            {childReading.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">Belum ada aktivitas membaca.</p>
            ) : (
              <div className="space-y-3">
                {childReading.slice(0, 2).map((book) => {
                  const percent = Math.round((book.pagesRead / book.totalPages) * 100);
                  return (
                    <div key={book.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{book.bookTitle}</h4>
                          <p className="text-[11px] text-slate-400">{book.author}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold shrink-0">
                          {percent}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{book.pagesRead} dari {book.totalPages} Halaman</span>
                        <span>Terakhir: {book.lastReadDate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Latest Certificate Badge */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Prestasi Terbaru</h3>
              </div>
              <button
                onClick={() => onNavigateTab('certificates')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                Galeri
              </button>
            </div>

            {childCertificates.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-3">Belum ada sertifikat terdaftar.</p>
            ) : (
              <div className="bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-500/30 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-500/30 text-amber-300 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{childCertificates[0].title}</h4>
                  <p className="text-[11px] text-slate-400">{childCertificates[0].issuer} • {childCertificates[0].dateReceived}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
