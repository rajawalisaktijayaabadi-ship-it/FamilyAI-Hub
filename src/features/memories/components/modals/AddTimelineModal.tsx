import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Clock, Plus } from 'lucide-react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { TimelineEventType } from '../../../../types/memories';

const timelineSchema = z.object({
  title: z.string().min(3, 'Judul peristiwa minimal 3 karakter'),
  eventType: z.string().min(1, 'Tipe peristiwa wajib dipilih'),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  year: z.number().or(z.string().transform(v => parseInt(v, 10))),
  description: z.string().min(5, 'Deskripsi minimal 5 karakter'),
  location: z.string().min(2, 'Lokasi wajib diisi'),
  photoUrl: z.string().optional(),
  taggedMemberInput: z.string().optional()
});

type TimelineFormValues = z.infer<typeof timelineSchema>;

interface AddTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTimelineModal: React.FC<AddTimelineModalProps> = ({ isOpen, onClose }) => {
  const { addTimelineEvent } = useMemoryStore();

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      title: '',
      eventType: 'Kelahiran',
      date: new Date().toISOString().split('T')[0],
      year: new Date().getFullYear(),
      description: '',
      location: 'Jakarta',
      photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=80',
      taggedMemberInput: 'Ayah, Ibu'
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data: TimelineFormValues) => {
    const tagged = data.taggedMemberInput 
      ? data.taggedMemberInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['Ayah'];

    addTimelineEvent({
      title: data.title,
      eventType: data.eventType as TimelineEventType,
      date: data.date,
      year: typeof data.year === 'number' ? data.year : parseInt(data.year, 10),
      description: data.description,
      location: data.location,
      photoUrl: data.photoUrl,
      taggedMemberIds: tagged
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Tambah Peristiwa Timeline Kehidupan</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Judul Momen / Milestone:</label>
            <input 
              type="text" 
              {...register('title')}
              placeholder="misal: Kelahiran Putra Pertama / Wisuda S1..." 
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-indigo-500"
            />
            {errors.title && <span className="text-[10px] text-rose-400 mt-1 block">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Tipe Peristiwa:</label>
              <select 
                {...register('eventType')}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
              >
                <option value="Kelahiran">Kelahiran</option>
                <option value="Ulang Tahun">Ulang Tahun</option>
                <option value="Sekolah">Sekolah</option>
                <option value="Wisuda">Wisuda</option>
                <option value="Pernikahan">Pernikahan</option>
                <option value="Liburan">Liburan</option>
                <option value="Pindah Rumah">Pindah Rumah</option>
                <option value="Pencapaian">Pencapaian</option>
                <option value="Acara Besar">Acara Besar</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Tahun (YYYY):</label>
              <input 
                type="number" 
                {...register('year')}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Tanggal Lengkap:</label>
            <input 
              type="date" 
              {...register('date')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Lokasi:</label>
            <input 
              type="text" 
              {...register('location')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Keterangan Cerita Peristiwa:</label>
            <textarea 
              rows={3}
              {...register('description')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">URL Foto Kenangan:</label>
            <input 
              type="text" 
              {...register('photoUrl')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer">
              Simpan Milestone
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
