import { create } from 'zustand';
import { NutritionSummary, NutritionInsight, SpecialDietCategory } from '../types/meal';
import { initialNutritionSummary, initialNutritionInsights } from '../data/mockMealData';

interface NutritionState {
  summary: NutritionSummary;
  insights: NutritionInsight[];
  activeSpecialDiet: SpecialDietCategory | 'Semua';
  waterIntakeMl: number;
  waterTargetMl: number;

  // Actions
  updateDailyGoal: (field: keyof NutritionSummary, value: number) => void;
  addWaterIntake: (amountMl: number) => void;
  setActiveSpecialDiet: (diet: SpecialDietCategory | 'Semua') => void;
  addInsight: (insight: NutritionInsight) => void;
}

export const useNutritionStore = create<NutritionState>((set) => ({
  summary: initialNutritionSummary,
  insights: initialNutritionInsights,
  activeSpecialDiet: 'Semua',
  waterIntakeMl: 1400,
  waterTargetMl: 2500,

  updateDailyGoal: (field, value) => set((state) => ({
    summary: {
      ...state.summary,
      [field]: value
    }
  })),

  addWaterIntake: (amountMl) => set((state) => ({
    waterIntakeMl: Math.min(state.waterTargetMl * 1.5, state.waterIntakeMl + amountMl)
  })),

  setActiveSpecialDiet: (diet) => set({ activeSpecialDiet: diet }),

  addInsight: (insight) => set((state) => ({
    insights: [insight, ...state.insights]
  }))
}));
