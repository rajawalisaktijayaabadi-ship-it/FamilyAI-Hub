import React, { useState } from 'react';
import { X, Printer, FileDown, Play, Camera, Sparkles, Check } from 'lucide-react';
import { useMemoryStore } from '../../stores/useMemoryStore';

interface PhotoBookExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoBookExportModal: React.FC<PhotoBookExportModalProps> = ({ isOpen, onClose }) => {
  const { albums, photos } = useMemoryStore();
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0]?.id || '');
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowIdx, setSlideshowIdx] = useState(0);

  if (!isOpen) return null;

  const activeAlbumPhotos = photos.filter(p => p.albumId === selectedAlbumId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Photo Book Export & Cetak Album</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Album Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 block">Pilih Album Yang Ingin Dibuat Photo Book:</label>
          <select
            value={selectedAlbumId}
            onChange={(e) => setSelectedAlbumId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-3 rounded-2xl text-xs text-white outline-none"
          >
            {albums.map(a => (
              <option key={a.id} value={a.id}>{a.name} ({a.photoCount} foto)</option>
            ))}
          </select>
        </div>

        {/* Slideshow Player if active */}
        {isSlideshow && activeAlbumPhotos.length > 0 ? (
          <div className="space-y-3 bg-black p-4 rounded-2xl border border-slate-800">
            <div className="h-64 relative flex items-center justify-center overflow-hidden">
              <img 
                src={activeAlbumPhotos[slideshowIdx]?.imageUrl} 
                alt="Slideshow" 
                className="max-h-64 w-auto object-contain animate-pulse"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{activeAlbumPhotos[slideshowIdx]?.caption}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSlideshowIdx((slideshowIdx + 1) % activeAlbumPhotos.length)}
                  className="px-3 py-1 bg-cyan-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Lanjut →
                </button>
                <button
                  onClick={() => setIsSlideshow(false)}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Tutup Slideshow
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Export Options Grid */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => alert('Voucher Cetak Album Hardcover dikirim ke email keluarga!')}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500 rounded-2xl text-left space-y-2 transition-all cursor-pointer group"
            >
              <Printer className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-xs">Cetak Hardcover</h4>
              <p className="text-[10px] text-slate-400">Order cetak fisik album kenangan</p>
            </button>

            <button
              onClick={() => alert('PDF Photo Book HD siap diunduh!')}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-fuchsia-500 rounded-2xl text-left space-y-2 transition-all cursor-pointer group"
            >
              <FileDown className="w-5 h-5 text-fuchsia-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-xs">Export PDF HD</h4>
              <p className="text-[10px] text-slate-400">Unduh PDF tata letak album</p>
            </button>

            <button
              onClick={() => setIsSlideshow(true)}
              className="p-4 bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-2xl text-left space-y-2 transition-all cursor-pointer group"
            >
              <Play className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-xs">Slideshow Player</h4>
              <p className="text-[10px] text-slate-400">Putar presentasi slide foto</p>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
