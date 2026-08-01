import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Calendar, 
  Plus, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  User, 
  Utensils, 
  X, 
  Flame, 
  Filter, 
  ChefHat,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { MealPlan, FamilyMember, MealCategoryType } from '../../../types';
import { mealPlanSchema, MealPlanFormValues } from '../schemas';

interface MealPlannerTabProps {
  familyMembers: FamilyMember[];
}

export const MealPlannerTab: React.FC<MealPlannerTabProps> = ({ familyMembers }) => {
  const { 
    mealPlans, 
    addMealPlan, 
    updateMealPlanStatus, 
    deleteMealPlan,
    cookingSchedules,
    updateScheduleStatus
  } = useMealStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<MealPlanFormValues>({
    resolver: zodResolver(mealPlanSchema),
    defaultValues: {
      name: '',
      category: 'Makan Siang',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Siang',
      timeString: '12:30',
      assignedMemberId: familyMembers[0]?.id || 'mem-1',
      assignedMemberName: familyMembers[0]?.name || 'Ibu (Siti)',
      notes: '',
      estimatedCalories: 350
    }
  });

  const onSubmit = (data: MealPlanFormValues) => {
    const member = familyMembers.find(m => m.id === data.assignedMemberId);
    const newMp: MealPlan = {
      id: `mp-${Date.now()}`,
      name: data.name,
      category: data.category as MealCategoryType,
      date: data.date,
      timeSlot: data.timeSlot,
      timeString: data.timeString,
      assignedMemberId: data.assignedMemberId,
      assignedMemberName: member?.name || data.assignedMemberName,
      notes: data.notes,
      status: 'Planned',
      estimatedCalories: data.estimatedCalories
    };

    addMealPlan(newMp);
    setIsModalOpen(false);
    reset();
  };

  const categories: MealCategoryType[] = [
    'Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Minuman', 
    'Dessert', 'Vegetarian', 'Vegan', 'Halal', 'Seafood', 'Healthy', 'Kids', 'Senior', 'Custom'
  ];

  const filteredPlans = selectedCategory === 'Semua' 
    ? mealPlans 
    : mealPlans.filter(mp => mp.category === selectedCategory);

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>Perencanaan Menu & Jadwal Memasak</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Susun menu harian/mingguan keluarga dan tugaskan anggota keluarga yang memasak.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'weekly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriks Mingguan
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'daily' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Jadwal Harian
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Menu</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategory('Semua')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
            selectedCategory === 'Semua'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
          }`}
        >
          Semua Kategori
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cooking Schedule Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-amber-400" />
          <span>Jadwal Petugas Memasak Hari Ini</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {cookingSchedules.map((cs) => (
            <div key={cs.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider">{cs.timeSlot} • {cs.startTime}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  cs.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' :
                  cs.status === 'In Progress' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cs.status === 'Completed' ? 'Selesai' : cs.status === 'In Progress' ? 'Memasak' : 'Menunggu'}
                </span>
              </div>

              <div className="font-bold text-white text-sm">{cs.mealName}</div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  {cs.assignedMemberName}
                </span>

                <button
                  onClick={() => {
                    const nextSt = cs.status === 'Pending' ? 'In Progress' : cs.status === 'In Progress' ? 'Completed' : 'Pending';
                    updateScheduleStatus(cs.id, nextSt);
                  }}
                  className="text-[10px] text-amber-400 hover:underline font-semibold"
                >
                  Ubah Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans Grid List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">
            Daftar Rencana Makanan ({filteredPlans.length})
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlans.map((mp) => (
            <div 
              key={mp.id} 
              className="bg-slate-950 border border-slate-800/90 hover:border-slate-700 p-5 rounded-2xl space-y-3 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold">
                    {mp.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {mp.date} ({mp.timeString})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const nextSt = mp.status === 'Planned' ? 'Cooking' : mp.status === 'Cooking' ? 'Done' : 'Planned';
                      updateMealPlanStatus(mp.id, nextSt);
                    }}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold border transition-all ${
                      mp.status === 'Done' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                      mp.status === 'Cooking' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {mp.status === 'Done' ? 'Selesai' : mp.status === 'Cooking' ? 'Sedang Memasak' : 'Terjadwal'}
                  </button>

                  <button
                    onClick={() => deleteMealPlan(mp.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-white text-base">{mp.name}</h5>
                {mp.notes && <p className="text-xs text-slate-400 mt-1">{mp.notes}</p>}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80 text-slate-400">
                <span className="flex items-center gap-1 text-rose-400 font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  {mp.estimatedCalories} kcal
                </span>

                <span className="text-slate-300 flex items-center gap-1 font-medium">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  Tugas: {mp.assignedMemberName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Tambah Rencana Menu Makanan</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Nama Makanan / Menu:</label>
                <input
                  {...register('name')}
                  placeholder="Contoh: Sup Ayam Bening Rempah"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Kategori:</label>
                  <select
                    {...register('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Estimasi Kalori (kcal):</label>
                  <input
                    type="number"
                    {...register('estimatedCalories', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Tanggal:</label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Waktu Slot:</label>
                  <select
                    {...register('timeSlot')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                  >
                    <option value="Pagi">Pagi</option>
                    <option value="Siang">Siang</option>
                    <option value="Sore">Sore</option>
                    <option value="Malam">Malam</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Jam (HH:MM):</label>
                  <input
                    type="text"
                    {...register('timeString')}
                    placeholder="12:30"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Ditugaskan Memasak:</label>
                <select
                  {...register('assignedMemberId')}
                  onChange={(e) => {
                    const m = familyMembers.find(fm => fm.id === e.target.value);
                    if (m) {
                      setValue('assignedMemberId', m.id);
                      setValue('assignedMemberName', m.name);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Catatan Tambahan:</label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Contoh: Kurangi garam untuk Kakek, tambahkan potongan wortel lucu."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Simpan Rencana Makanan
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
