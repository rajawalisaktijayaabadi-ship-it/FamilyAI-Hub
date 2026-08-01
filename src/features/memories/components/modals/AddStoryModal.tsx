import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import { MemoryService } from '../../services/memoryService';

const storySchema = z.object({
  title: z.string().min(3, 'Judul cerita minimal 3 karakter'),
  content: z.string().min(10, 'Isi cerita minimal 10 karakter'),
  coverPhotoUrl: z.string().min(5, 'URL Cover wajib diisi'),
  associatedMemberInput: z.string().optional()
});

type StoryFormValues = z.infer<typeof storySchema>;

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStoryModal: React.FC<AddStoryModalProps> = ({ isOpen, onClose }) => {
  const { addStory, albums } = useMemoryStore();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: 'Cerita Liburan Akhir Tahun Family',
      content: '',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
      associatedMemberInput: 'Ayah, Ibu, Budi, Siti'
    }
  });

  if (!isOpen) return null;

  const handleAIGenerateContent = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const generated = MemoryService.generateFamilyStory(
        watch('title') || 'Liburan Musim Panas', 
        'Pantai Bali', 
        ['Ayah', 'Ibu', 'Budi', 'Siti']
      );
      setValue('content', generated);
      setIsGeneratingAI(false);
    }, 600);
  };

  const onSubmit = (data: StoryFormValues) => {
    const members = data.associatedMemberInput 
      ? data.associatedMemberInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['Ayah', 'Ibu'];

    addStory({
      title: data.title,
      content: data.content,
      date: new Date().toISOString().split('T')[0],
      coverPhotoUrl: data.coverPhotoUrl,
      albumId: albums[0]?.id,
      generatedByAI: true,
      associatedMemberIds: members
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-base">Tulis Digital Life Story Book</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Judul Cerita:</label>
            <input 
              type="text" 
              {...register('title')}
              placeholder="misal: Petualangan Musim Panas Bali 2026..." 
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-purple-500"
            />
            {errors.title && <span className="text-[10px] text-rose-400 mt-1 block">{errors.title.message}</span>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-400">Naskah Narasi Cerita:</label>
              <button
                type="button"
                onClick={handleAIGenerateContent}
                className="text-[10px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer bg-purple-950 px-2.5 py-1 rounded-full border border-purple-500/40"
              >
                <Sparkles className="w-3 h-3 text-amber-400" /> {isGeneratingAI ? 'AI Generasi...' : 'Generate AI Story'}
              </button>
            </div>
            <textarea 
              rows={5}
              {...register('content')}
              placeholder="Tuliskan cerita berharga keluarga atau klik tombol Generate AI Story di atas..."
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-purple-500"
            />
            {errors.content && <span className="text-[10px] text-rose-400 mt-1 block">{errors.content.message}</span>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">URL Cover Cerita:</label>
            <input 
              type="text" 
              {...register('coverPhotoUrl')}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Anggota Keluarga Terkait:</label>
            <input 
              type="text" 
              {...register('associatedMemberInput')}
              placeholder="Ayah, Ibu, Budi, Siti"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl cursor-pointer">
              Simpan Cerita Story Book
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
