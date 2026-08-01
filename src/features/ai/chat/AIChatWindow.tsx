import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  Heart, 
  Shield, 
  Stethoscope, 
  GraduationCap, 
  Settings,
  RotateCcw,
  Plus
} from 'lucide-react';
import { useChatStore } from '../stores/useChatStore';
import { useContextStore } from '../stores/useContextStore';
import { AISettingsModal } from '../components/AISettingsModal';

export const personasList = [
  { id: 'general', name: 'FamilyAI Core', title: 'Asisten Utama', icon: <Bot className="w-4 h-4 text-amber-400" />, desc: 'Solusi umum keluarga' },
  { id: 'mama', name: 'Mama AI', title: 'Ibu Pengasih', icon: <Heart className="w-4 h-4 text-pink-400" />, desc: 'Nutrisi & resep masak' },
  { id: 'papa', name: 'Papa AI', title: 'Ayah Bijak', icon: <Shield className="w-4 h-4 text-indigo-400" />, desc: 'Keuangan & perbaikan' },
  { id: 'dokter', name: 'Dokter AI', title: 'Konsultan Medis', icon: <Stethoscope className="w-4 h-4 text-red-400" />, desc: 'Pertolongan pertama' },
  { id: 'guru', name: 'Guru AI', title: 'Tutor Belajar', icon: <GraduationCap className="w-4 h-4 text-emerald-400" />, desc: 'PR & wawasan ilmu' },
  { id: 'psikolog', name: 'Konselor AI', title: 'Psikolog Keluarga', icon: <Sparkles className="w-4 h-4 text-purple-400" />, desc: 'Empati & komunikasi' }
];

export const AIChatWindow: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    messages, 
    selectedPersona, 
    setSelectedPersona, 
    sendMessage, 
    isLoading,
    createConversation,
    clearActiveMessages 
  } = useChatStore();

  const { context } = useContextStore();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [autoSpeech, setAutoSpeech] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = activeConversationId ? (messages[activeConversationId] || []) : [];
  const activeConvObj = conversations.find(c => c.id === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isLoading]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    const textToSend = inputPrompt;
    setInputPrompt('');
    setShowEmojiPicker(false);

    const senderInfo = {
      name: context?.currentUser?.name || 'Anggota Keluarga',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    sendMessage(textToSend, context, senderInfo);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Fitur pengenalan suara belum didukung di browser ini.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'id-ID';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setInputPrompt(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const addEmoji = (emoji: string) => {
    setInputPrompt(prev => prev + emoji);
  };

  // Basic Helper to Format Markdown (Bold, Lists, Code)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (line.startsWith('# ')) {
            return <h3 key={idx} className="font-bold text-sm text-indigo-300 mt-2 mb-1">{line.replace('# ', '')}</h3>;
          }
          if (line.startsWith('## ')) {
            return <h4 key={idx} className="font-semibold text-xs text-indigo-200 mt-1.5 mb-0.5">{line.replace('## ', '')}</h4>;
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{line.substring(2)}</span>
              </div>
            );
          }
          if (line.startsWith('```')) {
            return (
              <pre key={idx} className="p-3 bg-slate-950/80 rounded-xl font-mono text-[11px] text-amber-300 border border-slate-800 my-1 overflow-x-auto">
                {line.replace(/```/g, '')}
              </pre>
            );
          }
          
          // Format bold **text**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx} className="text-xs leading-relaxed">
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={pIdx} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Controls */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-lg text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{activeConvObj ? activeConvObj.title : 'AI Assistant Chat Core'}</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                Active
              </span>
            </h2>
            <p className="text-slate-400 text-xs">
              Pusat kecerdasan AI FamilyAI Hub berbasis Gemini AI & Context Memory.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => createConversation(context?.currentUser?.id || 'u-1', context?.familyInformation?.id || 'fam-1', 'Obrolan Baru', selectedPersona)}
            className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Chat Baru</span>
          </button>

          <button
            onClick={() => setAutoSpeech(!autoSpeech)}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
              autoSpeech ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Auto Voice Speech"
          >
            {autoSpeech ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={clearActiveMessages}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            title="Bersihkan Chat Ini"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
            title="Pengaturan AI Core"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Personas Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {personasList.map((p) => {
          const isSelected = selectedPersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected 
                  ? 'bg-gradient-to-b from-indigo-900/80 to-purple-900/80 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-400/50' 
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                {p.icon}
                {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
              </div>
              <div className="font-bold text-xs">{p.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{p.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Chat Box */}
      <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 flex flex-col h-[520px] shadow-2xl relative">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {activeMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img 
                  src={msg.avatar} 
                  alt={msg.senderName} 
                  className="w-9 h-9 rounded-2xl object-cover ring-2 ring-indigo-500/40 flex-shrink-0 shadow-md"
                />
                <div className={`max-w-[80%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold text-slate-300">{msg.senderName}</span>
                    <span>• {msg.timestamp}</span>
                  </div>
                  <div className={`p-4 rounded-3xl shadow-xl backdrop-blur-md ${
                    isUser 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none' 
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    {renderFormattedText(msg.text)}
                    {msg.isStreaming && (
                      <span className="inline-block w-2 h-3 bg-indigo-400 animate-pulse ml-1" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && !activeMessages.some(m => m.isStreaming) && (
            <div className="flex gap-3 items-center">
              <div className="w-9 h-9 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl text-xs text-slate-400 flex items-center gap-2 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                <span>AI sedang menyusun jawaban terbaik...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Floating Chat Input Bar */}
        <div className="relative mt-4 pt-3 border-t border-slate-800/80">
          
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-0 bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2 shadow-2xl z-20">
              {['❤️', '😊', '👍', '🙏', '🎉', '💡', '🏡', '🍲'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-lg p-1.5 hover:bg-slate-800 rounded-xl transition-all"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-2xl focus-within:border-indigo-500 shadow-xl transition-all">
            
            {/* Action Placeholders */}
            <div className="flex items-center gap-1 pl-1">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-900 rounded-xl transition-all"
                title="Tambahkan Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => alert('Placeholder: Unggah lampiran berkas / dokumen.')}
                className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 rounded-xl transition-all"
                title="Lampirkan Berkas"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => alert('Placeholder: Unggah foto / gambar.')}
                className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 rounded-xl transition-all"
                title="Unggah Foto"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`p-2 rounded-xl transition-all ${
                  isListening ? 'bg-rose-600 text-white animate-pulse' : 'text-slate-400 hover:text-rose-400 hover:bg-slate-900'
                }`}
                title="Rekam Suara"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ketik pertanyaan atau instruksi untuk ${personasList.find(p => p.id === selectedPersona)?.name}...`}
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 px-3 py-2 text-xs outline-none"
            />

            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

      <AISettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />

    </div>
  );
};
