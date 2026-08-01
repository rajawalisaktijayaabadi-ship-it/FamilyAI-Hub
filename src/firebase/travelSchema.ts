/**
 * Firestore Schema Definition for AI Travel, Vacation & Family Event Center
 * Collections:
 * 1. travel_trip
 * 2. travel_category
 * 3. travel_itinerary
 * 4. travel_checklist
 * 5. travel_budget
 * 6. travel_document
 * 7. travel_health
 * 8. travel_safety
 * 9. travel_history
 * 10. travel_photo
 * 11. family_event
 * 12. event_planner
 * 13. travel_report
 * 14. travel_notification
 * 15. travel_recommendation
 */

export const FIRESTORE_TRAVEL_COLLECTIONS = {
  TRIPS: 'travel_trip',
  CATEGORIES: 'travel_category',
  ITINERARIES: 'travel_itinerary',
  CHECKLISTS: 'travel_checklist',
  BUDGETS: 'travel_budget',
  DOCUMENTS: 'travel_document',
  HEALTH: 'travel_health',
  SAFETY: 'travel_safety',
  HISTORY: 'travel_history',
  PHOTOS: 'travel_photo',
  EVENTS: 'family_event',
  EVENT_PLANNERS: 'event_planner',
  REPORTS: 'travel_report',
  NOTIFICATIONS: 'travel_notification',
  RECOMMENDATIONS: 'travel_recommendation',
} as const;

export interface FirestoreTravelTripDoc {
  id: string;
  name: string;
  category: string;
  destination: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  transportationType: string;
  status: 'Planned' | 'Ongoing' | 'Completed' | 'Cancelled';
  notes: string;
  coverImage: string;
  familyMemberIds: string[];
  createdAt: string;
}

export interface FirestoreFamilyEventDoc {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  description: string;
  status: 'Planning' | 'Confirmed' | 'Completed';
  organizerMemberId?: string;
}
