import { AIMemory, ImportanceLevel } from '../types/aiTypes';

export const initialAIMemories: AIMemory[] = [
  {
    id: 'mem-1',
    conversationId: 'conv-1',
    userId: 'u-1',
    familyId: 'fam-1',
    summary: 'Budi memiliki alergi udang dan kepiting laut.',
    keywords: ['alergi', 'makanan', 'budi', 'seafood'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: 'Baru saja',
    topic: 'Kesehatan & Nutrisi',
    category: 'Kesehatan',
    importance: 'high'
  },
  {
    id: 'mem-2',
    conversationId: 'conv-2',
    userId: 'u-1',
    familyId: 'fam-1',
    summary: 'Jadwal les piano Siti setiap hari Kamis pukul 16.00 WIB.',
    keywords: ['les', 'siti', 'piano', 'jadwal'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: '2 hari lalu',
    topic: 'Pendidikan Anak',
    category: 'Jadwal',
    importance: 'medium'
  },
  {
    id: 'mem-3',
    conversationId: 'conv-3',
    userId: 'u-1',
    familyId: 'fam-1',
    summary: 'Preferensi liburan keluarga menyukai destinasi alam & pegunungan.',
    keywords: ['liburan', 'destinasi', 'alam', 'pegunungan'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: '1 minggu lalu',
    topic: 'Rencana Liburan',
    category: 'Gaya Hidup',
    importance: 'low'
  }
];

export class MemoryService {
  static createMemoryFromChat(
    conversationId: string,
    userId: string,
    familyId: string,
    summaryText: string,
    topic: string,
    importance: ImportanceLevel = 'medium'
  ): AIMemory {
    const keywords = summaryText.toLowerCase().split(' ').slice(0, 5);
    return {
      id: `mem-${Date.now()}`,
      conversationId,
      userId,
      familyId,
      summary: summaryText,
      keywords,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: 'Baru saja',
      topic,
      category: 'Keluarga',
      importance
    };
  }
}
