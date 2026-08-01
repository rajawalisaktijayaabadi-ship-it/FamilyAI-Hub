import React, { useState } from 'react';
import { 
  Camera, 
  FolderHeart, 
  Clock, 
  BookOpen, 
  MapPin, 
  Heart, 
  Award, 
  BarChart3, 
  LayoutDashboard,
  Plus
} from 'lucide-react';
import { useMemoryStore } from './stores/useMemoryStore';
import { MemoriesDashboardTab } from './components/MemoriesDashboardTab';
import { GalleryTab } from './components/GalleryTab';
import { AlbumManagementTab } from './components/AlbumManagementTab';
import { TimelineTab } from './components/TimelineTab';
import { DigitalStoryBookTab } from './components/DigitalStoryBookTab';
import { MemoryMapTab } from './components/MemoryMapTab';
import { FavoritesTab } from './components/FavoritesTab';
import { AchievementAlbumsTab } from './components/AchievementAlbumsTab';
import { AnalyticsReportTab } from './components/AnalyticsReportTab';

import { AddMediaModal } from './components/modals/AddMediaModal';
import { AddAlbumModal } from './components/modals/AddAlbumModal';
import { AISmartOrganizerModal } from './components/modals/AISmartOrganizerModal';
import { PhotoBookExportModal } from './components/modals/PhotoBookExportModal';
import { SharingCenterModal } from './components/modals/SharingCenterModal';
import { AddTimelineModal } from './components/modals/AddTimelineModal';
import { AddStoryModal } from './components/modals/AddStoryModal';

export const MemoriesCenterModule: React.FC = () => {
  const { activeTab, setActiveTab } = useMemoryStore();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showPhotoBookModal, setShowPhotoBookModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: ''
  });

  const handleOpenShare = (title: string, url: string) => {
    setShareData({
      isOpen: true,
      title,
      url
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center justify-between gap-2 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Memories</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Camera className="w-4 h-4 text-fuchsia-400" />
            <span>Galeri Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('albums')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'albums'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FolderHeart className="w-4 h-4 text-amber-400" />
            <span>Albums</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Timeline Life</span>
          </button>

          <button
            onClick={() => setActiveTab('storybook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'storybook'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Story Book</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Memory Map</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Favorit</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Prestasi</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content Render */}
      {activeTab === 'dashboard' && (
        <MemoriesDashboardTab 
          onOpenUploadModal={() => setShowUploadModal(true)}
          onOpenAlbumModal={() => setShowAlbumModal(true)}
          onOpenOrganizerModal={() => setShowOrganizerModal(true)}
          onOpenStoryModal={() => setShowStoryModal(true)}
          onOpenPhotoBookModal={() => setShowPhotoBookModal(true)}
        />
      )}

      {activeTab === 'gallery' && (
        <GalleryTab 
          onOpenUploadModal={() => setShowUploadModal(true)}
          onOpenShareModal={handleOpenShare}
        />
      )}

      {activeTab === 'albums' && (
        <AlbumManagementTab 
          onOpenAlbumModal={() => setShowAlbumModal(true)}
        />
      )}

      {activeTab === 'timeline' && (
        <TimelineTab 
          onOpenAddEventModal={() => setShowTimelineModal(true)}
        />
      )}

      {activeTab === 'storybook' && (
        <DigitalStoryBookTab 
          onOpenStoryModal={() => setShowStoryModal(true)}
        />
      )}

      {activeTab === 'map' && (
        <MemoryMapTab />
      )}

      {activeTab === 'favorites' && (
        <FavoritesTab />
      )}

      {activeTab === 'achievements' && (
        <AchievementAlbumsTab 
          onOpenAlbumModal={() => setShowAlbumModal(true)}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsReportTab />
      )}

      {/* Modals Mount */}
      <AddMediaModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />

      <AddAlbumModal 
        isOpen={showAlbumModal} 
        onClose={() => setShowAlbumModal(false)} 
      />

      <AISmartOrganizerModal 
        isOpen={showOrganizerModal} 
        onClose={() => setShowOrganizerModal(false)} 
      />

      <PhotoBookExportModal 
        isOpen={showPhotoBookModal} 
        onClose={() => setShowPhotoBookModal(false)} 
      />

      <AddTimelineModal 
        isOpen={showTimelineModal} 
        onClose={() => setShowTimelineModal(false)} 
      />

      <AddStoryModal 
        isOpen={showStoryModal} 
        onClose={() => setShowStoryModal(false)} 
      />

      <SharingCenterModal 
        isOpen={shareData.isOpen} 
        onClose={() => setShareData({ isOpen: false, title: '', url: '' })}
        title={shareData.title}
        shareUrl={shareData.url}
      />

    </div>
  );
};
