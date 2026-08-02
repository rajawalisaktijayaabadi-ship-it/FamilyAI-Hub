import React, { useState } from 'react';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Sparkles, 
  Bot, 
  User, 
  FileText, 
  Image as ImageIcon, 
  Volume2, 
  Sliders, 
  BookOpen, 
  Cpu 
} from 'lucide-react';
import { AIChatMessage } from '../../../types/aiSuperAssistant';

interface AIChatAssistantViewProps {
  currentMember?: any;
}

export const AIChatAssistantView: React.FC<AIChatAssistantViewProps> = ({ currentMember }) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Halo ${currentMember?.name || 'Keluarga'}! Saya FamilyAI Super Assistant v3.0. Ada yang bisa saya bantu hari ini mengenai jadwal, keuangan, resep sehat, atau pengasuhan anak?`,
      timestamp: '08:00 WIB',
      category: 'General Assistant'
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [selectedPromptCategory, setSelectedPromptCategory] = useState('Semua Topik');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  const promptLibrary = [
    { title: 'Analisis Anggaran & Proteksi Asuransi', category: 'Keuangan & Asuransi', text: 'Analisis kondisi keuangan keluarga bulan ini dan rekomendasikan polis asuransi tambahan yang dibutuhkan.' },
    { title: 'Susun Resep Sehat Dapur Anak', category: 'Nutrisi & Dapur', text: 'Buatkan rencana resep masakan tinggi protein untuk 3 hari menggunakan bahan ayam, sayur brokoli, dan wortel.' },
    { title: 'Saran Pengasuhan & Emosi Anak', category: 'Parenting', text: 'Bagaimana pendekatan positif saat anak berusia 8 tahun merasa lelah dan enggan mengerjakan PR sekolah?' },
    { title: 'Rencana Rutinitas Belajar Ujian', category: 'Edukasi', text: 'Susunlah jadwal belajar 30 menit per hari untuk persiapan ujian Matematika sekolah minggu depan.' }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const msgText = textToSend || inputMsg;
    if (!msgText.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      senderName: currentMember?.name || 'Anda',
      text: msgText,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          category: selectedPromptCategory,
          memberName: currentMember?.name || 'Keluarga'
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiReply: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply || 'Terima kasih atas pertanyaannya. AI sedang memproses integrasi data keluarga.',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          category: selectedPromptCategory
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        throw new Error('API Error');
      }
    } catch (e) {
      const fallbackMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Saya mengerti pertanyaan Anda: "${msgText}". Berdasarkan data konteks keluarga Sastro, rekomendasi terbaik adalah mengoordinasikan jadwal kalender harian, memastikan nutrisi gizi seimbang, serta memantau pengeluaran anggaran keluarga secara terukur.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Main Chat Interface */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between min-h-[600px]">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>FamilyAI Assistant Engine</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Online (Gemini Active)
                </span>
              </h3>
              <p className="text-xs text-slate-400">Model: Gemini 2.5 Flash • Context Window: 128k Tokens</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Token: 4,120 / 128,000</span>
            </span>
          </div>
        </div>

        {/* Message Stream Streamer */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[420px] pr-2 my-2">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-4 rounded-2xl text-xs space-y-2 shadow-lg leading-relaxed ${
                    isAI
                      ? 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-none'
                      : 'bg-indigo-600 text-white rounded-tr-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 border-b border-white/10 pb-1">
                    <span className="font-bold">{isAI ? 'FamilyAI Super Assistant' : msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {!isAI && (
                  <div className="p-2 bg-purple-600 text-white rounded-xl shadow-md shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-indigo-400 bg-slate-950 p-3 rounded-2xl border border-slate-800 w-max animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>FamilyAI sedang berpikir & menyusun jawaban terbaik...</span>
            </div>
          )}
        </div>

        {/* Input Bar & Controls */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecordingVoice(!isRecordingVoice)}
              className={`p-3 rounded-2xl border transition-all ${
                isRecordingVoice
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Input Suara Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              onClick={() => alert('Unggah berkas foto/PDF dokumen keluarga aktif!')}
              className="p-3 bg-slate-950 text-slate-400 hover:text-white border border-slate-800 rounded-2xl transition-all"
              title="Unggah Lampiran Dokumen/Gambar"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tanyakan apa saja seputar keluarga, anggaran, resep, atau tugas sekolah..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white p-3.5 rounded-2xl outline-none"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMsg.trim()}
              className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all"
            >
              <span>Kirim</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {isRecordingVoice && (
            <p className="text-[11px] text-rose-400 font-bold animate-pulse text-center">
              Merekam suara... Ucapkan instruksi Anda ke mikrofon.
            </p>
          )}
        </div>

      </div>

      {/* Side Prompt Library & Quick Templates */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Prompt Library AI</span>
          </h4>
        </div>

        <p className="text-xs text-slate-400">Pilih template pertanyaan cepat untuk keluarga:</p>

        <div className="space-y-3">
          {promptLibrary.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSendMessage(item.text)}
              className="p-3.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl cursor-pointer transition-all space-y-1.5 group"
            >
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                {item.category}
              </span>
              <h5 className="font-bold text-white text-xs group-hover:text-amber-300 transition-colors">
                {item.title}
              </h5>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
