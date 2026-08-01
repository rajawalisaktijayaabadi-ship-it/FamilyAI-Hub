import { create } from 'zustand';
import { AIContext } from '../types/aiTypes';
import { ContextService } from '../services/contextService';

interface ContextStoreState {
  context: AIContext | null;
  setContext: (context: AIContext) => void;
  updateContextField: (field: keyof AIContext, value: any) => void;
  initContext: (currentUser: any, familyProfile: any, familyMembers: any[]) => void;
}

export const useContextStore = create<ContextStoreState>((set) => ({
  context: null,
  setContext: (context) => set({ context }),
  updateContextField: (field, value) => {
    set((state) => ({
      context: state.context ? { ...state.context, [field]: value } : null
    }));
  },
  initContext: (currentUser, familyProfile, familyMembers) => {
    const defaultCtx = ContextService.buildDefaultContext(currentUser, familyProfile, familyMembers);
    set({ context: defaultCtx });
  }
}));
