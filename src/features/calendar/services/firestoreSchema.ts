/**
 * Firestore Schema Definition and Data Mapping Service for FamilyAI Hub Calendar
 * 
 * Target Firestore Collections:
 * 1. calendar_events
 * 2. calendar_category
 * 3. calendar_reminder
 * 4. calendar_repeat
 * 5. calendar_member
 * 6. planner_history
 * 7. planner_recommendation
 */

export const FIRESTORE_COLLECTIONS = {
  EVENTS: 'calendar_events',
  CATEGORIES: 'calendar_category',
  REMINDERS: 'calendar_reminder',
  REPEATS: 'calendar_repeat',
  MEMBERS: 'calendar_member',
  PLANNER_HISTORY: 'planner_history',
  PLANNER_RECOMMENDATIONS: 'planner_recommendation'
} as const;

export interface FirestoreCalendarEventDoc {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  color: string;
  priority: string;
  reminder: string;
  repeat: string;
  attachmentsJson: string;
  createdBy: string;
  assignedMemberIds: string[];
  assignedRoleCategory: string;
  status: string;
  sourceModule: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirestorePlannerRecommendationDoc {
  id: string;
  title: string;
  description: string;
  suggestedDate: string;
  suggestedTime: string;
  category: string;
  type: string;
  affectedMemberNames: string[];
  status: string;
  impactText: string;
}

export class FirestoreCalendarService {
  /**
   * Helper to format data ready for Firestore synchronization
   */
  static prepareEventDoc(event: any): FirestoreCalendarEventDoc {
    return {
      id: event.id,
      title: event.title,
      description: event.description || '',
      category: event.category,
      location: event.location || '',
      startDate: event.startDate,
      endDate: event.endDate || event.startDate,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color,
      priority: event.priority,
      reminder: event.reminder,
      repeat: event.repeat,
      attachmentsJson: JSON.stringify(event.attachments || []),
      createdBy: event.createdBy,
      assignedMemberIds: event.assignedMemberIds || [],
      assignedRoleCategory: event.assignedRoleCategory || 'all',
      status: event.status,
      sourceModule: event.sourceModule || 'Manual',
      createdAt: event.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}
