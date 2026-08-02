import { create } from 'zustand';
import { 
  TravelTrip, 
  TravelItinerary, 
  TravelChecklist, 
  TravelBudget, 
  Accommodation, 
  Transportation, 
  FamilyEvent, 
  EventPlanner, 
  TravelDocument, 
  TravelHealth, 
  TravelSafety, 
  TravelPhoto, 
  TravelHistory, 
  TravelReport, 
  TravelNotification, 
  TravelRecommendation 
} from '../types/travel';

interface TravelStoreState {
  trips: TravelTrip[];
  activeTripId: string | null;
  itineraries: TravelItinerary[];
  checklists: TravelChecklist[];
  budgets: TravelBudget[];
  accommodations: Accommodation[];
  transportations: Transportation[];
  familyEvents: FamilyEvent[];
  eventPlanners: EventPlanner[];
  documents: TravelDocument[];
  healthRecords: TravelHealth[];
  safetyRecords: TravelSafety[];
  photos: TravelPhoto[];
  travelHistory: TravelHistory[];
  reports: TravelReport[];
  notifications: TravelNotification[];
  recommendations: TravelRecommendation[];

  // Actions
  setActiveTripId: (id: string | null) => void;
  
  // Trip CRUD
  addTrip: (trip: Omit<TravelTrip, 'id' | 'createdAt'>) => void;
  updateTrip: (id: string, updated: Partial<TravelTrip>) => void;
  deleteTrip: (id: string) => void;

  // Itinerary
  addItinerary: (itinerary: Omit<TravelItinerary, 'id'>) => void;
  updateItinerary: (id: string, updated: Partial<TravelItinerary>) => void;
  deleteItinerary: (id: string) => void;

  // Checklist
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (item: Omit<TravelChecklist, 'id'>) => void;
  deleteChecklistItem: (id: string) => void;

  // Budget
  addBudgetItem: (item: Omit<TravelBudget, 'id'>) => void;
  updateBudgetItem: (id: string, updated: Partial<TravelBudget>) => void;
  deleteBudgetItem: (id: string) => void;

  // Accommodation & Transport
  addAccommodation: (acc: Omit<Accommodation, 'id'>) => void;
  addTransportation: (trans: Omit<Transportation, 'id'>) => void;

  // Events & Event Planner
  addEvent: (event: Omit<FamilyEvent, 'id'>) => void;
  updateEvent: (id: string, updated: Partial<FamilyEvent>) => void;
  deleteEvent: (id: string) => void;
  toggleEventChecklistItem: (plannerId: string, itemId: string) => void;
  addEventPlannerTask: (plannerId: string, title: string) => void;

