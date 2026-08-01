import { z } from 'zod';

export const mealPlanSchema = z.object({
  name: z.string().min(2, 'Nama menu minimal 2 karakter'),
  category: z.enum([
    'Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Minuman', 
    'Dessert', 'Vegetarian', 'Vegan', 'Halal', 'Seafood', 'Healthy', 'Kids', 'Senior', 'Custom'
  ]),
  date: z.string().min(1, 'Tanggal wajib diisi'),
  timeSlot: z.enum(['Pagi', 'Siang', 'Malam', 'Sore']),
  timeString: z.string().min(1, 'Jam wajib diisi'),
  assignedMemberId: z.string().min(1, 'Pilih anggota keluarga'),
  assignedMemberName: z.string().min(1, 'Nama anggota keluarga wajib'),
  notes: z.string().optional(),
  estimatedCalories: z.number().min(0, 'Kalori tidak boleh negatif')
});

export const recipeSchema = z.object({
  name: z.string().min(3, 'Nama resep minimal 3 karakter'),
  description: z.string().min(5, 'Deskripsi singkat minimal 5 karakter'),
  prepTimeMinutes: z.number().min(1, 'Durasi persiapan minimal 1 menit'),
  cookTimeMinutes: z.number().min(1, 'Durasi memasak minimal 1 menit'),
  servings: z.number().min(1, 'Porsi minimal 1'),
  difficulty: z.enum(['Mudah', 'Sedang', 'Sulit']),
  category: z.enum([
    'Sarapan', 'Makan Siang', 'Makan Malam', 'Snack', 'Minuman', 
    'Dessert', 'Vegetarian', 'Vegan', 'Halal', 'Seafood', 'Healthy', 'Kids', 'Senior', 'Custom'
  ]),
  caloriesPerServing: z.number().min(0, 'Kalori minimal 0'),
  proteinGrams: z.number().min(0),
  carbsGrams: z.number().min(0),
  fatGrams: z.number().min(0),
  photoUrl: z.string().url('URL Foto harus valid').or(z.string().min(5)),
  isKidFriendly: z.boolean(),
  isSeniorFriendly: z.boolean(),
  specialDietTag: z.string().optional()
});

export const leftoverSchema = z.object({
  foodName: z.string().min(2, 'Nama sisa makanan minimal 2 karakter'),
  portionsLeft: z.number().min(1, 'Jumlah porsi minimal 1'),
  dateStored: z.string().min(1, 'Tanggal disimpan wajib'),
  estimatedExpiryDate: z.string().min(1, 'Perkiraan kedaluwarsa wajib'),
  storageLocation: z.enum(['Kulkas', 'Freezer']),
  usageRecommendation: z.string().min(3, 'Rekomendasi olahan wajib diisi'),
  notes: z.string().optional()
});

export const kitchenAssetSchema = z.object({
  name: z.string().min(2, 'Nama alat dapur minimal 2 karakter'),
  category: z.enum([
    'Air Fryer', 'Blender', 'Oven', 'Kompor', 'Kulkas Smart', 'Rice Cooker', 'Peralatan Masak', 'Lainnya'
  ]),
  brandModel: z.string().min(2, 'Merk / Tipe wajib diisi'),
  purchaseDate: z.string().min(1, 'Tanggal beli wajib'),
  warrantyExpiryDate: z.string().min(1, 'Masa garansi wajib'),
  maintenanceStatus: z.enum(['Baik', 'Perlu Perawatan', 'Rusak', 'Garansi Active']),
  notes: z.string().optional()
});

export const ingredientSchema = z.object({
  name: z.string().min(2, 'Nama bahan minimal 2 karakter'),
  quantity: z.number().min(1, 'Jumlah minimal 1'),
  unit: z.string().min(1, 'Satuan wajib diisi (g, kg, buah, dll)'),
  category: z.enum([
    'Daging & Unggas', 'Ikan & Seafood', 'Sayuran', 'Buah', 'Bumbu & Rempah', 'Susu & Olahan', 'Biji & Beras', 'Lainnya'
  ]),
  location: z.enum(['Kulkas', 'Freezer', 'Pantry', 'Rak Bumbu']),
  expirationDate: z.string().min(1, 'Tanggal kedaluwarsa wajib'),
  minStock: z.number().min(1, 'Minimal stok wajib')
});

export type MealPlanFormValues = z.infer<typeof mealPlanSchema>;
export type RecipeFormValues = z.infer<typeof recipeSchema>;
export type LeftoverFormValues = z.infer<typeof leftoverSchema>;
export type KitchenAssetFormValues = z.infer<typeof kitchenAssetSchema>;
export type IngredientFormValues = z.infer<typeof ingredientSchema>;
