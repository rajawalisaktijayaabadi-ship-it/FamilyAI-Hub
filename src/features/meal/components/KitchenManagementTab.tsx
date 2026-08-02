import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Utensils, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  X, 
  Wrench, 
  ShoppingBag,
  Minus,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { useKitchenStore } from '../../../stores/useKitchenStore';
import { 
  leftoverSchema, 
  kitchenAssetSchema, 
  ingredientSchema, 
  LeftoverFormValues, 
  KitchenAssetFormValues,
  IngredientFormValues
} from '../schemas';
import { Leftover, KitchenAsset, IngredientItem } from '../../../types';

export const KitchenManagementTab: React.FC = () => {
  const { 
    leftovers, 
    addLeftover, 
    deleteLeftover, 
    ingredients, 
    addIngredient, 
    updateIngredientQuantity,
    deleteIngredient 
  } = useMealStore();

  const { 
    kitchenAssets, 
    addKitchenAsset, 
    markAssetCleaned, 
    deleteKitchenAsset 
  } = useKitchenStore();

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState<boolean>(false);
  const [isLeftoverModalOpen, setIsLeftoverModalOpen] = useState<boolean>(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);

  // Ingredient Filters
  const [locationFilter, setLocationFilter] = useState<'Semua' | 'Kulkas' | 'Freezer' | 'Pantry' | 'Rak Bumbu'>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Ingredient Form
  const {
    register: registerIng,
    handleSubmit: handleSubmitIng,
    reset: resetIng,
    formState: { errors: errorsIng }
  } = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: '',
      quantity: 1,
      unit: 'buah',
      category: 'Sayuran',
      location: 'Kulkas',
      expirationDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      minStock: 1
    }
  });

  const onSubmitIngredient = (data: IngredientFormValues) => {
    const today = new Date().toISOString().split('T')[0];
    const expDate = new Date(data.expirationDate);
    const diffDays = Math.ceil((expDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    let status: IngredientItem['status'] = 'Segar';
    if (diffDays < 0) {
      status = 'Kedaluwarsa';
    } else if (diffDays <= 3) {
      status = 'Mendekati Kedaluwarsa';
    }

    const newIng: IngredientItem = {
      id: `ing-${Date.now()}`,
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      category: data.category as any,
      location: data.location as any,
      expirationDate: data.expirationDate,
      minStock: data.minStock,
      status: status,
      priceEst: 15000
    };

    addIngredient(newIng);
    setIsIngredientModalOpen(false);
    resetIng();
  };

  // Leftover Form
  const {
    register: registerLo,
    handleSubmit: handleSubmitLo,
    reset: resetLo,
    formState: { errors: errorsLo }
  } = useForm<LeftoverFormValues>({
    resolver: zodResolver(leftoverSchema),
    defaultValues: {
      foodName: '',
      portionsLeft: 2,
      dateStored: new Date().toISOString().split('T')[0],
      estimatedExpiryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      storageLocation: 'Kulkas',
      usageRecommendation: '',
      notes: ''
    }
  });

  const onSubmitLeftover = (data: LeftoverFormValues) => {
    const newL: Leftover = {
      id: `loft-${Date.now()}`,
      foodName: data.foodName,
      portionsLeft: data.portionsLeft,
      dateStored: data.dateStored,
      estimatedExpiryDate: data.estimatedExpiryDate,
      storageLocation: data.storageLocation,
      usageRecommendation: data.usageRecommendation,
      isSafeToEat: true,
      notes: data.notes
    };

    addLeftover(newL);
    setIsLeftoverModalOpen(false);
    resetLo();
  };

  // Asset Form
  const {
    register: registerAsset,
    handleSubmit: handleSubmitAsset,
    reset: resetAsset,
    formState: { errors: errorsAsset }
  } = useForm<KitchenAssetFormValues>({
    resolver: zodResolver(kitchenAssetSchema),
    defaultValues: {
      name: '',
      category: 'Air Fryer',
      brandModel: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiryDate: new Date(Date.now() + 86400000 * 365).toISOString().split('T')[0],
      maintenanceStatus: 'Baik',
      notes: ''
    }
  });

  const onSubmitAsset = (data: KitchenAssetFormValues) => {
    const today = new Date().toISOString().split('T')[0];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);

    const newA: KitchenAsset = {
      id: `kit-${Date.now()}`,
      name: data.name,
      category: data.category as any,
      brandModel: data.brandModel,
      purchaseDate: data.purchaseDate,
      warrantyExpiryDate: data.warrantyExpiryDate,
      lastCleanedDate: today,
      nextCleaningSchedule: nextDate.toISOString().split('T')[0],
      maintenanceStatus: data.maintenanceStatus as any,
      notes: data.notes
    };

    addKitchenAsset(newA);
    setIsAssetModalOpen(false);
    resetAsset();
  };

  const filteredIngredients = ingredients.filter(ing => {
    const matchLocation = locationFilter === 'Semua' || ing.location === locationFilter;
    const matchSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ing.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLocation && matchSearch;
  });

  const expiringCount = ingredients.filter(i => i.status === 'Mendekati Kedaluwarsa' || i.status === 'Kedaluwarsa').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>Manajemen Bahan Kulkas, Sisa Makanan & Peralatan Dapur</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Catat dan pantau isi kulkas, cegah pemborosan bahan (Zero Waste), serta kelola jadwal pembersihan alat dapur.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsIngredientModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Bahan Kulkas</span>
            </button>

            <button
              onClick={() => setIsLeftoverModalOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Sisa Makanan</span>
            </button>

            <button
              onClick={() => setIsAssetModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-indigo-400" />
              <span>Tambah Alat Dapur</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Bahan Kulkas & Pantry (Ingredients Inventory) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">
              Stok Bahan Kulkas & Pantry ({ingredients.length} Item)
            </h4>
            {expiringCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {expiringCount} Mendekati Kedaluwarsa
              </span>
            )}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari bahan masakan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Location Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Lokasi:
          </span>
          {(['Semua', 'Kulkas', 'Freezer', 'Pantry', 'Rak Bumbu'] as const).map((loc) => (
            <button
              key={loc}
              onClick={() => setLocationFilter(loc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                locationFilter === loc
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Ingredients Grid */}
        {filteredIngredients.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800 text-xs">
            Belum ada bahan masakan di kategori/lokasi ini. Silakan klik "Tambah Bahan Kulkas".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIngredients.map((ing) => (
              <div key={ing.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3 relative group">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80 inline-block mb-1">
                      {ing.location} • {ing.category}
                    </span>
                    <h5 className="font-bold text-white text-sm">{ing.name}</h5>
                  </div>

                  <button
                    onClick={() => deleteIngredient(ing.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Hapus bahan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400">Kadaluwarsa:</span>
                  <span className={`font-semibold ${
                    ing.status === 'Mendekati Kedaluwarsa' || ing.status === 'Kedaluwarsa'
                      ? 'text-rose-400 font-bold'
                      : 'text-slate-200'
                  }`}>
                    {ing.expirationDate}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-xs">
                    <span className="text-[10px] text-slate-500 block">Jumlah Stok</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      {ing.quantity} {ing.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateIngredientQuantity(ing.id, Math.max(0, ing.quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-all"
                      title="Kurangi stok"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => updateIngredientQuantity(ing.id, ing.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center transition-all"
                      title="Tambah stok"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`px-2 py-0.5 rounded-full font-bold ${
                    ing.status === 'Segar'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : ing.status === 'Habis'
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                  }`}>
                    Status: {ing.status}
                  </span>
                  {ing.priceEst && (
                    <span className="text-slate-500">
                      Est. Rp {ing.priceEst.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Manajemen Sisa Makanan Kulkas (Leftovers) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Manajemen Sisa Makanan Kulkas ({leftovers.length} Item)</span>
          </h4>
          <button
            onClick={() => setIsLeftoverModalOpen(true)}
            className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Sisa Makanan
          </button>
        </div>

        {leftovers.length === 0 ? (
          <div className="p-6 text-center text-slate-500 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800 text-xs">
            Tidak ada sisa makanan di kulkas saat ini. Bagus! Tidak ada makanan terbuang.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leftovers.map((loft) => (
              <div key={loft.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {loft.storageLocation} • {loft.portionsLeft} Porsi Sisa
                  </span>

                  <button
                    onClick={() => deleteLeftover(loft.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Tandai Sudah Habis / Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h5 className="font-bold text-white text-base">{loft.foodName}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Disimpan: {loft.dateStored} • Perkiraan Kadaluwarsa: {loft.estimatedExpiryDate}</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 text-xs text-amber-200 space-y-1">
                  <span className="font-bold block text-amber-400">💡 Rekomendasi Olahan AI:</span>
                  <p>{loft.usageRecommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: Kitchen Appliances & Assets */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-400" />
            <span>Aset Peralatan Dapur & Perawatan</span>
          </h4>
          <button
            onClick={() => setIsAssetModalOpen(true)}
            className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Alat Dapur
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kitchenAssets.map((asset) => (
            <div key={asset.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {asset.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400">
                    {asset.maintenanceStatus}
                  </span>
                  <button
                    onClick={() => deleteKitchenAsset(asset.id)}
                    className="text-slate-500 hover:text-rose-400"
                    title="Hapus alat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-white text-sm">{asset.name}</h5>
                <p className="text-xs text-slate-400">{asset.brandModel}</p>
              </div>

              <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Dibersihkan:</span>
                  <span className="font-mono">{asset.lastCleanedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Jadwal Bersih:</span>
                  <span className="font-mono text-amber-400">{asset.nextCleaningSchedule}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Garansi:</span>
                  <span className="font-mono text-cyan-400">{asset.warrantyExpiryDate}</span>
                </div>
              </div>

              <button
                onClick={() => markAssetCleaned(asset.id)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tandai Sudah Dibersihkan</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: Ingredient Form Modal */}
      {isIngredientModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span>Tambah Bahan Kulkas & Pantry</span>
              </h3>
              <button onClick={() => setIsIngredientModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitIng(onSubmitIngredient)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Bahan Masakan:</label>
                <input
                  {...registerIng('name')}
                  placeholder="Contoh: Wortel Organik / Keju Cheddar"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                />
                {errorsIng.name && <p className="text-[10px] text-rose-400 mt-1">{errorsIng.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Jumlah Stok:</label>
                  <input
                    type="number"
                    {...registerIng('quantity', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                  />
                  {errorsIng.quantity && <p className="text-[10px] text-rose-400 mt-1">{errorsIng.quantity.message}</p>}
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Satuan:</label>
                  <input
                    {...registerIng('unit')}
                    placeholder="g, kg, buah, liter, butir, bonggol..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                  />
                  {errorsIng.unit && <p className="text-[10px] text-rose-400 mt-1">{errorsIng.unit.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Lokasi Penyimpanan:</label>
                  <select
                    {...registerIng('location')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                  >
                    <option value="Kulkas">Kulkas (Chiller)</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Rak Bumbu">Rak Bumbu</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Kategori Bahan:</label>
                  <select
                    {...registerIng('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                  >
                    <option value="Sayuran">Sayuran</option>
                    <option value="Daging & Unggas">Daging & Unggas</option>
                    <option value="Ikan & Seafood">Ikan & Seafood</option>
                    <option value="Buah">Buah</option>
                    <option value="Bumbu & Rempah">Bumbu & Rempah</option>
                    <option value="Susu & Olahan">Susu & Olahan</option>
                    <option value="Biji & Beras">Biji & Beras</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Tanggal Kedaluwarsa:</label>
                  <input
                    type="date"
                    {...registerIng('expirationDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Minimal Stok Peringatan:</label>
                  <input
                    type="number"
                    {...registerIng('minStock', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow transition-all"
              >
                Simpan Bahan Masakan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Leftover Modal */}
      {isLeftoverModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Catat Sisa Makanan Kulkas</h3>
              <button onClick={() => setIsLeftoverModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitLo(onSubmitLeftover)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Sisa Makanan:</label>
                <input
                  {...registerLo('foodName')}
                  placeholder="Contoh: Sup Ayam Bening Sisa Siang"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                />
                {errorsLo.foodName && <p className="text-[10px] text-rose-400 mt-1">{errorsLo.foodName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Jumlah Porsi Sisa:</label>
                  <input
                    type="number"
                    {...registerLo('portionsLeft', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Lokasi Penyimpanan:</label>
                  <select
                    {...registerLo('storageLocation')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                  >
                    <option value="Kulkas">Kulkas (Chiller)</option>
                    <option value="Freezer">Freezer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Rekomendasi Olahan AI:</label>
                <textarea
                  {...registerLo('usageRecommendation')}
                  rows={2}
                  placeholder="Contoh: Sangat cocok dijadikan Nasi Goreng Spesial esok hari."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition-all"
              >
                Simpan Sisa Makanan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Asset Modal */}
      {isAssetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Tambah Aset Alat Dapur</h3>
              <button onClick={() => setIsAssetModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAsset(onSubmitAsset)} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Alat Dapur:</label>
                <input
                  {...registerAsset('name')}
                  placeholder="Contoh: Air Fryer Digital 4L"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
                {errorsAsset.name && <p className="text-[10px] text-rose-400 mt-1">{errorsAsset.name.message}</p>}
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Merk / Tipe:</label>
                <input
                  {...registerAsset('brandModel')}
                  placeholder="Contoh: Philips HD9252"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Kategori:</label>
                  <select
                    {...registerAsset('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  >
                    <option value="Air Fryer">Air Fryer</option>
                    <option value="Blender">Blender</option>
                    <option value="Oven">Oven</option>
                    <option value="Kompor">Kompor</option>
                    <option value="Kulkas Smart">Kulkas Smart</option>
                    <option value="Rice Cooker">Rice Cooker</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-400 block mb-1">Akhir Garansi:</label>
                  <input
                    type="date"
                    {...registerAsset('warrantyExpiryDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow transition-all"
              >
                Simpan Alat Dapur
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

