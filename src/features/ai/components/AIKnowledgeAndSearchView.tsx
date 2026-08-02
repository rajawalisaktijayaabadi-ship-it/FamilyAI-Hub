import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { AISearchResult } from '../../../types/aiSuperAssistant';

export const AIKnowledgeAndSearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  
  const mockSearchResults: AISearchResult[] = [
    { id: 's-1', module: 'Finance', title: 'Tagihan Asuransi Kesehatan', subtitle: 'Rp 1.250.000 Jatuh Tempo 2 Agustus 2026', date: '2026-08-01', snippet: 'Rincian pembayaran premi asuransi keluarga Sastro untuk perlindungan rawat inap.', deepLinkTab: 'insurance' },
    { id: 's-2', module: 'Travel', title: 'Rencana Liburan Semester Bali', subtitle: 'Anggaran Rp 15.000.000', date: '2026-07-28', snippet: 'Rencana pemesanan tiket penerbangan & penginapan ramah anak di Kuta.', deepLinkTab: 'travel' },
    { id: 's-3', module: 'Memories', title: 'Album Foto Liburan Bali 2025', subtitle: '42 Foto Terimpan', date: '2026-07-15', snippet: 'Kumpulan foto keluarga saat menikmati sunset di Pantai Tanah Lot.', deepLinkTab: 'memories' },
    { id: 's-4', module: 'Education', title: 'Nilai Kuis Matematika Anak', subtitle: 'Nilai Akhir: 88 (Sangat Baik)', date: '2026-07-20', snippet: 'Hasil kuis latihan aljabar dasar dan geometri anak tingkat SD.', deepLinkTab: 'education' }
  ];

  const filteredResults = query.trim() 
    ? mockSearchResults.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.snippet.toLowerCase().includes(query.toLowerCase()) ||
        r.module.toLowerCase().includes(query.toLowerCase())
      )
    : mockSearchResults;

  const faqs = [
    { q: 'Bagaimana cara AI membantu menghemat anggaran belanja keluarga?', a: 'AI membaca inventaris kulkas, mendeteksi tanggal kedaluwarsa, dan merekomendasikan resep memasak bahan yang ada sebelum membeli bahan baru.' },
    { q: 'Apakah data keuangan dan riwayat kesehatan keluarga aman?', a: 'Ya, seluruh data tersimpan dengan enkripsi tingkat enterprise (AES-256) dan dilindungi oleh Firebase Security Rules & Authentication Guard.' },
    { q: 'Bagaimana AI mendeteksi mood dan memberikan saran psikologi?', a: 'AI menggunakan multimodal analisis jurnal harian, ekspresi emosi, dan nada suara untuk merekomendasikan saran pengasuhan empati.' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Global Search Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-400" />
            <span>AI Global Search & Knowledge Center</span>
          </h3>
          <p className="text-xs text-slate-400">
            Cari lintas seluruh 16 modul keluarga sekaligus: tagihan, resep, nilai anak, foto memori, hingga dokumen.
          </p>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata kunci: 'Tagihan', 'Liburan', 'Album Bali', 'Nilai Matematika'..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Hasil Pencarian Lintas Modul ({filteredResults.length}):</span>
          <span className="text-indigo-400">Real-Time Indexing Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-2.5 hover:border-indigo-500/50 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Modul: {item.module}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <h4 className="font-extrabold text-white text-base">{item.title}</h4>
                <p className="text-xs text-amber-300 font-semibold">{item.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.snippet}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  onClick={() => alert(`Membuka tautan langsung modul: ${item.deepLinkTab}`)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                >
                  <span>Buka di Modul</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base & FAQ */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h4 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Family Knowledge Base & Panduan AI</span>
        </h4>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
              <h5 className="font-bold text-white text-xs flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{faq.q}</span>
              </h5>
              <p className="text-xs text-slate-300 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
