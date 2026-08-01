import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  Compass, 
  Calendar, 
  DollarSign, 
  Luggage,
  Volume2
} from 'lucide-react';
import { TravelService } from '../services/travelService';
import { useTravelStore } from '../../../stores/useTravelStore';

interface AITravelAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AITravelAssistantModal: React.FC<AITravelAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const { trips, activeTripId } = useTravelStore();
  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];

  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Halo! Saya AI Travel & Family Vacation Assistant. Saya siap membantu menyusun rekomendasi destinasi, menghitung anggaran liburan, menyusun itinerary harian, dan menyiapkan checklist perlengkapan perjalanan keluarga Anda.`
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add User message
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = TravelService.getAITravelRecommendation(query, activeTrip?.destination || 'Bali');
      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const quickPills = [
    { label: 'Rekomendasi Destinasi Rama Anak', query: 'Berikan rekomendasi tempat wisata ramah anak dan balita' },
    { label: 'Rancangan Budget Liburan', query: 'Hitung estimasi anggaran liburan keluarga 4 orang selama 3 hari' },
    { label: 'Checklist Barang Bawaan Bayi', query: 'Susun checklist perlengkapan obat dan pakaian untuk anak balita' },
    { label: 'Tips Mudik Aman & Nyaman', query: 'Berikan tips persiapannya perjalanan jauh atau road trip keluarga' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">AI Travel & Vacation Assistant</h3>
              <p className="text-xs text-slate-400">Powered by Google Gemini AI Model Engine</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Conversation Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-xl text-xs shrink-0 ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-amber-400 italic">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AI sedang memproses rekomendasi travel...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pill.query)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-white whitespace-nowrap"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan ide liburan, rute perjalanan, atau perlengkapan..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
