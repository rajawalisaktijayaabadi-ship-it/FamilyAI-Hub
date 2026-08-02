import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Utensils, 
  Plus, 
  Search, 
  Clock, 
  Flame, 
  Heart, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Trash2, 
  Star,
  Baby,
  Smile,
  Users
} from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { Recipe, MealCategoryType } from '../../../types';
import { recipeSchema, RecipeFormValues } from '../schemas';

export const RecipeManagementTab: React.FC = () => {
  const { recipes, addRecipe, toggleFavoriteRecipe, deleteRecipe } = useMealStore();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      description: '',
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      servings: 4,
      difficulty: 'Mudah',
      category: 'Makan Siang',
      caloriesPerServing: 350,
      proteinGrams: 28,
      carbsGrams: 30,
      fatGrams: 12,
      photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      isKidFriendly: true,
      isSeniorFriendly: true,
      specialDietTag: 'Tinggi Protein'
    }
  });

  const onSubmit = (data: RecipeFormValues) => {
    const newRecipe: Recipe = {
      id: `recipe-${Date.now()}`,
      name: data.name,
      description: data.description,
      ingredients: [
        { name: 'Bahan Utama A', quantity: '250', unit: 'g', inStock: true },
        { name: 'Bumbu Halus Dasar', quantity: '2', unit: 'sdm', inStock: true }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Persiapkan semua bahan dan cuci hingga bersih.' },
        { stepNumber: 2, instruction: 'Tumis bumbu halus dan masak hingga matang sempurna.' }
      ],
      prepTimeMinutes: data.prepTimeMinutes,
      cookTimeMinutes: data.cookTimeMinutes,
      servings: data.servings,
      difficulty: data.difficulty,
      photoUrl: data.photoUrl,
      category: data.category as MealCategoryType,
      caloriesPerServing: data.caloriesPerServing,
      proteinGrams: data.proteinGrams,
      carbsGrams: data.carbsGrams,
      fatGrams: data.fatGrams,
      isFavorite: false,
      isKidFriendly: data.isKidFriendly,
      isSeniorFriendly: data.isSeniorFriendly,
      specialDietTag: data.specialDietTag as any,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addRecipe(newRecipe);
    setIsModalOpen(false);
    reset();
  };

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
                          r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || r.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Koleksi Resep & Manajemen Masakan</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Daftar resep favorit keluarga, lengkap dengan durasi, bahan, kalori, dan petunjuk langkah memasak.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama resep atau bahan..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Resep Baru</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['Semua', 'Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Minuman', 'Dessert'].map((cat) => (
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

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={recipe.photoUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-300 font-bold text-[10px]">
                    {recipe.category}
                  </span>
                  {recipe.isKidFriendly && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/80 text-white font-bold text-[9px] flex items-center gap-0.5">
                      <Baby className="w-3 h-3" /> Ramah Anak
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleFavoriteRecipe(recipe.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                    recipe.isFavorite ? 'bg-rose-500/80 text-white' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Recipe Body */}
              <div className="p-5 space-y-3">
                <h4 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                  {recipe.name}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {recipe.cookTimeMinutes} mnt
                  </span>

                  <span className="flex items-center gap-1 text-rose-400 font-semibold">
                    <Flame className="w-3.5 h-3.5" />
                    {recipe.caloriesPerServing} kcal
                  </span>

                  <span className="text-slate-300 font-medium">
                    {recipe.servings} Porsi
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-800/60 mt-3">
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Lihat Resep</span>
              </button>

              <button
                onClick={() => deleteRecipe(recipe.id)}
                className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            
            <div className="relative h-60 bg-slate-950">
              <img
                src={selectedRecipe.photoUrl}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold uppercase">
                  {selectedRecipe.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedRecipe.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto text-xs text-slate-300">
              
              <div className="grid grid-cols-4 gap-2 text-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Durasi</span>
                  <span className="font-bold text-amber-400">{selectedRecipe.cookTimeMinutes} Mnt</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Kalori</span>
                  <span className="font-bold text-rose-400">{selectedRecipe.caloriesPerServing} kcal</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Porsi</span>
                  <span className="font-bold text-emerald-400">{selectedRecipe.servings} Orang</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Tingkat</span>
                  <span className="font-bold text-indigo-400">{selectedRecipe.difficulty}</span>
                </div>
              </div>

              {/* Video Placeholder */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Play className="w-5 h-5 fill-rose-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">Video Tutorial Memasak (Placeholder)</h5>
                    <p className="text-[10px] text-slate-400">Panduan visual step-by-step koki keluarga</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert('Video tutorial memasak interaktif akan diputar!')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] rounded-xl"
                >
                  Putar Video
                </button>
              </div>

              {/* Ingredients & Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-amber-400 uppercase text-[11px]">Bahan-bahan Diperlukan:</h5>
                  <ul className="space-y-1">
                    {(selectedRecipe.ingredients || []).map((ing, idx) => (
                      <li key={idx} className="flex items-center justify-between text-slate-300">
                        <span>{ing.name}</span>
                        <span className="font-mono text-amber-300">{ing.quantity} {ing.unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-emerald-400 uppercase text-[11px]">Langkah Memasak:</h5>
                  <ol className="space-y-2">
                    {(selectedRecipe.steps || []).map((st, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold text-emerald-400">{st.stepNumber}.</span>
                        <span>{st.instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>Buat Resep Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Resep:</label>
                <input
                  {...register('name')}
                  placeholder="Contoh: Salmon Grill Lemon Herbs"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                />
                {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Deskripsi Singkat:</label>
                <textarea
                  {...register('description')}
                  rows={2}
                  placeholder="Sajian salmon sehat kaya Omega-3 dipanggang dengan lemon segar..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Porsi:</label>
                  <input
                    type="number"
                    {...register('servings', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Masak (Mnt):</label>
                  <input
                    type="number"
                    {...register('cookTimeMinutes', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Kalori (kcal):</label>
                  <input
                    type="number"
                    {...register('caloriesPerServing', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">URL Foto Resep:</label>
                <input
                  {...register('photoUrl')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
                  <input type="checkbox" {...register('isKidFriendly')} className="rounded bg-slate-950 border-slate-800" />
                  <span>Ramah Anak</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
                  <input type="checkbox" {...register('isSeniorFriendly')} className="rounded bg-slate-950 border-slate-800" />
                  <span>Ramah Lansia</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
              >
                Simpan Resep
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
