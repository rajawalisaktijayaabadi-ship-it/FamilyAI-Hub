import { AISummary, Message } from '../types/aiTypes';

export class SummaryService {
  static generateConversationSummary(conversationId: string, messages: Message[]): AISummary {
    const userMessages = messages.filter(m => m.sender === 'user').map(m => m.text);
    const keyPoints = userMessages.slice(-3);
    
    return {
      id: `sum-${Date.now()}`,
      conversationId,
      date: new Date().toLocaleDateString('id-ID'),
      keyPoints: keyPoints.length ? keyPoints : ['Diskusi agenda harian', 'Konsultasi ide menu makanan'],
      actionItems: ['Catat tanggal penting di kalender', 'Lakukan konfirmasi dengan anggota keluarga'],
      summaryText: `Percakapan membahas ${userMessages.length} pertanyaan/topik utama dengan rekomendasi praktis dari Asisten AI.`
    };
  }
}
