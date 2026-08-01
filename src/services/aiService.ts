import { PromptManager } from './promptManager';

export interface AIServiceResponse {
  success: boolean;
  text: string;
  error?: string;
}

export class AIService {
  static async queryAI(prompt: string, persona: string = 'general'): Promise<AIServiceResponse> {
    try {
      const promptTemplate = PromptManager.getPrompt(persona);
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction: promptTemplate.systemInstruction
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      return {
        success: true,
        text: data.text || 'Tidak ada respon dari AI.'
      };
    } catch (err: any) {
      console.warn('AI Service local fallback:', err);
      return {
        success: false,
        text: `[Sistem FamilyAI Hub]: Halo! Permintaan Anda ("${prompt.slice(0, 40)}...") telah dicatat. Sebagai respon awal, AI merekomendasikan diskusi terbuka bersama keluarga.`,
        error: err.message
      };
    }
  }
}
