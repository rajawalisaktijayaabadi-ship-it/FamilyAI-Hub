import { create } from 'zustand';
import { AIRecommendation } from '../types/aiTypes';
import { RecommendationService } from '../services/recommendationService';

interface RecommendationStoreState {
  recommendations: AIRecommendation[];
  refreshRecommendations: () => void;
  dismissRecommendation: (id: string) => void;
}

export const useRecommendationStore = create<RecommendationStoreState>((set) => ({
  recommendations: RecommendationService.getDummyRecommendations(),
  refreshRecommendations: () => {
    set({ recommendations: RecommendationService.getDummyRecommendations() });
  },
  dismissRecommendation: (id) => {
    set((state) => ({ recommendations: state.recommendations.filter(r => r.id !== id) }));
  }
}));
