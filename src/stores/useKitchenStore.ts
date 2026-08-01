import { create } from 'zustand';
import { KitchenAsset } from '../types/meal';
import { initialKitchenAssets } from '../data/mockMealData';

interface KitchenState {
  kitchenAssets: KitchenAsset[];
  
  // Actions
  addKitchenAsset: (asset: KitchenAsset) => void;
  updateKitchenAsset: (id: string, updated: Partial<KitchenAsset>) => void;
  deleteKitchenAsset: (id: string) => void;
  markAssetCleaned: (id: string) => void;
}

export const useKitchenStore = create<KitchenState>((set) => ({
  kitchenAssets: initialKitchenAssets,

  addKitchenAsset: (asset) => set((state) => ({
    kitchenAssets: [asset, ...state.kitchenAssets]
  })),

  updateKitchenAsset: (id, updated) => set((state) => ({
    kitchenAssets: state.kitchenAssets.map((a) => a.id === id ? { ...a, ...updated } : a)
  })),

  deleteKitchenAsset: (id) => set((state) => ({
    kitchenAssets: state.kitchenAssets.filter((a) => a.id !== id)
  })),

  markAssetCleaned: (id) => set((state) => ({
    kitchenAssets: state.kitchenAssets.map((a) => {
      if (a.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 7);
        return {
          ...a,
          lastCleanedDate: today,
          nextCleaningSchedule: nextDate.toISOString().split('T')[0],
          maintenanceStatus: 'Baik'
        };
      }
      return a;
    })
  }))
}));
