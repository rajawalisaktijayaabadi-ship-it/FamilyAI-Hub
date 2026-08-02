export interface ChatMessageMemory {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  category?: string;
}

export interface FamilyLongTermMemory {
  preferences: Record<string, any>;
  habits: string[];
  routines: string[];
  goals: string[];
  summaryMemory: string;
}

export class GeminiMemoryEngine {
  private conversationHistory: ChatMessageMemory[] = [];
  private memoryStore: FamilyLongTermMemory = {
    preferences: {
      dietary: ['Halal', 'Kurangi Gula'],
      language: 'Bahasa Indonesia',
      parentingStyle: 'Positif & Empatis',
    },
    habits: ['Makan malam bersama jam 19:00', 'Olahraga Minggu pagi'],
    routines: ['Review tugas anak tiap jam 20:00'],
    goals: ['Dana pendidikan SD-SMA terdanai 100%', 'Liburan Bali akhir tahun'],
    summaryMemory: 'Keluarga harmonis dengan 2 anak, fokus pada pendidikan & kesehatan.',
  };

  public addMessage(message: ChatMessageMemory): void {
    this.conversationHistory.push(message);
    if (this.conversationHistory.length > 50) {
      this.conversationHistory.shift(); // Keep last 50 messages
    }
  }

  public getHistory(limit = 10): ChatMessageMemory[] {
    return this.conversationHistory.slice(-limit);
  }

  public setPreference(key: string, value: any): void {
    this.memoryStore.preferences[key] = value;
  }

  public addHabit(habit: string): void {
    if (!this.memoryStore.habits.includes(habit)) {
      this.memoryStore.habits.push(habit);
    }
  }

  public addGoal(goal: string): void {
    if (!this.memoryStore.goals.includes(goal)) {
      this.memoryStore.goals.push(goal);
    }
  }

  public updateSummaryMemory(summary: string): void {
    this.memoryStore.summaryMemory = summary;
  }

  public getLongTermMemory(): FamilyLongTermMemory {
    return { ...this.memoryStore };
  }
}
