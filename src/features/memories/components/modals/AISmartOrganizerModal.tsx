import React, { useState } from 'react';
import { X, Zap, Calendar, MapPin, User, Sparkles, CopyCheck } from 'lucide-react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { MemoryService } from '../../services/memoryService';

interface AISmartOrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISmartOrganizerModal: React.FC<AISmartOrganizerModalProps> = ({ isOpen, onClose }) => {
  const { photos } = useMemoryStore();
  const [groupType, setGroupType] = useState<'date' | 'event' | 'member' | 'location'>('event');

  if (!isOpen) return null;

  const grouped = MemoryService.autoGroupMedia(photos, groupType);
  const duplicates = MemoryService.detectDuplicates(photos);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">AI Smart Organizer</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Group By Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Pengelompokan Otomatis Berdasarkan:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setGroupType('event')}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                groupType === 'event' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Event / Acara
            </button>
            <button
              onClick={() => setGroupType('date')}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                groupType === 'date' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Tanggal / Bulan
            </button>
            <button
              onClick={() => setGroupType('member')}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                groupType === 'member' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Tag Anggota
            </button>
            <button
              onClick={() => setGroupType('location')}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                groupType === 'location' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> Lokasi Perjalanan
            </button>
          </div>
        </div>

        {/* Grouped Results */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([key, items]) => (
            <div key={key} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h4 className="font-bold text-white text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {key}
                </h4>
                <span className="text-[10px] text-slate-400">{items.length} Foto</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {items.map(p => (
                  <img key={p.id} src={p.imageUrl} alt={p.caption} className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate Detection Placeholder */}
        <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
            <CopyCheck className="w-4 h-4 text-indigo-400" />
            <span>AI Duplicate Photo Detection Placeholder</span>
          </div>
          <p className="text-xs text-slate-300">
            Terdeteksi {duplicates.length} pasang foto dengan kemiripan tinggi. AI menyarankan opsi penggabungan untuk menghemat penyimpanan.
          </p>
        </div>

      </div>
    </div>
  );
};
