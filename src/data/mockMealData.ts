import { 
  Recipe, 
  MealPlan, 
  IngredientItem, 
  NutritionSummary, 
  FamilyPreference, 
  Leftover, 
  KitchenAsset, 
  CookingSchedule, 
  MealHistory, 
  NutritionInsight, 
  MealReport 
} from '../types/meal';

export const initialRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    name: 'Ayam Tumis Mentega Wijen & Sayur Pelangi',
    description: 'Olahan dada ayam empuk dengan saus mentega wijen gurih dan sayuran manis warna-warni yang sangat disukai anak-anak.',
    ingredients: [
      { name: 'Dada Ayam Fillet', quantity: '500', unit: 'g', inStock: true },
      { name: 'Bawang Putih', quantity: '3', unit: 'siung', inStock: true },
      { name: 'Wortel', quantity: '1', unit: 'buah', inStock: true },
      { name: 'Brokoli Segar', quantity: '150', unit: 'g', inStock: true },
      { name: 'Mentega Wijen', quantity: '2', unit: 'sdm', inStock: true },
      { name: 'Kecap Manis Low Sodium', quantity: '1', unit: 'sdm', inStock: true }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Cincang halus bawang putih, potong ayam fillet bentuk dadu sedang.', durationMinutes: 5 },
      { stepNumber: 2, instruction: 'Tumis bawang putih dengan mentega wijen hingga harum keemasan.', durationMinutes: 4, tip: 'Gunakan api sedang agar mentega tidak gosong' },
      { stepNumber: 3, instruction: 'Masukan potongan dada ayam, masak hingga berubah warna kecokelatan.', durationMinutes: 6 },
      { stepNumber: 4, instruction: 'Masukan wortel dan brokoli, tambahkan bumbu kecap low sodium. Aduk hingga matang pas.', durationMinutes: 5 }
    ],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    difficulty: 'Mudah',
    photoUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    category: 'Sarapan',
    caloriesPerServing: 380,
    proteinGrams: 34,
    carbsGrams: 18,
    fatGrams: 14,
    fiberGrams: 4,
    isFavorite: true,
    isKidFriendly: true,
    isSeniorFriendly: true,
    specialDietTag: 'Tinggi Protein',
    createdAt: '2026-07-25'
  },
  {
    id: 'recipe-2',
    name: 'Sup Ayam Kampung Bening Rempah Jawa',
    description: 'Sup kuah bening kaya rempah jahe dan kapulaga, menghangatkan tubuh dan meningkatkan daya tahan tubuh keluarga.',
    ingredients: [
      { name: 'Ayam Kampung', quantity: '1/2', unit: 'ekor', inStock: true },
      { name: 'Kentang Organik', quantity: '2', unit: 'buah', inStock: true },
      { name: 'Wortel', quantity: '2', unit: 'buah', inStock: true },
      { name: 'Daun Bawang & Seledri', quantity: '2', unit: 'batang', inStock: true },
      { name: 'Jahe Geprek', quantity: '2', unit: 'cm', inStock: true }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Rebus ayam kampung hingga empuk dan mengeluarkan kaldu bening gurih.', durationMinutes: 30 },
      { stepNumber: 2, instruction: 'Masukan jahe geprek, kentang, dan wortel potong bulat.', durationMinutes: 10 },
      { stepNumber: 3, instruction: 'Bumbui dengan garam merica halus, taburi daun bawang hangat.', durationMinutes: 5 }
    ],
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    servings: 5,
    difficulty: 'Mudah',
    photoUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    category: 'Makan Siang',
    caloriesPerServing: 290,
    proteinGrams: 28,
    carbsGrams: 22,
    fatGrams: 9,
    fiberGrams: 5,
    isFavorite: true,
    isKidFriendly: true,
    isSeniorFriendly: true,
    specialDietTag: 'Rendah Lemak',
    createdAt: '2026-07-26'
  },
  {
    id: 'recipe-3',
    name: 'Salmon Panggang Lemon Herbs & Quinoa',
    description: 'Fillet salmon segar kaya Omega-3 dipanggang lembut dengan saus perasan lemon segar dan herbal oregano.',
    ingredients: [
      { name: 'Fillet Salmon Segar', quantity: '300', unit: 'g', inStock: true },
      { name: 'Perasan Lemon', quantity: '2', unit: 'sdm', inStock: true },
      { name: 'Minyak Zaitun', quantity: '1', unit: 'sdm', inStock: true },
      { name: 'Oregano Kering', quantity: '1', unit: 'sdt', inStock: true },
      { name: 'Bayam Jepang', quantity: '100', unit: 'g', inStock: true }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Lumuri salmon dengan lemon, minyak zaitun, dan taburan oregano.', durationMinutes: 5 },
      { stepNumber: 2, instruction: 'Panggang dalam Air Fryer atau teflon anti lengket selama 12 menit.', durationMinutes: 12 },
      { stepNumber: 3, instruction: 'Sajikan bersama tumisan bayam jepang harum.', durationMinutes: 3 }
    ],
    prepTimeMinutes: 8,
    cookTimeMinutes: 15,
    servings: 2,
    difficulty: 'Sedang',
    photoUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    category: 'Makan Malam',
    caloriesPerServing: 420,
    proteinGrams: 38,
    carbsGrams: 12,
    fatGrams: 22,
    fiberGrams: 3,
    isFavorite: false,
    isKidFriendly: false,
    isSeniorFriendly: true,
    specialDietTag: 'Tinggi Protein',
    createdAt: '2026-07-27'
  },
  {
    id: 'recipe-4',
    name: 'Smoothie Berry Superfood & Chia Seeds',
    description: 'Minuman nutrisi dingin menyegarkan dengan kombinasi blueberry, pisang, susu oat, dan chia seeds tinggi serat.',
    ingredients: [
      { name: 'Blueberry Segar', quantity: '100', unit: 'g', inStock: true },
      { name: 'Pisang Sunpride', quantity: '1', unit: 'buah', inStock: true },
      { name: 'Susu Oat Organik', quantity: '250', unit: 'ml', inStock: true },
      { name: 'Chia Seeds', quantity: '1', unit: 'sdm', inStock: true }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Masukan semua bahan ke dalam blender kecepatan tinggi.', durationMinutes: 2 },
      { stepNumber: 2, instruction: 'Blender halus selama 60 detik hingga tekstur velvety lembut.', durationMinutes: 1 }
    ],
    prepTimeMinutes: 3,
    cookTimeMinutes: 2,
    servings: 2,
    difficulty: 'Mudah',
    photoUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    category: 'Snack',
    caloriesPerServing: 180,
    proteinGrams: 6,
    carbsGrams: 32,
    fatGrams: 4,
    fiberGrams: 7,
    isFavorite: true,
    isKidFriendly: true,
    isSeniorFriendly: true,
    specialDietTag: 'Vegetarian',
    createdAt: '2026-07-28'
  }
];

