export type MemoryAlbumCategory = 
  | 'Liburan' 
  | 'Ulang Tahun' 
  | 'Anniversary' 
  | 'Wisuda' 
  | 'Sekolah' 
  | 'Bayi' 
  | 'Keluarga' 
  | 'Perjalanan' 
  | 'Acara' 
  | 'Olahraga' 
  | 'Hewan Peliharaan' 
  | 'Custom';

export type AchievementCategory = 
  | 'Sekolah' 
  | 'Olahraga' 
  | 'Kompetisi' 
  | 'Karier' 
  | 'Sertifikat';

export type TimelineEventType = 
  | 'Kelahiran' 
  | 'Ulang Tahun' 
  | 'Sekolah' 
  | 'Wisuda' 
  | 'Pernikahan' 
  | 'Liburan' 
  | 'Pindah Rumah' 
  | 'Pencapaian' 
  | 'Acara Besar';

export interface MemoryAlbum {
  id: string;
  name: string;
  category: MemoryAlbumCategory;
  coverUrl: string;
  date: string;
  location: string;
  description: string;
  visibility: 'Private' | 'Family' | 'Shared';
  sharedMembers: string[];
  photoCount: number;
  videoCount: number;
  createdAt: string;
  isAchievementAlbum?: boolean;
  achievementCategory?: AchievementCategory;
}

export interface MemoryPhoto {
  id: string;
  albumId?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption: string;
  date: string;
  location: string;
  taggedMemberIds: string[];
  category: MemoryAlbumCategory;
  isFavorite: boolean;
  viewsCount: number;
  sharesCount: number;
  likesCount: number;
  uploadedBy: string;
  createdAt: string;
  width?: number;
  height?: number;
}

export interface MemoryVideo {
  id: string;
  albumId?: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  caption: string;
  date: string;
  location: string;
  taggedMemberIds: string[];
  isFavorite: boolean;
  viewsCount: number;
  sharesCount: number;
  uploadedBy: string;
  createdAt: string;
}

export interface MemoryStory {
  id: string;
  title: string;
  content: string;
  date: string;
  coverPhotoUrl: string;
  albumId?: string;
  generatedByAI: boolean;
  associatedMemberIds: string[];
}

export interface FamilyTimeline {
  id: string;
  title: string;
  eventType: TimelineEventType;
  date: string;
  year: number;
  description: string;
  location: string;
  photoUrl?: string;
  albumId?: string;
  taggedMemberIds: string[];
}

export interface MemoryMap {
  id: string;
  locationName: string;
  latitude: number;
  longitude: number;
  date: string;
  albumId: string;
  albumName: string;
  photoCount: number;
  coverPhotoUrl: string;
}

export interface MemoryTag {
  id: string;
  name: 'Ayah' | 'Ibu' | 'Anak' | 'Lansia' | 'Hewan Peliharaan' | 'Teman' | string;
  memberId?: string;
  color: string;
}

export interface FavoriteMemory {
  id: string;
  mediaId: string;
  mediaType: 'photo' | 'video' | 'album' | 'story';
  title: string;
  url: string;
  addedAt: string;
  viewsCount?: number;
  sharesCount?: number;
}

export interface MemoryShare {
  id: string;
  title: string;
  itemType: 'album' | 'photo' | 'video' | 'story';
  itemId: string;
  shareUrl: string;
  qrCodeUrl: string;
  visibility: 'Public' | 'Passcode' | 'Family Only';
  expiresAt?: string;
  createdAt: string;
}

export interface MediaAnalytics {
  uploadsPerMonth: { month: string; photoCount: number; videoCount: number }[];
  popularAlbums: { albumId: string; name: string; views: number; photos: number }[];
  storageUsage: { totalGB: number; usedGB: number; photoGB: number; videoGB: number };
  favoriteCount: number;
  totalPhotos: number;
  totalVideos: number;
  totalAlbums: number;
}

export interface MemoryReport {
  id: string;
  generatedAt: string;
  period: string;
  memorySummary: string;
  albumSummary: string;
  mediaSummary: string;
  timelineSummary: string;
}

export interface MemoryNotification {
  id: string;
  title: string;
  message: string;
  type: 'Kenangan Hari Ini' | 'Upload Baru' | 'Album Belum Lengkap' | 'Anniversary';
  date: string;
  isRead: boolean;
}
