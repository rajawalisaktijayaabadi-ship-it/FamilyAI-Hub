import { create } from 'zustand';
import { AIMemory, ImportanceLevel } from '../types/aiTypes';
import { initialAIMemories, MemoryService } from '../services/memoryService';

interface MemoryStoreState {
  memories: AIMemory[];
  searchTerm: string;
  selectedCategory: string;
  selectedImportance: string;

  setSearchTerm: (term: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedImportance: (imp: string) => void;
  addMemory: (memory: Omit<AIMemory, 'id' | 'createdAt' | 'updatedAt' | 'lastUsed'>) => void;
  deleteMemory: (id: string) => void;
  updateMemoryImportance: (id: string, importance: ImportanceLevel) => void;
}

export const useMemoryStore = create<MemoryStoreState>((set) => ({
  memories: initialAIMemories,
  searchTerm: '',
  selectedCategory: 'Semua',
  selectedImportance: 'Semua',

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSelectedImportance: (imp) => set({ selectedImportance: imp }),

  addMemory: (memData) => {
    const newMem: AIMemory = {
      ...memData,
      id: `mem-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: 'Baru saja'
    };
    set((state) => ({ memories: [newMem, ...state.memories] }));
  },

  deleteMemory: (id) => {
    set((state) => ({ memories: state.memories.filter(m => m.id !== id) }));
  },

  updateMemoryImportance: (id, importance) => {
    set((state) => ({
      memories: state.memories.map(m => m.id === id ? { ...m, importance } : m)
    }));
  }
}));
