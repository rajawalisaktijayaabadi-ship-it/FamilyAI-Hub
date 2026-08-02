# Panduan Kontribusi FamilyAI Hub 🤝

Terima kasih telah tertarik untuk berkontribusi pada **FamilyAI Hub**! Berikut adalah panduan pengembangan dan kontribusi kode.

---

## 🛠️ Alur Kerja Pengembangan

1. **Fork & Clone** repositori ini.
2. Buat branch fitur baru: `git checkout -b feature/nama-fitur`.
3. Pastikan kode mengikuti arsitektur berorientasi fitur (`src/features/*`) dan Clean Architecture.
4. Gunakan TypeScript strict mode dan jalankan `npm run lint` sebelum melakukan commit.
5. Buat Pull Request (PR) dengan deskripsi fitur yang jelas.

---

## 📐 Standar Kode

- **Komponen React**: Gunakan Functional Component dengan TypeScript interfaces.
- **Styling**: Gunakan utility classes Tailwind CSS (tanpa file CSS tambahan).
- **Ikon**: Import hanya dari `lucide-react`.
- **Manajemen State**: Gunakan Zustand store di `src/stores/` atau React Context.
