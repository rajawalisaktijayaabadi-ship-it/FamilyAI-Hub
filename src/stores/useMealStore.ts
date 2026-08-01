import { create } from 'zustand';
import { 
  Recipe, 
  MealPlan, 
  IngredientItem, 
  FamilyPreference, 
  Leftover, 
  CookingSchedule, 
  MealReport,
  MealNotification,
  MealCategoryType,
  SpecialDietCategory
} from '../types/meal';
import { 
  initialRecipes, 
  initialMealPlans, 
  initialIngredients, 
  initialFamilyPreferences, 
  initialLeftovers, 
  initialCookingSchedules, 
  initialMealReport 
} from '../data/mockMealData';

interface MealState {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  ingredients: IngredientItem[];
  familyPreferences: FamilyPreference[];
  leftovers: Leftover[];
  cookingSchedules: CookingSchedule[];
  notifications: MealNotification[];
  report: MealReport;
  selectedCategoryFilter: MealCategoryType | 'All';
  selectedDietFilter: SpecialDietCategory | 'All';
  searchQuery: string;

  // Actions
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: MealCategoryType | 'All') => void;
  setDietFilter: (diet: SpecialDietCategory | 'All') => void;

  // Recipe Actions
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, updated: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  toggleFavoriteRecipe: (id: string) => void;

  // Meal Plan Actions
  addMealPlan: (mealPlan: MealPlan) => void;
  updateMealPlanStatus: (id: string, status: MealPlan['status']) => void;
  deleteMealPlan: (id: string) => void;

  // Ingredient Actions
  addIngredient: (ingredient: IngredientItem) => void;
  updateIngredientQuantity: (id: string, newQty: number) => void;
  deleteIngredient: (id: string) => void;

  // Preference Actions
  updatePreference: (id: string, pref: Partial<FamilyPreference>) => void;

  // Leftover Actions
  addLeftover: (leftover: Leftover) => void;
  deleteLeftover: (id: string) => void;

  // Cooking Schedule Actions
  updateScheduleStatus: (id: string, status: CookingSchedule['status']) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  addNotification: (notif: MealNotification) => void;
}

export const useMealStore = create<MealState>((set) => ({
  recipes: initialRecipes,
  mealPlans: initialMealPlans,
  ingredients: initialIngredients,
  familyPreferences: initialFamilyPreferences,
  leftovers: initialLeftovers,
  cookingSchedules: initialCookingSchedules,
  report: initialMealReport,
  notifications: [
    {
      id: 'notif-1',
      title: 'Dua Bahan Mendekati Kedaluwarsa',
      message: 'Wortel & Brokoli di Kulkas harus segera dikonsumsi sebelum 2 hari.',
      type: 'Bahan Kedaluwarsa',
      timestamp: 'Baru saja',
      isRead: false,
      priority: 'High'
    },
    {
      id: 'notif-2',
      title: 'Pengingat Memasak Siang',
      message: 'Jadwal masak Sup Ayam Kampung oleh Ayah Budi pukul 11:45.',
      type: 'Jadwal Masak',
      timestamp: '10 menit lalu',
      isRead: false,
      priority: 'Medium'
    },
    {
      id: 'notif-3',
      title: 'Target Air Minum Keluarga',
      message: 'Asupan air minum keluarga hari ini baru 60%. Jangan lupa minum 2 liter/hari.',
      type: 'Pengingat Minum Air',
      timestamp: '1 jam lalu',
      isRead: true,
      priority: 'Low'
    }
  ],
  selectedCategoryFilter: 'All',
  selectedDietFilter: 'All',
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ selectedCategoryFilter: category }),
  setDietFilter: (diet) => set({ selectedDietFilter: diet }),

  addRecipe: (recipe) => set((state) => ({ recipes: [recipe, ...state.recipes] })),
  updateRecipe: (id, updated) => set((state) => ({
    recipes: state.recipes.map((r) => r.id === id ? { ...r, ...updated } : r)
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((r) => r.id !== id)
  })),
  toggleFavoriteRecipe: (id) => set((state) => ({
    recipes: state.recipes.map((r) => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)
  })),

  addMealPlan: (mealPlan) => set((state) => ({
    mealPlans: [mealPlan, ...state.mealPlans],
    cookingSchedules: [
      {
        id: `cs-${Date.now()}`,
        mealPlanId: mealPlan.id,
        mealName: mealPlan.name,
        timeSlot: mealPlan.timeSlot,
        startTime: mealPlan.timeString || '12:00',
        assignedMemberId: mealPlan.assignedMemberId,
        assignedMemberName: mealPlan.assignedMemberName,
        status: 'Pending',
        recipeId: mealPlan.recipeId
      },
      ...state.cookingSchedules
    ]
  })),

  updateMealPlanStatus: (id, status) => set((state) => ({
    mealPlans: state.mealPlans.map((mp) => mp.id === id ? { ...mp, status } : mp)
  })),

  deleteMealPlan: (id) => set((state) => ({
    mealPlans: state.mealPlans.filter((mp) => mp.id !== id),
    cookingSchedules: state.cookingSchedules.filter((cs) => cs.mealPlanId !== id)
  })),

  addIngredient: (ingredient) => set((state) => ({
    ingredients: [ingredient, ...state.ingredients]
  })),

  updateIngredientQuantity: (id, newQty) => set((state) => ({
    ingredients: state.ingredients.map((ing) => ing.id === id ? {
      ...ing,
      quantity: newQty,
      status: newQty <= 0 ? 'Habis' : ing.status
    } : ing)
  })),

  deleteIngredient: (id) => set((state) => ({
    ingredients: state.ingredients.filter((ing) => ing.id !== id)
  })),

  updatePreference: (id, pref) => set((state) => ({
    familyPreferences: state.familyPreferences.map((p) => p.id === id ? { ...p, ...pref } : p)
  })),

  addLeftover: (leftover) => set((state) => ({
    leftovers: [leftover, ...state.leftovers]
  })),

  deleteLeftover: (id) => set((state) => ({
    leftovers: state.leftovers.filter((l) => l.id !== id)
  })),

  updateScheduleStatus: (id, status) => set((state) => ({
    cookingSchedules: state.cookingSchedules.map((cs) => cs.id === id ? { ...cs, status } : cs)
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n)
  })),

  addNotification: (notif) => set((state) => ({
    notifications: [notif, ...state.notifications]
  }))
}));
