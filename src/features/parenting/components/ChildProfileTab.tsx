import React, { useState } from 'react';
import { 
  Baby, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Heart, 
  GraduationCap, 
  Sparkles, 
  AlertTriangle,
  Target,
  FileText,
  User,
  ShieldAlert,
  Save,
  X
} from 'lucide-react';
import { Child } from '../types';

interface ChildProfileTabProps {
  childrenList: Child[];
  activeChildId: string;
  onSelectChild: (id: string) => void;
  onAddChild: (child: Omit<Child, 'id' | 'createdAt'>) => void;
  onUpdateChild: (id: string, child: Partial<Child>) => void;
  onDeleteChild: (id: string) => void;
}

export const ChildProfileTab: React.FC<ChildProfileTabProps> = ({
  childrenList,
  activeChildId,
  onSelectChild,
  onAddChild,
  onUpdateChild,
  onDeleteChild
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    birthDate: '2016-04-15',
    age: 10,
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    school: '',
    grade: '',
    bloodType: 'O+' as Child['bloodType'],
    allergiesStr: '',
    hobbiesStr: '',
    interestsStr: '',
    talentsStr: '',
    goalsStr: '',
    parentNotes: ''
  });

  const handleOpenAdd = () => {
    setEditingChild(null);
    setFormData({
      name: '',
      photo: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=250',
      birthDate: '2018-05-10',
      age: 8,
      gender: 'Laki-laki',
      school: 'SD Nusantara',
      grade: 'Kelas 3 SD',
      bloodType: 'O+',
      allergiesStr: '',
      hobbiesStr: 'Membaca, Bersepeda',
      interestsStr: 'Sains, Robotik',
      talentsStr: 'Matematika',
      goalsStr: 'Lancar Membaca',
      parentNotes: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (child: Child) => {
    setEditingChild(child);
    setFormData({
      name: child.name,
      photo: child.photo,
      birthDate: child.birthDate,
      age: child.age,
      gender: child.gender,
      school: child.school,
      grade: child.grade,
      bloodType: child.bloodType,
      allergiesStr: child.allergies.join(', '),
      hobbiesStr: child.hobbies.join(', '),
      interestsStr: child.interests.join(', '),
      talentsStr: child.talents.join(', '),
      goalsStr: child.goals.join(', '),
      parentNotes: child.parentNotes
    });
    setShowModal(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const childPayload = {
      familyId: 'fam-1',
      name: formData.name,
      photo: formData.photo || 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=250',
      birthDate: formData.birthDate,
      age: Number(formData.age),
      gender: formData.gender,
      school: formData.school,
      grade: formData.grade,
      bloodType: formData.bloodType,
      allergies: formData.allergiesStr ? formData.allergiesStr.split(',').map((s) => s.trim()) : [],
      hobbies: formData.hobbiesStr ? formData.hobbiesStr.split(',').map((s) => s.trim()) : [],
      interests: formData.interestsStr ? formData.interestsStr.split(',').map((s) => s.trim()) : [],
      talents: formData.talentsStr ? formData.talentsStr.split(',').map((s) => s.trim()) : [],
      goals: formData.goalsStr ? formData.goalsStr.split(',').map((s) => s.trim()) : [],
      parentNotes: formData.parentNotes
    };

    if (editingChild) {
      onUpdateChild(editingChild.id, childPayload);
    } else {
      onAddChild(childPayload);
    }

    setShowModal(false);
  };

  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0];

  return (
    <div className="space-y-6">
      {/* Top Header & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Baby className="w-5 h-5 text-pink-400" />
            <span>Profil Lengkap Buah Hati</span>
          </h2>
          <p className="text-xs text-slate-400">
            Kelola data identitas, pendidikan, minat, bakat, catatan medis & goal perkembangan anak.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Profil Anak Baru</span>
        </button>
      </div>

      {/* Child Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {childrenList.map((child) => {
          const isActive = child.id === activeChildId;
          return (
            <div
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden space-y-3 ${
                isActive
                  ? 'bg-slate-900 border-pink-500/50 ring-2 ring-pink-500/20 shadow-xl'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{child.name}</h3>
                    <span className="text-[11px] text-pink-400 font-semibold">{child.age} Tahun ({child.gender})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleOpenEdit(child)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {childrenList.length > 1 && (
                    <button
                      onClick={() => onDeleteChild(child.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sekolah:</span>
                  <span className="font-semibold text-white">{child.school}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kelas:</span>
                  <span className="font-semibold text-pink-300">{child.grade}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Child Details Overview */}
      {activeChild && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={activeChild.photo}
                alt={activeChild.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-500/40"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{activeChild.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                    {activeChild.age} Tahun
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    {activeChild.gender}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    Goldar: {activeChild.bloodType}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenEdit(activeChild)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-2xl transition-all"
            >
              <Edit3 className="w-4 h-4 text-pink-400" />
              <span>Edit Profil Anak</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* School & Basic Info */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Pendidikan & Identitas</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Tanggal Lahir:</span>
                  <span className="font-semibold text-white">{activeChild.birthDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Sekolah:</span>
                  <span className="font-semibold text-white">{activeChild.school}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Kelas:</span>
                  <span className="font-semibold text-pink-300">{activeChild.grade}</span>
                </div>
              </div>
            </div>

            {/* Health & Allergies */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Kesehatan & Alergi</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Golongan Darah:</span>
                  <span className="font-semibold text-white">{activeChild.bloodType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Catatan Alergi:</span>
                  {activeChild.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeChild.allergies.map((a, i) => (
                        <span key={i} className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-[10px] font-semibold">
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Tidak ada catatan alergi.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Hobbies & Talents */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Hobi, Minat & Bakat</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Hobi:</span>
                  <p className="font-semibold text-slate-200">{activeChild.hobbies.join(', ') || '-'}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Minat & Bakat:</span>
                  <p className="font-semibold text-purple-300">{activeChild.interests.join(', ')} / {activeChild.talents.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Target Perkembangan Anak</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeChild.goals.map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parent Notes */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Catatan Khusus Orang Tua</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{activeChild.parentNotes || 'Belum ada catatan khusus.'}"
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Modal Add/Edit Child Profile */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Baby className="w-5 h-5 text-pink-400" />
                <span>{editingChild ? 'Edit Profil Anak' : 'Tambah Profil Anak Baru'}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Nama Lengkap Anak</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                    placeholder="Nama Lengkap..."
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">URL Foto Profil</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Usia (Tahun)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Golongan Darah</label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Nama Sekolah</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                    placeholder="SD/TK Nusantara..."
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Kelas</label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                    placeholder="Kelas 5 SD..."
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Alergi (pisahkan koma)</label>
                <input
                  type="text"
                  value={formData.allergiesStr}
                  onChange={(e) => setFormData({ ...formData, allergiesStr: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  placeholder="Kacang tanah, Debu, Telur..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Hobi</label>
                  <input
                    type="text"
                    value={formData.hobbiesStr}
                    onChange={(e) => setFormData({ ...formData, hobbiesStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Minat & Bakat</label>
                  <input
                    type="text"
                    value={formData.interestsStr}
                    onChange={(e) => setFormData({ ...formData, interestsStr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Target / Goal Anak (pisahkan koma)</label>
                <input
                  type="text"
                  value={formData.goalsStr}
                  onChange={(e) => setFormData({ ...formData, goalsStr: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Catatan Khusus Orang Tua</label>
                <textarea
                  rows={3}
                  value={formData.parentNotes}
                  onChange={(e) => setFormData({ ...formData, parentNotes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none focus:border-pink-500"
                  placeholder="Catatan kebiasaan, stimulasi emosi..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Profil</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
