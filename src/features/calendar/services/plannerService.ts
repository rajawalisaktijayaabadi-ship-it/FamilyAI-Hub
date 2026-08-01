import { CalendarEvent, PlannerSuggestion, PlannerHistory } from '../types/calendarTypes';
import { CalendarService } from './calendarService';

export class PlannerService {
  /**
   * Generates intelligent rule-based AI Planner suggestions
   */
  static generatePlannerSuggestions(events: CalendarEvent[]): PlannerSuggestion[] {
    const suggestions: PlannerSuggestion[] = [];
    const conflicts = CalendarService.detectConflicts(events);

    // 1. Conflict suggestions
    conflicts.forEach(c => {
      suggestions.push({
        id: `sug-conflict-${c.id}`,
        title: `Konflik Jadwal: ${c.eventA.title}`,
        description: c.conflictReason,
        suggestedDate: c.date,
        suggestedTime: c.eventA.startTime,
        category: c.eventA.category,
        type: 'conflict_resolution',
        affectedMemberNames: ['Ayah Rudi', 'Ibu Siti', 'Budi'],
        status: 'pending',
        impactText: c.suggestedResolution
      });
    });

    // 2. Family time suggestion for weekend
    suggestions.push({
      id: 'sug-family-weekend',
      title: 'Family Quality Time (Akhir Pekan)',
      description: 'Sabtu sore pukul 16.00 - 19.00 merupakan waktu senggang ideal keluarga untuk piknik atau movie night.',
      suggestedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      suggestedTime: '16:00',
      category: 'Keluarga',
      type: 'family_time',
      affectedMemberNames: ['Seluruh Anggota Keluarga'],
      status: 'pending',
      impactText: 'Tingkatkan indeks keharmonisan keluarga hingga 95%.'
    });

    // 3. Health & Checkup reminder suggestion
    suggestions.push({
      id: 'sug-health-routine',
      title: 'Jadwal Olahraga Bersama Pagi Hari',
      description: 'Minggu pagi pukul 06.30 disarankan untuk jalan sehat bersama di taman terdekat.',
      suggestedDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      suggestedTime: '06:30',
      category: 'Olahraga',
      type: 'routine',
      affectedMemberNames: ['Ayah Rudi', 'Ibu Siti', 'Kakek Surya'],
      status: 'pending',
      impactText: 'Menjaga imunitas dan stamina keluarga.'
    });

    return suggestions;
  }

  /**
   * Generates Daily Agenda Summary
   */
  static generateDailySummary(events: CalendarEvent[], targetDate: string): string {
    const dayEvents = events.filter(e => e.startDate === targetDate);
    if (dayEvents.length === 0) {
      return `Tidak ada agenda terjadwal untuk hari ini (${targetDate}). Nikmati waktu senggang bersama keluarga!`;
    }

    const titles = dayEvents.map(e => `• ${e.title} (${e.startTime}-${e.endTime}) [${e.category}]`).join('\n');
    return `Terdapat ${dayEvents.length} agenda utama untuk hari ini (${targetDate}):\n${titles}`;
  }

  /**
   * Generates Weekly Agenda Summary
   */
  static generateWeeklySummary(events: CalendarEvent[]): string {
    const totalEvents = events.length;
    const highPriorityCount = events.filter(e => e.priority === 'high').length;
    const categoriesCount = new Set(events.map(e => e.category)).size;

    return `Minggu ini terdapat ${totalEvents} total agenda terdaftar mencakup ${categoriesCount} kategori kegiatan. Sebanyak ${highPriorityCount} agenda berkategori prioritas tinggi memerlukan perhatian khusus.`;
  }

  /**
   * Generates Monthly Agenda Summary
   */
  static generateMonthlySummary(events: CalendarEvent[]): string {
    return `Estimasi keaktifan bulan ini terdistribusi seimbang antara kegiatan Pekerjaan (35%), Pendidikan Anak (25%), Kesehatan/Dokter (20%), dan Quality Time Keluarga (20%).`;
  }
}
