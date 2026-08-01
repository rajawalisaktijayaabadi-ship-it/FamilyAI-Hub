import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Sparkles, Heart, Zap, Moon, Activity, Lock, Users, ShieldCheck } from 'lucide-react';
import { useMoodStore } from '../stores/useMoodStore';
import { SupportedMoodType, PrivacyLevel } from '../types/moodTypes';
import { MOOD_META_MAP } from '../utils/moodData';

const checkInSchema = z.object({
  mood: z.string().min(1, 'Pilih mood hari ini'),
  customMoodText: z.string().optional(),
  energyLevel: z.number().min(1).max(10),
  stressLevel: z.number().min(1).max(10),
  sleepQuality: z.number().min(1).max(5),
  sleepHours: z.number().min(0).max(24).optional(),
  activities: z.array(z.string()),
  note: z.string().min(3, 'Tuliskan sedikit catatan perasaanmu hari ini'),
  gratitude1: z.string().optional(),
  gratitude2: z.string().optional(),
  gratitude3: z.string().optional(),
  todayGoal: z.string().optional(),
  privacy: z.enum(['private', 'family_only', 'parent_only', 'self_only'])
});

type CheckInFormData = z.infer<typeof checkInSchema>;

const ACTIVITY_OPTIONS = [
  'Olahraga / Gym',
  'Pekerjaan / Kantor',
  'Sekolah / Tugas',
  'Istirahat Cukup',
  'Hobi & Kreativitas',
  'Waktu Keluarga',
  'Ibadah / Meditasi',
  'Jalan-jalan / Rekreasi',
  'Makan Sehat'
];

