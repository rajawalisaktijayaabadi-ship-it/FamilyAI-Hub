import React, { useState } from 'react';
import {
  Code,
  Bot,
  Mic,
  Palette,
  Music,
  Video,
  Camera,
  PenTool,
  Globe,
  Sparkles,
  Plus,
  Trash2,
  Trophy,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';
import { SkillCategory, SkillLevel } from '../types';

const SKILL_CATEGORIES: SkillCategory[] = [
  'Coding',
  'Robotik',
  'Musik',
  'Desain',
  'Public Speaking',
  'Bahasa',
  'Menulis',
  'Menggambar',
  'Fotografi',
  'Video Editing',
  'Entrepreneurship'
];

interface SkillDevelopmentTabProps {
  childName: string;
}

export const SkillDevelopmentTab: React.FC<SkillDevelopmentTabProps> = ({ childName }) => {
  const { selectedChildId, skills, addSkill, updateSkillLevel } = useEducationStore();

  const childSkills = skills.filter((s) => s.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillName, setSkillName] = useState<SkillCategory>('Coding');
  const [level, setLevel] = useState<SkillLevel>('Pemula');
  const [projectsCount, setProjectsCount] = useState(1);
  const [certsCount, setCertsCount] = useState(0);
  const [notes, setNotes] = useState('');
  const [progressPercent, setProgressPercent] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill({
      childId: selectedChildId,
      skillName,
      level,
      projectsBuiltCount: projectsCount,
      certificatesEarnedCount: certsCount,
      notes,
      iconName: skillName === 'Coding' ? 'Code' : skillName === 'Robotik' ? 'Bot' : 'Sparkles',
      progressPercent
    });
    setIsModalOpen(false);
  };

  const getSkillIcon = (category: SkillCategory) => {
    switch (category) {
      case 'Coding':
        return <Code className="w-5 h-5 text-indigo-400" />;
      case 'Robotik':
        return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Public Speaking':
        return <Mic className="w-5 h-5 text-amber-400" />;
      case 'Desain':
      case 'Menggambar':
        return <Palette className="w-5 h-5 text-rose-400" />;
      case 'Musik':
        return <Music className="w-5 h-5 text-emerald-400" />;
      case 'Video Editing':
      case 'Fotografi':
        return <Video className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Pengembangan Keterampilan Masa Depan ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Lacak minat & skill non-akademik: Koding Scratch/Python, Robotik, Public Speaking, Seni, & Bahasa.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Skill Baru</span>
        </button>
      </div>

      {/* Skills Grid */}
      {childSkills.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Skill Terdaftar</p>
          <p className="text-xs text-slate-400">
            Daftarkan keterampilan minat bakat anak untuk mengukur portofolio karya.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {childSkills.map((sk) => (
            <div
              key={sk.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 shadow-lg space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                      {getSkillIcon(sk.skillName)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{sk.skillName}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                        Tingkat: {sk.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Penguasaan Tingkat</span>
                    <span className="font-bold text-indigo-300">{sk.progressPercent}%</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                      style={{ width: `${sk.progressPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{sk.projectsBuiltCount} Proyek Karya</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{sk.certificatesEarnedCount} Sertifikat</span>
                    </div>
                  </div>
                </div>

                {sk.notes && (
                  <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                    "{sk.notes}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Skill */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Tambah Skill / Minat Baru</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Bidang Keterampilan</label>
                <select
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value as SkillCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tingkat / Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as SkillLevel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Pemula">Pemula</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Lanjutan">Lanjutan</option>
                    <option value="Mahir">Mahir</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Progres (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={progressPercent}
                    onChange={(e) => setProgressPercent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Jumlah Proyek / Karya Selesai</label>
                  <input
                    type="number"
                    min={0}
                    value={projectsCount}
                    onChange={(e) => setProjectsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Sertifikat Diperoleh</label>
                  <input
                    type="number"
                    min={0}
                    value={certsCount}
                    onChange={(e) => setCertsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Catatan Portofolio & Progres</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="misal: Berhasil membuat 3 game mini Scratch dengan variabel skor..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Simpan Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
