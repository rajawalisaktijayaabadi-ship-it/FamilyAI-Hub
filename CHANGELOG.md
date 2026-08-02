# Catatan Perubahan (Changelog) FamilyAI Hub 📜

Seluruh perubahan penting pada proyek ini dicatat dalam dokumen ini.

---

## [1.0.0] - Release Candidate (Production Launch) - 2026-08-01

### 🚀 Ditambahkan
- **Google Gemini AI Production Integration**: Penggantian penuh dari dummy AI ke integrasi Google GenAI SDK (`@google/genai`) server-side (`gemini-3.6-flash`).
- **AI Provider Abstraction Layer**: Arsitektur `AIProvider` dengan `GeminiProvider`, `GeminiPromptEngine`, `GeminiContextEngine`, dan `GeminiMemoryEngine`.
- **16 Kategori Prompt Library**: Template khusus untuk Kesehatan, Keuangan, Asuransi, Edukasi, Parenting, Psikologi, Meal Planner, Smart Home, dll.
- **Keamanan Enterprise**: Isolasi penuh `GEMINI_API_KEY` di server, sanitasi prompt otomatis, dan filter data sensitif.
- **Sistem Dokumentasi Produksi**: `README.md`, `INSTALL.md`, `DEPLOYMENT.md`, `ARCHITECTURE.md`, `API.md`, dan `CHANGELOG.md`.
- **Docker Production Ready**: Penambahan `Dockerfile` & `docker-compose.yml` berkemampuan containerization instan.

### 🔧 Diperbaiki
- **Zero TypeScript & ESLint Errors**: Pembersihan tipe data ambigu pada Admin Audit Log, Workflow Builder, dan System Settings.
- **Penanganan Fallback API**: Strategi retry otomatis dan fallback jawaban ramah saat koneksi terganggu.
