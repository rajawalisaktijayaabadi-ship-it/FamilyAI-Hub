export type AIPersonality = 'Professional' | 'Friendly' | 'Family' | 'Kids' | 'Formal' | 'Casual';
export type AITone = 'informative' | 'empathetic' | 'direct' | 'encouraging';
export type ResponseLength = 'concise' | 'balanced' | 'detailed';
export type ImportanceLevel = 'low' | 'medium' | 'high';

export interface AISettings {
  preferredLanguage: string;
  aiPersonality: AIPersonality;
  aiTone: AITone;
  responseLength: ResponseLength;
  creativityLevel: number; // 0.0 - 1.0
  streaming: boolean;
  autoSummary: boolean;
  memoryEnabled: boolean;
  darkModeSync: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  userId: string;
  familyId: string;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
  personaId: string;
  tags: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'ai' | 'system';
  senderName: string;
  avatar: string;
  text: string;
  timestamp: string;
  persona?: string;
  tokensUsed?: number;
  isStreaming?: boolean;
  attachments?: {
    type: 'image' | 'file' | 'audio';
    url: string;
    name: string;
  }[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Greeting' | 'Summary' | 'Recommendation' | 'Planning' | 'Reminder' | 'Question';
  template: string;
  variables: string[];
  iconName: string;
  description: string;
}

export interface AIMemory {
  id: string;
  conversationId: string;
  userId: string;
  familyId: string;
  summary: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  lastUsed: string;
  topic: string;
  category: string;
  importance: ImportanceLevel;
}

export interface AIRecommendation {
  id: string;
  title: string;
  content: string;
  actionType: 'schedule' | 'task' | 'member' | 'chat' | 'habit';
  actionPayload?: any;
  priority: ImportanceLevel;
  category: string;
  date: string;
  iconName: string;
}

export interface AIContext {
  currentUser: {
    id: string;
    name: string;
    role: string;
    detailedRole: string;
    email?: string;
  };
  familyInformation: {
    id: string;
    familyName: string;
    motto: string;
    address: string;
  };
  familyMembers: {
    id: string;
    name: string;
    role: string;
    age: number;
    status: string;
  }[];
  role: string;
  currentPage: string;
  date: string;
  time: string;
  language: string;
  preference: {
    theme: string;
    notifications: boolean;
  };
  conversationHistoryCount: number;
  // Future Module Placeholders
  mood?: any;
  psychology?: any;
  finance?: any;
  health?: any;
  education?: any;
  insurance?: any;
  shopping?: any;
  mealPlanner?: any;
  smartHome?: any;
  safety?: any;
  travel?: any;
  memories?: any;
}

export interface AISummary {
  id: string;
  conversationId: string;
  date: string;
  keyPoints: string[];
  actionItems: string[];
  summaryText: string;
}
