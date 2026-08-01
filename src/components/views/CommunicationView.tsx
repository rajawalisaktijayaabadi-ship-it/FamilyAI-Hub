import React, { useState } from 'react';
import { MessageSquare, StickyNote as NoteIcon, Send, Plus, Pin, User } from 'lucide-react';
import { StickyNote, FamilyMember, ChatMessage } from '../../types';

interface CommunicationViewProps {
  stickyNotes: StickyNote[];
  currentMember: FamilyMember;
  onAddStickyNote: (note: StickyNote) => void;
}

export const CommunicationView: React.FC<CommunicationViewProps> = ({
  stickyNotes = [],
  currentMember,
  onAddStickyNote
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'chat'>('notes');
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteColor, setNoteColor] = useState<'yellow' | 'pink' | 'blue' | 'green' | 'purple'>('yellow');

  // Chat Messenger state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'c1',
      sender: 'family',
      senderName: 'Ibu Siti',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      text: 'Ayah & anak-anak, makan malam nanti jam 19:00 ya!',
      timestamp: '15:20'
    },
    {
      id: 'c2',
      sender: 'family',
      senderName: 'Ahmad Santoso',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      text: 'Siap Bu! Ahmad pulang abis tanding basket jam 18:00.',
      timestamp: '15:25'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newNote: StickyNote = {
      id: Date.now().toString(),
      author: currentMember.name,
      authorAvatar: currentMember.avatar,
      content: noteContent,
      color: noteColor,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    onAddStickyNote(newNote);
    setNoteContent('');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: currentMember.name,
      avatar: currentMember.avatar,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const getColorBg = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-amber-900/60 border-amber-500/40 text-amber-100';
      case 'pink': return 'bg-pink-900/60 border-pink-500/40 text-pink-100';
      case 'blue': return 'bg-blue-900/60 border-blue-500/40 text-blue-100';
      case 'green': return 'bg-emerald-900/60 border-emerald-500/40 text-emerald-100';
      case 'purple': return 'bg-purple-900/60 border-purple-500/40 text-purple-100';
      default: return 'bg-slate-900 border-slate-800 text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-teal-400" />
              <h2 className="text-xl font-bold">Komunikasi Keluarga & Papan Catatan Kulkas</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Catatan tempel kulkas digital dan obrolan grup keluarga hangat terpusat.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'notes' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Papan Catatan Kulkas
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'chat' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Grup Chat Keluarga
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'notes' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Add Note Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Pin className="w-4 h-4 text-teal-400" />
              <span>Tempel Catatan Kulkas Baru</span>
            </h3>

            <form onSubmit={handleAddNoteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Pilih Warna Catatan:</label>
                <div className="flex gap-2">
                  {(['yellow', 'pink', 'blue', 'green', 'purple'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNoteColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        noteColor === c ? 'ring-2 ring-white scale-110' : 'opacity-70'
                      }`}
                      style={{
                        backgroundColor: c === 'yellow' ? '#f59e0b' : c === 'pink' ? '#ec4899' : c === 'blue' ? '#3b82f6' : c === 'green' ? '#10b981' : '#a855f7'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Pesan / Pengingat:</label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-2xl p-3 text-xs text-slate-200 outline-none"
                  placeholder="Ketik catatan hangat untuk keluarga..."
                />
              </div>

              <button
                type="submit"
                disabled={!noteContent.trim()}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Tempel Di Kulkas
              </button>
            </form>
          </div>

          {/* Sticky Notes Grid Board */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Papan Tempel Kulkas Digital</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stickyNotes.map((note) => (
                <div
                  key={note.id}
                  className={`p-5 rounded-2xl border shadow-xl space-y-3 relative overflow-hidden ${getColorBg(note.color)}`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <img src={note.authorAvatar} alt={note.author} className="w-6 h-6 rounded-full object-cover ring-1 ring-white/50" />
                      <span className="font-bold text-xs">{note.author}</span>
                    </div>
                    <span className="text-[10px] opacity-80">{note.createdAt}</span>
                  </div>

                  <p className="text-xs font-medium leading-relaxed italic">"{note.content}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Family Chat Room */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col h-[520px]">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <img src={msg.avatar} alt={msg.senderName} className="w-8 h-8 rounded-full object-cover" />
                  <div className={`max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] text-slate-400 font-semibold">{msg.senderName} • {msg.timestamp}</div>
                    <div className={`p-3 rounded-2xl text-xs ${
                      isUser ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendChatMessage} className="mt-4 flex gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Kirim pesan hangat ke grup keluarga..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-teal-500 text-xs text-slate-200 p-3 rounded-2xl outline-none"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
