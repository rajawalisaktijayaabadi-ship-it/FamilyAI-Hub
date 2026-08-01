import { create } from 'zustand';
import { Conversation, Message, AISettings } from '../types/aiTypes';
import { GeminiService } from '../services/geminiService';
import { ConversationService } from '../services/conversationService';
import { StreamingService } from '../services/streamingService';

interface ChatStoreState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>; // conversationId -> Message[]
  settings: AISettings;
  isLoading: boolean;
  searchTerm: string;
  activeFilter: 'all' | 'pinned' | 'favorite' | 'archived';
  selectedPersona: string;

  // Actions
  setSearchTerm: (term: string) => void;
  setActiveFilter: (filter: 'all' | 'pinned' | 'favorite' | 'archived') => void;
  setSelectedPersona: (persona: string) => void;
  setActiveConversation: (id: string) => void;
  createConversation: (userId: string, familyId: string, title?: string, personaId?: string) => string;
  deleteConversation: (id: string) => void;
  togglePinConversation: (id: string) => void;
  toggleFavoriteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  updateSettings: (newSettings: Partial<AISettings>) => void;
  sendMessage: (text: string, context: any, senderInfo: { name: string; avatar: string }) => Promise<void>;
  clearActiveMessages: () => void;
}

const initialSettings: AISettings = {
  preferredLanguage: 'Bahasa Indonesia',
  aiPersonality: 'Family',
  aiTone: 'empathetic',
  responseLength: 'balanced',
  creativityLevel: 0.7,
  streaming: true,
  autoSummary: true,
  memoryEnabled: true,
  darkModeSync: true
};

const initialConversations: Conversation[] = [
  {
    id: 'conv-demo-1',
    title: 'Saran Menu Makan Malam',
    userId: 'u-1',
    familyId: 'fam-1',
    isPinned: true,
    isFavorite: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    category: 'Nutrisi',
    personaId: 'mama',
    tags: ['resep', 'mama']
  },
  {
    id: 'conv-demo-2',
    title: 'Diskusi Rencana Tabungan Anak',
    userId: 'u-1',
    familyId: 'fam-1',
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: 'Keuangan',
    personaId: 'papa',
    tags: ['tabungan', 'keuangan']
  }
];

const initialMessages: Record<string, Message[]> = {
  'conv-demo-1': [
    {
      id: 'm-1',
      conversationId: 'conv-demo-1',
      sender: 'user',
      senderName: 'Ayah Rudi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Mama AI, ada saran menu makan malam sehat untuk anak-anak?',
      timestamp: '18:30',
      persona: 'mama'
    },
    {
      id: 'm-2',
      conversationId: 'conv-demo-1',
      sender: 'ai',
      senderName: 'Mama AI',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      text: 'Halo Ayah Rudi! Coba masak **Ayam Tumis Mentega & Sayur Pelangi**. Bahan utamanya daging ayam, brokoli, dan wortel manis. Bergizi dan disukai anak-anak!',
      timestamp: '18:31',
      persona: 'mama'
    }
  ],
  'conv-demo-2': [
    {
      id: 'm-3',
      conversationId: 'conv-demo-2',
      sender: 'user',
      senderName: 'Ayah Rudi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Papa AI, bagaimana rumus rasio tabungan yang sehat untuk dana pendidikan?',
      timestamp: 'Kemarin',
      persona: 'papa'
    },
    {
      id: 'm-4',
      conversationId: 'conv-demo-2',
      sender: 'ai',
      senderName: 'Papa AI',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      text: 'Gunakan prinsip 50/30/20. Sisihkan minimal **20% dari pendapatan bulanan** langsung di awal bulan khusus untuk instrumen dana pendidikan berkala.',
      timestamp: 'Kemarin',
      persona: 'papa'
    }
  ]
};

