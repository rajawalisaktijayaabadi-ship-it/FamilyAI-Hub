import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartPulse, 
  Wallet, 
  Brain, 
  Smile, 
  GraduationCap, 
  Utensils, 
  Home, 
  Plane, 
  ChevronRight, 
  ArrowRight, 
  Users, 
  Check, 
  Bot, 
  Star, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Play, 
  Globe2,
  KeyRound,
  AtSign,
  TrendingUp,
  Clock,
  Flame,
  Award,
  Shield,
  ArrowUpRight,
  Sparkle,
  Upload,
  Save,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';

interface LandingPageViewProps {
  onGoToLogin: () => void;
  onGoToAppDemo: () => void;
}

const DEFAULT_LANDING_PHOTO = "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=1600&auto=format&fit=crop&q=80";

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onGoToLogin,
  onGoToAppDemo
}) => {
  const [activeTab, setActiveTab] = useState<'health' | 'finance' | 'shield' | 'edu'>('finance');
  
  // Interactive ROI & AI Simulator State
  const [simIncome, setSimIncome] = useState<number>(15000000);
  const [simFamilySize, setSimFamilySize] = useState<number>(4);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simResultReady, setSimResultReady] = useState<boolean>(true);

  // Custom Uploaded Landing Family Photo State & Persistence
  const [landingPhoto, setLandingPhoto] = useState<string>(() => {
    return localStorage.getItem('familyai_landing_photo') || DEFAULT_LANDING_PHOTO;
  });
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempPhoto(event.target.result as string);
          setSaveStatus('Gambar dipilih. Klik "Simpan Foto" untuk menyimpan.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    const photoToSave = tempPhoto || landingPhoto;
    localStorage.setItem('familyai_landing_photo', photoToSave);
    setLandingPhoto(photoToSave);
    setTempPhoto(null);
    setSaveStatus('Foto landing page berhasil disimpan!');
    setTimeout(() => setSaveStatus(''), 3500);
  };

  const handleResetPhoto = () => {
    localStorage.removeItem('familyai_landing_photo');
    setLandingPhoto(DEFAULT_LANDING_PHOTO);
    setTempPhoto(null);
    setSaveStatus('Foto dikembalikan ke foto awal.');
    setTimeout(() => setSaveStatus(''), 3500);
  };

  // Live Visitor Ticker Simulation
  const [recentNotification, setRecentNotification] = useState<string>(
    'Budi Santoso (Surakarta) baru saja menginput akun Gmail 4 anggota keluarga'
  );

  useEffect(() => {
    const notifications = [
      'Budi Santoso (Surakarta) baru saja menginput akun Gmail 4 anggota keluarga',
      'Dr. Hendra (Bandung) mengaktifkan modul HealthAI Rekam Medis',
      'Siti Rahmawati (Surabaya) berhasil mengalokasikan tabungan 50/30/20',
      'Ahmad (Jakarta) menyelesaikan Kuis Adaptif EduAI hari ini',
      'Keluarga Pratama (Medan) mengkoneksikan Smart Home IoT CCTV & AC'
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % notifications.length;
      setRecentNotification(notifications[idx]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleRunSim = () => {
    setSimRunning(true);
    setSimResultReady(false);
    setTimeout(() => {
      setSimRunning(false);
      setSimResultReady(true);
    }, 600);
  };

  // 50/30/20 Calculations
  const needsAmount = simIncome * 0.50;
  const wantsAmount = simIncome * 0.30;
  const savingsAmount = simIncome * 0.20;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* 1. TOP HIGH-CTR EMERGENCY / PROMO FLASH TICKER */}
      <div className="bg-gradient-to-r from-amber-600 via-indigo-700 to-purple-700 text-white text-[11px] font-semibold py-2 px-4 shadow-lg border-b border-amber-500/30 flex items-center justify-between overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 animate-pulse">
              <Flame className="w-3 h-3 fill-slate-950" /> FLASH OFFER
            </span>
            <span className="truncate">
              <strong>Eksklusif Hari Ini:</strong> Gratis Akses 8 Modul AI Gemini 2.0 untuk Kepala Rumah Tangga & Seluruh Anggota Keluarga!
            </span>
          </div>

          <button
            onClick={onGoToLogin}
            className="hidden sm:flex items-center gap-1 bg-slate-950/80 hover:bg-slate-950 text-amber-300 hover:text-amber-200 px-3 py-1 rounded-full border border-amber-400/40 text-[10px] font-bold transition-all shrink-0 hover:scale-105"
          >
            <span>Klaim Akses di Menu Login</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION BAR (LUXURY GLASSMORPHISM) */}
      <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onGoToLogin}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-amber-500/20 hover:rotate-3 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  FamilyAI <span className="text-amber-400">Hub</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  PRO AI v2.5
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Platform Ekosistem Cerdas Rumah Tangga</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>8 Modul AI</span>
            </a>
            <a href="#simulator" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulasi Anggaran</span>
            </a>
            <a href="#gmail-login" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Akses Gmail Anggota</span>
            </a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Paket Layanan</a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">Kisah Sukses</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onGoToLogin}
              id="landing-login-nav-btn"
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Menu Login</span>
            </button>

            <button
              onClick={onGoToAppDemo}
              id="landing-demo-nav-btn"
              className="px-4.5 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 shadow-xl shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* 3. HERO SECTION (HIGH CTR & LUXURY AESTHETIC) */}
      <section className="relative pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* LUXURY FAMILY PHOTO BANNER SHOWCASE (POSISI PALING ATAS) */}
        <div className="mb-10 relative max-w-5xl mx-auto z-10">
          
          {/* Photo Showcase Display Card */}
          <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-amber-500/40 via-indigo-600/40 to-purple-600/40 shadow-2xl shadow-amber-500/20 group overflow-hidden">
            <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[16/9] sm:aspect-[21/9]">
              <img
                src={tempPhoto || landingPhoto}
                alt="Foto Utama Keluarga Harmonis"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Keluarga Harmonis & Sehat #FamilyAIHub</span>
              </div>

              {/* Floating Glassmorphism Overlay Cards */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
                    Terhubung 4 Anggota Keluarga
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                    Kebahagiaan & Kesehatan Keluarga Dalam Satu Genggaman
                  </h3>
                  <p className="text-xs text-slate-200 drop-shadow hidden sm:block">
                    Ayah (Kepala Rumah Tangga), Ibu, Anak Laki-Laki & Anak Perempuan terhubung dalam ekosistem Gmail & FinAI 50/30/20.
                  </p>
                </div>

                <button
                  onClick={onGoToLogin}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs transition-all shadow-xl shadow-amber-500/30 shrink-0 flex items-center gap-1.5 group/btn"
                >
                  <KeyRound className="w-4 h-4 text-slate-950 group-hover/btn:rotate-12 transition-transform" />
                  <span>Daftarkan Anggota di Menu Login</span>
                  <ChevronRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-2xl shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>SOLUSI RUMAH TANGGA CERDAS #1 BERBASIS GEMINI 2.0 AI</span>
            <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-[9px]">RESMI 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Kelola Rumah Tangga Impian Secara <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Mewah, Elegan & Cerdas</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Satu platform terpadu tempat Kepala Rumah Tangga menginput kredensial, username, password, dan akun Gmail terdaftar bagi setiap anggota keluarga untuk otomatisasi Kesehatan, Keuangan 50/30/20, Edukasi Anak, dan Smart Home.
          </p>

          {/* High-CTR Primary Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            <button
              onClick={onGoToLogin}
              id="hero-login-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-base shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2.5 group"
            >
              <KeyRound className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>🔑 MASUK MENU LOGIN SEKARANG</span>
              <ChevronRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={onGoToAppDemo}
              id="hero-demo-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-base border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-center gap-2.5 shadow-xl"
            >
              <Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              <span>🚀 JELAJAHI APLIKASI (LIVE DEMO)</span>
            </button>

          </div>

          {/* Realtime Live Ticker Feed Notification */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md flex items-center gap-3 text-left text-xs shadow-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="flex-1 truncate">
                <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Aktivitas Komunitas Terkini:</span>
                <span className="text-slate-200 font-medium truncate">{recentNotification}</span>
              </div>
            </div>
          </div>

          {/* Trust Social Proof Matrix */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <span className="font-bold">4.9/5 Rating (15.000+ Keluarga)</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Firestore Enterprise Encryption</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <Globe2 className="w-4 h-4 text-sky-400" />
              <span>Dukungan Login Gmail Anggota</span>
            </div>
          </div>

        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl border border-amber-500/30 bg-slate-900/90 p-2 sm:p-4 shadow-2xl shadow-amber-500/10 backdrop-blur-2xl">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-6 overflow-hidden">
            
            {/* Header Mockup Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 font-mono ml-2">FamilyAI Hub — Dashboard Utama Kepala Rumah Tangga</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Firestore Live Sync Ready
              </span>
            </div>

            {/* Quick Teaser Stats inside Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" /> FinAI 50/30/20
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">Sehat</span>
                </div>
                <div className="text-lg font-black text-white">Rp 15.000.000 <span className="text-xs font-normal text-slate-400">/bln</span></div>
                <p className="text-[11px] text-slate-400">Needs 50%: Rp 7.5jt | Wants 30%: Rp 4.5jt | Savings 20%: Rp 3jt</p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-indigo-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4" /> HealthAI Vitals
                  </span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-bold">Terpantau</span>
                </div>
                <div className="text-lg font-black text-white">4/4 Anggota Sehat</div>
                <p className="text-[11px] text-slate-400">Tekanan Darah Budi: 120/80. Jadwal Vaksin Nayla: 12 Ags 2026.</p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                    <AtSign className="w-4 h-4" /> Akun Terdaftar
                  </span>
                  <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full font-bold">Gmail Active</span>
                </div>
                <div className="text-lg font-black text-white">4 Akun Gmail Anggota</div>
                <p className="text-[11px] text-slate-400">Diinput oleh Kepala Rumah Tangga. Akses login via Gmail/Username.</p>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 4. INTERACTIVE SIMULATOR SECTION (HIGH CTR & ENGAGEMENT DRIVER) */}
      <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        
        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              ⚡ SIMULATOR FINANSIAL & KESEHATAN KELUARGA 5 DETIK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Cek Alokasi Cerdas FinAI 50/30/20 & Kesehatan Keluarga Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Masukkan total estimasi penghasilan rumah tangga dan jumlah anggota keluarga untuk melihat kalkulasi otomatis AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Penghasilan Rumah Tangga Bulanan (Rp):
                </label>
                <input
                  type="range"
                  min={3000000}
                  max={50000000}
                  step={1000000}
                  value={simIncome}
                  onChange={(e) => setSimIncome(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="text-right text-lg font-black text-amber-400 mt-1">
                  Rp {simIncome.toLocaleString('id-ID')}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Jumlah Anggota Keluarga Terdaftar:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSimFamilySize(num)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        simFamilySize === num
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {num === 6 ? '6+' : `${num} Orang`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRunSim}
                disabled={simRunning}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{simRunning ? 'Kalkulasi AI Memproses...' : 'Kalkulasi Ulang AI'}</span>
              </button>
            </div>

            {/* AI Results Output Card */}
            <div className="lg:col-span-7 bg-slate-950/90 p-6 rounded-2xl border border-indigo-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-extrabold text-sm text-amber-400 flex items-center gap-2">
                  <Bot className="w-4 h-4" /> Hasil Rekomendasi Gemini AI 2.0
                </span>
                <span className="text-[10px] text-slate-400">Rasio Sehat FinAI 50/30/20</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Kebutuhan (50%)</div>
                  <div className="text-sm font-black text-emerald-400 mt-1">Rp {needsAmount.toLocaleString('id-ID')}</div>
                  <div className="text-[9px] text-slate-500">Makan, Listrik, Sekolah</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Keinginan (30%)</div>
                  <div className="text-sm font-black text-indigo-400 mt-1">Rp {wantsAmount.toLocaleString('id-ID')}</div>
                  <div className="text-[9px] text-slate-500">Hiburan, Liburan</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-semibold">Tabungan (20%)</div>
                  <div className="text-sm font-black text-amber-400 mt-1">Rp {savingsAmount.toLocaleString('id-ID')}</div>
                  <div className="text-[9px] text-slate-500">Dana Darurat & Investasi</div>
                </div>
              </div>

              {/* High-CTR Callout Bar inside Simulator */}
              <div className="p-4 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left text-xs">
                  <span className="font-bold text-amber-300 block">Simpan Hasil & Bagikan Ke Seluruh Anggota Keluarga!</span>
                  <span className="text-slate-400 text-[11px]">Kepala Rumah Tangga dapat langsung mendaftarkan akun Gmail anggota di Menu Login.</span>
                </div>
                <button
                  onClick={onGoToLogin}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Menu Login Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 5. GMAIL & KREDENSIAL ANGGOTA SHOWCASE (SPECIFIC USER REQUIREMENT) */}
      <section id="gmail-login" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/40">
            🌐 SISTEM AUTENTIKASI KELUARGA TERINTEGRASI
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Input Username, Password & Akun Gmail Masing-Masing Anggota
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Kepala Rumah Tangga bertindak sebagai Admin Utama yang dengan mudah mendaftarkan kredensial untuk Ayah, Ibu, Anak, maupun Asisten Rumah Tangga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black">
              1
            </div>
            <h3 className="font-bold text-white text-base">Kepala Rumah Tangga Menginput Kredensial</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Di menu Manajemen Anggota, Kepala Rumah Tangga memasukkan Nama, Username, Password, dan Akun Gmail terdaftar bagi setiap anggota.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-indigo-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-black">
              2
            </div>
            <h3 className="font-bold text-white text-base">Anggota Login Menggunakan Gmail</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Anggota keluarga tinggal memilih akun Gmail masing-masing atau melakukan Google SSO popup pada Menu Login tanpa perlu registrasi ulang.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-emerald-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black">
              3
            </div>
            <h3 className="font-bold text-white text-base">Hak Akses Fleksibel & Aman</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Setiap anggota dapat melihat informasi sesuai rolenya (Orang Tua punya akses Keuangan penuh, Anak fokus ke EduAI & Tugas).
            </p>
          </div>

        </div>

      </section>

      {/* 6. 8 CORE AI MODULES (GRID WITH HIGH VISUAL APPEAL) */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-400">8 Ekosistem AI Terpadu</h2>
          <h3 className="text-3xl font-black text-white">Lengkap Untuk Seluruh Kebutuhan Rumah Tangga</h3>
          <p className="text-xs sm:text-sm text-slate-400">Diperkuat algoritma Gemini AI untuk analisis personalisasi tingkat tinggi.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-red-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">HealthAI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Catatan rekam medis, grafik tanda vital, reminder obat & jadwal vaksin anak otomatis.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">FinAI 50/30/20</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Pencatatan kas keluarga, rasio anggaran otomatis, serta alokasi tabungan & dana darurat.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">ShieldAI Asuransi</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Audit polis asuransi kesehatan & jiwa, kalkulator kecukupan Uang Pertanggungan (UP).</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">EduAI & Kuis Adaptif</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Kuis adaptif AI untuk pelajaran sekolah anak, pelacak streak belajar, dan leaderboard keluarga.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">MealAI & Belanja</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Perencana menu makan bergizi, daftar belanja dapur otomatis, dan hitung estimasi kalori harian.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-4 text-pink-400 group-hover:scale-110 transition-transform">
              <Smile className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">Mood & HarmonyAI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Pelacak tren suasana hati harian anggota keluarga dan konseling AI untuk kerukunan rumah tangga.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">Smart Home IoT</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Kontrol perangkat pintar seperti lampu, AC, kamera CCTV rumah, dan statistik tagihan listrik.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-5 transition-all hover:-translate-y-1 group shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base mb-1">Travel & Live GPS</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Rencana liburan keluarga lengkap, pelacak lokasi live GPS anggota keluarga, dan tombol Panic SOS.</p>
          </div>

        </div>

      </section>

      {/* 7. TESTIMONIALS & KISAH SUKSES (HIGH CONVERTING SOCIAL PROOF) */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">Dipercaya 15.000+ Keluarga</span>
          <h3 className="text-3xl font-black text-white">Apa Kata Kepala Rumah Tangga & Anggota?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Sangat praktis! Sebagai Kepala Keluarga, saya tinggal menginput username dan alamat Gmail istri serta anak-anak. Sekarang urusan keuangan dan jadwal vaksin anak terpantau rapi."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Budi" className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400" />
              <div>
                <div className="font-bold text-white text-xs">Budi Santoso</div>
                <div className="text-[10px] text-slate-400">Kepala Rumah Tangga — Jakarta</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Modul FinAI 50/30/20 membantu kami mengalokasikan tabungan pendidikan anak tanpa perlu bingung. Menu MealAI juga mempermudah belanja mingguan bahan dapur."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Siti" className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-400" />
              <div>
                <div className="font-bold text-white text-xs">Siti Rahmawati</div>
                <div className="text-[10px] text-slate-400">Ibu Rumah Tangga — Surabaya</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Saya suka EduAI dan Kuis Adaptifnya! Setiap sore pengerjaan tugas sekolah jadi menyenangkan karena ada streak belajar dan poin leaderboard keluarga."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80" alt="Ahmad" className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-400" />
              <div>
                <div className="font-bold text-white text-xs">Ahmad Santoso</div>
                <div className="text-[10px] text-slate-400">Anak Pertama (SMA) — Bandung</div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-400">Paket Akses Keluarga</h2>
          <h3 className="text-3xl font-black text-white">Bebas Pilih Sesuai Ukuran Keluarga Anda</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Starter */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Free Starter</h4>
              <p className="text-xs text-slate-400">Untuk keluarga kecil yang baru memulai otomatisasi AI.</p>
              <div className="text-3xl font-black text-white">Rp 0 <span className="text-xs text-slate-500 font-normal">/selamanya</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Maksimal 3 Anggota Keluarga</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Login Gmail & Kredensial Dasar</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> HealthAI & FinAI Dasar</li>
              </ul>
            </div>
            <button
              onClick={onGoToLogin}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Mulai Gratis
            </button>
          </div>

          {/* Family Pro (Popular) */}
          <div className="bg-gradient-to-b from-indigo-950/90 to-slate-900 border-2 border-amber-400 rounded-3xl p-6 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-amber-500/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              Paling Populer 🔥
            </div>
            <div className="space-y-4 pt-2">
              <h4 className="text-lg font-bold text-white">Family Pro AI</h4>
              <p className="text-xs text-slate-300">Akses tak terbatas untuk seluruh anggota keluarga & 8 modul AI.</p>
              <div className="text-3xl font-black text-amber-400">Rp 49.000 <span className="text-xs text-slate-300 font-normal">/bulan</span></div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Anggota Keluarga Tak Terbatas</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Login Gmail SSO Masing-Masing Anggota</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Akses Penuh Gemini AI Voice Assistant</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Sync Firestore Cloud Auto-Backup</li>
              </ul>
            </div>
            <button
              onClick={onGoToLogin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all"
            >
              Coba Gratis 14 Hari
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Big Family / Custom</h4>
              <p className="text-xs text-slate-400">Untuk keluarga besar dengan kebutuhan konseling AI khusus.</p>
              <div className="text-3xl font-black text-white">Rp 149.000 <span className="text-xs text-slate-500 font-normal">/bulan</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Semua Fitur Family Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Konsultasi AI Psikologi & Keuangan Prioritas</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Integrasi Smart Home Khusus</li>
              </ul>
            </div>
            <button
              onClick={onGoToLogin}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Hubungi Tim Kami
            </button>
          </div>

        </div>

      </section>

      {/* 9. STICKY FLOATING HIGH-CTR FOOTER BAR */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[92%] sm:w-full">
        <div className="bg-slate-900/95 border border-amber-500/40 rounded-2xl p-3 sm:px-5 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div className="truncate text-xs">
              <span className="font-extrabold text-white block truncate">Siap Mewujudkan Rumah Tangga Impian?</span>
              <span className="text-slate-400 text-[10px] hidden sm:block">Akses 8 Modul AI & Login Gmail Seluruh Anggota Keluarga</span>
            </div>
          </div>

          <button
            onClick={onGoToLogin}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs transition-all shrink-0 shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <span>Masuk Menu Login</span>
            <ChevronRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

      {/* 10. FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 pb-24">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-slate-200 font-extrabold text-sm">FamilyAI Hub — Platform Digital Cerdas Keluarga</span>
          </div>
          <p className="max-w-md mx-auto text-slate-400 text-[11px] leading-relaxed">
            Menghubungkan Kepala Rumah Tangga dan seluruh anggota keluarga melalui autentikasi kredensial Gmail, kecerdasan buatan Gemini AI, dan keamanan terenkripsi.
          </p>
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <button onClick={onGoToLogin} className="hover:text-amber-400 transition-colors">Menu Login</button>
            <span>•</span>
            <button onClick={onGoToAppDemo} className="hover:text-amber-400 transition-colors">Aplikasi (Live Demo)</button>
            <span>•</span>
            <a href="#privacy" className="hover:text-amber-400 transition-colors">Kebijakan Privasi</a>
          </div>
          <p>© 2026 FamilyAI Hub. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>

    </div>
  );
};
