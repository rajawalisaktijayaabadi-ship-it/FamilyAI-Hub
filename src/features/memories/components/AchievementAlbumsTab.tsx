import React from 'react';
import { Award, Trophy, Medal, GraduationCap, Briefcase, FileCheck, Plus, Camera } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { AchievementCategory } from '../../../types/memories';

const ACHIEVEMENTS: { cat: AchievementCategory; label: string; icon: any; color: string }[] = [
  { cat: 'Sekolah', label: 'Prestasi Akademik & Sekolah', icon: GraduationCap, color: 'text-indigo-400' },
  { cat: 'Olahraga', label: 'Olahraga & Fitness', icon: Trophy, color: 'text-amber-400' },
  { cat: 'Kompetisi', label: 'Kompetisi & Perlombaan', icon: Medal, color: 'text-emerald-400' },
  { cat: 'Karier', label: 'Karier & Pekerjaan Orang Tua', icon: Briefcase, color: 'text-purple-400' },
  { cat: 'Sertifikat', label: 'Sertifikat & Penghargaan', icon: FileCheck, color: 'text-cyan-400' }
];

interface AchievementAlbumsTabProps {
  onOpenAlbumModal: () => void;
}

export const AchievementAlbumsTab: React.FC<AchievementAlbumsTabProps> = ({ onOpenAlbumModal }) => {
  const { albums, setSelectedAlbumId, setActiveTab } = useMemoryStore();

  const achievementAlbums = albums.filter(a => a.isAchievementAlbum || a.category === 'Sekolah' || a.category === 'Olahraga');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              <span>Family Achievement Album - Momen Kebanggaan</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Galeri pengabadian prestasi anak di sekolah, medali kejuaraan, sertifikat pelatihan, dan pencapaian karier
            </p>
          </div>

          <button
            onClick={onOpenAlbumModal}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Album Prestasi</span>
          </button>
        </div>
      </div>

      {/* Achievement Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {ACHIEVEMENTS.map((ach) => {
          const Icon = ach.icon;
          return (
            <div key={ach.cat} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-center hover:border-emerald-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center">
                <Icon className={`w-5 h-5 ${ach.color}`} />
              </div>
              <h4 className="font-bold text-xs text-white">{ach.label}</h4>
            </div>
          );
        })}
      </div>

      {/* Albums list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementAlbums.map((alb) => (
          <div 
            key={alb.id}
            onClick={() => {
              setSelectedAlbumId(alb.id);
              setActiveTab('albums');
            }}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-4 shadow-xl space-y-3 group cursor-pointer hover:border-emerald-500/50 transition-all"
          >
            <div className="h-44 rounded-2xl overflow-hidden relative">
              <img src={alb.coverUrl} alt={alb.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <Award className="w-3 h-3" /> {alb.achievementCategory || 'Prestasi'}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">{alb.name}</h3>
              <p className="text-xs text-slate-400">{alb.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{alb.date}</span>
              <span className="flex items-center gap-1 font-bold text-emerald-400">
                <Camera className="w-3.5 h-3.5" /> {alb.photoCount} Dokumen
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
