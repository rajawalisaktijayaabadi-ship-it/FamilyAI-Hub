import { create } from 'zustand';
import { 
  MemoryAlbum, 
  MemoryPhoto, 
  MemoryVideo, 
  MemoryStory, 
  FamilyTimeline, 
  MemoryMap, 
  MediaAnalytics, 
  MemoryReport, 
  MemoryNotification,
  MemoryAlbumCategory,
  AchievementCategory,
  TimelineEventType
} from '../../../types/memories';

interface MemoryStoreState {
  activeTab: 'dashboard' | 'gallery' | 'timeline' | 'albums' | 'storybook' | 'map' | 'favorites' | 'achievements' | 'analytics';
  setActiveTab: (tab: 'dashboard' | 'gallery' | 'timeline' | 'albums' | 'storybook' | 'map' | 'favorites' | 'achievements' | 'analytics') => void;

  selectedAlbumId: string | null;
  setSelectedAlbumId: (id: string | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;

  selectedTagFilter: string;
  setSelectedTagFilter: (tag: string) => void;

  albums: MemoryAlbum[];
  photos: MemoryPhoto[];
  videos: MemoryVideo[];
  stories: MemoryStory[];
  timelines: FamilyTimeline[];
  mapLocations: MemoryMap[];
  notifications: MemoryNotification[];
  analytics: MediaAnalytics;
  reports: MemoryReport[];

  // Album CRUD
  addAlbum: (album: Omit<MemoryAlbum, 'id' | 'createdAt' | 'photoCount' | 'videoCount'>) => void;
  updateAlbum: (id: string, album: Partial<MemoryAlbum>) => void;
  deleteAlbum: (id: string) => void;

  // Photo CRUD
  addPhoto: (photo: Omit<MemoryPhoto, 'id' | 'createdAt' | 'viewsCount' | 'sharesCount' | 'likesCount'>) => void;
  updatePhoto: (id: string, photo: Partial<MemoryPhoto>) => void;
  deletePhoto: (id: string) => void;
  likePhoto: (id: string) => void;
  toggleFavoritePhoto: (id: string) => void;

  // Video CRUD
  addVideo: (video: Omit<MemoryVideo, 'id' | 'createdAt' | 'viewsCount' | 'sharesCount'>) => void;
  deleteVideo: (id: string) => void;
  toggleFavoriteVideo: (id: string) => void;

  // Story CRUD
  addStory: (story: Omit<MemoryStory, 'id'>) => void;
  deleteStory: (id: string) => void;

  // Timeline CRUD
  addTimelineEvent: (event: Omit<FamilyTimeline, 'id'>) => void;
  deleteTimelineEvent: (id: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
}

const INITIAL_ALBUMS: MemoryAlbum[] = [
  {
    id: 'alb-1',
    name: 'Liburan Bali Family Fun',
    category: 'Liburan',
    coverUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
    date: '2026-06-15',
    location: 'Nusa Dua, Bali',
    description: 'Petualangan musim panas bersama anak-anak di pantai Bali.',
    visibility: 'Family',
    sharedMembers: ['Ayah', 'Ibu', 'Budi', 'Siti'],
    photoCount: 12,
    videoCount: 2,
    createdAt: '2026-06-16'
  },
  {
    id: 'alb-2',
    name: 'Ulang Tahun Budi Ke-10',
    category: 'Ulang Tahun',
    coverUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
    date: '2026-04-10',
    location: 'Rumah Utama, Jakarta',
    description: 'Pesta ulang tahun Budi tema Superhero dengan teman-teman sekolah.',
    visibility: 'Family',
    sharedMembers: ['Ayah', 'Ibu', 'Budi'],
    photoCount: 8,
    videoCount: 1,
    createdAt: '2026-04-11'
  },
  {
    id: 'alb-3',
    name: 'Prestasi Juara 1 Sains Siti',
    category: 'Sekolah',
    coverUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    date: '2026-05-20',
    location: 'Olimpiade Sains Nasional',
    description: 'Penyerahan medali emas Siti pada kompetisi sains tingkat provinsi.',
    visibility: 'Family',
    sharedMembers: ['Ibu', 'Siti'],
    photoCount: 6,
    videoCount: 1,
    createdAt: '2026-05-21',
    isAchievementAlbum: true,
    achievementCategory: 'Sekolah'
  },
  {
    id: 'alb-4',
    name: 'Anniversary Pernikahan Ke-12',
    category: 'Anniversary',
    coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    date: '2026-02-14',
    location: 'Bandung',
    description: 'Makan malam romantis peringatan pernikahan Ayah & Ibu.',
    visibility: 'Private',
    sharedMembers: ['Ayah', 'Ibu'],
    photoCount: 5,
    videoCount: 0,
    createdAt: '2026-02-15'
  }
];

const INITIAL_PHOTOS: MemoryPhoto[] = [
  {
    id: 'pho-1',
    albumId: 'alb-1',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    caption: 'Matahari terbenam di Pantai Pandawa bersama Budi dan Siti',
    date: '2026-06-15',
    location: 'Pantai Pandawa, Bali',
    taggedMemberIds: ['Budi', 'Siti', 'Ayah'],
    category: 'Liburan',
    isFavorite: true,
    viewsCount: 42,
    sharesCount: 5,
    likesCount: 12,
    uploadedBy: 'Ayah',
    createdAt: '2026-06-15'
  },
  {
    id: 'pho-2',
    albumId: 'alb-1',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80',
    caption: 'Sarapan pagi keluarga di resort favorit',
    date: '2026-06-16',
    location: 'Nusa Dua Resort',
    taggedMemberIds: ['Ayah', 'Ibu', 'Budi', 'Siti'],
    category: 'Keluarga',
    isFavorite: true,
    viewsCount: 38,
    sharesCount: 3,
    likesCount: 15,
    uploadedBy: 'Ibu',
    createdAt: '2026-06-16'
  },
  {
    id: 'pho-3',
    albumId: 'alb-2',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
    caption: 'Tiup lilin kue ulang tahun Budi ke-10 tahun',
    date: '2026-04-10',
    location: 'Jakarta',
    taggedMemberIds: ['Budi', 'Ibu'],
    category: 'Ulang Tahun',
    isFavorite: false,
    viewsCount: 29,
    sharesCount: 2,
    likesCount: 8,
    uploadedBy: 'Ibu',
    createdAt: '2026-04-10'
  },
  {
    id: 'pho-4',
    albumId: 'alb-3',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    caption: 'Penerimaan sertifikat dan medali Juara 1 Olimpiade Sains Siti',
    date: '2026-05-20',
    location: 'Aula Provinsi, Bandung',
    taggedMemberIds: ['Siti'],
    category: 'Sekolah',
    isFavorite: true,
    viewsCount: 55,
    sharesCount: 8,
    likesCount: 24,
    uploadedBy: 'Siti',
    createdAt: '2026-05-20'
  }
];

const INITIAL_VIDEOS: MemoryVideo[] = [
  {
    id: 'vid-1',
    albumId: 'alb-1',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    duration: '01:45',
    caption: 'Keseruan Budi dan Siti bermain ombak di pantai Bali',
    date: '2026-06-15',
    location: 'Bali',
    taggedMemberIds: ['Budi', 'Siti'],
    isFavorite: true,
    viewsCount: 64,
    sharesCount: 4,
    uploadedBy: 'Ayah',
    createdAt: '2026-06-15'
  }
];

const INITIAL_STORIES: MemoryStory[] = [
  {
    id: 'sto-1',
    title: 'Petualangan Musim Panas Bali 2026',
    content: 'Pada liburan pertengahan tahun ini, keluarga kami mengunjungi pulau Bali. Anak-anak sangat gembira menikmati pantai, kuliner khas, dan belajar budaya setempat. Momen yang paling berharga adalah saat menyaksikan matahari terbenam bersama sambil berbagi cerita.',
    date: '2026-06-17',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
    albumId: 'alb-1',
    generatedByAI: true,
    associatedMemberIds: ['Ayah', 'Ibu', 'Budi', 'Siti']
  }
];

const INITIAL_TIMELINES: FamilyTimeline[] = [
  {
    id: 'time-1',
    title: 'Pernikahan Ayah & Ibu',
    eventType: 'Pernikahan',
    date: '2014-02-14',
    year: 2014,
    description: 'Awal mulanya perjalanan ikatan suci keluarga kami di Jakarta.',
    location: 'Jakarta',
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    taggedMemberIds: ['Ayah', 'Ibu']
  },
  {
    id: 'time-2',
    title: 'Kelahiran Putra Pertama (Budi)',
    eventType: 'Kelahiran',
    date: '2016-04-10',
    year: 2016,
    description: 'Anugerah besar hadirnya Budi mengisi kebahagiaan rumah tangga.',
    location: 'RS Harapan, Jakarta',
    photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
    taggedMemberIds: ['Budi', 'Ayah', 'Ibu']
  },
  {
    id: 'time-3',
    title: 'Kelahiran Putri Kedua (Siti)',
    eventType: 'Kelahiran',
    date: '2018-09-05',
    year: 2018,
    description: 'Keluarga semakin hangat dengan hadirnya putri tercinta Siti.',
    location: 'RS Harapan, Jakarta',
    photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
    taggedMemberIds: ['Siti', 'Ayah', 'Ibu']
  },
  {
    id: 'time-4',
    title: 'Pindah Ke Rumah Impian Baru',
    eventType: 'Pindah Rumah',
    date: '2022-01-10',
    year: 2022,
    description: 'Resmi menempati rumah utama keluarga dengan halaman hijau luas.',
    location: 'Kebayoran, Jakarta',
    photoUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
    taggedMemberIds: ['Ayah', 'Ibu', 'Budi', 'Siti']
  },
  {
    id: 'time-5',
    title: 'Juara 1 Olimpiade Sains Siti',
    eventType: 'Pencapaian',
    date: '2026-05-20',
    year: 2026,
    description: 'Pencapaian membanggakan Siti meraih medali emas olimpiade sains.',
    location: 'Bandung',
    photoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    taggedMemberIds: ['Siti']
  }
];

const INITIAL_MAP_LOCATIONS: MemoryMap[] = [
  {
    id: 'map-1',
    locationName: 'Nusa Dua, Bali',
    latitude: -8.7963,
    longitude: 115.2238,
    date: '2026-06-15',
    albumId: 'alb-1',
    albumName: 'Liburan Bali Family Fun',
    photoCount: 12,
    coverPhotoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'map-2',
    locationName: 'Bandung, Jawa Barat',
    latitude: -6.9175,
    longitude: 107.6191,
    date: '2026-05-20',
    albumId: 'alb-3',
    albumName: 'Prestasi Juara 1 Sains Siti',
    photoCount: 6,
    coverPhotoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'
  }
];

const INITIAL_NOTIFICATIONS: MemoryNotification[] = [
  {
    id: 'notif-1',
    title: 'Kenangan Hari Ini 2 Tahun Lalu',
    message: 'Lihat foto kenangan hangat saat sarapan pagi keluarga di Bali!',
    type: 'Kenangan Hari Ini',
    date: 'Hari ini, 08:00',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'Saran AI Album Belum Lengkap',
    message: 'Album "Ulang Tahun Budi" memiliki 8 foto. Tambahkan cerita singkat untuk melengkapi Story Book.',
    type: 'Album Belum Lengkap',
    date: 'Kemarin, 14:30',
    isRead: false
  }
];

const INITIAL_ANALYTICS: MediaAnalytics = {
  uploadsPerMonth: [
    { month: 'Jan', photoCount: 10, videoCount: 1 },
    { month: 'Feb', photoCount: 15, videoCount: 2 },
    { month: 'Mar', photoCount: 12, videoCount: 1 },
    { month: 'Apr', photoCount: 25, videoCount: 3 },
    { month: 'Mei', photoCount: 20, videoCount: 2 },
    { month: 'Jun', photoCount: 30, videoCount: 4 },
    { month: 'Jul', photoCount: 18, videoCount: 2 }
  ],
  popularAlbums: [
    { albumId: 'alb-1', name: 'Liburan Bali Family Fun', views: 184, photos: 12 },
    { albumId: 'alb-3', name: 'Prestasi Juara 1 Sains Siti', views: 142, photos: 6 },
    { albumId: 'alb-2', name: 'Ulang Tahun Budi Ke-10', views: 98, photos: 8 }
  ],
  storageUsage: {
    totalGB: 50,
    usedGB: 12.4,
    photoGB: 8.2,
    videoGB: 4.2
  },
  favoriteCount: 14,
  totalPhotos: 31,
  totalVideos: 4,
  totalAlbums: 4
};

export const useMemoryStore = create<MemoryStoreState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedAlbumId: null,
  setSelectedAlbumId: (id) => set({ selectedAlbumId: id }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  selectedCategoryFilter: 'Semua',
  setSelectedCategoryFilter: (category) => set({ selectedCategoryFilter: category }),

  selectedTagFilter: 'Semua',
  setSelectedTagFilter: (tag) => set({ selectedTagFilter: tag }),

  albums: INITIAL_ALBUMS,
  photos: INITIAL_PHOTOS,
  videos: INITIAL_VIDEOS,
  stories: INITIAL_STORIES,
  timelines: INITIAL_TIMELINES,
  mapLocations: INITIAL_MAP_LOCATIONS,
  notifications: INITIAL_NOTIFICATIONS,
  analytics: INITIAL_ANALYTICS,
  reports: [],

  addAlbum: (newAlb) => set((state) => {
    const created: MemoryAlbum = {
      ...newAlb,
      id: `alb-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      photoCount: 0,
      videoCount: 0
    };
    return { albums: [created, ...state.albums] };
  }),

  updateAlbum: (id, updatedData) => set((state) => ({
    albums: state.albums.map(a => a.id === id ? { ...a, ...updatedData } : a)
  })),

  deleteAlbum: (id) => set((state) => ({
    albums: state.albums.filter(a => a.id !== id),
    photos: state.photos.filter(p => p.albumId !== id),
    videos: state.videos.filter(v => v.albumId !== id)
  })),

  addPhoto: (newPho) => set((state) => {
    const photo: MemoryPhoto = {
      ...newPho,
      id: `pho-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      sharesCount: 0,
      likesCount: 1
    };
    const updatedAlbums = state.albums.map(a => 
      a.id === photo.albumId ? { ...a, photoCount: a.photoCount + 1 } : a
    );
    return { 
      photos: [photo, ...state.photos],
      albums: updatedAlbums
    };
  }),

  updatePhoto: (id, updatedData) => set((state) => ({
    photos: state.photos.map(p => p.id === id ? { ...p, ...updatedData } : p)
  })),

  deletePhoto: (id) => set((state) => ({
    photos: state.photos.filter(p => p.id !== id)
  })),

  likePhoto: (id) => set((state) => ({
    photos: state.photos.map(p => p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p)
  })),

  toggleFavoritePhoto: (id) => set((state) => ({
    photos: state.photos.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
  })),

  addVideo: (newVid) => set((state) => {
    const video: MemoryVideo = {
      ...newVid,
      id: `vid-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      sharesCount: 0
    };
    const updatedAlbums = state.albums.map(a => 
      a.id === video.albumId ? { ...a, videoCount: a.videoCount + 1 } : a
    );
    return {
      videos: [video, ...state.videos],
      albums: updatedAlbums
    };
  }),

  deleteVideo: (id) => set((state) => ({
    videos: state.videos.filter(v => v.id !== id)
  })),

  toggleFavoriteVideo: (id) => set((state) => ({
    videos: state.videos.map(v => v.id === id ? { ...v, isFavorite: !v.isFavorite } : v)
  })),

  addStory: (newStory) => set((state) => {
    const story: MemoryStory = {
      ...newStory,
      id: `sto-${Date.now()}`
    };
    return { stories: [story, ...state.stories] };
  }),

  deleteStory: (id) => set((state) => ({
    stories: state.stories.filter(s => s.id !== id)
  })),

  addTimelineEvent: (newEvent) => set((state) => {
    const item: FamilyTimeline = {
      ...newEvent,
      id: `time-${Date.now()}`
    };
    return { timelines: [item, ...state.timelines].sort((a, b) => b.year - a.year) };
  }),

  deleteTimelineEvent: (id) => set((state) => ({
    timelines: state.timelines.filter(t => t.id !== id)
  })),

  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  }))
}));