  // Documents
  addDocument: (doc: Omit<TravelDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;

  // Photos
  addPhoto: (photo: Omit<TravelPhoto, 'id' | 'likesCount'>) => void;
  likePhoto: (id: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;

  // AI Generation
  generateAIItineraryForTrip: (tripId: string) => void;
  generateAITravelInsightsForTrip: (tripId?: string) => void;
}

const initialTrips: TravelTrip[] = [
  {
    id: 'trip-bali-01',
    name: 'Liburan Summer Paradise Bali',
    category: 'Liburan',
    destination: 'Nusa Dua & Ubud',
    country: 'Indonesia',
    city: 'Denpasar / Bali',
    startDate: '2026-08-15',
    endDate: '2026-08-20',
    durationDays: 6,
    transportationType: 'Pesawat terbang & Rental Mobil',
    status: 'Planned',
    notes: 'Liburan keluarga besar merayakan ulang tahun Rina dan relaksasi pantai.',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    familyMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
    createdAt: '2026-07-20'
  },
  {
    id: 'trip-jogja-02',
    name: 'Mudik & Heritage Tour Yogyakarta',
    category: 'Mudik',
    destination: 'Malioboro & Borobudur',
    country: 'Indonesia',
    city: 'Yogyakarta',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    durationDays: 5,
    transportationType: 'Kereta Taksaka Executive',
    status: 'Planned',
    notes: 'Kunjungan ke rumah Kakek-Nenek sekalian tur sejarah candi.',
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    familyMemberIds: ['mem-1', 'mem-2', 'mem-3'],
    createdAt: '2026-07-22'
  },
  {
    id: 'trip-bandung-03',
    name: 'Weekend Staycation Lembang',
    category: 'Staycation',
    destination: 'Lembang Resort & Spa',
    country: 'Indonesia',
    city: 'Bandung',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    durationDays: 3,
    transportationType: 'Mobil Pribadi',
    status: 'Completed',
    notes: 'Udara sejuk gunung dan memetik stroberi bersama anak-anak.',
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    familyMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
    createdAt: '2026-07-01'
  }
];

const initialItineraries: TravelItinerary[] = [
  {
    id: 'itin-1',
    tripId: 'trip-bali-01',
    dayNumber: 1,
    time: '08:30',
    location: 'Bandara Soekarno Hatta (CGK) - Terminal 3',
    activity: 'Check-in penerbangan Garuda Indonesia GA-402 menuju Denpasar.',
    transportation: 'Pesawat Garuda Indonesia',
    notes: 'Pastikan tiket e-boarding dan paspor/KTP sudah disiapkan di tas kecil.',
    status: 'Pending',
    estimatedCostIdr: 12000000
  },
  {
    id: 'itin-2',
    tripId: 'trip-bali-01',
    dayNumber: 1,
    time: '13:00',
    location: 'Bandara I Gusti Ngurah Rai (DPS)',
    activity: 'Penjemputan mobil rental Alphard dan makan siang Ayam Betutu Khas Bali.',
    transportation: 'Rental Alphard Bali',
    notes: 'Driver siap menunggu di pintu kedatangan domestik.',
    status: 'Pending',
    estimatedCostIdr: 750000
  },
  {
    id: 'itin-3',
    tripId: 'trip-bali-01',
    dayNumber: 2,
    time: '09:00',
    location: 'Pantai Pandawa & Water Sport Tanjung Benoa',
    activity: 'Aktivitas banana boat, parasailing, dan foto keluarga tepi pantai.',
    transportation: 'Rental Mobil',
    notes: 'Gunakan tabir surya dan pakaian ganti.',
    status: 'Pending',
    estimatedCostIdr: 2500000
  },
  {
    id: 'itin-4',
    tripId: 'trip-bali-01',
    dayNumber: 2,
    time: '18:00',
    location: 'Jimbaran Seafood Sunset',
    activity: 'Makan malam romantis tepi pantai sambil menikmati pemandangan matahari terbenam.',
    transportation: 'Rental Mobil',
    notes: 'Reservasi meja di Jimbaran Bay Seafood No. 12.',
    status: 'Pending',
    estimatedCostIdr: 1800000
  }
];

const initialChecklists: TravelChecklist[] = [
  { id: 'chk-1', tripId: 'trip-bali-01', category: 'Dokumen', itemName: 'KTP & E-Tiket Garuda Indonesia', quantity: 4, isPacked: true },
  { id: 'chk-2', tripId: 'trip-bali-01', category: 'Hotel', itemName: 'Voucher Hotel Grand Hyatt Bali', quantity: 1, isPacked: true },
  { id: 'chk-3', tripId: 'trip-bali-01', category: 'Pakaian', itemName: 'Pakaian Renang & Baju Santai Pantai', quantity: 8, isPacked: false },
  { id: 'chk-4', tripId: 'trip-bali-01', category: 'Obat', itemName: 'Kit P3K, Obat Alergi, Suplemen Anak', quantity: 1, isPacked: true },
  { id: 'chk-5', tripId: 'trip-bali-01', category: 'Gadget', itemName: 'Kamera Mirrorless & Charger Power Bank', quantity: 2, isPacked: false },
  { id: 'chk-6', tripId: 'trip-bali-01', category: 'Uang Tunai', itemName: 'Uang Tunai Pecahan Kecil untuk Tips/Parkir', quantity: 1, isPacked: true }
];

const initialBudgets: TravelBudget[] = [
  { id: 'bud-1', tripId: 'trip-bali-01', category: 'Transportasi', estimatedCostIdr: 14000000, actualCostIdr: 13500000, notes: 'Tiket PP Garuda + Rental Alphard 6 hari' },
  { id: 'bud-2', tripId: 'trip-bali-01', category: 'Hotel', estimatedCostIdr: 18000000, actualCostIdr: 17500000, notes: 'Grand Hyatt Resort Deluxe Ocean View' },
  { id: 'bud-3', tripId: 'trip-bali-01', category: 'Makan', estimatedCostIdr: 8000000, actualCostIdr: 6200000, notes: 'Jimbaran, Ayam Betutu, Seafood & Cafe Ubud' },
  { id: 'bud-4', tripId: 'trip-bali-01', category: 'Tiket Wisata', estimatedCostIdr: 5000000, actualCostIdr: 3800000, notes: 'Waterblow, GWK, Water Sport Tanjung Benoa' },
  { id: 'bud-5', tripId: 'trip-bali-01', category: 'Belanja', estimatedCostIdr: 6000000, actualCostIdr: 4500000, notes: 'Oleh-oleh Pie Susu & Kain Pantai' },
  { id: 'bud-6', tripId: 'trip-bali-01', category: 'Cadangan', estimatedCostIdr: 4000000, actualCostIdr: 1000000, notes: 'Dana darurat perjalanan' }
];

const initialAccommodations: Accommodation[] = [
  {
    id: 'acc-1',
    tripId: 'trip-bali-01',
    name: 'Grand Hyatt Bali Resort & Spa',
    type: 'Hotel',
    address: 'Kawasan Pariwisata Nusa Dua BTDC, Jl. Nusa Dua, Bali 80363',
    checkInDate: '2026-08-15',
    checkOutDate: '2026-08-20',
    bookingCode: 'HYATT-BALI-88912',
    contactPhone: '+62 361 771234',
    notes: 'Sudah dikonfirmasi sarapan pagi untuk 4 orang & request kamar interconnecting.'
  }
];

const initialTransportations: Transportation[] = [
  {
    id: 'trans-1',
    tripId: 'trip-bali-01',
    category: 'Pesawat',
    providerName: 'Garuda Indonesia (GA-402)',
    departureTime: '2026-08-15 08:30',
    arrivalTime: '2026-08-15 11:20',
    ticketNumber: '8812-9901-4431',
    seatNumber: '12A, 12B, 12C, 12D',
    notes: 'Termasuk bagasi 20kg per penumpang.'
  },
  {
    id: 'trans-2',
    tripId: 'trip-bali-01',
    category: 'Rental',
    providerName: 'Bali Luxury Transport (Toyota Alphard)',
    departureTime: '2026-08-15 12:00',
    arrivalTime: '2026-08-20 18:00',
    ticketNumber: 'RENTAL-ALP-992',
    notes: 'Sopir pribadi Bpk. I Wayan Sudiarta (+62 812-3456-7890).'
  }
];

const initialFamilyEvents: FamilyEvent[] = [
  {
    id: 'evt-1',
    name: 'Perayaan Ulang Tahun ke-10 Rina',
    type: 'Ulang Tahun',
    date: '2026-08-18',
    location: 'Grand Hyatt Ballroom Nusa Dua Bali',
    description: 'Pesta ulang tahun bernuansa tropis bersama keluarga dan kerabat terdekat.',
    status: 'Confirmed'
  },
  {
    id: 'evt-2',
    name: 'Silver Anniversary Pernikahan Ayah & Ibu (25 Tahun)',
    type: 'Anniversary',
    date: '2026-11-20',
    location: 'Restoran Bunga Rampai Jakarta',
    description: 'Syukuran ulang tahun pernikahan perak dan santap malam keluarga besar.',
    status: 'Planning'
  },
  {
    id: 'evt-3',
    name: 'Reuni & Family Gathering Trah Keluarga',
    type: 'Family Gathering',
    date: '2026-12-25',
    location: 'Villa Agung Puncak',
    description: 'Acara arisan tahunan dan tukar kado akhir tahun.',
    status: 'Planning'
  }
];

const initialEventPlanners: EventPlanner[] = [
  {
    id: 'ep-1',
    eventId: 'evt-1',
    name: 'Pesta Tropis Rina Bali',
    date: '2026-08-18',
    location: 'Grand Hyatt Nusa Dua',
    attendees: ['Ayah Hendra', 'Ibu Siska', 'Rina', 'Budi', 'Kakek Subroto'],
    budgetEstimatedIdr: 10000000,
    budgetActualIdr: 8500000,
    checklist: [
      { id: 'ec-1', title: 'Pesan Kue Ulang Tahun Coklat Tropis', done: true },
      { id: 'ec-2', title: 'Sewa Dekorasi Balon Pantai', done: true },
      { id: 'ec-3', title: 'Persiapan Suvenir Teman & Fotografer', done: false }
    ],
    vendorName: 'Bali Event Decorator',
    vendorPhone: '+62 811-9922-3344',
    status: 'Confirmed'
  }
];

const initialDocuments: TravelDocument[] = [
  {
    id: 'doc-1',
    tripId: 'trip-bali-01',
    title: 'E-Passport Ayah Hendra',
    docType: 'Paspor',
    fileUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    ownerMemberId: 'mem-1',
    expiryDate: '2030-05-12',
    notes: 'Masa berlaku masih 4 tahun lagi.'
  },
  {
    id: 'doc-2',
    tripId: 'trip-bali-01',
    title: 'E-Tiket Pesawat Garuda GA-402',
    docType: 'Tiket',
    fileUrl: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=600&q=80',
    ownerMemberId: 'mem-1',
    notes: 'Kode Booking: GA-BALI-9912'
  },
  {
    id: 'doc-3',
    tripId: 'trip-bali-01',
    title: 'Asuransi Perjalanan Domestik AXA',
    docType: 'Asuransi Perjalanan',
    fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    ownerMemberId: 'mem-1',
    expiryDate: '2026-08-25',
    notes: 'Polis No. AXA-TRV-882199'
  }
];

const initialHealthRecords: TravelHealth[] = [
  {
    id: 'th-1',
    tripId: 'trip-bali-01',
    medications: [
      'Antihistamin / Obat Alergi Rina',
      'Obat Parasetamol & Inhaler',
      'Vitamin C & Suplemen Daya Tahan Tubuh'
    ],
    vaccinesPlaceholder: [
      'Vaksinasi Covid-19 Booster 2',
      'Vaksin Influenza Tahunan'
    ],
    emergencyContacts: [
      { name: 'Dr. Budi Santoso (Dokter Keluarga)', phone: '+62 811-2233-4455', relation: 'Dokter Umum' },
      { name: 'RSUP Sanglah Denpasar', phone: '+62 361 227911', relation: 'Rumah Sakit Rujukan' }
    ],
    destinationHospitalsPlaceholder: [
      { name: 'BIMC Hospital Nusa Dua', address: 'Kawasan ITDC Blok D Nusa Dua', phone: '+62 361 761261' },
      { name: 'Siloam Hospitals Denpasar', address: 'Jl. Sunset Road No. 818 Kuta', phone: '+62 361 779900' }
    ]
  }
];

const initialSafetyRecords: TravelSafety[] = [
  {
    id: 'ts-1',
    tripId: 'trip-bali-01',
    emergencyContact: '+62 812-9988-7766 (Paman Bagus)',
    embassyPlaceholder: 'Kantor Layanan Darurat Domestik / Kemenparekraf Hotline 139',
    policePlaceholder: 'Polsek Kuta Selatan: +62 361 771500 | Panggilan Darurat: 110',
    insurancePolicyNumber: 'AXA-TRV-882199 (Layanan Bantuan 24 Jam: 1500733)',
    safetyNotes: 'Patuhi rambu keselamatan di area pantai dan simpan dokumen berharga di safe deposit box hotel.'
  }
];

const initialPhotos: TravelPhoto[] = [
  {
    id: 'pho-1',
    tripId: 'trip-bandung-03',
    photoUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    caption: 'Suasana pagi yang tenang di Lembang Resort & Spa Bandung.',
    location: 'Lembang, Bandung',
    date: '2026-07-11',
    taggedMemberIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4'],
    likesCount: 12
  },
  {
    id: 'pho-2',
    tripId: 'trip-bandung-03',
    photoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    caption: 'Memetik buah stroberi segar bersama anak-anak di kebun.',
    location: 'Kebun Stroberi Ciwidey',
    date: '2026-07-12',
    taggedMemberIds: ['mem-3', 'mem-4'],
    likesCount: 18
  }
];

const initialTravelHistory: TravelHistory[] = [
  {
    id: 'his-1',
    tripName: 'Liburan Akhir Tahun Labuan Bajo',
    destination: 'Pulau Komodo & Padar Island',
    startDate: '2025-12-20',
    endDate: '2025-12-26',
    durationDays: 7,
    totalCostIdr: 32000000,
    coverImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80',
    highlights: ['Sailing Komodo dengan Phinisi', 'Trekking Pulau Padar', 'Snorkeling Manta Point']
  },
  {
    id: 'his-2',
    tripName: 'Jelajah Kuliner & Budaya Solo',
    destination: 'Keraton Surakarta & Pasar Gede',
    startDate: '2025-06-12',
    endDate: '2025-06-15',
    durationDays: 4,
    totalCostIdr: 9500000,
    coverImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    highlights: ['Batik Kampong Laweyan', 'Nasi Liwet Keprabon', 'Pertunjukan Wayang Orang']
  }
];

const initialNotifications: TravelNotification[] = [
  {
    id: 'notif-1',
    tripId: 'trip-bali-01',
    title: 'Pengingat Keberangkatan',
    message: 'Liburan Summer Paradise Bali tinggal 14 hari lagi! Pastikan kelengkapan dokumen dan tiket.',
    type: 'Keberangkatan',
    timestamp: '2026-08-01 08:00',
    isRead: false
  },
  {
    id: 'notif-2',
    tripId: 'trip-bali-01',
    title: 'Checklist Pakaian & Peralatan',
    message: '3 item checklist seperti Pakaian Renang dan Power Bank belum ditandai selesai.',
    type: 'Checklist',
    timestamp: '2026-08-01 09:30',
    isRead: false
  }
];

const initialRecommendations: TravelRecommendation[] = [
  {
    id: 'rec-1',
    tripId: 'trip-bali-01',
    type: 'Weather',
    title: 'Prakiraan Cuaca Tropis Bali',
    recommendationText: 'Cuaca Nusa Dua diperkirakan hangat cerah (28-31°C). Siapkan tabir surya UV50+ dan baju berpori longgar.',
    date: '2026-08-01'
  },
  {
    id: 'rec-2',
    tripId: 'trip-bali-01',
    type: 'Budget',
    title: 'Status Realisasi Anggaran Perjalanan',
    recommendationText: 'Anggaran teralokasi Rp 55 Juta. Penghematan dari tiket promo Garuda menghemat Rp 1,5 Juta.',
    date: '2026-08-01'
  }
];

export const useTravelStore = create<TravelStoreState>((set, get) => ({
  trips: initialTrips,
  activeTripId: 'trip-bali-01',
  itineraries: initialItineraries,
  checklists: initialChecklists,
  budgets: initialBudgets,
  accommodations: initialAccommodations,
  transportations: initialTransportations,
  familyEvents: initialFamilyEvents,
  eventPlanners: initialEventPlanners,
  documents: initialDocuments,
  healthRecords: initialHealthRecords,
  safetyRecords: initialSafetyRecords,
  photos: initialPhotos,
  travelHistory: initialTravelHistory,
  reports: [],
  notifications: initialNotifications,
  recommendations: initialRecommendations,

  setActiveTripId: (id) => set({ activeTripId: id }),

  addTrip: (tripData) => {
    const newId = `trip-${Date.now()}`;
    const newTrip: TravelTrip = {
      ...tripData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({
      trips: [newTrip, ...state.trips],
      activeTripId: newId
    }));
  },

  updateTrip: (id, updated) => {
    set((state) => ({
      trips: state.trips.map((t) => (t.id === id ? { ...t, ...updated } : t))
    }));
  },

  deleteTrip: (id) => {
    set((state) => ({
      trips: state.trips.filter((t) => t.id !== id),
      activeTripId: state.activeTripId === id ? (state.trips.find(t => t.id !== id)?.id || null) : state.activeTripId
    }));
  },

  addItinerary: (itemData) => {
    const newItin: TravelItinerary = {
      ...itemData,
      id: `itin-${Date.now()}`
    };
    set((state) => ({
      itineraries: [...state.itineraries, newItin]
    }));
  },

  updateItinerary: (id, updated) => {
    set((state) => ({
      itineraries: state.itineraries.map((item) => (item.id === id ? { ...item, ...updated } : item))
    }));
  },

  deleteItinerary: (id) => {
    set((state) => ({
      itineraries: state.itineraries.filter((item) => item.id !== id)
    }));
  },

  toggleChecklistItem: (id) => {
    set((state) => ({
      checklists: state.checklists.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    }));
  },

  addChecklistItem: (itemData) => {
    const newChk: TravelChecklist = {
      ...itemData,
      id: `chk-${Date.now()}`
    };
    set((state) => ({
      checklists: [...state.checklists, newChk]
    }));
  },

  deleteChecklistItem: (id) => {
    set((state) => ({
      checklists: state.checklists.filter((item) => item.id !== id)
    }));
  },

  addBudgetItem: (itemData) => {
    const newBud: TravelBudget = {
      ...itemData,
      id: `bud-${Date.now()}`
    };
    set((state) => ({
      budgets: [...state.budgets, newBud]
    }));
  },

  updateBudgetItem: (id, updated) => {
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === id ? { ...b, ...updated } : b))
    }));
  },

  deleteBudgetItem: (id) => {
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id)
    }));
  },

  addAccommodation: (accData) => {
    const newAcc: Accommodation = {
      ...accData,
      id: `acc-${Date.now()}`
    };
    set((state) => ({
      accommodations: [...state.accommodations, newAcc]
    }));
  },

  addTransportation: (transData) => {
    const newTrans: Transportation = {
      ...transData,
      id: `trans-${Date.now()}`
    };
    set((state) => ({
      transportations: [...state.transportations, newTrans]
    }));
  },

  addEvent: (eventData) => {
    const newId = `evt-${Date.now()}`;
    const newEvt: FamilyEvent = {
      ...eventData,
      id: newId
    };
    set((state) => ({
      familyEvents: [newEvt, ...state.familyEvents]
    }));
  },

  updateEvent: (id, updated) => {
    set((state) => ({
      familyEvents: state.familyEvents.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
  },

  deleteEvent: (id) => {
    set((state) => ({
      familyEvents: state.familyEvents.filter((e) => e.id !== id)
    }));
  },

  toggleEventChecklistItem: (plannerId, itemId) => {
    set((state) => ({
      eventPlanners: state.eventPlanners.map((ep) => {
        if (ep.id === plannerId) {
          return {
            ...ep,
            checklist: (ep.checklist || []).map((chk) =>
              chk.id === itemId ? { ...chk, done: !chk.done } : chk
            )
          };
        }
        return ep;
      })
    }));
  },

  addEventPlannerTask: (plannerId, title) => {
    set((state) => ({
      eventPlanners: state.eventPlanners.map((ep) => {
        if (ep.id === plannerId) {
          return {
            ...ep,
            checklist: [...(ep.checklist || []), { id: `ec-${Date.now()}`, title, done: false }]
          };
        }
        return ep;
      })
    }));
  },

  addDocument: (docData) => {
    const newDoc: TravelDocument = {
      ...docData,
      id: `doc-${Date.now()}`
    };
    set((state) => ({
      documents: [newDoc, ...state.documents]
    }));
  },

  deleteDocument: (id) => {
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id)
    }));
  },

  addPhoto: (photoData) => {
    const newPhoto: TravelPhoto = {
      ...photoData,
      id: `pho-${Date.now()}`,
      likesCount: 0
    };
    set((state) => ({
      photos: [newPhoto, ...state.photos]
    }));
  },

  likePhoto: (id) => {
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p))
    }));
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    }));
  },

  generateAIItineraryForTrip: (tripId) => {
    const targetTrip = get().trips.find(t => t.id === tripId);
    if (!targetTrip) return;

    const sampleAIItineraries: TravelItinerary[] = [
      {
        id: `itin-ai-1-${Date.now()}`,
        tripId,
        dayNumber: 3,
        time: '09:00',
        location: `Pusat Kebudayaan & Wisata ${targetTrip.city}`,
        activity: 'Sesi tur edukasi budaya keluarga dan foto bersama spot ikonik.',
        transportation: 'Mobil Sewa',
        notes: 'AI Recommendation: Jalur ini tidak terlalu macet di pagi hari.',
        status: 'Pending',
        estimatedCostIdr: 500000
      },
      {
        id: `itin-ai-2-${Date.now()}`,
        tripId,
        dayNumber: 3,
        time: '12:30',
        location: `Restoran Ramah Keluarga ${targetTrip.city}`,
        activity: 'Makan siang kuliner khas daerah dan waktu istirahat santai anak/lansia.',
        transportation: 'Jalan Kaki / Mobil',
        notes: 'AI Recommendation: Pilih tempat duduk ber-AC agar anak-anak nyaman.',
        status: 'Pending',
        estimatedCostIdr: 850000
      },
      {
        id: `itin-ai-3-${Date.now()}`,
        tripId,
        dayNumber: 3,
        time: '16:00',
        location: 'Pusat Oleh-Oleh Khas Perjalanan',
        activity: 'Membeli suvenir, kerajinan lokal, dan kue oleh-oleh keluarga.',
        transportation: 'Mobil Sewa',
        notes: 'Saran AI: Gunakan pembayaran e-wallet/qris untuk transaksi cepat.',
        status: 'Pending',
        estimatedCostIdr: 1200000
      }
    ];

    set((state) => ({
      itineraries: [...state.itineraries, ...sampleAIItineraries]
    }));
  },

  generateAITravelInsightsForTrip: (tripId) => {
    const targetTrip = tripId ? get().trips.find(t => t.id === tripId) : get().trips[0];
    const today = new Date().toISOString().split('T')[0];

    const newRecs: TravelRecommendation[] = [
      {
        id: `rec-gen-${Date.now()}-1`,
        tripId: targetTrip?.id,
        type: 'Weather',
        title: `Prediksi Cuaca & Suhu: ${targetTrip?.destination || 'Destinasi'}`,
        recommendationText: 'Cuaca relatif stabil dan cerah berawan (27-30°C). Disarankan membawa payung lipat portabel dan kacamata hitam.',
        date: today
      },
      {
        id: `rec-gen-${Date.now()}-2`,
        tripId: targetTrip?.id,
        type: 'Health',
        title: 'Pengingat Suplemen & Beban Aktivitas',
        recommendationText: 'Rute perjalanan hari ke-2 cukup padat. Sediakan minum cukup dan jeda istirahat 30 menit setiap pergantian lokasi.',
        date: today
      }
    ];

    set((state) => ({
      recommendations: [...newRecs, ...state.recommendations]
    }));
  }
}));
