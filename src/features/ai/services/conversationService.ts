import { Conversation, Message } from '../types/aiTypes';

export class ConversationService {
  static createNewConversation(
    userId: string,
    familyId: string,
    title: string = 'Obrolan Baru',
    personaId: string = 'general'
  ): Conversation {
    const id = `conv-${Date.now()}`;
    return {
      id,
      title,
      userId,
      familyId,
      isPinned: false,
      isFavorite: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Umum',
      personaId,
      tags: ['family', 'ai']
    };
  }

  static filterConversations(
    conversations: Conversation[],
    search: string,
    filter: 'all' | 'pinned' | 'favorite' | 'archived'
  ): Conversation[] {
    return conversations.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      
      if (filter === 'pinned') return matchesSearch && c.isPinned;
      if (filter === 'favorite') return matchesSearch && c.isFavorite;
      if (filter === 'archived') return matchesSearch && c.isArchived;
      return matchesSearch && !c.isArchived;
    });
  }
}
