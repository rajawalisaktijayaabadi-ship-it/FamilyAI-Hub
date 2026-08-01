export type EventCategory =
  | 'Sekolah'
  | 'Kerja'
  | 'Meeting'
  | 'Olahraga'
  | 'Belanja'
  | 'Dokter'
  | 'Liburan'
  | 'Keluarga'
  | 'Ulang Tahun'
  | 'Keuangan'
  | 'Asuransi'
  | 'Kesehatan'
  | 'Parenting'
  | 'Pendidikan'
  | 'Lainnya';

export type EventPriority = 'low' | 'medium' | 'high';

export type EventStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export type RepeatRule = 'Never' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Custom';

export type ReminderOption =
  | 'none'
  | '5m'
  | '10m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '1d'
  | '3d'
  | '1w';

export type CalendarScope = 'all' | 'personal' | 'family' | 'kids' | 'spouse' | 'seniors';

export type CalendarViewMode = 'day' | 'week' | 'month' | 'agenda' | 'timeline';

export interface EventAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  color: string;
  priority: EventPriority;
  reminder: ReminderOption;
  repeat: RepeatRule;
  customRepeatDays?: number[]; // 0=Sun, 1=Mon, etc.
  attachments: EventAttachment[];
  createdBy: string; // member id or name
  assignedMemberIds: string[]; // member ids
  assignedRoleCategory?: CalendarScope;
  status: EventStatus;
  sourceModule?:
    | 'Mood'
    | 'Psychology'
    | 'Education'
    | 'Finance'
    | 'Health'
    | 'Shopping'
    | 'Meal'
    | 'Insurance'
    | 'Travel'
    | 'SmartHome'
    | 'Safety'
    | 'Parenting'
    | 'Manual';
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInfo {
  id: string;
  name: EventCategory;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  iconName: string;
}

export interface ReminderItem {
  id: string;
  title: string;
  description?: string;
  category: EventCategory | 'Task' | 'Birthday' | 'Reminder';
  type: 'event' | 'task' | 'birthday' | 'reminder';
  targetId?: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
  assignedMemberId: string;
  assignedMemberName: string;
  isCompleted: boolean;
  priority: EventPriority;
  reminderOption: ReminderOption;
  createdAt: string;
}

export interface PlannerSuggestion {
  id: string;
  title: string;
  description: string;
  suggestedDate: string;
  suggestedTime: string;
  category: EventCategory;
  type: 'family_time' | 'free_time' | 'conflict_resolution' | 'routine';
  affectedMemberNames: string[];
  status: 'pending' | 'accepted' | 'dismissed';
  impactText: string;
}

export interface PlannerHistory {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  acceptedBy: string;
}

export interface FamilyTimePlan {
  id: string;
  activityType: 'Movie Night' | 'Dinner' | 'Vacation' | 'Game Night' | 'Picnic' | 'Custom';
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  preparedChecklist: { id: string; item: string; completed: boolean }[];
  status: 'planned' | 'completed' | 'cancelled';
}

export interface CalendarConflict {
  id: string;
  date: string;
  eventA: CalendarEvent;
  eventB: CalendarEvent;
  conflictReason: string;
  suggestedResolution: string;
}
