# Arsitektur Sistem FamilyAI Hub 🏗️

Dokumen ini menjelaskan struktur arsitektur, pola desain, dan alur integrasi data pada **FamilyAI Hub**.

---

## 🏛️ Arsitektur Umum (Clean Architecture & Feature-Based)

```
[ Frontend Client (React 18 + SPA) ]
                │
                ▼ HTTP / REST APIs
[ Backend Express Server (server.ts) ]
                │
       ┌────────┴────────┐
       ▼                 ▼
[ Google GenAI SDK ]  [ Firebase Firestore ]
 (Gemini API Server)   (Persistence & Sync)
```

---

## 🧠 AI Provider Layer (`src/providers/`)

1. **`AIProvider` Interface**: Abstraksi generik untuk dukungan multi-model AI.
2. **`GeminiProvider`**: Implementasi utama berbasis Google Gemini API (`gemini-3.6-flash`).
3. **`GeminiPromptEngine`**: Prompt library terstruktur dengan 16 kategori kontekstual.
4. **`GeminiContextEngine`**: Menggabungkan data lintas 19 modul keluarga menjadi satu payload konteks terpadu.
5. **`GeminiMemoryEngine`**: Mengelola memori percakapan jangka pendek, memori jangka panjang, preferensi, kebiasaan, dan tujuan keluarga.
6. **`SafetyManager`**: Sanitasi prompt, deteksi data sensitif (kartu kredit/password), dan mitigasi halusinasi AI.
7. **`TokenManager`**: Estimasi pemakaian token dan pemotongan teks aman.

---

## 🔒 Keamanan & Isolasi Kunci API

- **Zero Client Exposure**: `GEMINI_API_KEY` disimpan dan diakses **HANYA di sisi server** (`server.ts`).
- **Proxy Endpoints**: Seluruh permintaan AI dieksekusi melalui rute server `/api/ai/*`.
- **Sanitasi Data**: Permintaan yang dikirim oleh pengguna melewati pembersihan data sensitif sebelum dikirim ke API Gemini.