export const useChatStore = create<ChatStoreState>((set, get) => ({
  conversations: initialConversations,
  activeConversationId: 'conv-demo-1',
  messages: initialMessages,
  settings: initialSettings,
  isLoading: false,
  searchTerm: '',
  activeFilter: 'all',
  selectedPersona: 'general',

  setSearchTerm: (term) => set({ searchTerm: term }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSelectedPersona: (persona) => set({ selectedPersona: persona }),
  setActiveConversation: (id) => set({ activeConversationId: id }),

  createConversation: (userId, familyId, title = 'Obrolan Baru', personaId = 'general') => {
    const newConv = ConversationService.createNewConversation(userId, familyId, title, personaId);
    set((state) => ({
      conversations: [newConv, ...state.conversations],
      activeConversationId: newConv.id,
      messages: {
        ...state.messages,
        [newConv.id]: [
          {
            id: `init-${Date.now()}`,
            conversationId: newConv.id,
            sender: 'ai',
            senderName: 'FamilyAI Core',
            avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
            text: `Halo! Saya siap membantu Anda dalam topik "${title}". Silakan ajukan pertanyaan atau instruksi Anda.`,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            persona: personaId
          }
        ]
      }
    }));
    return newConv.id;
  },

  deleteConversation: (id) => {
    set((state) => {
      const updatedConvs = state.conversations.filter(c => c.id !== id);
      const nextActiveId = updatedConvs.length > 0 ? updatedConvs[0].id : null;
      const updatedMessages = { ...state.messages };
      delete updatedMessages[id];

      return {
        conversations: updatedConvs,
        activeConversationId: state.activeConversationId === id ? nextActiveId : state.activeConversationId,
        messages: updatedMessages
      };
    });
  },

  togglePinConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.map(c => 
        c.id === id ? { ...c, isPinned: !c.isPinned } : c
      )
    }));
  },

  toggleFavoriteConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.map(c => 
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
      )
    }));
  },

  renameConversation: (id, newTitle) => {
    set((state) => ({
      conversations: state.conversations.map(c => 
        c.id === id ? { ...c, title: newTitle, updatedAt: new Date().toISOString() } : c
      )
    }));
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  },

  sendMessage: async (text, context, senderInfo) => {
    const { activeConversationId, messages, selectedPersona, settings } = get();
    if (!activeConversationId) return;

    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `usr-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      conversationId: activeConversationId,
      sender: 'user',
      senderName: senderInfo.name,
      avatar: senderInfo.avatar,
      text,
      timestamp
    };

    // Update state with user message
    const convMessages = messages[activeConversationId] || [];
    set((state) => ({
      isLoading: true,
      messages: {
        ...state.messages,
        [activeConversationId]: [...convMessages, userMsg]
      }
    }));

    // Generate response via GeminiService
    try {
      const aiResponseText = await GeminiService.sendMessage(
        text,
        selectedPersona,
        context,
        settings
      );

      const aiMsgId = `ai-${Date.now()}`;
      
      if (settings.streaming) {
        // Prepare empty AI message for streaming
        const placeholderAiMsg: Message = {
          id: aiMsgId,
          conversationId: activeConversationId,
          sender: 'ai',
          senderName: selectedPersona === 'mama' ? 'Mama AI' : selectedPersona === 'papa' ? 'Papa AI' : 'FamilyAI Core',
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          text: '',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          persona: selectedPersona,
          isStreaming: true
        };

        set((state) => ({
          messages: {
            ...state.messages,
            [activeConversationId]: [...(state.messages[activeConversationId] || []), placeholderAiMsg]
          }
        }));

        StreamingService.simulateStreaming(
          aiResponseText,
          (chunkText) => {
            set((state) => {
              const currentList = state.messages[activeConversationId] || [];
              const updatedList = currentList.map(m => m.id === aiMsgId ? { ...m, text: chunkText } : m);
              return {
                messages: {
                  ...state.messages,
                  [activeConversationId]: updatedList
                }
              };
            });
          },
          () => {
            set((state) => {
              const currentList = state.messages[activeConversationId] || [];
              const updatedList = currentList.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m);
              return {
                isLoading: false,
                messages: {
                  ...state.messages,
                  [activeConversationId]: updatedList
                }
              };
            });
          },
          15
        );
      } else {
        const finalAiMsg: Message = {
          id: aiMsgId,
          conversationId: activeConversationId,
          sender: 'ai',
          senderName: selectedPersona === 'mama' ? 'Mama AI' : selectedPersona === 'papa' ? 'Papa AI' : 'FamilyAI Core',
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          persona: selectedPersona,
          isStreaming: false
        };

        set((state) => ({
          isLoading: false,
          messages: {
            ...state.messages,
            [activeConversationId]: [...(state.messages[activeConversationId] || []), finalAiMsg]
          }
        }));
      }

      // Update conversation title if default title
      const currentConv = get().conversations.find(c => c.id === activeConversationId);
      if (currentConv && (currentConv.title === 'Obrolan Baru' || currentConv.title.startsWith('Obrolan '))) {
        const generatedTitle = text.length > 25 ? text.slice(0, 25) + '...' : text;
        get().renameConversation(activeConversationId, generatedTitle);
      }
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
    }
  },

  clearActiveMessages: () => {
    const { activeConversationId } = get();
    if (!activeConversationId) return;
    set((state) => ({
      messages: {
        ...state.messages,
        [activeConversationId]: []
      }
    }));
  }
}));
