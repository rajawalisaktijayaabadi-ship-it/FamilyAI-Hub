import { CalendarEvent, CalendarScope, CalendarConflict } from '../types/calendarTypes';

export class CalendarService {
  /**
   * Filter events by search query, category, priority, assigned member, calendar scope, and date
   */
  static filterEvents(
    events: CalendarEvent[],
    query: string,
    category: string,
    priority: string,
    memberId: string,
    scope: CalendarScope
  ): CalendarEvent[] {
    const searchLower = query.toLowerCase().trim();

    return events.filter(evt => {
      // Search Match
      const matchesSearch =
        !searchLower ||
        evt.title.toLowerCase().includes(searchLower) ||
        evt.description.toLowerCase().includes(searchLower) ||
        evt.location.toLowerCase().includes(searchLower) ||
        evt.category.toLowerCase().includes(searchLower);

      // Category Match
      const matchesCategory = category === 'all' || evt.category === category;

      // Priority Match
      const matchesPriority = priority === 'all' || evt.priority === priority;

      // Assigned Member Match
      const matchesMember =
        memberId === 'all' || evt.assignedMemberIds.includes(memberId);

      // Scope Match
      const matchesScope =
        scope === 'all' ||
        evt.assignedRoleCategory === scope ||
        (scope === 'family' && evt.assignedRoleCategory === 'family');

      return matchesSearch && matchesCategory && matchesPriority && matchesMember && matchesScope;
    });
  }

  /**
   * Detect overlapping events for assigned members on the same date
   */
  static detectConflicts(events: CalendarEvent[]): CalendarConflict[] {
    const conflicts: CalendarConflict[] = [];

    // Group events by date
    const eventsByDate: Record<string, CalendarEvent[]> = {};
    events.forEach(e => {
      if (!eventsByDate[e.startDate]) eventsByDate[e.startDate] = [];
      eventsByDate[e.startDate].push(e);
    });

    Object.entries(eventsByDate).forEach(([date, dayEvents]) => {
      for (let i = 0; i < dayEvents.length; i++) {
        for (let j = i + 1; j < dayEvents.length; j++) {
          const a = dayEvents[i];
          const b = dayEvents[j];

          // Check if same member assigned to both or family event overlap
          const sharedMembers = a.assignedMemberIds.filter(mId =>
            b.assignedMemberIds.includes(mId)
          );

          if (sharedMembers.length > 0 || a.assignedRoleCategory === 'family' || b.assignedRoleCategory === 'family') {
            const aStart = this.timeToMinutes(a.startTime);
            const aEnd = this.timeToMinutes(a.endTime);
            const bStart = this.timeToMinutes(b.startTime);
            const bEnd = this.timeToMinutes(b.endTime);

            // Overlap check
            if (aStart < bEnd && aEnd > bStart) {
              conflicts.push({
                id: `conflict-${a.id}-${b.id}`,
                date,
                eventA: a,
                eventB: b,
                conflictReason: `Jadwal "${a.title}" (${a.startTime}-${a.endTime}) bentrok waktu dengan "${b.title}" (${b.startTime}-${b.endTime}).`,
                suggestedResolution: `Geser waktu salah satu agenda minimal 30 menit atau delegasikan tugas ke anggota keluarga lain.`
              });
            }
          }
        }
      }
    });

    return conflicts;
  }

  /**
   * Find free time slots on a given date (working hours 08:00 - 21:00)
   */
  static findFreeTimeSlots(events: CalendarEvent[], date: string): { startTime: string; endTime: string; durationMinutes: number }[] {
    const dayEvents = events
      .filter(e => e.startDate === date)
      .sort((a, b) => this.timeToMinutes(a.startTime) - this.timeToMinutes(b.startTime));

    const workStart = 8 * 60; // 08:00
    const workEnd = 21 * 60; // 21:00
    const freeSlots: { startTime: string; endTime: string; durationMinutes: number }[] = [];

    let currentPointer = workStart;

    dayEvents.forEach(evt => {
      const eStart = this.timeToMinutes(evt.startTime);
      const eEnd = this.timeToMinutes(evt.endTime);

      if (eStart > currentPointer) {
        const gap = eStart - currentPointer;
        if (gap >= 30) {
          freeSlots.push({
            startTime: this.minutesToTime(currentPointer),
            endTime: this.minutesToTime(eStart),
            durationMinutes: gap
          });
        }
      }

      if (eEnd > currentPointer) {
        currentPointer = eEnd;
      }
    });

    if (workEnd > currentPointer) {
      const gap = workEnd - currentPointer;
      if (gap >= 30) {
        freeSlots.push({
          startTime: this.minutesToTime(currentPointer),
          endTime: this.minutesToTime(workEnd),
          durationMinutes: gap
        });
      }
    }

    return freeSlots;
  }

  // Convert "HH:mm" to minutes from midnight
  private static timeToMinutes(timeStr: string): number {
    const [h, m] = (timeStr || '00:00').split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  // Convert minutes from midnight to "HH:mm"
  private static minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
}
