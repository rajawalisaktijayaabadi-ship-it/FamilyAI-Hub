# Dokumentasi Skema Database & Penyimpanan FamilyAI Hub 🗄️

FamilyAI Hub menggunakan **Google Cloud Firestore** sebagai database dokumen terdistribusi berkinerja tinggi, yang dipadukan dengan **Firebase Storage** untuk file media dan **LocalStorage** untuk caching luring (offline-first).

---

## 📐 Struktur Koleksi Firestore

### 1. `families`
Menyimpan profil utama keluarga dan preferensi global.
- `id` (string, PK)
- `familyName` (string)
- `createdDate` (string ISO)
- `subscriptionPlan` ('free' | 'family_pro' | 'enterprise')
- `settings` (map: bahasa, mata uang, zona waktu)

### 2. `members`
Menyimpan profil setiap anggota keluarga dengan peran terpisah.
- `id` (string, PK)
- `familyId` (string, FK)
- `name` (string)
- `role` ('admin' | 'parent' | 'child' | 'caregiver')
- `email` (string)
- `avatarUrl` (string)
- `birthDate` (string)

### 3. `health_records` (HealthAI)
Catatan medis, imunisasi, dan alergi anggota keluarga.
- `id` (string)
- `memberId` (string)
- `bloodType` (string)
- `allergies` (array of string)
- `medications` (array of object: nama obat, dosis, jadwal)
- `vitalsHistory` (array of object: tanggal, tekanan darah, berat, suhu)

### 4. `financial_logs` (FinAI)
Catatan pemasukan, pengeluaran, dan alokasi budget 50/30/20.
- `id` (string)
- `familyId` (string)
- `type` ('income' | 'expense' | 'savings')
- `category` (string)
- `amount` (number)
- `date` (string)
- `notes` (string)

### 5. `insurance_policies` (ShieldAI)
Polis asuransi kesehatan, jiwa, dan kendaraan keluarga.
- `id` (string)
- `policyNumber` (string)
- `provider` (string)
- `policyHolder` (string)
- `coverageAmount` (number)
- `expiryDate` (string)
- `status` ('active' | 'review_needed' | 'expired')

### 6. `education_records` (EduAI)
Progres belajar, kuis AI, dan PR sekolah anak.
- `id` (string)
- `childId` (string)
- `subject` (string)
- `gradeLevel` (string)
- `completedQuizzes` (array)
- `studyStreakDays` (number)

### 7. `meal_plans` (MealAI) & `cart_items` (CartAI)
Rencana menu harian dan daftar belanja terintegrasi.
- `meal_plans`: menu sarapan, makan siang, makan malam, estimasi kalori.
- `cart_items`: item, kuantitas, estimasi harga, kategori, status dibeli.

### 8. `psychology_logs` (HarmonyAI) & `mood_logs` (MoodAI)
Catatan resolusi komunikasi dan pelacak tren emosi keluarga.

### 9. `automation_workflows` & `audit_logs`
Alur kerja otomatisasi *Trigger & Action* serta riwayat audit keamanan enterprise.

---

## 🔒 Aturan Keamanan & Indeks (Firestore Rules)

Seluruh akses Firestore dibatasi berdasarkan otentikasi user ID (`request.auth.uid`) dan ID keluarga (`familyId`). Tidak ada data antar keluarga yang dapat diakses oleh pihak luar.
