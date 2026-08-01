import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  MessageSquare, 
  Calendar, 
  Users, 
  Heart, 
  FileText, 
  ChevronRight 
} from 'lucide-react';
import { useChatStore } from '../stores/useChatStore';
import { useContextStore } from '../stores/useContextStore';

interface AIHomeCardProps {
  onOpenChatWithPrompt?: (promptText: string) => void;
}

export const AIHomeCard: React.FC<AIHomeCardProps> = ({ onOpenChatWithPrompt }) => {
  const { conversations, activeConversationId, messages } = useChatStore();
  const { context } = useContextStore();

  const userName = context?.currentUser?.name || 'Keluarga';
  const activeMessages = activeConversationId ? (messages[activeConversationId] || []) : [];
  const recentAiMsg = activeMessages.filter(m => m.sender === 'ai').pop();

  const quickAskItems = [
    { label: 'Ringkas Hari Ini', prompt: 'Tolong buatkan ringkasan singkat agenda dan pengingat keluarga hari ini.', icon: <FileText className="w-3.5 h-3.5 text-indigo-400" /> },
    { label: 'Buat Jadwal', prompt: 'Bantu buatkan draf jadwal kegiatan keluarga untuk akhir pekan ini.', icon: <Calendar className="w-3.5 h-3.5 text-sky-400" /> },
    { label: 'Cari Anggota', prompt: 'Dimana posisi terakhir dan status kesehatan anggota keluarga saat ini?', icon: <Users className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'Lihat Agenda', prompt: 'Apa saja daftar tugas dan pengingat mendesak yang belum selesai?', icon: <Calendar className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Quality Time', prompt: 'Berikan 3 ide ide kegiatan quality time keluarga yang seru dan berkesan.', icon: <Heart className="w-3.5 h-3.5 text-rose-400" /> }
  ];

  const handleQuickAsk = (promptText: string) => {
    if (onOpenChatWithPrompt) {
      onOpenChatWithPrompt(promptText);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 rounded-3xl space-y-5 shadow-2xl relative overflow-hidden group">
      
      {/* Subtle Glow FX */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all" />

      {/* Header & Greeting */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg ring-4 ring-indigo-500/20">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-white">FamilyAI Assistant</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Core Active
              </span>
            </div>
            <p className="text-slate-300 text-xs font-medium mt-0.5">
              Halo <span className="text-indigo-300 font-bold">{userName}</span>! Siap mendampingi aktivitas & keharmonisan keluarga hari ini.
            </p>
          </div>
        </div>
      </div>

      {/* Suggestion Box */}
      <div className="bg-slate-950/80 border border-indigo-500/20 p-4 rounded-2xl space-y-1.5 shadow-inner">
        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Saran AI Hari Ini:</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          "Luangkan 15 menit makan malam tanpa gadget malam ini untuk mempererat komunikasi antaranggota keluarga."
        </p>
      </div>

      {/* Recent Chat Preview */}
      {recentAiMsg && (
        <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <MessageSquare className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-slate-300">{recentAiMsg.senderName}: </span>
            <span className="text-slate-400 truncate block">{recentAiMsg.text}</span>
          </div>
        </div>
      )}

      {/* Quick Ask Buttons */}
      <div className="space-y-2 pt-1">
        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Quick Ask (Tanya Cepat AI):</div>
        <div className="flex flex-wrap gap-2">
          {quickAskItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAsk(item.prompt)}
              className="px-3 py-2 bg-slate-900/90 hover:bg-indigo-600/30 border border-slate-800 hover:border-indigo-500/50 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
