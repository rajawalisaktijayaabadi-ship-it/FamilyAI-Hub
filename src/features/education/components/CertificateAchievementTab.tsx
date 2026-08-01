import React, { useState } from 'react';
import { Award, Trophy, Plus, Trash2, Medal, CheckCircle2, Star } from 'lucide-react';
import { useEducationStore } from '../../../store/useEducationStore';

interface CertificateAchievementTabProps {
  childName: string;
}

export const CertificateAchievementTab: React.FC<CertificateAchievementTabProps> = ({ childName }) => {
  const { selectedChildId, certificates, addCertificate } = useEducationStore();

  const childCerts = certificates.filter((c) => c.childId === selectedChildId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Akademik' | 'Olimpiade' | 'Seni' | 'Olahraga' | 'Keterampilan' | 'Karakter'>('Olimpiade');
  const [issuer, setIssuer] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCertificate({
      childId: selectedChildId,
      title,
      category,
      issuer,
      dateReceived: dateReceived || new Date().toISOString().split('T')[0],
      description
    });
    setIsModalOpen(false);
    setTitle('');
    setIssuer('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Galeri Sertifikat & Penghargaan Akademik ({childName})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Arsip digital sertifikat kelulusan, piagam olimpiade, seni, & piagam karakter siswa.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Sertifikat Baru</span>
        </button>
      </div>

      {/* Certificates Grid */}
      {childCerts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <Award className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">Belum Ada Sertifikat Disimpan</p>
          <p className="text-xs text-slate-400">
            Simpan piagam penghargaan sekolah atau perlombaan untuk portofolio pendidikan anak.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {cert.category}
                </span>
                <span className="text-[11px] text-slate-400">{cert.dateReceived}</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30 text-amber-300 shrink-0">
                  <Medal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Penerbit: {cert.issuer}</p>
                </div>
              </div>

              {cert.description && (
                <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  {cert.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Tambah Sertifikat / Penghargaan</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Judul Sertifikat / Piagam</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="misal: Juara 2 Lomba Matematika Cilik"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Olimpiade">Olimpiade</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Seni">Seni</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Keterampilan">Keterampilan</option>
                    <option value="Karakter">Karakter</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Penyelenggara / Penerbit</label>
                  <input
                    type="text"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    required
                    placeholder="misal: Dinas Pendidikan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Tanggal Diperoleh</label>
                <input
                  type="date"
                  value={dateReceived}
                  onChange={(e) => setDateReceived(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Deskripsi Singkat</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Detail pencapaian..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
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
                  Simpan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
