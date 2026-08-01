import { create } from 'zustand';
import { ReminderItem } from '../types/calendarTypes';
import { initialReminders } from '../data/initialCalendarData';

interface ReminderStoreState {
  reminders: ReminderItem[];
  addReminder: (reminder: Omit<ReminderItem, 'id' | 'createdAt'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

export const useReminderStore = create<ReminderStoreState>((set) => ({
  reminders: initialReminders,

  addReminder: (reminderData) => {
    const newReminder: ReminderItem = {
      ...reminderData,
      id: `rem-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    set((state) => ({
      reminders: [newReminder, ...state.reminders]
    }));
  },

  toggleReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.map(r => r.id === id ? { ...r, isCompleted: !r.isCompleted } : r)
    }));
  },

  deleteReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.filter(r => r.id !== id)
    }));
  }
}));
