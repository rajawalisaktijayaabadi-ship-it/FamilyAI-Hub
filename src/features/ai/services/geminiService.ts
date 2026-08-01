import { AISettings, AIContext } from '../types/aiTypes';

export class GeminiService {
  static async sendMessage(
    message: string,
    personaId: string,
    context: AIContext,
    settings: AISettings
  ): Promise<string> {
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          persona: personaId,
          familyContext: {
            userName: context.currentUser?.name,
            userRole: context.currentUser?.role,
            familyName: context.familyInformation?.familyName,
            totalMembers: context.familyMembers?.length || 0,
            personality: settings.aiPersonality,
            tone: settings.aiTone,
            language: settings.preferredLanguage,
            length: settings.responseLength,
            creativity: settings.creativityLevel
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.reply || 'Maaf, saya tidak dapat merespons saat ini.';
    } catch (error) {
      console.error('GeminiService Error:', error);
      return 'Terjadi kesalahan jaringan saat menghubungkan ke server AI Family. Pastikan koneksi internet aktif.';
    }
  }
}
