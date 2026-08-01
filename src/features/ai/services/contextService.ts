import { AIContext } from '../types/aiTypes';

export class ContextService {
  static buildDefaultContext(
    currentUser: any,
    familyProfile: any,
    familyMembers: any[]
  ): AIContext {
    const now = new Date();
    return {
      currentUser: {
        id: currentUser?.id || 'u-1',
        name: currentUser?.name || 'Anggota Keluarga',
        role: currentUser?.role || 'parents',
        detailedRole: currentUser?.detailedRole || 'Ayah',
        email: currentUser?.email
      },
      familyInformation: {
        id: familyProfile?.id || 'fam-1',
        familyName: familyProfile?.familyName || 'Keluarga Utama',
        motto: familyProfile?.motto || 'Harmoni & Kehangatan Dalam Keluarga',
        address: familyProfile?.address || 'Kediaman Utama'
      },
      familyMembers: (familyMembers || []).map(m => ({
        id: m.id,
        name: m.name,
        role: m.detailedRole || m.role,
        age: m.age,
        status: m.statusText || 'aktif'
      })),
      role: currentUser?.detailedRole || 'Orang Tua',
      currentPage: 'AI Assistant',
      date: now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      language: 'Bahasa Indonesia',
      preference: {
        theme: 'dark',
        notifications: true
      },
      conversationHistoryCount: 5,
      // Future Modules Placeholder
      mood: null,
      psychology: null,
      finance: null,
      health: null,
      education: null,
      insurance: null,
      shopping: null,
      mealPlanner: null,
      smartHome: null,
      safety: null,
      travel: null,
      memories: null
    };
  }
}
