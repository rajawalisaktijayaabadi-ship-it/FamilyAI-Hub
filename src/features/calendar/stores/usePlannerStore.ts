import { create } from 'zustand';
import { PlannerSuggestion, PlannerHistory, FamilyTimePlan } from '../types/calendarTypes';
import { initialFamilyTimePlans } from '../data/initialCalendarData';
import { PlannerService } from '../services/plannerService';
import { useCalendarStore } from './useCalendarStore';

interface PlannerStoreState {
  suggestions: PlannerSuggestion[];
  history: PlannerHistory[];
  familyTimePlans: FamilyTimePlan[];

  // Actions
  generateSuggestions: () => void;
  acceptSuggestion: (id: string) => void;
  dismissSuggestion: (id: string) => void;
  addFamilyTimePlan: (plan: Omit<FamilyTimePlan, 'id'>) => void;
  toggleChecklistItem: (planId: string, itemId: string) => void;
}

export const usePlannerStore = create<PlannerStoreState>((set, get) => ({
  suggestions: [],
  history: [
    {
      id: 'hist-1',
      action: 'Menerima Rekomendasi Family Time',
      details: 'Menyetujui agenda Movie Night untuk hari Sabtu pukul 19:00',
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      acceptedBy: 'Ibu Siti'
    }
  ],
  familyTimePlans: initialFamilyTimePlans,

  generateSuggestions: () => {
    const calendarEvents = useCalendarStore.getState().events;
    const generated = PlannerService.generatePlannerSuggestions(calendarEvents);
    set({ suggestions: generated });
  },

  acceptSuggestion: (id) => {
    const { suggestions, history } = get();
    const target = suggestions.find(s => s.id === id);
    if (!target) return;

    // Convert suggestion to calendar event
    useCalendarStore.getState().addEvent({
      title: target.title,
      description: target.description,
      category: target.category,
      location: 'Kediaman Keluarga',
      startDate: target.suggestedDate,
      endDate: target.suggestedDate,
      startTime: target.suggestedTime,
      endTime: '18:00',
      color: '#6366f1',
      priority: 'high',
      reminder: '1h',
      repeat: 'Never',
      attachments: [],
      createdBy: 'AI Planner',
      assignedMemberIds: ['u-1', 'u-2', 'u-3', 'u-4'],
      assignedRoleCategory: 'family',
      status: 'scheduled',
      sourceModule: 'Manual'
    });

    const newHistory: PlannerHistory = {
      id: `hist-${Date.now()}`,
      action: `Menerima Saran AI: ${target.title}`,
      details: target.description,
      timestamp: new Date().toISOString(),
      acceptedBy: 'Ayah Rudi'
    };

    set({
      suggestions: suggestions.map(s => s.id === id ? { ...s, status: 'accepted' } : s),
      history: [newHistory, ...history]
    });
  },

  dismissSuggestion: (id) => {
    set((state) => ({
      suggestions: state.suggestions.map(s => s.id === id ? { ...s, status: 'dismissed' } : s)
    }));
  },

  addFamilyTimePlan: (plan) => {
    const newPlan: FamilyTimePlan = {
      ...plan,
      id: `ftp-${Date.now()}`
    };
    set((state) => ({
      familyTimePlans: [newPlan, ...state.familyTimePlans]
    }));
  },

  toggleChecklistItem: (planId, itemId) => {
    set((state) => ({
      familyTimePlans: state.familyTimePlans.map(plan => {
        if (plan.id === planId) {
          return {
            ...plan,
            preparedChecklist: plan.preparedChecklist.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          };
        }
        return plan;
      })
    }));
  }
}));
