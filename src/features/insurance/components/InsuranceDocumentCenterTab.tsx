import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Plus,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  X,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import { FamilyMember, DocumentCategoryType } from '../../../types';

interface InsuranceDocumentCenterTabProps {
  familyMembers: FamilyMember[];
}

export const InsuranceDocumentCenterTab: React.FC<InsuranceDocumentCenterTabProps> = ({
  familyMembers
}) => {
  const { insuranceDocuments, addDocument, deleteDocument, policies } = useInsuranceStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [showModal, setShowModal] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentCategoryType>('Kartu Peserta');
  const [policyId, setPolicyId] = useState('');
  const [memberName, setMemberName] = useState(familyMembers[0]?.name || '');
  const [notes, setNotes] = useState('');

  const docCategories: DocumentCategoryType[] = [
    'Polis',
    'Kartu Peserta',
    'Invoice',
    'Bukti Pembayaran',
    'Dokumen Klaim',
    'Surat Pendukung'
  ];

  const filteredDocs = insuranceDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.policyTitle && doc.policyTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategoryFilter === 'ALL' || doc.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setTitle('');
    setCategory('Kartu Peserta');
    setPolicyId(policies[0]?.id || '');
    setMemberName(familyMembers[0]?.name || '');
    setNotes('');
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const pol = policies.find((p) => p.id === policyId);
    const policyTitle = pol ? pol.title : 'Umum / Lainnya';

    addDocument({
      title,
      category,
      policyId,
      policyTitle,
      memberName,
      fileUrl: '#',
      fileType: 'application/pdf',
      notes
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dokumen, polis, atau kartu..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-2xl px-3 py-2.5 outline-none focus:border-cyan-500"
          >
            <option value="ALL">Semua Dokumen</option>
            {docCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Unggah Dokumen Asuransi</span>
          </button>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                  {doc.category}
                </span>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 rounded-xl transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-cyan-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-snug">{doc.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Anggota: <span className="text-slate-200">{doc.memberName}</span>
                  </p>
                </div>
              </div>

              {doc.policyTitle && (
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  Polis Terkait: <span className="font-medium text-cyan-300">{doc.policyTitle}</span>
                </div>
              )}

              {doc.notes && (
                <p className="text-[11px] text-slate-400 italic">
                  "{doc.notes}"
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Tgl Unggah: {doc.uploadDate}</span>
              <button
                onClick={() => alert(`Membuka file digital: ${doc.title}`)}
                className="text-cyan-400 hover:underline font-bold flex items-center gap-1"
              >
                Buka File <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                <span>Unggah Dokumen / Kartu Peserta</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Judul Dokumen:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="misal: e-Card BPJS Digital Ayah / Kuitansi RS"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Kategori Dokumen:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocumentCategoryType)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    {docCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Anggota Pemilik:</label>
                  <select
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Polis Terkait (Opsional):</label>
                <select
                  value={policyId}
                  onChange={(e) => setPolicyId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                >
                  <option value="">-- Tidak Dikaitkan --</option>
                  {policies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.policyNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Catatan Tambahan:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Informasi penting pada dokumen..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Simpan Ke Vault Dokumen
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
