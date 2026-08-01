import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Camera, Video, Upload, Sparkles } from 'lucide-react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { MemoryAlbumCategory } from '../../../types/memories';

const mediaSchema = z.object({
  mediaType: z.enum(['photo', 'video']),
  caption: z.string().min(3, 'Caption minimal 3 karakter'),
  imageUrl: z.string().url('URL foto tidak valid').or(z.string().min(5, 'URL wajib diisi')),
  location: z.string().min(2, 'Lokasi wajib diisi'),
  category: z.string().min(1, 'Kategori wajib dipilih'),
  albumId: z.string().optional(),
  taggedMemberInput: z.string().optional(),
  uploadedBy: z.string().min(1, 'Nama pengunggah wajib diisi')
});

type MediaFormValues = z.infer<typeof mediaSchema>;

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMediaModal: React.FC<AddMediaModalProps> = ({ isOpen, onClose }) => {
  const { albums, addPhoto, addVideo } = useMemoryStore();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      mediaType: 'photo',
      caption: '',
      imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80',
      location: 'Jakarta',
      category: 'Keluarga',
      taggedMemberInput: 'Budi, Siti',
      uploadedBy: 'Ayah'
    }
  });

  const watchMediaType = watch('mediaType');

  if (!isOpen) return null;

  const onSubmit = (data: MediaFormValues) => {
    const taggedMembers = data.taggedMemberInput 
      ? data.taggedMemberInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['Ayah'];

    if (data.mediaType === 'photo') {
      addPhoto({
        albumId: data.albumId || albums[0]?.id,
        imageUrl: data.imageUrl,
        caption: data.caption,
        date: new Date().toISOString().split('T')[0],
        location: data.location,
        category: data.category as MemoryAlbumCategory,
        taggedMemberIds: taggedMembers,
        isFavorite: false,
        uploadedBy: data.uploadedBy
      });
    } else {
      addVideo({
        albumId: data.albumId || albums[0]?.id,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumbnailUrl: data.imageUrl,
        duration: '02:15',
        caption: data.caption,
        date: new Date().toISOString().split('T')[0],
        location: data.location,
        taggedMemberIds: taggedMembers,
        isFavorite: false,
        uploadedBy: data.uploadedBy
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-fuchsia-400" />
            <h3 className="font-bold text-white text-base">Unggah Foto / Video Kenangan</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-2">
            <label className={`p-3 rounded-2xl border text-center text-xs font-bold cursor-pointer transition-all ${
              watchMediaType === 'photo' ? 'bg-fuchsia-600 text-white border-fuchsia-400' : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}>
              <input type="radio" value="photo" {...register('mediaType')} className="sr-only" />
              📸 Foto
            </label>
            <label className={`p-3 rounded-2xl border text-center text-xs font-bold cursor-pointer transition-all ${
              watchMediaType === 'video' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}>
              <input type="radio" value="video" {...register('mediaType')} className="sr-only" />
              🎥 Video
            </label>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Judul / Caption Kenangan:</label>
            <input 
              type="text" 
              {...register('caption')}
              placeholder="misal: Piknik sore pantai pasir putih..." 
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-fuchsia-500"
            />
            {errors.caption && <span className="text-[10px] text-rose-400 mt-1 block">{errors.caption.message}</span>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">URL Media Foto / Thumbnail:</label>
            <input 
              type="text" 
              {...register('imageUrl')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-fuchsia-500"
            />
            {errors.imageUrl && <span className="text-[10px] text-rose-400 mt-1 block">{errors.imageUrl.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Lokasi:</label>
              <input 
                type="text" 
                {...register('location')}
                placeholder="misal: Nusa Dua, Bali" 
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Pilih Album:</label>
              <select 
                {...register('albumId')}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
              >
                {albums.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Tag Anggota Keluarga (Pisah Koma):</label>
            <input 
              type="text" 
              {...register('taggedMemberInput')}
              placeholder="Ayah, Ibu, Budi, Siti" 
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-4 h-4" /> Simpan Media
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
