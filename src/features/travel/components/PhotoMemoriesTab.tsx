import React, { useState } from 'react';
import { 
  Camera, 
  Plus, 
  Trash2, 
  MapPin, 
  Calendar, 
  Tag, 
  Heart,
  Video,
  X
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';

export const PhotoMemoriesTab: React.FC = () => {
  const { trips, activeTripId, photos, addPhoto, likePhoto } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const activePhotos = photos.filter(p => p.tripId === activeTrip?.id);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [caption, setCaption] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !caption.trim()) return;

    addPhoto({
      tripId: activeTrip.id,
      photoUrl: imageUrl,
      caption,
      location: location || activeTrip.city,
      date: new Date().toISOString().split('T')[0],
      taggedMemberIds: ['mem-1', 'mem-2']
    });

    setCaption('');
    setLocation('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
            Integrated Photo Memories Gallery
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <Camera className="w-5 h-5 text-rose-400" />
            <span>Album Foto & Kenangan Perjalanan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Abadikan momen liburan keluarga, tag lokasi destinasi, dan bagikan dengan seluruh anggota keluarga.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Foto Kenangan</span>
        </button>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activePhotos.map((photo) => (
          <div
            key={photo.id}
            className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden space-y-3 group hover:border-slate-700 transition-all"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={photo.photoUrl} 
                alt={photo.caption} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => likePhoto(photo.id)}
                  className="p-2 rounded-xl bg-slate-950/80 text-rose-400 hover:text-rose-300 border border-slate-800 flex items-center gap-1 text-xs font-bold"
                >
                  <Heart className="w-4 h-4 fill-rose-400" />
                  <span>{photo.likesCount}</span>
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{photo.location}</span>
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="font-bold text-white text-xs leading-relaxed">{photo.caption}</p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>{photo.date}</span>
                </span>
                <span className="text-indigo-300 font-semibold">
                  Tagged: {photo.taggedMemberIds.length} Keluarga
                </span>
              </div>
            </div>
          </div>
        ))}

        {activePhotos.length === 0 && (
          <div className="col-span-full py-12 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
            <Camera className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Belum ada foto album kenangan diupload untuk trip ini.</p>
          </div>
        )}
      </div>

      {/* Modal Add Photo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddPhoto} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Upload Foto Momen Liburan</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Caption Foto</label>
                <input
                  type="text"
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="mis. Foto sekeluarga di Candi Borobudur saat sunrise"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Lokasi Foto</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="mis. Magelang, Jawa Tengah"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">URL Foto / Gambar</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Ke Album
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
