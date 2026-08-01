import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Calculator,
  FlaskConical,
  Globe,
  Code,
  BookOpenText,
  User,
  Phone,
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { Subject, SubjectCategory } from '../types';

const CATEGORIES: SubjectCategory[] = [
  'Matematika',
  'IPA',
  'IPS',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Agama',
  'PPKn',
  'Seni',
  'Olahraga',
  'Komputer',
  'Coding',
  'Robotik',
  'Bahasa Asing',
  'Lainnya'
];

interface SubjectManagementTabProps {
  childName: string;
}

export const SubjectManagementTab: React.FC<SubjectManagementTabProps> = ({ childName }) => {
  const { selectedChildId, subjects, addSubject, updateSubject, deleteSubject } = useEducationStore();
  const childSubjects = subjects.filter((s) => s.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SubjectCategory>('Matematika');
  const [teacherName, setTeacherName] = useState('');
  const [teacherContact, setTeacherContact] = useState('');
  const [targetGrade, setTargetGrade] = useState(90);
  const [currentGrade, setCurrentGrade] = useState(85);
  const [scheduleDays, setScheduleDays] = useState<string[]>(['Senin', 'Rabu']);
  const [notes, setNotes] = useState('');

  const openAddModal = () => {
    setEditingSubject(null);
    setName('');
    setCategory('Matematika');
    setTeacherName('');
    setTeacherContact('');
    setTargetGrade(90);
    setCurrentGrade(85);
    setScheduleDays(['Senin', 'Rabu']);
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (sub: Subject) => {
    setEditingSubject(sub);
    setName(sub.name);
    setCategory(sub.category);
    setTeacherName(sub.teacherName);
    setTeacherContact(sub.teacherContact || '');
    setTargetGrade(sub.targetGrade);
    setCurrentGrade(sub.currentGrade);
    setScheduleDays(sub.scheduleDays || ['Senin']);
    setNotes(sub.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      updateSubject(editingSubject.id, {
        name,
        category,
        teacherName,
        teacherContact,
        targetGrade,
        currentGrade,
        scheduleDays,
        notes
      });
    } else {
      addSubject({
        childId: selectedChildId,
        name,
        category,
        teacherName,
        teacherContact,
        targetGrade,
        currentGrade,
        iconName: category === 'Matematika' ? 'Calculator' : category === 'Coding' ? 'Code' : 'BookOpen',
        scheduleDays,
        attendanceRate: 98,
        notes
      });
    }
    setIsModalOpen(false);
  };

  const toggleDay = (day: string) => {
    if (scheduleDays.includes(day)) {
      setScheduleDays(scheduleDays.filter((d) => d !== day));
    } else {
      setScheduleDays([...scheduleDays, day]);
    }
  };

  const getCategoryBadgeColor = (cat: SubjectCategory) => {
    switch (cat) {
      case 'Matematika':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'IPA':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Bahasa Inggris':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Coding':
      case 'Komputer':
      case 'Robotik':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Daftar Kurikulum & Mata Pelajaran ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Kelola mata pelajaran, guru pengampu, target nilai rapor, dan pencapaian siswa.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mata Pelajaran</span>
        </button>
      </div>

      {/* Grid of Subjects */}
      {childSubjects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Mata Pelajaran</p>
          <p className="text-xs text-slate-400">
            Daftarkan mata pelajaran sekolah anak untuk memantau nilai & tugas PR.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
          >
            Tambah Mata Pelajaran Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {childSubjects.map((subject) => {
            const isAchieved = subject.currentGrade >= subject.targetGrade;
            return (
              <div
                key={subject.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryBadgeColor(
                        subject.category
                      )}`}
                    >
                      {subject.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(subject)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSubject(subject.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{subject.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{subject.teacherName || 'Guru Pengampu'}</span>
                    </p>
                  </div>

                  {/* Grades Meter */}
                  <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Nilai Rapor Saat Ini</span>
                      <span className="font-bold text-white text-sm">{subject.currentGrade} <span className="text-[10px] text-slate-500">/ 100</span></span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isAchieved ? 'bg-emerald-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${Math.min(100, subject.currentGrade)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Target Rapor:</span>
                      <span className="font-semibold text-indigo-300">{subject.targetGrade}</span>
                    </div>
                  </div>

                  {/* Days & Attendance */}
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Hari Kelas:</span>
                      </span>
                      <span className="text-white font-medium">
                        {subject.scheduleDays?.join(', ') || 'Senin'}
                      </span>
                    </div>
                    {subject.teacherContact && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>Kontak Guru:</span>
                        </span>
                        <span className="text-indigo-300 font-mono text-[11px]">{subject.teacherContact}</span>
                      </div>
                    )}
                  </div>

                  {subject.notes && (
                    <p className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 italic">
                      "{subject.notes}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="misal: Matematika & Logika"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SubjectCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nama Guru Pengampu</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="misal: Bpk. Hendra, S.Pd."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nilai Rapor Saat Ini</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Target Nilai Rapor</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Kontak WhatsApp Guru (Opsional)</label>
                <input
                  type="text"
                  value={teacherContact}
                  onChange={(e) => setTeacherContact(e.target.value)}
                  placeholder="misal: +62 812-3456-7890"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Hari Jadwal Sekolah</label>
                <div className="flex flex-wrap gap-2">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((day) => {
                    const isSelected = scheduleDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Catatan Khusus MP</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="misal: Perlu perhatian ekstra di bab pecahan desimal..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
