import React, { useState } from 'react';
import { 
  Mic, 
  Camera, 
  Watch, 
  Activity, 
  Sparkles, 
  Volume2, 
  Layers, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const BiometricPlaceholdersCard: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceAnalysisResult, setVoiceAnalysisResult] = useState<string | null>(null);

  const simulateVoiceAnalysis = () => {
    setIsRecording(true);
    setVoiceAnalysisResult(null);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceAnalysisResult('Intonasi suara terdeteksi: 88% Tenang & Ramah (Calm Resonance). Tingkat nada stabil.');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Biometric Emotion Detection & Wearable Ready Architecture
            </h2>
            <p className="text-xs text-slate-400">
              Struktur integrasi sensorik audio, analitik ekspresi wajah, dan pemantauan detak jantung terpadu
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Voice Emotion Analysis */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Mic className="w-4 h-4" /> Voice Emotion Analysis
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Placeholder / Demo
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Menganalisis frekuensi suara dan intonasi bicaramu saat bercerita untuk mengidentifikasi tingkat emosi tersirat.
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
              <div className="flex items-center justify-center gap-1 h-12">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full bg-cyan-400 transition-all ${
                      isRecording ? 'animate-pulse bg-cyan-300' : 'opacity-40'
                    }`}
                    style={{ height: isRecording ? `${Math.floor(Math.random() * 32) + 10}px` : '16px' }}
                  />
                ))}
              </div>

              {voiceAnalysisResult && (
                <p className="text-[11px] text-cyan-300 bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-500/30">
                  {voiceAnalysisResult}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={simulateVoiceAnalysis}
            disabled={isRecording}
            className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20"
          >
            <Mic className="w-4 h-4" />
            <span>{isRecording ? 'Merekam & Analisis Intonasi...' : 'Uji Simulasi Deteksi Suara'}</span>
          </button>
        </div>

        {/* 2. Facial Emotion Detection */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                <Camera className="w-4 h-4" /> Facial Emotion Detection
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Placeholder
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Kerangka kerja kamera cerdas untuk memindai ekspresi mikro wajah (senyum, kerutan dahi, kelelahan mata).
            </p>

            <div className="bg-slate-950 h-32 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-slate-500 space-y-2 relative overflow-hidden">
              <Camera className="w-8 h-8 text-slate-600" />
              <span className="text-[11px] font-mono">Kamera Siap Diintegrasikan</span>
              <div className="absolute inset-4 border border-dashed border-indigo-500/30 rounded-xl pointer-events-none" />
            </div>
          </div>

          <button
            onClick={() => alert('Modul Facial Emotion Detection disiapkan untuk iterasi AI selanjutnya!')}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs transition-all text-center"
          >
            Aktivkan Sensor Ekspresi
          </button>
        </div>

        {/* 3. Wearable Integration Ready */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Watch className="w-4 h-4" /> Wearable Ready
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Siap Sinkron
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Menerima data HRV (Heart Rate Variability), pola tidur, dan langkah dari perangkat pintar keluarga.
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Smart Watch / Apple Watch</span>
                <span className="text-emerald-400 font-bold">Terhubung</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Health Tracker HRV</span>
                <span className="text-emerald-400 font-bold">Terhubung</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300">
                <span>Sleep Quality Monitor</span>
                <span className="text-emerald-400 font-bold">Terhubung</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Sinkronisasi data wearable berhasil diperbarui!')}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs transition-all text-center"
          >
            Sinkronkan Perangkat Cerdas
          </button>
        </div>

      </div>

    </div>
  );
};
