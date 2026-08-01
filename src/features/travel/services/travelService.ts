import { 
  TravelTrip, 
  TravelRecommendation, 
  TravelReport, 
  TravelBudget 
} from '../../../types/travel';

export class TravelService {
  /**
   * Calculates total estimated vs actual budget for a trip
   */
  public calculateBudgetSummary(budgets: TravelBudget[]) {
    const totalEstimated = budgets.reduce((acc, b) => acc + b.estimatedCostIdr, 0);
    const totalActual = budgets.reduce((acc, b) => acc + b.actualCostIdr, 0);
    const remaining = totalEstimated - totalActual;
    const isOverBudget = totalActual > totalEstimated;

    return {
      totalEstimated,
      totalActual,
      remaining,
      isOverBudget,
      percentageUsed: totalEstimated > 0 ? Math.round((totalActual / totalEstimated) * 100) : 0
    };
  }

  /**
   * Generates AI Travel Recommendation Response string for Chat Assistant
   */
  public static getAITravelRecommendation(query: string, destination: string): string {
    const qLower = query.toLowerCase();

    if (qLower.includes('ramah anak') || qLower.includes('balita') || qLower.includes('anak')) {
      return `Rekomendasi Wisata Ramah Anak di ${destination}:\n` +
        `1. Taman Hiburan / Edukasi Tematik dengan area stroller yang lapang.\n` +
        `2. Taman Safari / Kebun Binatang Interaktif dengan sesi memberi makan satwa.\n` +
        `3. Pantai Dangkal berpasir halus untuk bermain istana pasir.\n` +
        `Saran AI: Hindari lokasi dengan tangga terjal dan pastikan membawa tempat minum serta pakaian ganti anak.`;
    }

    if (qLower.includes('budget') || qLower.includes('anggaran') || qLower.includes('biaya')) {
      return `Estimasi Anggaran Perjalanan Keluarga (4 Orang) ke ${destination}:\n` +
        `• Transportasi (Tiket PP / BBM): Rp 8.000.000 - Rp 14.000.000\n` +
        `• Akomodasi Hotel/Villa (3 Malam): Rp 4.500.000 - Rp 9.000.000\n` +
        `• Konsumsi & Kuliner Harian: Rp 3.000.000 - Rp 5.000.000\n` +
        `• Tiket Masuk Tempat Wisata: Rp 1.500.000 - Rp 3.000.000\n` +
        `• Cadangan & Oleh-oleh: Rp 2.000.000\n` +
        `Total Perkiraan: Rp 19.000.000 - Rp 33.000.000 (Saran AI: Manfaatkan promo pemesanan awal tiket & hotel).`;
    }

    if (qLower.includes('checklist') || qLower.includes('bawaan') || qLower.includes('perlengkapan')) {
      return `Checklist Perlengkapan Utama Liburan Keluarga ke ${destination}:\n` +
        `1. Dokumen: Paspor/KTP, E-Ticket, Voucher Hotel, Polis Asuransi.\n` +
        `2. Pakaian: Pakaian santai, baju renang, jaket tipis, dan kaos kaki cadangan.\n` +
        `3. Obat & P3K: Antihistamin, Parasetamol anak, obat mabuk perjalanan, plaster, dan minyak telon.\n` +
        `4. Gadget: Powerbank 20.000mAh, charger multi-port, dan kamera.\n` +
        `5. Perlengkapan Bayi/Lansia: Stroller lipat ringan, termos air hangat, dan pampers secukupnya.`;
    }

    return `Berdasarkan analisis AI untuk destinasi ${destination}:\n` +
      `Disarankan mengatur jadwal dengan jeda istirahat yang seimbang antara aktivitas pagi dan sore. ` +
      `Suhu rata-rata daerah berkisar 26-30°C. Siapkan pakaian yang nyaman dan simpan seluruh dokumen perjalanan di Vault Dokumen FamilyAI Hub.`;
  }

  /**
   * Generates AI Travel Recommendation (Dummy response integrating AI Core context)
   */
  public generateAITravelInsight(trip?: TravelTrip): TravelRecommendation[] {
    const today = new Date().toISOString().split('T')[0];
    
    if (!trip) {
      return [
        {
          id: `rec-gen-1-${Date.now()}`,
          type: 'Weather',
          title: 'Perkiraan Iklim & Cuaca Liburan',
          recommendationText: 'Cuaca destinasi secara umum diperkirakan cerah berawan. Cocok untuk aktivitas luar ruangan dan eksplorasi tempat wisata.',
          date: today
        },
        {
          id: `rec-gen-2-${Date.now()}`,
          type: 'Budget',
          title: 'Optimalisasi Anggaran Perjalanan',
          recommendationText: 'Anggaran perjalanan keluarga masih dalam batas aman. Alokasi terbesar disarankan untuk akomodasi hotel dan tiket transportasi.',
          date: today
        },
        {
          id: `rec-gen-3-${Date.now()}`,
          type: 'Health',
          title: 'Proteksi Kesehatan Anggota Keluarga',
          recommendationText: 'Pastikan membawa suplemen harian, obat pribadi untuk anak/lansia, dan kit P3K portabel selama perjalanan.',
          date: today
        }
      ];
    }

    return [
      {
        id: `rec-${trip.id}-1`,
        tripId: trip.id,
        type: 'Weather',
        title: `Prediksi Cuaca: ${trip.destination}`,
        recommendationText: `Destinasi ${trip.city}, ${trip.country} bersuhu rata-rata 26-30°C. Siapkan pakaian santai yang menyerap keringat dan tabir surya.`,
        date: today
      },
      {
        id: `rec-${trip.id}-2`,
        tripId: trip.id,
        type: 'Activity',
        title: 'Rekomendasi Waktu Istirahat Anak & Ortu',
        recommendationText: 'Untuk menghindari kelelahan saat perjalanan jauh, selingi jadwal itinerary setiap 3-4 jam dengan jeda santai di restoran atau kafe.',
        date: today
      },
      {
        id: `rec-${trip.id}-3`,
        tripId: trip.id,
        type: 'Safety',
        title: 'Pemeriksaan Dokumen & Tiket',
        recommendationText: 'Simpan salinan digital paspor, e-ticket, dan voucher booking hotel di Vault Dokumen FamilyAI agar mudah diakses offline.',
        date: today
      }
    ];
  }
}

export const travelService = new TravelService();
