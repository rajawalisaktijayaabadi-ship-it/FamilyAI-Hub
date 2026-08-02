import React, { useState, useEffect } from 'react';
import { School, GraduationCap, UserCheck, Sparkles, Save, Plus, Trash2, BookOpen, Target, Heart } from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface ChildEducationProfileTabProps {
  childName: string;
}

export const ChildEducationProfileTab: React.FC<ChildEducationProfileTabProps> = ({ childName }) => {
  const { selectedChildId, profiles, updateProfile } = useEducationStore();
  const currentProfile = profiles[selectedChildId];

  const [schoolName, setSchoolName] = useState(currentProfile?.schoolName || 'Sekolah Nusantara');
  const [grade, setGrade] = useState(currentProfile?.grade || 'SD / SMA');
  const [semester, setSemester] = useState(currentProfile?.semester || 'Semester 1 (2026/2027)');
  const [nisn, setNisn] = useState(currentProfile?.nisn || '');
  const [homeroomTeacher, setHomeroomTeacher] = useState(currentProfile?.homeroomTeacher || '');
  const [specialNotes, setSpecialNotes] = useState(currentProfile?.specialNotes || '');

  const [favSubjects, setFavSubjects] = useState<string[]>(currentProfile?.favoriteSubjects || ['Matematika', 'Coding']);
  const [newFav, setNewFav] = useState('');

  const [extracurriculars, setExtracurriculars] = useState<string[]>(currentProfile?.extracurriculars || ['Pramuka']);
  const [newExtra, setNewExtra] = useState('');

  const [goals, setGoals] = useState<string[]>(currentProfile?.academicGoals || ['Nilai Rapor ≥ 90']);
  const [newGoal, setNewGoal] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentProfile) {
      setSchoolName(currentProfile.schoolName || 'Sekolah Nusantara');
      setGrade(currentProfile.grade || 'SD / SMA');
      setSemester(currentProfile.semester || 'Semester 1 (2026/2027)');
      setNisn(currentProfile.nisn || '');
      setHomeroomTeacher(currentProfile.homeroomTeacher || '');
      setSpecialNotes(currentProfile.specialNotes || '');
      setFavSubjects(currentProfile.favoriteSubjects || ['Matematika', 'Coding']);
      setExtracurriculars(currentProfile.extracurriculars || ['Pramuka']);
      setGoals(currentProfile.academicGoals || ['Nilai Rapor ≥ 90']);
    }
  }, [selectedChildId, currentProfile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(selectedChildId, {
      schoolName,
      grade,
      semester,
      nisn,
      homeroomTeacher,
      specialNotes,
      favoriteSubjects: favSubjects,
      extracurriculars,
      academicGoals: goals
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addFavSubject = () => {
    if (newFav.trim() && !favSubjects.includes(newFav.trim())) {
      setFavSubjects([...favSubjects, newFav.trim()]);
      setNewFav('');
    }
  };

  const removeFavSubject = (item: string) => {
    setFavSubjects(favSubjects.filter((f) => f !== item));
  };

  const addExtra = () => {
    if (newExtra.trim() && !extracurriculars.includes(newExtra.trim())) {
      setExtracurriculars([...extracurriculars, newExtra.trim()]);
      setNewExtra('');
    }
  };

  const removeExtra = (item: string) => {
    setExtracurriculars(extracurriculars.filter((e) => e !== item));
  };

  const addGoal = () => {
    if (newGoal.trim() && !goals.includes(newGoal.trim())) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const removeGoal = (item: string) => {
    setGoals(goals.filter((g) => g !== item));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-2xl border border-indigo-500/30">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Profil Sekolah & Akademik: {childName}</h2>
              <p className="text-xs text-slate-400">Atur informasi instansi sekolah, wali kelas, serta target akademik anak.</p>
            </div>
          </div>

          {savedSuccess && (
            <div className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold animate-fade-in">
              Profil berhasil disimpan!
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nama Instansi Sekolah</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="misal: SD Nusantara Utama"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Jenjang / Kelas</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="misal: Kelas 5 SD / TK B"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Semester & Tahun Ajaran</label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="misal: Semester 1 (2026/2027)"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nomor Induk / NISN</label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="misal: 0129384756"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Nama Wali Kelas & Kontak</label>
              <input
                type="text"
                value={homeroomTeacher}
                onChange={(e) => setHomeroomTeacher(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="misal: Bpk. Hendra Wijaya, S.Pd. (+62 812-3456-7890)"
              />
            </div>
          </div>

          {/* Favorite Subjects Tags */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Mata Pelajaran / Bidang Favorit</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {favSubjects.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-xl text-xs flex items-center gap-1.5">
                  <span>{item}</span>
                  <button type="button" onClick={() => removeFavSubject(item)} className="hover:text-white">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                value={newFav}
                onChange={(e) => setNewFav(e.target.value)}
                placeholder="Tambah MP favorit..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="button"
                onClick={addFavSubject}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Extracurriculars */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Kegiatan Ekstrakurikuler & Klub</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {extracurriculars.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs flex items-center gap-1.5">
                  <span>{item}</span>
                  <button type="button" onClick={() => removeExtra(item)} className="hover:text-white">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                value={newExtra}
                onChange={(e) => setNewExtra(e.target.value)}
                placeholder="Tambah ekstrakurikuler..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="button"
                onClick={addExtra}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Academic Goals */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Akademik Semester Ini</span>
            </label>
            <div className="space-y-1.5">
              {goals.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                  <span>• {item}</span>
                  <button type="button" onClick={() => removeGoal(item)} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Tambah target (misal: Nilai Rapor ≥ 90)..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="button"
                onClick={addGoal}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>
          </div>

          {/* Special Notes */}
          <div className="space-y-1.5 border-t border-slate-800 pt-4">
            <label className="text-xs font-semibold text-slate-300">Catatan Khusus Gaya Belajar Anak</label>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="misal: Belajar lebih cepat jika menggunakan contoh animasi visual atau benda konkret..."
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil Sekolah</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
