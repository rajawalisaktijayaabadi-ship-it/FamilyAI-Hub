import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Calendar, 
  User, 
  Lock,
  Download,
  X
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { TravelDocType } from '../../../types/travel';

export const docTypeList: TravelDocType[] = [
  'Paspor',
  'Visa',
  'Tiket',
  'Voucher',
  'Booking',
  'Asuransi Perjalanan',
  'Dokumen Penting'
];

export const TravelDocumentCenterTab: React.FC = () => {
  const { documents, addDocument, deleteDocument } = useTravelStore();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState<string>('');
  const [docType, setDocType] = useState<TravelDocType>('Paspor');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDocument({
      title,
      docType,
      fileUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      ownerMemberId: 'mem-1',
      expiryDate,
      notes
    });

    setTitle('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
            Encrypted Travel Document Vault
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Pusat Dokumen & Tiket Perjalanan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simpan paspor, visa, e-ticket, voucher hotel, dan polis asuransi perjalanan dengan aman.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Dokumen</span>
        </button>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase">
                  {doc.docType}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Terenkripsi
                </span>
              </div>

              <h3 className="font-bold text-white text-sm">{doc.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{doc.notes}</p>

              {doc.expiryDate && (
                <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Masa Berlaku: {doc.expiryDate}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Lihat Dokumen</span>
              </a>

              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddDoc} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Upload Dokumen Perjalanan</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="mis. Paspor Kakek Subroto"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Jenis Dokumen</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  >
                    {docTypeList.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Masa Kadaluarsa</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Catatan / Keterangan</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="mis. Simpan salinan di HP Ayah"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Ke Vault
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