export const initialMealPlans: MealPlan[] = [
  {
    id: 'mp-1',
    name: 'Ayam Tumis Mentega Wijen & Sayur Pelangi',
    category: 'Sarapan',
    date: '2026-08-01',
    timeSlot: 'Pagi',
    timeString: '07:00',
    assignedMemberId: 'mem-2',
    assignedMemberName: 'Ibu (Siti)',
    recipeId: 'recipe-1',
    notes: 'Potong wortel bentuk bintang untuk anak-anak.',
    status: 'Done',
    estimatedCalories: 380
  },
  {
    id: 'mp-2',
    name: 'Sup Ayam Kampung Bening Rempah Jawa',
    category: 'Makan Siang',
    date: '2026-08-01',
    timeSlot: 'Siang',
    timeString: '12:30',
    assignedMemberId: 'mem-1',
    assignedMemberName: 'Ayah (Budi)',
    recipeId: 'recipe-2',
    notes: 'Kurangi garam untuk Kakek.',
    status: 'Cooking',
    estimatedCalories: 290
  },
  {
    id: 'mp-3',
    name: 'Salmon Panggang Lemon Herbs & Quinoa',
    category: 'Makan Malam',
    date: '2026-08-01',
    timeSlot: 'Malam',
    timeString: '19:00',
    assignedMemberId: 'mem-2',
    assignedMemberName: 'Ibu (Siti)',
    recipeId: 'recipe-3',
    notes: 'Sajikan hangat bersama tumis bayam.',
    status: 'Planned',
    estimatedCalories: 420
  },
  {
    id: 'mp-4',
    name: 'Smoothie Berry Superfood',
    category: 'Snack',
    date: '2026-08-01',
    timeSlot: 'Sore',
    timeString: '16:00',
    assignedMemberId: 'mem-3',
    assignedMemberName: 'Kakak (Dina)',
    recipeId: 'recipe-4',
    notes: 'Snack bergizi sepulang sekolah.',
    status: 'Planned',
    estimatedCalories: 180
  }
];

