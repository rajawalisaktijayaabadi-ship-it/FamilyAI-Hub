import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Camera, 
  Video, 
  Heart, 
  MapPin, 
  Tag, 
  User, 
  Plus, 
  Trash2, 
  Share2, 
  Eye, 
  X,
  Sparkles
} from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { MemoryPhoto, MemoryVideo, MemoryAlbumCategory } from '../../../types/memories';

const CATEGORIES: (MemoryAlbumCategory | 'Semua')[] = [
  'Semua', 'Liburan', 'Ulang Tahun', 'Anniversary', 'Wisuda', 
  'Sekolah', 'Bayi', 'Keluarga', 'Perjalanan', 'Acara', 'Olahraga', 'Hewan Peliharaan'
];

const MEMBER_TAGS = ['Semua', 'Ayah', 'Ibu', 'Budi', 'Siti', 'Anak', 'Lansia', 'Hewan Peliharaan', 'Teman'];

interface GalleryTabProps {
  onOpenUploadModal: () => void;
  onOpenShareModal: (title: string, url: string) => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({
  onOpenUploadModal,
  onOpenShareModal
}) => {
  const { 
    photos, 
    videos, 
    searchQuery, 
    setSearchQuery, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    selectedTagFilter,
    setSelectedTagFilter,
    likePhoto,
    toggleFavoritePhoto,
    deletePhoto,
    deleteVideo,
    toggleFavoriteVideo
  } = useMemoryStore();

  const [activeMediaType, setActiveMediaType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<MemoryPhoto | null>(null);

  // Filter items
  const filteredPhotos = photos.filter(p => {
    const matchesSearch = p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'Semua' || p.category === selectedCategoryFilter;
    const matchesTag = selectedTagFilter === 'Semua' || p.taggedMemberIds.includes(selectedTagFilter);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const filteredVideos = videos.filter(v => {
    const matchesSearch = v.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTagFilter === 'Semua' || v.taggedMemberIds.includes(selectedTagFilter);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Camera className="w-6 h-6 text-fuchsia-400" />
              <span>Galeri Foto & Video Keluarga</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tampilan Pinterest Grid interaktif dengan pencarian lokasi, tanggal, dan tagging anggota keluarga
            </p>
          </div>

          <button
            onClick={onOpenUploadModal}
            className="px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Unggah Kenangan Baru</span>
          </button>
        </div>

        {/* Search & Media Type Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, deskripsi, lokasi..."
              className="w-full bg-slate-950 border border-slate-800 pl-10 pr-4 py-2.5 rounded-2xl text-xs text-white placeholder-slate-500 outline-none focus:border-fuchsia-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 border border-slate-800 rounded-2xl shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveMediaType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMediaType === 'all' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua Media
            </button>
            <button
              onClick={() => setActiveMediaType('photo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMediaType === 'photo' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Foto ({photos.length})
            </button>
            <button
              onClick={() => setActiveMediaType('video')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMediaType === 'video' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Video ({videos.length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Kategori:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-fuchsia-500 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tagged Member Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Tag Anggota:</span>
            {MEMBER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTagFilter(tag)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTagFilter === tag
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pinterest Masonry Style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
        
        {/* Render Photos */}
        {(activeMediaType === 'all' || activeMediaType === 'photo') && filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-fuchsia-500/50 transition-all duration-300 group flex flex-col"
          >
            <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedPhotoModal(photo)}>
              <img 
                src={photo.imageUrl} 
                alt={photo.caption} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-slate-800">
                {photo.date}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavoritePhoto(photo.id);
                }}
                className="absolute top-3 left-3 p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-rose-400 border border-slate-800"
              >
                <Heart className={`w-4 h-4 ${photo.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Eye className="w-4 h-4 text-fuchsia-400" /> Lihat Detail Foto
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  {photo.location}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800/40 font-bold">
                  {photo.category}
                </span>
              </div>

              <p className="text-xs font-bold text-white leading-snug">{photo.caption}</p>

              {/* Tagged Members Badges */}
              <div className="flex flex-wrap gap-1">
                {photo.taggedMemberIds.map((mem) => (
                  <span key={mem} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-slate-800 font-semibold flex items-center gap-1">
                    <User className="w-2.5 h-2.5 text-amber-400" />
                    {mem}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px]">Oleh {photo.uploadedBy}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenShareModal(photo.caption, photo.imageUrl)}
                    className="p-1.5 text-slate-400 hover:text-white"
                    title="Bagikan Media"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => likePhoto(photo.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-500/30 text-[10px] font-bold cursor-pointer"
                  >
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{photo.likesCount}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Render Videos */}
        {(activeMediaType === 'all' || activeMediaType === 'video') && filteredVideos.map((video) => (
          <div 
            key={video.id}
            className="break-inside-avoid bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-purple-500/50 transition-all duration-300 group flex flex-col"
          >
            <div className="relative overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.caption} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg border border-purple-400/40">
                  <Video className="w-6 h-6 ml-0.5" />
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-purple-300 border border-slate-800">
                {video.duration}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs font-bold text-white leading-snug">{video.caption}</p>
              
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  {video.location}
                </span>
                <span>{video.date}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px]">Oleh {video.uploadedBy}</span>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Detail Photo Lightbox Modal */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-0 relative">
            <button
              onClick={() => setSelectedPhotoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedPhotoModal.imageUrl} 
                alt={selectedPhotoModal.caption} 
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-fuchsia-950 text-fuchsia-300 font-bold text-xs border border-fuchsia-800/40">
                    {selectedPhotoModal.category}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedPhotoModal.date}</span>
                </div>

                <button
                  onClick={() => likePhoto(selectedPhotoModal.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-bold cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>{selectedPhotoModal.likesCount} Menyukai</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white">{selectedPhotoModal.caption}</h3>

              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {selectedPhotoModal.location}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-amber-400" />
                  Diunggah oleh {selectedPhotoModal.uploadedBy}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 block mb-2">Anggota Terkait:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPhotoModal.taggedMemberIds.map(mem => (
                    <span key={mem} className="px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-bold border border-slate-800 flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-400" /> {mem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
