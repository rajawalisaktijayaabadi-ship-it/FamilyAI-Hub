import { create } from 'zustand';
import { 
  CalendarEvent, 
  CategoryInfo, 
  CalendarScope, 
  CalendarViewMode, 
  EventCategory, 
  EventPriority, 
  ReminderOption, 
  RepeatRule 
} from '../types/calendarTypes';
import { defaultCategories, initialCalendarEvents } from '../data/initialCalendarData';
import { CalendarService } from '../services/calendarService';
import { FirestoreCalendarService } from '../services/firestoreSchema';

interface CalendarStoreState {
  events: CalendarEvent[];
  categories: CategoryInfo[];
  activeView: CalendarViewMode;
  selectedDate: string; // YYYY-MM-DD
  searchQuery: string;
  filterCategory: string;
  filterPriority: string;
  filterMemberId: string;
  filterCalendarScope: CalendarScope;

  // Modal State
  isEventModalOpen: boolean;
  editingEvent: CalendarEvent | null;

  // Actions
  setActiveView: (view: CalendarViewMode) => void;
  setSelectedDate: (date: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  setFilterPriority: (priority: string) => void;
  setFilterMemberId: (memberId: string) => void;
  setFilterCalendarScope: (scope: CalendarScope) => void;

  // Event CRUD
  openAddEventModal: (initialDate?: string) => void;
  openEditEventModal: (event: CalendarEvent) => void;
  closeEventModal: () => void;
  addEvent: (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvent: (id: string, updatedData: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;

  // Filtered getter
  getFilteredEvents: () => CalendarEvent[];
}

const getTodayDate = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const useCalendarStore = create<CalendarStoreState>((set, get) => ({
  events: initialCalendarEvents,
  categories: defaultCategories,
  activeView: 'month',
  selectedDate: getTodayDate(),
  searchQuery: '',
  filterCategory: 'all',
  filterPriority: 'all',
  filterMemberId: 'all',
  filterCalendarScope: 'all',

  isEventModalOpen: false,
  editingEvent: null,

  setActiveView: (view) => set({ activeView: view }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
  setFilterMemberId: (memberId) => set({ filterMemberId: memberId }),
  setFilterCalendarScope: (scope) => set({ filterCalendarScope: scope }),

  openAddEventModal: (initialDate) => {
    set({
      isEventModalOpen: true,
      editingEvent: null,
      selectedDate: initialDate || get().selectedDate
    });
  },

  openEditEventModal: (event) => {
    set({
      isEventModalOpen: true,
      editingEvent: event
    });
  },

  closeEventModal: () => {
    set({
      isEventModalOpen: false,
      editingEvent: null
    });
  },

  addEvent: (eventData) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Prepare Firestore doc
    FirestoreCalendarService.prepareEventDoc(newEvent);

    set((state) => ({
      events: [newEvent, ...state.events],
      isEventModalOpen: false,
      editingEvent: null
    }));
  },

  updateEvent: (id, updatedData) => {
    set((state) => {
      const updatedList = state.events.map(evt => {
        if (evt.id === id) {
          const updatedEvt = {
            ...evt,
            ...updatedData,
            updatedAt: new Date().toISOString()
          };
          FirestoreCalendarService.prepareEventDoc(updatedEvt);
          return updatedEvt;
        }
        return evt;
      });

      return {
        events: updatedList,
        isEventModalOpen: false,
        editingEvent: null
      };
    });
  },

  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter(e => e.id !== id),
      isEventModalOpen: false,
      editingEvent: null
    }));
  },

  getFilteredEvents: () => {
    const { events, searchQuery, filterCategory, filterPriority, filterMemberId, filterCalendarScope } = get();
    return CalendarService.filterEvents(
      events,
      searchQuery,
      filterCategory,
      filterPriority,
      filterMemberId,
      filterCalendarScope
    );
  }
}));