export const initialIngredients: IngredientItem[] = [
  { id: 'ing-1', name: 'Dada Ayam Fillet', quantity: 1200, unit: 'g', category: 'Daging & Unggas', location: 'Freezer', expirationDate: '2026-08-06', minStock: 500, status: 'Segar', priceEst: 45000 },
  { id: 'ing-2', name: 'Wortel Organik', quantity: 8, unit: 'buah', category: 'Sayuran', location: 'Kulkas', expirationDate: '2026-08-03', minStock: 3, status: 'Mendekati Kedaluwarsa', priceEst: 12000 },
  { id: 'ing-3', name: 'Brokoli Segar', quantity: 2, unit: 'bonggol', category: 'Sayuran', location: 'Kulkas', expirationDate: '2026-08-02', minStock: 1, status: 'Mendekati Kedaluwarsa', priceEst: 18000 },
  { id: 'ing-4', name: 'Telur Ayam Omega-3', quantity: 18, unit: 'butir', category: 'Susu & Olahan', location: 'Kulkas', expirationDate: '2026-08-15', minStock: 6, status: 'Segar', priceEst: 32000 },
  { id: 'ing-5', name: 'Susu UHT Full Cream', quantity: 1, unit: 'liter', category: 'Susu & Olahan', location: 'Kulkas', expirationDate: '2026-08-01', minStock: 1, status: 'Mendekati Kedaluwarsa', priceEst: 22000 },
  { id: 'ing-6', name: 'Bawang Putih', quantity: 15, unit: 'siung', category: 'Bumbu & Rempah', location: 'Rak Bumbu', expirationDate: '2026-08-20', minStock: 5, status: 'Segar', priceEst: 8000 },
  { id: 'ing-7', name: 'Minyak Zaitun Extra Virgin', quantity: 500, unit: 'ml', category: 'Bumbu & Rempah', location: 'Pantry', expirationDate: '2026-12-01', minStock: 200, status: 'Segar', priceEst: 85000 },
  { id: 'ing-8', name: 'Beras Pandan Wangi Organik', quantity: 5, unit: 'kg', category: 'Biji & Beras', location: 'Pantry', expirationDate: '2026-10-15', minStock: 2, status: 'Segar', priceEst: 75000 }
];

export const initialNutritionSummary: NutritionSummary = {
  id: 'nutri-today',
  date: '2026-08-01',
  totalCalories: 1270,
  targetCalories: 2100,
  proteinGrams: 106,
  targetProteinGrams: 120,
  carbsGrams: 110,
  targetCarbsGrams: 220,
  fatGrams: 49,
  targetFatGrams: 65,
  fiberGrams: 19,
  targetFiberGrams: 28,
  sugarGrams: 24,
  sodiumMg: 1100,
  vitamins: [
    { name: 'Vitamin A', amount: '850 mcg', percentageOfDay: 95 },
    { name: 'Vitamin C', amount: '75 mg', percentageOfDay: 88 },
    { name: 'Vitamin D', amount: '12 mcg', percentageOfDay: 80 },
    { name: 'Vitamin B-Complex', amount: '1.8 mg', percentageOfDay: 90 }
  ],
  minerals: [
    { name: 'Kalsium', amount: '900 mg', percentageOfDay: 85 },
    { name: 'Zat Besi', amount: '14 mg', percentageOfDay: 78 },
    { name: 'Zinc', amount: '9.5 mg', percentageOfDay: 82 }
  ]
};

