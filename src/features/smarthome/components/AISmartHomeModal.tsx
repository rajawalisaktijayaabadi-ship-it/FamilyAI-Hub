import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  X, 
  Send, 
  Bot, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  Volume2
} from 'lucide-react';
import { useSmartHomeStore } from '../../../stores/useSmartHomeStore';
import { useDeviceStore } from '../../../stores/useDeviceStore';

interface AISmartHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISmartHomeModal: React.FC<AISmartHomeModalProps> = ({ isOpen, onClose }) => {
  const { aiSmartHomeInsights } = useSmartHomeStore();
  const { devices, toggleDevice, updateDeviceValue } = useDeviceStore();

  const [voiceQuery, setVoiceQuery] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string; actionApplied?: string }[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya FamilyAI Smart Home Assistant. Anda dapat memberikan perintah suara seperti "Matikan semua lampu", "Atur AC Kamar ke 22°C", atau "Berapa pemakaian listrik hari ini?".'
    }
  ]);
  const [isListening, setIsListening] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || voiceQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    let aiResponseText = 'Maaf, saya tidak mengenali perintah tersebut. Coba "Matikan semua lampu" atau "Atur AC ke 24°C".';
    let actionDone = '';

    const lower = query.toLowerCase();

    if (lower.includes('matikan semua lampu') || lower.includes('turn off all lights')) {
      devices.filter(d => d.category === 'Lampu').forEach(d => {
        if (d.status) toggleDevice(d.id);
      });
      aiResponseText = 'Siap! Seluruh lampu di rumah telah dimatikan secara serentak.';
      actionDone = 'Mematikan seluruh lampu pintar.';
    } else if (lower.includes('nyalakan semua lampu') || lower.includes('turn on all lights')) {
      devices.filter(d => d.category === 'Lampu').forEach(d => {
        if (!d.status) toggleDevice(d.id);
      });
      aiResponseText = 'Seluruh lampu utama rumah dinyalakan.';
      actionDone = 'Menyalakan seluruh lampu.';
    } else if (lower.includes('atur ac') || lower.includes('set ac')) {
      const match = lower.match(/\d+/);
      const temp = match ? parseInt(match[0]) : 24;
      const acDev = devices.find(d => d.category === 'AC');
      if (acDev) {
        updateDeviceValue(acDev.id, temp);
        aiResponseText = `Suhu AC ${acDev.name} berhasil diatur ke ${temp}°C.`;
        actionDone = `Mengubah suhu AC ke ${temp}°C`;
      }
    } else if (lower.includes('kunci pintu') || lower.includes('lock door')) {
      aiResponseText = 'Smart Lock pintu depan dipastikan terkunci rapat dan aman.';
      actionDone = 'Mengunci pintu depan.';
    } else if (lower.includes('listrik') || lower.includes('energi')) {
      aiResponseText = 'Pemakaian listrik hari ini tercatat 18.4 kWh (est. Rp 27.600). Beban realtime saat ini sekitar 835 Watt.';
    }

    setChatHistory(prev => [...prev, userMsg, { sender: 'ai', text: aiResponseText, actionApplied: actionDone }]);
    setVoiceQuery('');
  };

  const handleMicSimulate = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSendQuery('Matikan semua lampu di rumah');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-5 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">FamilyAI Smart Home Voice Assistant</h3>
              <p className="text-xs text-slate-400">Asisten suara pintar pemrosesan bahasa alami & AI rekomendasi kediaman.</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Recommendations Bar */}
        <div className="space-y-2 shrink-0">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Insight Proaktif AI Hari Ini:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {aiSmartHomeInsights.slice(0, 2).map((ins) => (
              <div key={ins.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 block">{ins.type} • {ins.title}</span>
                <p className="text-[11px] text-slate-300 line-clamp-2">{ins.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`p-3 rounded-2xl max-w-md leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none space-y-1'
              }`}>
                <p>{msg.text}</p>
                {msg.actionApplied && (
                  <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aksi Eksekusi Otomatis: {msg.actionApplied}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input & Voice Controls */}
        <div className="shrink-0 space-y-2">
          {isListening && (
            <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold text-center animate-pulse flex items-center justify-center gap-2">
              <Mic className="w-4 h-4 animate-bounce" />
              <span>Mendengarkan Perintah Suara Anda... ("Saying: Matikan semua lampu")</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleMicSimulate}
              className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl transition-all shrink-0"
              title="Simulasi Perintah Suara"
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={voiceQuery}
              onChange={(e) => setVoiceQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              placeholder="Atau ketik perintah: 'Atur AC 22', 'Matikan lampu'..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-3 text-xs text-white outline-none"
            />

            <button
              onClick={() => handleSendQuery()}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
