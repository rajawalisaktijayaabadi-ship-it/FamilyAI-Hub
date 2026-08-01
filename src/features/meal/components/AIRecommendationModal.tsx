import React, { useState } from 'react';
import { X, Sparkles, Utensils, Clock, Flame, CheckCircle2, ShoppingCart, PlusCircle, AlertCircle } from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { Recipe, MealPlan } from '../../../types/meal';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({ isOpen, onClose }) => {
  const { ingredients, addRecipe, addMealPlan } = useMealStore();
  
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Dada Ayam Fillet', 'Wortel Organik', 'Brokoli Segar', 'Bawang Putih'
  ]);
  const [dietary, setDietary] = useState<string>('Sehat Seimbang (Ramah Anak)');
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>({
    title: 'Capcay Ayam Cah Wijen & Jamur Kancing',
    prepTime: '10 Menit',
    cookTime: '15 Menit',
    calories: '320 kcal/porsi',
    category: 'Makan Siang',
    difficulty: 'Mudah',
    servings: 4,
    ingredientsUsed: ['Dada Ayam Fillet (300g)', 'Wortel Organik (2 buah)', 'Brokoli Segar (1 bonggol)', 'Bawang Putih (3 siung)'],
    missingIngredients: ['Minyak Wijen (1 sdm)'],
    steps: [
      'Potong dada ayam tipis memanjang, lumuri sedikit lada dan minyak wijen.',
      'Tumis bawang putih dengan sedikit minyak zaitun hingga harum.',
      'Masukan ayam, masak 4 menit hingga berubah warna.',
      'Masukan wortel dan brokoli, tambahkan sedikit air dan bumbu rasa gurih lembut.',
      'Masak 5 menit hingga sayur renyah matang sempurna. Sajikan hangat!'
    ],
    kidTip: 'Potong wortel menggunakan cetakan bintang/bunga agar si kecil tertarik mencoba!',
    seniorTip: 'Tekstur brokoli ditiup agak empuk agar nyaman dikunyah Kakek/Nenek.',
    nutritionHighlight: 'Tinggi Protein murni, Vitamin A & C imun tubuh, dan Serat pangan halus.'
  });

  if (!isOpen) return null;

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Simulate Gemini AI latency with fallback
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const isChickenSelected = selectedIngredients.some(i => i.toLowerCase().includes('ayam'));
      const isEggSelected = selectedIngredients.some(i => i.toLowerCase().includes('telur'));

      let newTitle = 'Sup Bening Sayur Pelangi & Bola Tahu';
      if (isChickenSelected) {
        newTitle = 'Ayam Tumis Brokoli Garlic Butter';
      } else if (isEggSelected) {
        newTitle = 'Omelet Sayur Wijen Fluffy Kid-Friendly';
      }

      setGeneratedRecipe({
        title: newTitle,
        prepTime: '12 Menit',
        cookTime: '18 Menit',
        calories: '340 kcal/porsi',
        category: 'Makan Siang',
        difficulty: 'Mudah',
        servings: 4,
        ingredientsUsed: selectedIngredients.map(i => `${i} (Secukupnya)`),
        missingIngredients: ['Garam Low Sodium', 'Lada Putih'],
        steps: [
          'Siapkan dan cuci bersih semua bahan yang disukai keluarga.',
          'Tumis bumbu halus dasar dengan mentega / minyak zaitun hingga wangi.',
          'Masukan bahan utama, aduk rata dan bumbui sesuai preferensi.',
          'Sajikan hangat selagi segar bersama nasi merah atau putih organik.'
        ],
        kidTip: 'Ajak anak menghias piring saji dengan taburan biji wijen!',
        seniorTip: 'Bumbu lembut rendah garam dan tanpa bahan pengawet.',
        nutritionHighlight: 'Mengoptimalkan bahan kulkas tersedia tanpa ada yang terbuang (Zero Waste).'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToRecipes = () => {
    if (!generatedRecipe) return;
    const newR: Recipe = {
      id: `recipe-ai-${Date.now()}`,
      name: generatedRecipe.title,
      description: generatedRecipe.nutritionHighlight,
      ingredients: generatedRecipe.ingredientsUsed.map((ing: string) => ({
        name: ing,
        quantity: '1',
        unit: 'porsi',
        inStock: true
      })),
      steps: generatedRecipe.steps.map((st: string, idx: number) => ({
        stepNumber: idx + 1,
        instruction: st
      })),
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      servings: generatedRecipe.servings || 4,
      difficulty: 'Mudah',
      photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      category: 'Makan Siang',
      caloriesPerServing: parseInt(generatedRecipe.calories) || 320,
      proteinGrams: 30,
      carbsGrams: 20,
      fatGrams: 12,
      isFavorite: true,
      isKidFriendly: true,
      isSeniorFriendly: true,
      specialDietTag: 'Tinggi Protein',
      createdAt: new Date().toISOString().split('T')[0]
    };

    addRecipe(newR);
    alert('Resep AI berhasil disimpan ke daftar Resep Favorit!');
  };

  const handleAddToMealPlan = () => {
    if (!generatedRecipe) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const newMp: MealPlan = {
      id: `mp-ai-${Date.now()}`,
      name: generatedRecipe.title,
      category: 'Makan Siang',
      date: todayStr,
      timeSlot: 'Siang',
      timeString: '12:30',
      assignedMemberId: 'mem-2',
      assignedMemberName: 'Ibu (Siti)',
      notes: `Resep Rekomendasi AI dari Stok Kulkas. ${generatedRecipe.kidTip}`,
      status: 'Planned',
      estimatedCalories: parseInt(generatedRecipe.calories) || 320
    };

    addMealPlan(newMp);
    alert('Rekomendasi Menu AI berhasil ditambahkan ke Jadwal Makan Siang Hari Ini!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900/60 via-purple-900/60 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>AI Master Chef & Menu Generator</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black tracking-wider uppercase">
                  Zero Waste Kulkas
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Rekomendasi resep bergizi otomatis dari ketersediaan isi kulkas Anda.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Ingredient Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-4 h-4" />
                <span>Pilih Bahan di Kulkas Saat Ini:</span>
              </label>
              <span className="text-xs text-slate-400">
                {selectedIngredients.length} bahan dipilih
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.name);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm shadow-amber-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-700'}`} />
                    <span>{ing.name}</span>
                    <span className="text-[10px] opacity-60">({ing.quantity} {ing.unit})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diet Preference Select */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Target & Preferensi Diet:</label>
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-xs text-slate-200 outline-none"
              >
                <option value="Sehat Seimbang (Ramah Anak)">Sehat Seimbang (Ramah Anak)</option>
                <option value="Tinggi Protein & Karbo Rendah">Tinggi Protein & Karbo Rendah</option>
                <option value="Rendah Garam (Ramah Lansia)">Rendah Garam (Ramah Lansia)</option>
                <option value="Vegetarian / Serba Sayur">Vegetarian / Serba Sayur</option>
                <option value="Rendah Gula & Bebas Gluten">Rendah Gula & Bebas Gluten</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenerate}
                disabled={loading || selectedIngredients.length === 0}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{loading ? 'AI Master Chef Meracik Resep...' : 'Buatkan Rekomendasi Menu AI'}</span>
              </button>
            </div>
          </div>

          {/* Generated Recipe Preview Card */}
          {generatedRecipe && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      {generatedRecipe.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> {generatedRecipe.prepTime} prep + {generatedRecipe.cookTime} masak
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-lg mt-1">{generatedRecipe.title}</h4>
                </div>

                <div className="text-right">
                  <span className="text-xs text-amber-400 font-bold block">{generatedRecipe.calories}</span>
                  <span className="text-[11px] text-slate-400">Kesulitan: {generatedRecipe.difficulty}</span>
                </div>
              </div>

              {/* Ingredients & Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Bahan Kulkas Terpakai</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {generatedRecipe.ingredientsUsed?.map((ing: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>

                  {generatedRecipe.missingIngredients?.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Bumbu Tambahan: {generatedRecipe.missingIngredients.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Langkah Ringkas</div>
                  <ol className="space-y-1.5 text-xs text-slate-300">
                    {generatedRecipe.steps?.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold text-emerald-400 shrink-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>

              {/* Family & Kid Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-purple-950/30 border border-purple-500/30 p-3 rounded-xl text-purple-200 space-y-1">
                  <span className="font-bold block text-purple-300">💡 Tips Ramah Anak:</span>
                  <span>{generatedRecipe.kidTip}</span>
                </div>
                <div className="bg-cyan-950/30 border border-cyan-500/30 p-3 rounded-xl text-cyan-200 space-y-1">
                  <span className="font-bold block text-cyan-300">👴 Tips Ramah Lansia:</span>
                  <span>{generatedRecipe.seniorTip}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToMealPlan}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Jadikan Menu Makan Siang Hari Ini</span>
                </button>
                <button
                  onClick={handleSaveToRecipes}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4 text-amber-400" />
                  <span>Simpan ke Resep</span>
                </button>
              </div>

            </div>
          )}

          {/* Disclaimer Banner required by Prompt 13 */}
          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Pemberitahuan Edukasi Nutrisi: </span>
              Sistem AI ini memberikan rekomendasi menu harian dan edukasi nutrisi umum berdasarkan stok bahan makanan Anda. AI bukan dokter atau ahli gizi medis.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
