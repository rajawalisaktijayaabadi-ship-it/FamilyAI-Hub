import React, { useState } from 'react';
import { Heart, Eye, Share2, Camera, Video, MapPin, User, Star } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';

export const FavoritesTab: React.FC = () => {
  const { photos, videos, toggleFavoritePhoto, likePhoto } = useMemoryStore();
  const [favoriteFilter, setFavoriteFilter] = useState<'favorit' | 'views' | 'shares'>('favorit');

  let items = photos.filter(p => p.isFavorite);

  if (favoriteFilter === 'views') {
    items = [...photos].sort((a, b) => b.viewsCount - a.viewsCount);
  } else if (favoriteFilter === 'shares') {
    items = [...photos].sort((a, b) => b.sharesCount - a.sharesCount);
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <span>Kenangan Favorit & Paling Berkesan</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Koleksi momen yang ditandai favorit, paling sering dilihat, dan paling banyak dibagikan
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setFavoriteFilter('favorit')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                favoriteFilter === 'favorit' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Favorit Saya
            </button>
            <button
              onClick={() => setFavoriteFilter('views')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                favoriteFilter === 'views' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paling Sering Dilihat
            </button>
            <button
              onClick={() => setFavoriteFilter('shares')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                favoriteFilter === 'shares' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paling Banyak Dibagikan
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((photo) => (
          <div key={photo.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-3 p-4">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover" />
              <button
                onClick={() => toggleFavoritePhoto(photo.id)}
                className="absolute top-3 left-3 p-2 rounded-xl bg-slate-950/80 text-rose-500 border border-slate-800"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">{photo.caption}</h3>
              
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-rose-400" /> {photo.location}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-fuchsia-400" /> {photo.viewsCount}x Dilihat</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Oleh {photo.uploadedBy}</span>
                <button
                  onClick={() => likePhoto(photo.id)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-950 text-rose-300 font-bold border border-rose-500/30 text-[10px]"
                >
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> {photo.likesCount}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
