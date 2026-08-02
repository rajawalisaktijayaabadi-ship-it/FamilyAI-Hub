# Panduan Instalasi FamilyAI Hub 💻

Dokumen ini berisi langkah-langkah lengkap untuk menginstal dan menjalankan **FamilyAI Hub** di lingkungan lokal maupun server produksi.

---

## 📋 Prasyarat Sistem

- **Node.js**: v18.0.0 atau lebih baru (direkomendasikan v20 LTS)
- **npm**: v9.0.0 atau lebih baru (atau `bun` / `pnpm`)
- **Git**: Versi terbaru
- **API Key Google Gemini**: Kunci API dari [Google AI Studio](https://aistudio.google.com)

---

## 🛠️ Langkah Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/your-org/family-ai-hub.git
cd family-ai-hub
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Salin file `.env.example` menjadi `.env` dan isi variabel yang dibutuhkan:

```bash
cp .env.example .env
```

Isi file `.env`:

```env
# Server Port
PORT=3000

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (Opsional / Otomatis)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Jalankan Aplikasi dalam Mode Pengembang

```bash
npm run dev
```

Server akan berjalan pada: `http://localhost:3000`

---

## 🧪 Verifikasi Build & Lint

Sebelum melakukan commit atau deployment, pastikan seluruh tes dan pemeriksaan sintaks lolos:

```bash
# Jalankan Linter TypeScript
npm run lint

# Jalankan Production Build Test
npm run build
```

Jika seluruh perintah berhasil tanpa error, aplikasi siap untuk dirilis!
