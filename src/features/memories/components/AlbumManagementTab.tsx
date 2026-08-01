import React, { useState } from 'react';
import { 
  FolderHeart, 
  Plus, 
  Search, 
  MapPin, 
  Lock, 
  Users, 
  Globe, 
  Trash2, 
  Edit3, 
  Camera, 
  Video, 
  Sparkles,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { MemoryAlbum, MemoryAlbumCategory } from '../../../types/memories';

const CATEGORIES: (MemoryAlbumCategory | 'Semua')[] = [
  'Semua', 'Liburan', 'Ulang Tahun', 'Anniversary', 'Wisuda', 
  'Sekolah', 'Bayi', 'Keluarga', 'Perjalanan', 'Acara', 'Olahraga', 'Hewan Peliharaan'
];

interface AlbumManagementTabProps {
  onOpenAlbumModal: () => void;
}

export const AlbumManagementTab: React.FC<AlbumManagementTabProps> = ({
  onOpenAlbumModal
}) => {
  const { albums, setSelectedAlbumId, selectedAlbumId, photos, videos, deleteAlbum } = useMemoryStore();
  const [albumSearch, setAlbumSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua');

  const filteredAlbums = albums.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(albumSearch.toLowerCase()) ||
                          a.location.toLowerCase().includes(albumSearch.toLowerCase());
    const matchesCategory = selectedCat === 'Semua' || a.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  const activeAlbum = albums.find(a => a.id === selectedAlbumId);
  const albumPhotos = photos.filter(p => p.albumId === selectedAlbumId);
  const albumVideos = videos.filter(v => v.albumId === selectedAlbumId);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FolderHeart className="w-6 h-6 text-amber-400" />
              <span>Manajemen Album Foto Keluarga</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Kelola koleksi album liburan, ulang tahun, wisuda, hingga anniversary pernikahan
            </p>
          </div>

          <button
            onClick={onOpenAlbumModal}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Album Baru</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={albumSearch}
              onChange={(e) => setAlbumSearch(e.target.value)}
              placeholder="Cari nama album atau lokasi..."
              className="w-full bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 rounded-2xl text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-thin">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Album View or Albums Grid */}
      {selectedAlbumId && activeAlbum ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  {activeAlbum.category}
                </span>
                <span className="text-xs text-slate-400">{activeAlbum.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{activeAlbum.name}</h3>
              <p className="text-xs text-slate-300">{activeAlbum.description}</p>
            </div>

            <button
              onClick={() => setSelectedAlbumId(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" /> Tutup Album
            </button>
          </div>

          {/* Photos inside album */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-fuchsia-400" />
              <span>Foto & Video Dalam Album Ini ({albumPhotos.length + albumVideos.length})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {albumPhotos.map((pho) => (
                <div key={pho.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group">
                  <div className="h-44 relative">
                    <img src={pho.imageUrl} alt={pho.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-xs font-bold text-white leading-snug">{pho.caption}</p>
                    <span className="text-[10px] text-slate-400 block">{pho.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Albums Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <div 
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={album.coverUrl} 
                  alt={album.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-slate-800">
                    {album.category}
                  </span>
                  {album.isAchievementAlbum && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" /> Prestasi
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-bold border border-slate-800 flex items-center gap-1">
                  {album.visibility === 'Private' && <Lock className="w-3 h-3 text-rose-400" />}
                  {album.visibility === 'Family' && <Users className="w-3 h-3 text-indigo-400" />}
                  {album.visibility === 'Shared' && <Globe className="w-3 h-3 text-emerald-400" />}
                  <span>{album.visibility}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                  <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800">
                    <span className="flex items-center gap-1"><Camera className="w-3 h-3 text-fuchsia-400" /> {album.photoCount}</span>
                    <span className="flex items-center gap-1"><Video className="w-3 h-3 text-purple-400" /> {album.videoCount}</span>
                  </div>
                  <span className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800">{album.date}</span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    {album.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {album.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-rose-400" /> {album.location}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAlbum(album.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                    title="Hapus Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
