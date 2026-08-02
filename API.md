# Dokumentasi API FamilyAI Hub 📡

Seluruh endpoint REST API berjalan pada port `3000` di bawah awalan `/api/ai/*`.

---

## 1. POST `/api/ai/assistant`
Respon asisten AI umum berdasarkan persona (general, mama, papa, kakak, dokter, guru, psikolog).

**Body Request:**
```json
{
  "message": "Bagaimana cara mengatur jadwal belajar anak?",
  "persona": "mama",
  "familyContext": {}
}
```

**Response:**
```json
{
  "reply": "Halo! Sebagai Mama AI...",
  "timestamp": "2026-08-01T12:00:00.000Z"
}
```

---

## 2. POST `/api/ai/chat`
Endpoint komunikasi Super AI Assistant terpadu.

**Body Request:**
```json
{
  "message": "Berikan ide menu makan malam sehat",
  "category": "Meal Planner",
  "memberName": "Budi",
  "context": {}
}
```

**Response:**
```json
{
  "reply": "Tentu! Berikut ide menu makan malam...",
  "suggestedActions": ["Tambah ke Belanja", "Pengingat Masak"],
  "timestamp": "2026-08-01T12:00:00.000Z"
}
```

---

## 3. POST `/api/ai/super-assistant`
Briefing ringkasan kondisi dan rekomendasi prioritas keluarga harian.

**Body Request:**
```json
{
  "familyData": {}
}
```

**Response:**
```json
{
  "todaysSummary": "Keluarga dalam kondisi harmonis...",
  "todaysPriority": "Mempersiapkan ujian sekolah anak...",
  "wellnessScore": 88,
  "confidenceScore": 96,
  "briefingNotes": ["Ujian jam 09:00", "Beli susu"],
  "decisionSupport": [],
  "recommendedTasks": []
}
```

---

## 4. Endpoint Tambahan Lintas Modul

- `POST /api/ai/psychology` — Analisis komunikasi & resolusi konflik keluarga.
- `POST /api/ai/parenting` — Saran pengasuhan anak positif sesuai tingkatan usia.
- `POST /api/ai/education` — Solver tugas sekolah & pembuat kuis interaktif.
- `POST /api/ai/health-check` — Analisis keluhan & panduan awal kesehatan.
- `POST /api/ai/meal-planner` — Generator resep gizi seimbang dari stok kulkas.
- `POST /api/ai/finance-advisor` — Perencana budget & alokasi 50/30/20.
- `POST /api/ai/insurance-analyzer` — Analisis proteksi & kecukupan polis asuransi.
