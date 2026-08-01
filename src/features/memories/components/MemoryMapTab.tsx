import React from 'react';
import { MapPin, Camera, Navigation, FolderHeart, ExternalLink } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';

export const MemoryMapTab: React.FC = () => {
  const { mapLocations, setSelectedAlbumId, setActiveTab } = useMemoryStore();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-rose-400" />
          <span>Memory Map - Peta Perjalanan Keluarga</span>
        </h2>
        <p className="text-xs text-slate-400">
          Visualisasi geografis titik-titik lokasi wisata dan momen berharga keluarga di berbagai kota dan pulau
        </p>
      </div>

      {/* Interactive Map Visual Mockup */}
      <div className="relative h-96 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Floating Map Pin Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {mapLocations.map((loc) => (
            <div 
              key={loc.id} 
              className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-2xl space-y-3 hover:border-rose-500/60 transition-all group cursor-pointer"
              onClick={() => {
                setSelectedAlbumId(loc.albumId);
                setActiveTab('albums');
              }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <MapPin className="w-4 h-4 text-rose-400 animate-bounce" />
                  {loc.locationName}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                  {loc.date}
                </span>
              </div>

              <div className="h-32 rounded-xl overflow-hidden relative">
                <img src={loc.coverPhotoUrl} alt={loc.locationName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-fuchsia-300 border border-slate-800 flex items-center gap-1">
                  <Camera className="w-3 h-3" /> {loc.photoCount} Foto
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold">{loc.albumName}</span>
                <ExternalLink className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
