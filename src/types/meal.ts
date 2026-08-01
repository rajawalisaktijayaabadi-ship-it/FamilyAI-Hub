export type MealCategoryType = 
  | 'Sarapan' 
  | 'Makan Siang' 
  | 'Makan Malam' 
  | 'Snack' 
  | 'Minuman' 
  | 'Dessert' 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Halal' 
  | 'Seafood' 
  | 'Healthy' 
  | 'Kids' 
  | 'Senior' 
  | 'Custom';

export type SpecialDietCategory = 
  | 'Rendah Gula' 
  | 'Rendah Garam' 
  | 'Tinggi Protein' 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Bebas Gluten' 
  | 'Rendah Lemak' 
  | 'Custom';

export type CookingTimeSlot = 'Pagi' | 'Siang' | 'Malam' | 'Sore';

export type CookingDifficulty = 'Mudah' | 'Sedang' | 'Sulit';

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number;
  tip?: string;
}

export interface IngredientItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'Daging & Unggas' | 'Ikan & Seafood' | 'Sayuran' | 'Buah' | 'Bumbu & Rempah' | 'Susu & Olahan' | 'Biji & Beras' | 'Lainnya';
  location: 'Kulkas' | 'Freezer' | 'Pantry' | 'Rak Bumbu';
  expirationDate: string;
  minStock: number;
  status: 'Segar' | 'Mendekati Kedaluwarsa' | 'Kedaluwarsa' | 'Habis';
  priceEst?: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: { name: string; quantity: string; unit: string; inStock?: boolean }[];
  steps: RecipeStep[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: CookingDifficulty;
  photoUrl: string;
  videoUrl?: string;
  category: MealCategoryType;
  caloriesPerServing: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams?: number;
  isFavorite: boolean;
  isKidFriendly: boolean;
  isSeniorFriendly: boolean;
  specialDietTag?: SpecialDietCategory;
  createdAt: string;
}

export interface MealPlan {
  id: string;
  name: string;
  category: MealCategoryType;
  date: string; // YYYY-MM-DD
  timeSlot: CookingTimeSlot;
  timeString: string; // HH:MM
  assignedMemberId: string;
  assignedMemberName: string;
  assignedMemberAvatar?: string;
  recipeId?: string;
  notes?: string;
  status: 'Planned' | 'Cooking' | 'Done' | 'Skipped';
  estimatedCalories: number;
}

export interface NutritionSummary {
  id: string;
  date: string;
  totalCalories: number;
  targetCalories: number;
  proteinGrams: number;
  targetProteinGrams: number;
  carbsGrams: number;
  targetCarbsGrams: number;
  fatGrams: number;
  targetFatGrams: number;
  fiberGrams: number;
  targetFiberGrams: number;
  sugarGrams: number;
  sodiumMg: number;
  vitamins: { name: string; amount: string; percentageOfDay: number }[];
  minerals: { name: string; amount: string; percentageOfDay: number }[];
}

export interface FamilyPreference {
  id: string;
  memberId: string;
  memberName: string;
  favoriteFoods: string[];
  dislikedFoods: string[];
  allergies: string[];
  restrictions: string[]; // e.g., 'Bebas Kacang', 'Tanpa MSG'
  childPreferences?: string; // e.g., 'Potongan lucu, rasa gurih lembut'
  seniorPreferences?: string; // e.g., 'Tekstur empuk, sedikit garam'
}

export interface Leftover {
  id: string;
  foodName: string;
  portionsLeft: number;
  dateStored: string;
  estimatedExpiryDate: string;
  storageLocation: 'Kulkas' | 'Freezer';
  usageRecommendation: string; // e.g., 'Olah jadi Nasi Goreng Spesial'
  isSafeToEat: boolean;
  notes?: string;
}

export interface KitchenAsset {
  id: string;
  name: string;
  category: 'Air Fryer' | 'Blender' | 'Oven' | 'Kompor' | 'Kulkas Smart' | 'Rice Cooker' | 'Peralatan Masak' | 'Lainnya';
  brandModel: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  lastCleanedDate: string;
  nextCleaningSchedule: string;
  maintenanceStatus: 'Baik' | 'Perlu Perawatan' | 'Rusak' | 'Garansi Active';
  notes?: string;
}

export interface CookingSchedule {
  id: string;
  mealPlanId: string;
  mealName: string;
  timeSlot: CookingTimeSlot;
  startTime: string; // e.g., "06:30"
  assignedMemberId: string;
  assignedMemberName: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  recipeId?: string;
}

export interface MealHistory {
  id: string;
  date: string;
  mealName: string;
  category: MealCategoryType;
  caloriesConsumed: number;
  enjoyedRating: number; // 1-5
  preparedBy: string;
}

export interface MealRecommendation {
  id: string;
  title: string;
  description: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  reasoning: string;
  suggestedRecipeId?: string;
  estimatedTime: string;
}

export interface NutritionInsight {
  id: string;
  title: string;
  category: 'Positif' | 'Peringatan' | 'Rekomendasi' | 'Tips Edukasi';
  description: string;
  dateGenerated: string;
  actionableStep?: string;
}

export interface MealReport {
  id: string;
  period: string; // e.g. "Minggu Ini (25 - 31 Juli)"
  totalMealsPlanned: number;
  mealsCompleted: number;
  averageDailyCalories: number;
  topConsumedCategory: string;
  foodWastePercentage: number;
  estimatedSavingsRupiah: number;
  nutritionScore: number; // 0 - 100
  insights: string[];
}

export interface MealNotification {
  id: string;
  title: string;
  message: string;
  type: 'Menu Hari Ini' | 'Bahan Kedaluwarsa' | 'Jadwal Masak' | 'Pengingat Minum Air' | 'Stok Habis';
  timestamp: string;
  isRead: boolean;
  priority: 'High' | 'Medium' | 'Low';
}
