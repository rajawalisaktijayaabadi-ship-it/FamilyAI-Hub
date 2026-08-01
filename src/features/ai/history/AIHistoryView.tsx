import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Pin, 
  Star, 
  Archive, 
  Trash2, 
  Edit3, 
  MessageSquare, 
  Calendar, 
  Tag, 
  Check, 
  X,
  ChevronRight
} from 'lucide-react';
import { useChatStore } from '../stores/useChatStore';
import { ConversationService } from '../services/conversationService';

export const AIHistoryView: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversation, 
    togglePinConversation, 
    toggleFavoriteConversation, 
    deleteConversation, 
    renameConversation 
  } = useChatStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'pinned' | 'favorite' | 'archived'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const filteredList = ConversationService.filterConversations(conversations, searchTerm, filterMode);

  const handleStartRename = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    if (editingTitle.trim()) {
      renameConversation(id, editingTitle);
    }
    setEditingId(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <span>Histori Percakapan AI (Conversation History)</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Kelola, cari, atau sematkan riwayat diskusi penting bersama AI Assistant.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'pinned', label: 'Disematkan' },
            { id: 'favorite', label: 'Favorit' },
            { id: 'archived', label: 'Arsip' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterMode === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Cari topik percakapan atau kata kunci..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-slate-300 font-bold text-sm">Tidak ada percakapan ditemukan</div>
            <p className="text-slate-500 text-xs">Coba ubah kata kunci pencarian atau buat percakapan baru.</p>
          </div>
        ) : (
          filteredList.map((conv) => {
            const isActive = activeConversationId === conv.id;
            const isEditing = editingId === conv.id;

            return (
              <div
                key={conv.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isActive
                    ? 'bg-indigo-900/30 border-indigo-500/50 shadow-lg'
                    : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-indigo-400'}`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="bg-slate-900 border border-indigo-500 px-3 py-1 text-xs text-white rounded-lg focus:outline-none"
                        />
                        <button onClick={() => handleSaveRename(conv.id)} className="p-1 bg-emerald-600 text-white rounded-lg">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1 bg-slate-800 text-slate-400 rounded-lg">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm truncate">{conv.title}</h4>
                        {conv.isPinned && <Pin className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                        {conv.isFavorite && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{new Date(conv.updatedAt).toLocaleDateString('id-ID')}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-indigo-300 font-semibold text-[10px]">
                        {conv.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => togglePinConversation(conv.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      conv.isPinned ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title="Sematkan"
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleFavoriteConversation(conv.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      conv.isFavorite ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title="Favorit"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleStartRename(conv.id, conv.title)}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800"
                    title="Ubah Nama"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteConversation(conv.id)}
                    className="p-2 bg-slate-900 hover:bg-rose-950 text-rose-400 rounded-xl border border-slate-800"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveConversation(conv.id)}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                  >
                    <span>Buka Chat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