export const initialFamilyPreferences: FamilyPreference[] = [
  {
    id: 'pref-1',
    memberId: 'mem-1',
    memberName: 'Ayah (Budi)',
    favoriteFoods: ['Sup Ayam Bening', 'Salmon Grill', 'Sate Ayam Gurih'],
    dislikedFoods: ['Pare', 'Petai'],
    allergies: ['Udang Laut'],
    restrictions: ['Tinggi Protein', 'Kurangi Garam'],
    seniorPreferences: ''
  },
  {
    id: 'pref-2',
    memberId: 'mem-2',
    memberName: 'Ibu (Siti)',
    favoriteFoods: ['Salad Sayur Wijen', 'Smoothie Berry', 'Ayam Tumis Brokoli'],
    dislikedFoods: ['Jengkol'],
    allergies: [],
    restrictions: ['Rendah Gula', 'Bebas Gluten'],
    seniorPreferences: ''
  },
  {
    id: 'pref-3',
    memberId: 'mem-3',
    memberName: 'Kakak (Dina)',
    favoriteFoods: ['Ayam Mentega', 'Spaghetti Bolognese', 'Pancake Pisang'],
    dislikedFoods: ['Terong', 'Tomat Mentah'],
    allergies: ['Kacang Tanah'],
    restrictions: ['Bebas Kacang'],
    childPreferences: 'Suka makanan warna cerah dan rasa gurih manis lembut.'
  },
  {
    id: 'pref-4',
    memberId: 'mem-4',
    memberName: 'Kakek (Bambang)',
    favoriteFoods: ['Bubur Ayam Lembut', 'Sup Ikan Gurame Bening', 'Tahwa Kupang'],
    dislikedFoods: ['Makanan Pedas', 'Daging Alot'],
    allergies: [],
    restrictions: ['Rendah Garam', 'Lembut Mudah Dikunyah'],
    seniorPreferences: 'Tekstur empuk, minyak minimal, rendah garam.'
  }
];

export const initialLeftovers: Leftover[] = [
  {
    id: 'loft-1',
    foodName: 'Sup Ayam Bening Sisa Siang',
    portionsLeft: 2,
    dateStored: '2026-08-01',
    estimatedExpiryDate: '2026-08-03',
    storageLocation: 'Kulkas',
    usageRecommendation: 'Panaskan kembali untuk kuah makan malam atau campurkan telor kocok.',
    isSafeToEat: true,
    notes: 'Kulkas suhu 3°C aman'
  },
  {
    id: 'loft-2',
    foodName: 'Nasi Organik Sisa Kemarin',
    portionsLeft: 3,
    dateStored: '2026-07-31',
    estimatedExpiryDate: '2026-08-02',
    storageLocation: 'Kulkas',
    usageRecommendation: 'Sangat cocok diolah menjadi Nasi Goreng Sayur Pelangi tanpa minyak berlebih.',
    isSafeToEat: true,
    notes: 'Simpan di wadah kedap udara'
  }
];

