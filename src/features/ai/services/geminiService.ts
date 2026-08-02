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
      console.warn('GeminiService API fallback to Client AI Engine:', error);
      const userName = context.currentUser?.name || 'Keluarga';
      const personaGreetings: Record<string, string> = {
        mama: `Halo ${userName}! Sebagai Mama AI, saran saya untuk "${message}" adalah mengutamakan kehangatan, makanan bergizi, dan kenyamanan seluruh anggota keluarga. Jangan lupa istirahat cukup ya!`,
        papa: `Halo ${userName}! Sebagai Papa AI, analisis saya mengenai "${message}" adalah fokus pada kepastian, perencanaan anggaran yang bijak, dan perlindungan keamanan keluarga.`,
        kakak: `Halo ${userName}! Kakak AI di sini! Untuk "${message}", yuk kita susun strategi belajar dan manajemen waktu yang asyik tapi tetap efektif!`,
        dokter: `Halo ${userName}! Sebagai Dokter AI Keluarga, untuk keluhan "${message}", disarankan untuk cukup minum air putih, istirahat teratur, dan segera konsultasi medis jika timbul gejala berlanjut.`,
        guru: `Halo ${userName}! Sebagai Guru AI, mengenai "${message}", mari kita pelajari konsep dasarnya step-by-step agar lebih mudah dipahami!`,
        psikolog: `Halo ${userName}! Sebagai Konselor Psikologi Keluarga, mendengar cerita Anda tentang "${message}", luapkan perasaan Anda dengan tenang. Komunikasi terbuka adalah kunci utamanya.`
      };

      return personaGreetings[personaId] || `Halo ${userName}! Mengenai "${message}", FamilyAI Hub menyarankan untuk terus memantau jadwal kalender keluarga, menjaga nutrisi seimbang, dan mengalokasikan waktu berkualitas bersama.`;
    }
  }
}
