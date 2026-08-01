import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface ExamCenterTabProps {
  childName: string;
  onStartQuiz: () => void;
}

export const ExamCenterTab: React.FC<ExamCenterTabProps> = ({ childName, onStartQuiz }) => {
  const { selectedChildId, exams, subjects, addExam, updateExamGrade, deleteExam } = useEducationStore();

  const childExams = exams.filter((e) => e.childId === selectedChildId);
  const childSubjects = subjects.filter((s) => s.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectId, setSubjectId] = useState(childSubjects[0]?.id || '');
  const [title, setTitle] = useState('');
  const [examType, setExamType] = useState<'UTS' | 'UAS' | 'Kuis' | 'Tryout' | 'Ujian Nasional'>('UTS');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00 - 09:30');
  const [targetGrade, setTargetGrade] = useState(90);
  const [topicsStr, setTopicsStr] = useState('Pecahan Senilai, Desimal, Persen');

  // Updating grade state
  const [editingGradeExamId, setEditingGradeExamId] = useState<string | null>(null);
  const [actualGrade, setActualGrade] = useState<number>(90);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selSub = childSubjects.find((s) => s.id === subjectId);
    const topicsCovered = topicsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addExam({
      childId: selectedChildId,
      subjectId: subjectId || 'sub-custom',
      subjectName: selSub ? selSub.name : 'Mata Pelajaran',
      title,
      examType,
      date: date || new Date().toISOString().split('T')[0],
      time,
      targetGrade,
      topicsCovered
    });

    setIsModalOpen(false);
    setTitle('');
  };

  const handleSaveGrade = (id: string) => {
    updateExamGrade(id, actualGrade);
    setEditingGradeExamId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Pusat Jadwal & Kesiapan Ujian ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Hitung mundur hari ujian UTS, UAS, Tryout & simulasi kuis AI untuk persiapan maksimal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onStartQuiz}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-xl transition-all"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Simulasi Kuis Ujian</span>
          </button>
          <button
            onClick={() => {
              if (childSubjects.length > 0) setSubjectId(childSubjects[0].id);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jadwal Ujian</span>
          </button>
        </div>
      </div>

      {/* Exam Grid */}
      {childExams.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <Award className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Jadwal Ujian</p>
          <p className="text-xs text-slate-400">
            Daftarkan jadwal ujian sekolah anak untuk membantu anak mempersiapkan materi bab tepat waktu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childExams.map((exam) => {
            const isCompleted = exam.status === 'Selesai';
            return (
              <div
                key={exam.id}
                className={`border rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'bg-slate-950/60 border-slate-800/60'
                    : 'bg-slate-900 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      {exam.examType} • {exam.subjectName}
                    </span>
                    <button
                      onClick={() => deleteExam(exam.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{exam.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1 text-amber-300 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exam.date} ({exam.time})</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400">Materi Topik Diuji:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.topicsCovered.map((topic, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-950 rounded-lg text-[11px] text-slate-300 border border-slate-800">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grade Section */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">Target: </span>
                    <span className="font-bold text-emerald-400">{exam.targetGrade}</span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Nilai Akhir: {exam.actualGrade}</span>
                    </div>
                  ) : editingGradeExamId === exam.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={actualGrade}
                        onChange={(e) => setActualGrade(Number(e.target.value))}
                        className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
                      />
                      <button
                        onClick={() => handleSaveGrade(exam.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                      >
                        Simpan
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingGradeExamId(exam.id);
                        setActualGrade(exam.targetGrade);
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Input Nilai Ujian</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add Exam */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Tambah Jadwal Ujian Baru</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Mata Pelajaran</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  {childSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                  {childSubjects.length === 0 && <option value="custom">Umum</option>}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nama / Judul Ujian</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="misal: Ulangan Harian Bab 2 Pecahan & Desimal"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Jenis Ujian</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="UTS">UTS (Tengah Semester)</option>
                    <option value="UAS">UAS (Akhir Semester)</option>
                    <option value="Kuis">Kuis Harian</option>
                    <option value="Tryout">Tryout</option>
                    <option value="Ujian Nasional">Ujian Kelulusan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Nilai</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tanggal Ujian</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Waktu Ujian</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="misal: 08:00 - 09:30"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Materi / Topik Diuji (Pisahkan Koma)</label>
                <input
                  type="text"
                  value={topicsStr}
                  onChange={(e) => setTopicsStr(e.target.value)}
                  placeholder="misal: Pecahan Senilai, Metamorfosis, Past Tense"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold"
                >
                  Simpan Ujian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