export const initialKitchenAssets: KitchenAsset[] = [
  {
    id: 'kit-1',
    name: 'Air Fryer Digital 4L',
    category: 'Air Fryer',
    brandModel: 'Philips HD9252',
    purchaseDate: '2025-11-10',
    warrantyExpiryDate: '2027-11-10',
    lastCleanedDate: '2026-07-30',
    nextCleaningSchedule: '2026-08-05',
    maintenanceStatus: 'Baik',
    notes: 'Periksa elemen pemanas secara berkala'
  },
  {
    id: 'kit-2',
    name: 'Blender & Food Processor',
    category: 'Blender',
    brandModel: 'Miyako BL-152',
    purchaseDate: '2025-06-15',
    warrantyExpiryDate: '2026-06-15',
    lastCleanedDate: '2026-07-31',
    nextCleaningSchedule: '2026-08-07',
    maintenanceStatus: 'Baik',
    notes: 'Pisau tajam stainless aman'
  },
  {
    id: 'kit-3',
    name: 'Smart Refrigerator 4 Door',
    category: 'Kulkas Smart',
    brandModel: 'Samsung Family Hub',
    purchaseDate: '2025-01-20',
    warrantyExpiryDate: '2028-01-20',
    lastCleanedDate: '2026-07-20',
    nextCleaningSchedule: '2026-08-03',
    maintenanceStatus: 'Baik',
    notes: 'Filter udara deodorizer perlu dibersihkan pekan depan'
  }
];

export const initialCookingSchedules: CookingSchedule[] = [
  {
    id: 'cs-1',
    mealPlanId: 'mp-1',
    mealName: 'Ayam Tumis Mentega Wijen',
    timeSlot: 'Pagi',
    startTime: '06:30',
    assignedMemberId: 'mem-2',
    assignedMemberName: 'Ibu (Siti)',
    status: 'Completed',
    recipeId: 'recipe-1'
  },
  {
    id: 'cs-2',
    mealPlanId: 'mp-2',
    mealName: 'Sup Ayam Kampung Bening',
    timeSlot: 'Siang',
    startTime: '11:45',
    assignedMemberId: 'mem-1',
    assignedMemberName: 'Ayah (Budi)',
    status: 'In Progress',
    recipeId: 'recipe-2'
  },
  {
    id: 'cs-3',
    mealPlanId: 'mp-3',
    mealName: 'Salmon Panggang Lemon',
    timeSlot: 'Malam',
    startTime: '18:15',
    assignedMemberId: 'mem-2',
    assignedMemberName: 'Ibu (Siti)',
    status: 'Pending',
    recipeId: 'recipe-3'
  }
];

export const initialNutritionInsights: NutritionInsight[] = [
  {
    id: 'ni-1',
    title: 'Asupan Protein Keluarga Optimal',
    category: 'Positif',
    description: 'Pekan ini konsumsi protein keluarga mencukupi 92% dari target harian berkat konsumsi dada ayam dan salmon.',
    dateGenerated: '2026-08-01',
    actionableStep: 'Pertahankan variasi protein nabati seperti tahu & tempe esok hari.'
  },
  {
    id: 'ni-2',
    title: 'Penggunaan Sayuran Kulkas',
    category: 'Peringatan',
    description: 'Stok wortel dan brokoli di kulkas akan kedaluwarsa dalam 2 hari.',
    dateGenerated: '2026-08-01',
    actionableStep: 'Gunakan wortel dan brokoli untuk menu capcay kuah malam ini.'
  },
  {
    id: 'ni-3',
    title: 'Edukasi Nutrisi Anak',
    category: 'Tips Edukasi',
    description: 'Bentuk potongan makanan yang menarik seperti bintang atau hati terbukti meningkatkan selera makan buah/sayur anak hingga 40%.',
    dateGenerated: '2026-08-01',
    actionableStep: 'Coba cetakan biskuit lucu untuk memotong buah naga dan wortel.'
  }
];

export const initialMealReport: MealReport = {
  id: 'rep-curr',
  period: 'Pekan Ini (27 Juli - 2 Agustus)',
  totalMealsPlanned: 28,
  mealsCompleted: 24,
  averageDailyCalories: 1980,
  topConsumedCategory: 'Healthy & High Protein',
  foodWastePercentage: 4.2,
  estimatedSavingsRupiah: 320000,
  nutritionScore: 92,
  insights: [
    'Persentase sisa makanan berkurang 12% dibandingkan pekan lalu.',
    'Variasi serat harian mencapai rekor tertinggi (26g/hari).',
    'Penghematan belanja bahan makanan mencapai Rp320.000 dengan memanfaatkan bahan kulkas secara optimal.'
  ]
};
