# Kebijakan Keamanan & Hardening FamilyAI Hub 🛡️

Aplikasi **FamilyAI Hub** menerapkan standar keamanan enterprise untuk melindungi privasi dan data keluarga secara menyeluruh.

---

## 🔐 1. Keamanan Kunci API & Eksekusi AI Server-Side

- **Satu Arah**: Kunci API Google Gemini (`GEMINI_API_KEY`) disimpan **HANYA** di variabel lingkungan server backend (`server.ts`).
- **Tidak Terkespos ke Browser**: Seluruh permintaan prompt AI dikirim melalui rute server aman `/api/ai/*`. Client browser tidak memiliki akses langsung ke SDK API Key.

---

## 🛡️ 2. Pertahanan Prompt Injection & Sanitasi Data

- **Sanitasi Otomatis (`SafetyManager.ts`)**: Seluruh teks input yang dikirim oleh pengguna dibersihkan dari nomor kartu kredit 16 digit, password, dan token autentikasi.
- **Filter Toksisitas & Halusinasi**: AI Prompt Engine menambahkan instruksi mitigasi halusinasi dan menolak input berisiko tinggi.

---

## 🔒 3. Kontrol Akses Berbasis Peran (RBAC)

Aplikasi memiliki 4 tingkatan hak akses:
1. **Admin Utama (Kepala Keluarga)**: Akses penuh ke seluruh modul, audit log, dan pengaturan sistem.
2. **Orang Tua (Parent)**: Akses ke modul keuangan, kesehatan, asuransi, dan manajemen anak.
3. **Anak (Child)**: Akses terbatas ke modul Edukasi (EduAI), Tugas/Chores, dan Linimasa Memori.
4. **Pendamping / Caregiver**: Akses khusus ke jadwal harian, instruksi obat, dan daftar belanja.

---

## 📜 4. Reporting Vulnerability

Jika Anda menemukan celah keamanan, silakan hubungi tim keamanan kami di `security@familyai.hub` sebelum mempublikasikannya secara publik.