export const DailyCheckInModal: React.FC = () => {
  const { isCheckInModalOpen, setCheckInModalOpen, addCheckIn, familyMoods } = useMoodStore();
  const [submitting, setSubmitting] = useState(false);

  // Current user mock (Ayah - Budi Santoso)
  const currentMember = familyMoods[0] || {
    memberId: 'mem_1',
    memberName: 'Budi Santoso',
    detailedRole: 'Ayah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      mood: 'happy',
      customMoodText: '',
      energyLevel: 8,
      stressLevel: 3,
      sleepQuality: 4,
      sleepHours: 7,
      activities: ['Olahraga / Gym', 'Waktu Keluarga'],
      note: '',
      gratitude1: '',
      gratitude2: '',
      gratitude3: '',
      todayGoal: '',
      privacy: 'family_only'
    }
  });

  const selectedMood = watch('mood') as SupportedMoodType;
  const selectedActivities = watch('activities') || [];
  const energyLevel = watch('energyLevel');
  const stressLevel = watch('stressLevel');
  const sleepQuality = watch('sleepQuality');

  if (!isCheckInModalOpen) return null;

  const toggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setValue('activities', selectedActivities.filter((a) => a !== act));
    } else {
      setValue('activities', [...selectedActivities, act]);
    }
  };

  const onSubmit = async (data: CheckInFormData) => {
    setSubmitting(true);
    try {
      const gratitudeItems = [data.gratitude1, data.gratitude2, data.gratitude3].filter(Boolean) as string[];
      await addCheckIn({
        memberId: currentMember.memberId,
        memberName: currentMember.memberName,
        memberRole: currentMember.detailedRole,
        memberAvatar: currentMember.avatar,
        date: new Date().toISOString().split('T')[0],
        mood: data.mood as SupportedMoodType,
        customMoodText: data.customMoodText,
        energyLevel: data.energyLevel,
        stressLevel: data.stressLevel,
        sleepQuality: data.sleepQuality,
        sleepHours: data.sleepHours,
        activities: data.activities,
        note: data.note,
        gratitudeItems,
        todayGoal: data.todayGoal || '',
        privacy: data.privacy as PrivacyLevel
      });

      reset();
      setCheckInModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 text-white relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <img src={currentMember.avatar} alt={currentMember.memberName} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500" />
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Daily Check-in Suasana Hati
              </h2>
              <p className="text-xs text-slate-400">
                Pengisi: <span className="text-indigo-300 font-semibold">{currentMember.memberName}</span> ({currentMember.detailedRole})
              </p>
            </div>
          </div>
          <button 
            onClick={() => setCheckInModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Section 1: Mood Type Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Bagaimana Perasaan Utama Hari Ini?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.values(MOOD_META_MAP).map((meta) => {
                const isSelected = selectedMood === meta.type;
                return (
                  <button
                    key={meta.type}
                    type="button"
                    onClick={() => setValue('mood', meta.type)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{meta.emoji}</div>
                    <div className="text-xs font-semibold">{meta.label}</div>
                  </button>
                );
              })}
            </div>
            {errors.mood && <p className="text-xs text-rose-400">{errors.mood.message}</p>}
          </div>

          {/* Section 2: Energy & Stress Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {/* Energy */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <Zap className="w-4 h-4" /> Level Energi
                </span>
                <span className="font-mono font-bold text-amber-300">{energyLevel} / 10</span>
              </div>
              <Controller
                name="energyLevel"
                control={control}
                render={({ field }) => (
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                )}
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Lelah (1)</span>
                <span>Penuh Energi (10)</span>
              </div>
            </div>

            {/* Stress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-400 flex items-center gap-1">
                  <Activity className="w-4 h-4" /> Level Stress
                </span>
                <span className="font-mono font-bold text-rose-300">{stressLevel} / 10</span>
              </div>
              <Controller
                name="stressLevel"
                control={control}
                render={({ field }) => (
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                )}
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Tenang (1)</span>
                <span>Tinggi (10)</span>
              </div>
            </div>
          </div>

          {/* Section 3: Sleep Quality Rating */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-400" /> Kualitas Tidur Semalam (Placeholder Wearables)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Jam Tidur:</span>
                <input
                  type="number"
                  step="0.5"
                  {...register('sleepHours', { valueAsNumber: true })}
                  className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-center text-indigo-300 font-mono outline-none"
                />
                <span className="text-xs text-slate-400">Jam</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue('sleepQuality', star)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    sleepQuality >= star
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {star} ★
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Activities Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Aktivitas Utama Hari Ini
            </label>
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_OPTIONS.map((act) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    key={act}
                    type="button"
                    onClick={() => toggleActivity(act)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {act}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Note & Reflection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              3. Catatan Perasaan / Cerita Hari Ini
            </label>
            <textarea
              {...register('note')}
              rows={3}
              placeholder="Ceritakan peristiwa atau pemicu emosimu hari ini..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
            />
            {errors.note && <p className="text-xs text-rose-400">{errors.note.message}</p>}
          </div>

          {/* Section 6: Gratitude (3 Hal yang disyukuri) */}
          <div className="space-y-2 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" /> 3 Hal yang Disyukuri Hari Ini (Gratitude Journal)
            </label>
            <div className="space-y-2">
              <input
                {...register('gratitude1')}
                placeholder="1. Contoh: Kesehatan seluruh anggota keluarga"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <input
                {...register('gratitude2')}
                placeholder="2. Contoh: Sarapan hangat buatan Ibu"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <input
                {...register('gratitude3')}
                placeholder="3. Contoh: Selesainya tugas kantor tepat waktu"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Section 7: Target Hari Ini & Privacy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Target Hari Ini / Esok:</label>
              <input
                {...register('todayGoal')}
                placeholder="Contoh: Tidur sebelum jam 10 malam"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Pengaturan Privasi Catatan:</label>
              <select
                {...register('privacy')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              >
                <option value="family_only">Tampak Seluruh Keluarga (Family Only)</option>
                <option value="parent_only">Tampak Orang Tua Saja (Parent Only)</option>
                <option value="private">Privat / Diri Sendiri (Self Only)</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setCheckInModalOpen(false)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{submitting ? 'Menyimpan & Analisis AI...' : 'Simpan Daily Check-in'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
