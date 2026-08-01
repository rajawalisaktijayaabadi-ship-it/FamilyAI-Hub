import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Home, 
  Utensils, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Clock, 
  X, 
  Wrench, 
  Calendar, 
  ShieldCheck, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useMealStore } from '../../../stores/useMealStore';
import { useKitchenStore } from '../../../stores/useKitchenStore';
import { leftoverSchema, kitchenAssetSchema, LeftoverFormValues, KitchenAssetFormValues } from '../schemas';
import { Leftover, KitchenAsset } from '../../../types';

export const KitchenManagementTab: React.FC = () => {
  const { 
    leftovers, 
    addLeftover, 
    deleteLeftover, 
    ingredients, 
    addIngredient, 
    deleteIngredient 
  } = useMealStore();

  const { 
    kitchenAssets, 
    addKitchenAsset, 
    markAssetCleaned, 
    deleteKitchenAsset 
  } = useKitchenStore();

  const [isLeftoverModalOpen, setIsLeftoverModalOpen] = useState<boolean>(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);

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

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Leftover & Kitchen Assets Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-400" />
              <span>Manajemen Sisa Makanan & Peralatan Dapur</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Kelola sisa makanan kulkas untuk zero waste dan pantau garansi & jadwal pembersihan peralatan dapur.
            </p>
          </div>

          <div className="flex items-center gap-2">
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

      {/* Grid: Leftovers Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Manajemen Sisa Makanan ({leftovers.length} Item)</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leftovers.map((loft) => (
            <div key={loft.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {loft.storageLocation} • {loft.portionsLeft} Porsi
                </span>

                <button
                  onClick={() => deleteLeftover(loft.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h5 className="font-bold text-white text-base">{loft.foodName}</h5>
                <p className="text-xs text-slate-400 mt-0.5">Disimpan: {loft.dateStored} • Kadaluwarsa: {loft.estimatedExpiryDate}</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 text-xs text-amber-200 space-y-1">
                <span className="font-bold block text-amber-400">💡 Rekomendasi Olahan AI:</span>
                <p>{loft.usageRecommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Kitchen Appliances & Assets */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-400" />
            <span>Aset Peralatan Dapur & Jadwal Perawatan</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kitchenAssets.map((asset) => (
            <div key={asset.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {asset.category}
                </span>

                <span className="text-[10px] font-bold text-emerald-400">
                  {asset.maintenanceStatus}
                </span>
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

      {/* Leftover Modal */}
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

      {/* Asset Modal */}
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
