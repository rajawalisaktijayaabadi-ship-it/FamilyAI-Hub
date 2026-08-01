import { AIRecommendation } from '../types/aiTypes';

export class RecommendationService {
  static getDummyRecommendations(): AIRecommendation[] {
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });
    return [
      {
        id: 'rec-1',
        title: 'Quality Time Keluarga',
        content: 'Jangan lupa quality time bersama keluarga malam ini. Sesi makan malam tanpa gadget terbukti tingkatkan keharmonisan.',
        actionType: 'chat',
        priority: 'high',
        category: 'Hubungan',
        date: today,
        iconName: 'Heart'
      },
      {
        id: 'rec-2',
        title: 'Agenda Hari Ini',
        content: 'Hari ini ada 3 agenda penting: Les Musik Budi (15.00), Olahraga Sore Ayah (16.30), dan Makan Malam Keluarga (19.00).',
        actionType: 'schedule',
        priority: 'medium',
        category: 'Jadwal',
        date: today,
        iconName: 'Calendar'
      },
      {
        id: 'rec-3',
        title: 'Ulang Tahun Kerabat',
        content: 'Besok adalah ulang tahun Ayah! Jangan lupa persiapkan ucapan hangat atau kejutan kue kecil.',
        actionType: 'member',
        priority: 'high',
        category: 'Pengingat',
        date: today,
        iconName: 'Gift'
      },
      {
        id: 'rec-4',
        title: 'Cek Belanjaan Dapur',
        content: 'Stok susu dan buah-buahan di kulkas hampir habis. Tambahkan ke daftar belanja harian.',
        actionType: 'task',
        priority: 'low',
        category: 'Rumah Tangga',
        date: today,
        iconName: 'ShoppingBag'
      },
      {
        id: 'rec-5',
        title: 'Kebiasaan Sehat AI',
        content: 'Luangkan waktu 10 menit untuk stretching bersama anak-anak sebelum tidur.',
        actionType: 'habit',
        priority: 'medium',
        category: 'Kesehatan',
        date: today,
        iconName: 'Activity'
      }
    ];
  }
}
