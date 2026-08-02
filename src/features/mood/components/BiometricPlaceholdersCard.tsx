import React, { useState, useRef } from 'react';
import { 
  Mic, 
  Camera, 
  Watch, 
  Activity, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { useFamilyStore } from '../../../store/useFamilyStore';
import { useMoodStore } from '../stores/useMoodStore';

export const BiometricPlaceholdersCard: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceAnalysisResult, setVoiceAnalysisResult] = useState<string | null>(null);

  // Facial Emotion State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanningPhoto, setIsScanningPhoto] = useState(false);
  const [facialAnalysisResult, setFacialAnalysisResult] = useState<{
    emotion: string;
    confidence: number;
    stressLevel: string;
    eyeFatigue: string;
    details: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { familyMembers, updateMember } = useFamilyStore();
  const { syncFamilyMembersWithMoods } = useMoodStore();

  const simulateVoiceAnalysis = () => {
    setIsRecording(true);
    setVoiceAnalysisResult(null);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceAnalysisResult('Intonasi suara terdeteksi: 88% Tenang & Ramah (Calm Resonance). Tingkat nada stabil.');
    }, 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      analyzePhoto(imageUrl);
    }
  };

  const analyzePhoto = (imgUrl: string) => {
    setIsScanningPhoto(true);
    setFacialAnalysisResult(null);
    setTimeout(() => {
      setIsScanningPhoto(false);
      setFacialAnalysisResult({
        emotion: 'Senyum Bahagia & Rileks (Happy / Content)',
        confidence: 94,
        stressLevel: 'Rendah (Low - 15%)',
        eyeFatigue: 'Segar & Fokus',
        details: 'Garis senyum simetris, tatapan mata hangat, tidak ada indikasi kelelahan fisik.'
      });
    }, 2000);
  };

  const handleApplyToProfile = () => {
    if (!uploadedImage || familyMembers.length === 0) return;
    const activeMember = familyMembers[0];
    updateMember(activeMember.id, { avatar: uploadedImage });
    syncFamilyMembersWithMoods(familyMembers);
    alert(`Foto berhasil diperbarui sebagai foto profil & avatar AI Mood Detection untuk ${activeMember.name}!`);
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
              Biometric Emotion Detection & Photo AI Analyzer
            </h2>
            <p className="text-xs text-slate-400">
              Menganalisis ekspresi wajah dari foto yang diunggah, intonasi suara, dan data sensorik kesehatan keluarga.
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
                AI Audio Active
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

        {/* 2. Facial Emotion Detection & Photo Upload */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                <Camera className="w-4 h-4" /> AI Facial Emotion & Photo
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Interactive Scan
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Unggah foto wajah untuk pemindaian ekspresi AI & perbarui foto avatar mood secara otomatis.
            </p>

            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-slate-950 min-h-[140px] rounded-2xl border border-dashed border-indigo-500/40 hover:border-indigo-400 flex flex-col items-center justify-center p-4 cursor-pointer group transition-all relative overflow-hidden"
            >
              {uploadedImage ? (
                <div className="relative w-full flex flex-col items-center">
                  <img src={uploadedImage} alt="Uploaded face" className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-md" />
                  {isScanningPhoto && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center rounded-2xl text-indigo-300 text-xs font-semibold gap-2 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Memindai Ekpresi Wajah...
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-300 block">Klik / Unggah Foto Wajah</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG (Pindai Ekspresi AI)</span>
                  </div>
                </div>
              )}
            </div>

            {facialAnalysisResult && (
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-3 space-y-1.5 text-xs text-slate-200">
                <div className="flex items-center justify-between font-bold text-indigo-300">
                  <span>{facialAnalysisResult.emotion}</span>
                  <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Akurasi {facialAnalysisResult.confidence}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{facialAnalysisResult.details}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Upload className="w-4 h-4" />
              <span>{uploadedImage ? 'Ganti Foto Wajah' : 'Unggah Foto & Deteksi Ekspresi'}</span>
            </button>

            {uploadedImage && (
              <button
                onClick={handleApplyToProfile}
                className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold rounded-2xl text-xs transition-all border border-emerald-500/30 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Gunakan sebagai Foto AI Mood</span>
              </button>
            )}
          </div>
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
