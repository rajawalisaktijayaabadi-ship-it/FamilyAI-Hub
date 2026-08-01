import React from 'react';
import { Settings, X, Sliders, MessageSquare, Shield, Globe, Sparkles, Check } from 'lucide-react';
import { useChatStore } from '../stores/useChatStore';
import { AIPersonality, AITone, ResponseLength } from '../types/aiTypes';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useChatStore();

  if (!isOpen) return null;

  const personalities: { id: AIPersonality; label: string; desc: string }[] = [
    { id: 'Family', label: 'Family (Keluarga)', desc: 'Hangat, suportif, berorientasi nilai kebersamaan keluarga' },
    { id: 'Friendly', label: 'Friendly (Ramah)', desc: 'Santai, bersahabat, mudah diajak berkonsultasi' },
    { id: 'Professional', label: 'Professional (Profesional)', desc: 'Terstruktur, lugas, mengutamakan efisiensi dan data' },
    { id: 'Kids', label: 'Kids (Anak-anak)', desc: 'Sabar, penuh warna, mudah dipahami si kecil' },
    { id: 'Formal', label: 'Formal (Resmi)', desc: 'Bahasa baku sopan, cocok untuk surat & dokumen' },
    { id: 'Casual', label: 'Casual (Gaul)', desc: 'Bahasa sehari-hari, santai dan menghibur' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Pengaturan AI Assistant (AI Core)</h3>
              <p className="text-xs text-slate-400">Atur kepribadian, nada bicara, serta performa sistem kecerdasan buatan.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs">
          
          {/* Preferred Language */}
          <div className="space-y-2">
            <label className="text-slate-200 font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>Bahasa Utama (Preferred Language)</span>
            </label>
            <select
              value={settings.preferredLanguage}
              onChange={(e) => updateSettings({ preferredLanguage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="English">English</option>
              <option value="Jawa">Bahasa Jawa</option>
              <option value="Sunda">Bahasa Sunda</option>
            </select>
          </div>

          {/* AI Personality Selector */}
          <div className="space-y-3">
            <label className="text-slate-200 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Kepribadian Utama AI (AI Personality)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalities.map((p) => {
                const isSelected = settings.aiPersonality === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => updateSettings({ aiPersonality: p.id })}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                        : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>{p.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Response Length & Tone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-slate-200 font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Panjang Jawaban</span>
              </label>
              <select
                value={settings.responseLength}
                onChange={(e) => updateSettings({ responseLength: e.target.value as ResponseLength })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="concise">Singkat & Padat (Concise)</option>
                <option value="balanced">Seimbang (Balanced)</option>
                <option value="detailed">Mendalam & Detail (Detailed)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-slate-200 font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Tingkat Kreativitas ({Math.round(settings.creativityLevel * 100)}%)</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={settings.creativityLevel}
                onChange={(e) => updateSettings({ creativityLevel: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* System Toggles */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">Streaming Response</div>
                <div className="text-[11px] text-slate-400">Tampilkan teks animasi pengetikan kata demi kata</div>
              </div>
              <input
                type="checkbox"
                checked={settings.streaming}
                onChange={(e) => updateSettings({ streaming: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <div>
                <div className="font-bold text-white text-xs">Sistem AI Memory Enabled</div>
                <div className="text-[11px] text-slate-400">Izinkan AI menyimpan konteks fakta penting keluarga</div>
              </div>
              <input
                type="checkbox"
                checked={settings.memoryEnabled}
                onChange={(e) => updateSettings({ memoryEnabled: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <div>
                <div className="font-bold text-white text-xs">Auto Summary History</div>
                <div className="text-[11px] text-slate-400">Otomatis buat ringkasan percakapan panjang</div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSummary}
                onChange={(e) => updateSettings({ autoSummary: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
