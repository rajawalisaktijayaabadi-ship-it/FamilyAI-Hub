import React, { useState } from 'react';
import { FileText, Plus, Trash2, Folder, ShieldCheck, Download, Search } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';

export const FinancialDocumentTab: React.FC = () => {
  const { financialDocuments, addFinancialDocument, deleteFinancialDocument } = useFinanceStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Sertifikat' | 'Polis Asuransi' | 'BPKB' | 'Pajak' | 'Kontrak KPR' | 'Lainnya'>('Sertifikat');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('2024-01-01');
  const [expiryDate, setExpiryDate] = useState('2030-12-31');
  const [notes, setNotes] = useState('');

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addFinancialDocument({
      title,
      category,
      documentNumber,
      issueDate,
      expiryDate,
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const filteredDocs = financialDocuments.filter((doc) => {
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Pusat Dokumen Keuangan & Asuransi (Document Vault)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Arsip aman sertifikat tanah/rumah, BPKB, polis asuransi, dan dokumen pajak.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Arsipkan Dokumen</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama dokumen atau nomor sertifikat..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">Semua Kategori Dokumen</option>
          <option value="Sertifikat">Sertifikat Tanah / Rumah</option>
          <option value="Polis Asuransi">Polis Asuransi</option>
          <option value="BPKB">BPKB Kendaraan</option>
          <option value="Pajak">SPT / Pajak</option>
          <option value="Kontrak KPR">Kontrak KPR / Akad</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 space-y-3 relative group transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] bg-slate-950 text-indigo-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                  {doc.category}
                </span>
                <h4 className="font-bold text-white text-base mt-1.5">{doc.title}</h4>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">No: {doc.documentNumber}</div>
              </div>

              <button
                onClick={() => deleteFinancialDocument(doc.id)}
                className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-800/60">
              <div>Tanggal Terbit: <strong className="text-slate-200">{doc.issueDate}</strong></div>
              {doc.expiryDate && <div>Masa Berlaku: <strong className="text-amber-300">{doc.expiryDate}</strong></div>}
            </div>

            {doc.notes && <div className="text-[11px] text-slate-500 italic">"{doc.notes}"</div>}
          </div>
        ))}
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Arsipkan Dokumen Keuangan Baru</h3>

            <form onSubmit={handleAddDoc} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Dokumen / Berkas:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Sertifikat Hak Milik Rumah Cilandak"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Kategori:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Sertifikat">Sertifikat Tanah / Rumah</option>
                    <option value="Polis Asuransi">Polis Asuransi</option>
                    <option value="BPKB">BPKB Kendaraan</option>
                    <option value="Pajak">SPT / Pajak</option>
                    <option value="Kontrak KPR">Kontrak KPR / Akad</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Nomor Dokumen / Registrasi:</label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="SHM-123456"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Terbit / Akad:</label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Masa Berlaku (Opsional):</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Lokasi Penyimpanan Fisik:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="misal: Disimpan di Safe Deposit Box Bank Mandiri"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                >
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
