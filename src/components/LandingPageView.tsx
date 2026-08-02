import React, { useState } from 'react';
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
  Globe2
} from 'lucide-react';

interface LandingPageViewProps {
  onGoToLogin: () => void;
  onGoToAppDemo: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onGoToLogin,
  onGoToAppDemo
}) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'health' | 'finance' | 'shield' | 'edu'>('health');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Floating Navbar for Landing */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                FamilyAI <span className="text-indigo-400">Hub</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                AI Ecosystem
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Fitur Unggulan</a>
            <a href="#ecosystem" className="hover:text-indigo-400 transition-colors">8 Modul AI</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Paket Layanan</a>
            <a href="#security" className="hover:text-indigo-400 transition-colors">Keamanan Data</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToLogin}
              id="landing-login-nav-btn"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
            >
              Menu Login
            </button>
            <button
              onClick={onGoToAppDemo}
              id="landing-demo-nav-btn"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Generasi Baru Manajemen Keluarga Berbasis AI Gemini 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Ekosistem AI Cerdas Pertama Untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Keluarga Indonesia</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Satu platform terintegrasi untuk memantau rekam medis & kesehatan, mengelola anggaran keuangan 50/30/20, proteksi asuransi, edukasi anak, hingga otomatisasi Smart Home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGoToLogin}
              id="hero-login-btn"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Masuk Ke Akun Keluarga</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToAppDemo}
              id="hero-demo-btn"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Coba Demo Langsung</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>10,000+ Keluarga Terdaftar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Firestore Enterprise Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Dukungan Bahasa Indonesia</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Screen Mockup */}
        <div className="mt-12 relative max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/80 p-2 sm:p-4 shadow-2xl backdrop-blur-xl">
          <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-4 sm:p-6 space-y-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">FamilyAI Hub v2.5 — Dashboard Preview</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Firestore Live Sync
              </span>
            </div>

            {/* Feature Teaser Cards inside Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4" /> HealthAI
                  </span>
                  <span className="text-[10px] text-slate-400">Pemeriksaan Rutin</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Budi Wijaya: Tekanan darah normal (120/80 mmHg). Jadwal Vaksin Anak: 12 Ags.</p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" /> FinAI 50/30/20
                  </span>
                  <span className="text-[10px] text-slate-400">Sisa Anggaran Bulan Ini</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Kebutuhan (50%): Rp 7.500.000, Keinginan (30%): Sisa Rp 1.200.000.</p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                    <Brain className="w-4 h-4" /> HarmonyAI
                  </span>
                  <span className="text-[10px] text-slate-400">Tren Mood Keluarga</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Mood Rata-rata: Bahagia 😊 (92% Harmonis Pekan Ini).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core AI Modules Grid Section */}
      <section id="ecosystem" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">8 Ekosistem Terintegrasi</h2>
          <h3 className="text-3xl font-extrabold text-white">Segala Kebutuhan Rumah Tangga Dalam 1 Aplikasi</h3>
          <p className="text-sm text-slate-400">Diperkuat dengan kecerdasan buatan Gemini AI untuk analisis otomatis dan rekomendasi personal.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">HealthAI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Catatan rekam medis, grafik tanda vital, rekomendasi dokter AI, serta reminder jadwal obat dan imunisasi anak.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">FinAI (50/30/20)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Pencatatan keuangan otomatis, kalkulator rasio anggaran ideal, dan alokasi dana darurat & tabungan keluarga.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">ShieldAI Asuransi</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Kelola seluruh polis asuransi kesehatan, jiwa & kendaraan, audit cakupan dana klaim, dan pengingat jatuh tempo.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">EduAI & Quiz</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Kuis adaptif AI untuk pelajaran sekolah anak, pelacak streak belajar harian, dan ringkasan progres dari orang tua.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">MealAI & Shopping</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Perencana menu makan bergizi harian, otomatisasi daftar belanja bahan dapur, dan estimasi total kalori.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Smile className="w-5 h-5 text-pink-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">Mood & HarmonyAI</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Pelacak tren suasana hati harian anggota keluarga dan saran konsultasi psikologi untuk keharmonisan rumah tangga.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">Smart Home IoT</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Koneksi dan kontrol lampu, pendingin ruangan AC, kamera CCTV keamanan, serta konsumsi listrik rumah.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5 text-rose-400" />
            </div>
            <h4 className="font-bold text-slate-100 text-base mb-1">Travel & Live GPS</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Rencana liburan keluarga lengkap dengan itinerary AI, pelacak lokasi live GPS anggota keluarga, dan tombol Panic SOS.</p>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Pilihan Paket</h2>
          <h3 className="text-3xl font-extrabold text-white">Transparan Tanpa Biaya Tersembunyi</h3>
          <p className="text-sm text-slate-400">Pilih paket yang paling sesuai dengan kebutuhan anggota keluarga Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Tier */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Free Starter</h4>
              <p className="text-xs text-slate-400">Untuk keluarga kecil yang baru mencoba efisiensi manajemen AI.</p>
              <div className="text-3xl font-extrabold text-white">Rp 0 <span className="text-xs text-slate-500 font-normal">/selamanya</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Maksimal 3 Anggota Keluarga</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Catatan Kesehatan & Keuangan Dasar</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Smart Calendar & Tasks Sync</li>
              </ul>
            </div>
            <button
              onClick={onGoToLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Mulai Gratis
            </button>
          </div>

          {/* Family Pro (Popular) */}
          <div className="bg-gradient-to-b from-indigo-950/80 to-slate-900 border-2 border-indigo-500 rounded-3xl p-6 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-indigo-600/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Paling Populer 🔥
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Family Pro</h4>
              <p className="text-xs text-slate-300">Akses penuh seluruh 8 modul AI, tidak terbatas anggota keluarga.</p>
              <div className="text-3xl font-extrabold text-white">Rp 49.000 <span className="text-xs text-slate-400 font-normal">/bulan</span></div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Anggota Keluarga Tak Terbatas</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Akses Lengkap Gemini AI Voice & Assistant</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Cloud Firestore Encrypted Auto-Backup</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Mode Dashboard Smart TV Panitia Rumah</li>
              </ul>
            </div>
            <button
              onClick={onGoToLogin}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Coba 14 Hari Gratis
            </button>
          </div>

          {/* Enterprise Family */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Enterprise / Big Family</h4>
              <p className="text-xs text-slate-400">Untuk keluarga besar dengan asisten pribadi dedikasi & integrasi custom.</p>
              <div className="text-3xl font-extrabold text-white">Rp 149.000 <span className="text-xs text-slate-500 font-normal">/bulan</span></div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Semua Fitur Family Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Audit Log & Keamanan Enterprise</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Konsultasi AI Psikologi & Keuangan Prioritas</li>
              </ul>
            </div>
            <button
              onClick={onGoToLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Hubungi Tim Kami
            </button>
          </div>

        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-slate-200 font-bold text-sm">FamilyAI Hub — Smart Family Platform</span>
          </div>
          <p className="max-w-md mx-auto text-slate-400">
            Meningkatkan kualitas hidup dan kerukunan keluarga melalui integrasi kecerdasan buatan.
          </p>
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <button onClick={onGoToLogin} className="hover:text-white transition-colors">Menu Login</button>
            <span>•</span>
            <button onClick={onGoToAppDemo} className="hover:text-white transition-colors">Demo Aplikasi</button>
            <span>•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
          <p>© 2026 FamilyAI Hub. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>

    </div>
  );
};
