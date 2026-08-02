import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, FolderPlus, Sparkles } from 'lucide-react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { MemoryAlbumCategory, AchievementCategory } from '../../../../types/memories';

const albumSchema = z.object({
  name: z.string().min(3, 'Nama album minimal 3 karakter'),
  category: z.string().min(1, 'Kategori album wajib dipilih'),
  coverUrl: z.string().min(5, 'URL Cover wajib diisi'),
  location: z.string().min(2, 'Lokasi wajib diisi'),
  description: z.string().min(5, 'Deskripsi minimal 5 karakter'),
  visibility: z.enum(['Private', 'Family', 'Shared']),
  isAchievementAlbum: z.boolean().optional(),
  achievementCategory: z.string().optional()
});

type AlbumFormValues = z.infer<typeof albumSchema>;

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose }) => {
  const { addAlbum } = useMemoryStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<AlbumFormValues>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      name: '',
      category: 'Liburan',
      coverUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
      location: 'Jakarta',
      description: 'Koleksi momen manis kebersamaan keluarga...',
      visibility: 'Family',
      isAchievementAlbum: false
    }
  });

  const watchAchievement = watch('isAchievementAlbum');

  if (!isOpen) return null;

  const onSubmit = (data: AlbumFormValues) => {
    addAlbum({
      name: data.name,
      category: data.category as MemoryAlbumCategory,
      coverUrl: data.coverUrl,
      date: new Date().toISOString().split('T')[0],
      location: data.location,
      description: data.description,
      visibility: data.visibility,
      sharedMembers: ['Ayah', 'Ibu', 'Anak'],
      isAchievementAlbum: data.isAchievementAlbum,
      achievementCategory: data.achievementCategory as AchievementCategory
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Buat Album Kenangan Baru</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Nama Album:</label>
            <input 
              type="text" 
              {...register('name')}
              placeholder="misal: Liburan Pantai Anyer 2026..." 
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-amber-500"
            />
            {errors.name && <span className="text-[10px] text-rose-400 mt-1 block">{errors.name.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Kategori:</label>
              <select 
                {...register('category')}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
              >
                <option value="Liburan">Liburan</option>
                <option value="Ulang Tahun">Ulang Tahun</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wisuda">Wisuda</option>
                <option value="Sekolah">Sekolah</option>
                <option value="Bayi">Bayi</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Perjalanan">Perjalanan</option>
                <option value="Acara">Acara</option>
                <option value="Olahraga">Olahraga</option>
                <option value="Hewan Peliharaan">Hewan Peliharaan</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Visibilitas:</label>
              <select 
                {...register('visibility')}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
              >
                <option value="Family">Family Only</option>
                <option value="Private">Private</option>
                <option value="Shared">Shared Kerabat</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">URL Cover Album:</label>
            <input 
              type="text" 
              {...register('coverUrl')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Lokasi Peristiwa:</label>
            <input 
              type="text" 
              {...register('location')}
              placeholder="misal: Bandung, Jawa Barat" 
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Deskripsi Album:</label>
            <textarea 
              rows={3}
              {...register('description')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-400">
              <input type="checkbox" {...register('isAchievementAlbum')} className="rounded accent-emerald-500" />
              <span>Jadikan Album Prestasi / Achievement</span>
            </label>

            {watchAchievement && (
              <select 
                {...register('achievementCategory')}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded-xl outline-none"
              >
                <option value="Sekolah">Sekolah & Akademik</option>
                <option value="Olahraga">Olahraga & Fitness</option>
                <option value="Kompetisi">Kompetisi & Lomba</option>
                <option value="Karier">Karier</option>
                <option value="Sertifikat">Sertifikat</option>
              </select>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl cursor-pointer">
              Simpan Album
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
