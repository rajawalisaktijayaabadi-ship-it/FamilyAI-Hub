import React, { useState } from 'react';
import { 
  Camera, 
  Video, 
  FolderHeart, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Heart, 
  MapPin, 
  Tag, 
  Share2, 
  Award, 
  BookOpen, 
  Search, 
  Zap, 
  Bell, 
  HardDrive,
  Eye,
  SlidersHorizontal,
  Clock
} from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { MemoryService } from '../services/memoryService';

interface MemoriesDashboardTabProps {
  onOpenUploadModal: () => void;
  onOpenAlbumModal: () => void;
  onOpenOrganizerModal: () => void;
  onOpenStoryModal: () => void;
  onOpenPhotoBookModal: () => void;
}

export const MemoriesDashboardTab: React.FC<MemoriesDashboardTabProps> = ({
  onOpenUploadModal,
  onOpenAlbumModal,
  onOpenOrganizerModal,
  onOpenStoryModal,
  onOpenPhotoBookModal
}) => {
  const { 
    photos, 
    videos, 
    albums, 
    timelines, 
    analytics, 
    notifications, 
    setActiveTab, 
    likePhoto, 
    toggleFavoritePhoto,
    markNotificationAsRead 
  } = useMemoryStore();

  const anniversaryInsight = MemoryService.getAnniversaryInsight(photos);

  const recentPhotos = photos.slice(0, 6);
  const favoritePhotos = photos.filter(p => p.isFavorite);

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-950 via-purple-950 to-slate-900 border border-fuchsia-800/40 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Family Memories & Digital Life Timeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dokumentasi Kenangan Indah Perjalanan Keluarga
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Arsipkan foto, video, momen ulang tahun, wisuda, hingga pencapaian anak dengan pengelompokan cerdas AI dan timeline perjalanan hidup keluarga.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={onOpenUploadModal}
              className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Unggah Foto / Video</span>
            </button>

            <button
              onClick={onOpenOrganizerModal}
              className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-fuchsia-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>AI Smart Organizer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <Camera className="w-5 h-5 text-fuchsia-400" />
          <span className="text-xl font-extrabold text-white">{analytics.totalPhotos}</span>
          <span className="text-[10px] text-slate-400 font-medium">Total Foto</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <Video className="w-5 h-5 text-purple-400" />
          <span className="text-xl font-extrabold text-white">{analytics.totalVideos}</span>
          <span className="text-[10px] text-slate-400 font-medium">Total Video</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <FolderHeart className="w-5 h-5 text-amber-400" />
          <span className="text-xl font-extrabold text-white">{albums.length}</span>
          <span className="text-[10px] text-slate-400 font-medium">Total Album</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <span className="text-xl font-extrabold text-white">2</span>
          <span className="text-[10px] text-slate-400 font-medium">Momen Hari Ini</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-xl font-extrabold text-white">18</span>
          <span className="text-[10px] text-slate-400 font-medium">Upload Bulan Ini</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <Clock className="w-5 h-5 text-rose-400" />
          <span className="text-xl font-extrabold text-white">{timelines.length}</span>
          <span className="text-[10px] text-slate-400 font-medium">Timeline Life</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span className="text-xl font-extrabold text-white">{favoritePhotos.length}</span>
          <span className="text-[10px] text-slate-400 font-medium">Foto Favorit</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-lg">
          <HardDrive className="w-5 h-5 text-cyan-400" />
          <span className="text-base font-extrabold text-white">{analytics.storageUsage.usedGB} GB</span>
          <span className="text-[10px] text-slate-400 font-medium">Storage Terpakai</span>
        </div>
      </div>

      {/* Anniversary / On This Day Widget */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {anniversaryInsight.photo && (
            <div className="relative w-full md:w-56 h-40 rounded-2xl overflow-hidden border border-slate-700 shrink-0">
              <img 
                src={anniversaryInsight.photo.imageUrl} 
                alt="On This Day" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-bold border border-slate-800">
                {anniversaryInsight.photo.date}
              </div>
            </div>
          )}

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Anniversary Memory AI</span>
            </div>
            <h3 className="text-lg font-bold text-white">{anniversaryInsight.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {anniversaryInsight.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('gallery')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Buka Galeri Kenangan</span>
              </button>
              <button
                onClick={onOpenStoryModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Buat Digital Story Book</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <button
          onClick={() => setActiveTab('gallery')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-fuchsia-500/50 rounded-2xl text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">Galeri Pinterest</h4>
            <p className="text-[10px] text-slate-400">Foto & Video Grid</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('albums')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">Kelola Album</h4>
            <p className="text-[10px] text-slate-400">{albums.length} Album Koleksi</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">Timeline Kehidupan</h4>
            <p className="text-[10px] text-slate-400">Milestone Momen</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('storybook')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">Digital Story Book</h4>
            <p className="text-[10px] text-slate-400">Cerita Keluarga AI</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">Album Pencapaian</h4>
            <p className="text-[10px] text-slate-400">Prestasi & Sertifikat</p>
          </div>
        </button>

        <button
          onClick={onOpenPhotoBookModal}
          className="p-4 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left space-y-2 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">Cetak & Slideshow</h4>
            <p className="text-[10px] text-slate-400">Export PDF Photo Book</p>
          </div>
        </button>
      </div>

      {/* Recent Uploads Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Unggahan Terbaru Keluarga</h3>
            <p className="text-xs text-slate-400">Dokumentasi momen manis yang baru saja diabadikan</p>
          </div>
          <button
            onClick={() => setActiveTab('gallery')}
            className="text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 cursor-pointer"
          >
            Lihat Semua Galeri →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentPhotos.map((photo) => (
            <div key={photo.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col group">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-slate-800">
                  {photo.date}
                </div>
                <button
                  onClick={() => toggleFavoritePhoto(photo.id)}
                  className="absolute top-3 left-3 p-2 rounded-xl bg-slate-950/70 text-slate-300 hover:text-rose-400 border border-slate-800"
                >
                  <Heart className={`w-4 h-4 ${photo.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{photo.location}</span>
                    <span>•</span>
                    <span className="text-fuchsia-400 font-semibold">{photo.category}</span>
                  </div>
                  <p className="text-xs font-bold text-white leading-snug">{photo.caption}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px]">Oleh {photo.uploadedBy}</span>
                  <button
                    onClick={() => likePhoto(photo.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/50 text-rose-300 border border-rose-500/30 text-[11px] font-bold cursor-pointer"
                  >
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{photo.likesCount}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Reminder List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base">Pengingat Kenangan & Album</h3>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all ${
                notif.isRead 
                  ? 'bg-slate-950/50 border-slate-850 opacity-70' 
                  : 'bg-indigo-950/20 border-indigo-500/30'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    {notif.type}
                  </span>
                  <span className="text-[10px] text-slate-400">{notif.date}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                <p className="text-xs text-slate-300">{notif.message}</p>
              </div>

              {!notif.isRead && (
                <button
                  onClick={() => markNotificationAsRead(notif.id)}
                  className="px-3 py-1 bg-indigo-600/80 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg cursor-pointer shrink-0"
                >
                  Tandai Dibaca
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
