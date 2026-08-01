export type TravelCategory = 
  | 'Liburan' 
  | 'Mudik' 
  | 'Bisnis' 
  | 'Sekolah' 
  | 'Family Gathering' 
  | 'Staycation' 
  | 'Road Trip' 
  | 'Camping' 
  | 'Honeymoon' 
  | 'Religi' 
  | 'Medical Trip' 
  | 'Custom';

export type TripStatus = 'Planned' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface TravelTrip {
  id: string;
  name: string;
  category: TravelCategory;
  destination: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  transportationType: string;
  status: TripStatus;
  notes: string;
  coverImage: string;
  familyMemberIds: string[]; // Member IDs participating
  createdAt: string;
}

export type ItineraryStatus = 'Pending' | 'In Progress' | 'Completed';

export interface TravelItinerary {
  id: string;
  tripId: string;
  dayNumber: number;
  time: string;
  location: string;
  activity: string;
  transportation?: string;
  notes?: string;
  status: ItineraryStatus;
  estimatedCostIdr?: number;
}

export type ChecklistCategory = 
  | 'Dokumen' 
  | 'Paspor' 
  | 'Visa' 
  | 'Tiket' 
  | 'Hotel' 
  | 'Pakaian' 
  | 'Obat' 
  | 'Peralatan Bayi' 
  | 'Peralatan Lansia' 
  | 'Gadget' 
  | 'Power Bank' 
  | 'Uang Tunai' 
  | 'Custom Item';

export interface TravelChecklist {
  id: string;
  tripId: string;
  category: ChecklistCategory;
  itemName: string;
  quantity: number;
  isPacked: boolean;
  assignedToMemberId?: string;
}

export type BudgetCategory = 
  | 'Transportasi' 
  | 'Hotel' 
  | 'Makan' 
  | 'Belanja' 
  | 'Tiket Wisata' 
  | 'Asuransi' 
  | 'Cadangan';

export interface TravelBudget {
  id: string;
  tripId: string;
  category: BudgetCategory;
  estimatedCostIdr: number;
  actualCostIdr: number;
  notes?: string;
}

export type AccommodationType = 'Hotel' | 'Villa' | 'Apartment' | 'Guest House' | 'Camping';

export interface Accommodation {
  id: string;
  tripId: string;
  name: string;
  type: AccommodationType;
  address: string;
  checkInDate: string;
  checkOutDate: string;
  bookingCode?: string;
  contactPhone?: string;
  notes?: string;
}

export type TransportCategory = 'Pesawat' | 'Kereta' | 'Mobil' | 'Bus' | 'Kapal' | 'Motor' | 'Rental';

export interface Transportation {
  id: string;
  tripId: string;
  category: TransportCategory;
  providerName: string;
  departureTime: string;
  arrivalTime: string;
  ticketNumber?: string;
  seatNumber?: string;
  notes?: string;
}

export type FamilyEventType = 
  | 'Ulang Tahun' 
  | 'Anniversary' 
  | 'Family Gathering' 
  | 'Reuni' 
  | 'Wisuda' 
  | 'Perayaan' 
  | 'Arisan' 
  | 'Syukuran' 
  | 'Custom Event';

export interface FamilyEvent {
  id: string;
  name: string;
  type: FamilyEventType;
  date: string;
  location: string;
  description: string;
  status: 'Planning' | 'Confirmed' | 'Completed';
  organizerMemberId?: string;
}

export interface EventChecklistItem {
  id: string;
  title: string;
  done: boolean;
}

export interface EventPlanner {
  id: string;
  eventId: string;
  name: string;
  date: string;
  location: string;
  attendees: string[]; // Member IDs or guest names
  budgetEstimatedIdr: number;
  budgetActualIdr: number;
  checklist: EventChecklistItem[];
  vendorName?: string;
  vendorPhone?: string;
  status: 'Planning' | 'Confirmed' | 'Completed';
  notes?: string;
}

export type TravelDocType = 
  | 'Paspor' 
  | 'Visa' 
  | 'Tiket' 
  | 'Voucher' 
  | 'Booking' 
  | 'Asuransi Perjalanan' 
  | 'Dokumen Penting';

export interface TravelDocument {
  id: string;
  tripId?: string;
  title: string;
  docType: TravelDocType;
  fileUrl: string;
  ownerMemberId: string;
  expiryDate?: string;
  notes?: string;
}

export interface TravelHealth {
  id: string;
  tripId: string;
  medications: string[];
  vaccinesPlaceholder: string[];
  emergencyContacts: { name: string; phone: string; relation: string }[];
  destinationHospitalsPlaceholder: { name: string; address: string; phone: string }[];
}

export interface TravelSafety {
  id: string;
  tripId: string;
  emergencyContact: string;
  embassyPlaceholder: string;
  policePlaceholder: string;
  insurancePolicyNumber: string;
  safetyNotes: string;
}

export interface TravelPhoto {
  id: string;
  tripId: string;
  photoUrl: string;
  videoPlaceholderUrl?: string;
  caption: string;
  location: string;
  date: string;
  taggedMemberIds: string[];
  likesCount: number;
}

export interface TravelHistory {
  id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalCostIdr: number;
  coverImage: string;
  highlights: string[];
}

export interface TravelReport {
  id: string;
  title: string;
  tripId: string;
  generatedDate: string;
  budgetSummary: string;
  checklistCompletionPercent: number;
  summaryText: string;
}

export interface TravelNotification {
  id: string;
  tripId?: string;
  title: string;
  message: string;
  type: 'Keberangkatan' | 'Checklist' | 'Hotel' | 'Dokumen' | 'Event' | 'Budget';
  timestamp: string;
  isRead: boolean;
}

export interface TravelRecommendation {
  id: string;
  tripId?: string;
  type: 'Weather' | 'Budget' | 'Health' | 'Safety' | 'Activity';
  title: string;
  recommendationText: string;
  date: string;
}
