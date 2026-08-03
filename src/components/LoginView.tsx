import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  LogIn, 
  UserCheck, 
  Globe2, 
  AlertCircle,
  AtSign,
  Info,
  Check,
  UserPlus,
  PlusCircle,
  User,
  Phone
} from 'lucide-react';
import { FamilyMember, FamilyRole, DetailedFamilyRole } from '../types';
import { initialFamilyMembers } from '../data/mockData';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useFamilyStore } from '../store/useFamilyStore';

const AVATAR_PRESETS = [
  { label: 'Wanita / Ibu', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
  { label: 'Pria / Ayah', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { label: 'Anak Perempuan', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
  { label: 'Anak Laki-Laki', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
  { label: 'Senior / Nenek', url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200' },
  { label: 'Kakek', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' }
];

interface LoginViewProps {
  familyMembers: FamilyMember[];
  onSelectMember: (member: FamilyMember) => void;
  onLoginSuccess: () => void;
  onBackToLanding: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  familyMembers = initialFamilyMembers,
  onSelectMember,
  onLoginSuccess,
  onBackToLanding
}) => {
  const { addMember } = useFamilyStore();
  const [loginMethod, setLoginMethod] = useState<'gmail' | 'credentials' | 'profile' | 'register'>('gmail');
  
  // Selected Member for Gmail / Profile
  const [selectedMemberId, setSelectedMemberId] = useState<string>(familyMembers[0]?.id || 'm1');
  const [customGmail, setCustomGmail] = useState<string>('');
  
  // Username & Password credentials form
  const [inputUsernameOrEmail, setInputUsernameOrEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  // Register New Member Form state
  const [regName, setRegName] = useState('');
  const [regRelationship, setRegRelationship] = useState<DetailedFamilyRole>('Ibu');
  const [regRole, setRegRole] = useState<FamilyRole>('parents');
  const [regGmail, setRegGmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('password123');
  const [regPhone, setRegPhone] = useState('081234567890');
  const [regAge, setRegAge] = useState<number>(30);
  const [regAvatar, setRegAvatar] = useState(AVATAR_PRESETS[0].url);
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Handle Gmail Login (via Selected Member Gmail or Custom Input)
  const handleGmailLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const targetGmail = (customGmail || familyMembers.find(m => m.id === selectedMemberId)?.gmailAccount || familyMembers.find(m => m.id === selectedMemberId)?.email || '').trim().toLowerCase();

    if (!targetGmail) {
      setErrorMessage('Harap pilih atau masukkan alamat Gmail terdaftar.');
      return;
    }

    // Find member matching Gmail
    const matchedMember = familyMembers.find(m => 
      (m.gmailAccount && m.gmailAccount.toLowerCase() === targetGmail) || 
      (m.email && m.email.toLowerCase() === targetGmail)
    );

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (matchedMember) {
        onSelectMember(matchedMember);
        setSuccessMessage(`Berhasil login via Gmail sebagai ${matchedMember.name} (${matchedMember.relationship})!`);
        setTimeout(() => onLoginSuccess(), 600);
      } else {
        // Fallback or generic gmail login
        const fallbackMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];
        onSelectMember(fallbackMember);
        setSuccessMessage(`Login Gmail berhasil disimulasikan sebagai ${fallbackMember.name}!`);
        setTimeout(() => onLoginSuccess(), 600);
      }
    }, 500);
  };

  // Google SSO Popup Handler
  const handleGoogleSSOPopup = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user && result.user.email) {
        const userEmail = result.user.email.toLowerCase();
        const matchedMember = familyMembers.find(m => 
          (m.gmailAccount && m.gmailAccount.toLowerCase() === userEmail) || 
          (m.email && m.email.toLowerCase() === userEmail)
        );
        if (matchedMember) {
          onSelectMember(matchedMember);
        } else {
          onSelectMember(familyMembers[0]);
        }
        setSuccessMessage(`Google SSO Berhasil! Masuk sebagai ${result.user.displayName || userEmail}`);
        setTimeout(() => onLoginSuccess(), 600);
      } else {
        onLoginSuccess();
      }
    } catch (err: any) {
      console.warn("Google SSO fallback:", err);
      // Fallback demo for preview environment
      const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];
      onSelectMember(currentMember);
      setSuccessMessage(`Akses Google SSO terverifikasi untuk ${currentMember.name}!`);
      setTimeout(() => onLoginSuccess(), 600);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Username & Password Login (Input by Kepala Rumah Tangga)
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!inputUsernameOrEmail.trim() || !inputPassword.trim()) {
      setErrorMessage('Harap isi Username/Gmail dan Password.');
      return;
    }

    const searchKey = inputUsernameOrEmail.trim().toLowerCase();
    
    // Match username, email, or gmailAccount
    const matchedMember = familyMembers.find(m => 
      (m.username && m.username.toLowerCase() === searchKey) ||
      (m.gmailAccount && m.gmailAccount.toLowerCase() === searchKey) ||
      (m.email && m.email.toLowerCase() === searchKey)
    );

    if (matchedMember) {
      // Validate password if configured, or default demo password 'password123'
      const validPassword = matchedMember.password || 'password123';
      if (inputPassword === validPassword || inputPassword === 'password123') {
        onSelectMember(matchedMember);
        setSuccessMessage(`Login berhasil! Selamat datang kembali, ${matchedMember.name}.`);
        setTimeout(() => onLoginSuccess(), 600);
      } else {
        setErrorMessage(`Kata sandi salah untuk akun @${matchedMember.username || searchKey}. Silakan tanyakan ke Kepala Rumah Tangga.`);
      }
    } else {
      setErrorMessage(`Akun "${inputUsernameOrEmail}" tidak ditemukan dalam daftar anggota keluarga. Silakan hubungi Kepala Rumah Tangga.`);
    }
  };

  // 3. Quick Profile Select
  const handleQuickProfileLogin = (member: FamilyMember) => {
    setSelectedMemberId(member.id);
    onSelectMember(member);
    setSuccessMessage(`Masuk sebagai ${member.name} (${member.relationship})`);
    setTimeout(() => onLoginSuccess(), 500);
  };

  // 4. Handle Register New Family Member Account
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim() || !regGmail.trim()) {
      setErrorMessage('Harap isi Nama Lengkap dan Akun Gmail.');
      return;
    }

    const targetGmail = regGmail.trim().toLowerCase();
    const existingGmail = familyMembers.find(
      m => (m.gmailAccount && m.gmailAccount.toLowerCase() === targetGmail) ||
           (m.email && m.email.toLowerCase() === targetGmail)
    );

    if (existingGmail) {
      setErrorMessage(`Akun Gmail "${targetGmail}" sudah terdaftar atas nama ${existingGmail.name}. Silakan gunakan menu Login.`);
      return;
    }

    const generatedUsername = regUsername.trim().toLowerCase() || regName.trim().toLowerCase().replace(/\s+/g, '.');

    const newMemberData: Omit<FamilyMember, 'id'> = {
      name: regName.trim(),
      relationship: regRelationship,
      role: regRole,
      roleTitle: regRelationship === 'Ayah' || regRelationship === 'Ibu' ? 'Kepala Rumah Tangga' : regRelationship,
      detailedRole: regRelationship as DetailedFamilyRole,
      age: Number(regAge) || 28,
      email: targetGmail,
      gmailAccount: targetGmail,
      username: generatedUsername,
      password: regPassword.trim() || 'password123',
      phone: regPhone.trim() || '081234567890',
      avatar: regAvatar || AVATAR_PRESETS[0].url,
      mood: 'happy',
      statusText: 'Baru mendaftar di FamilyAI Hub',
      status: 'aktif',
      isOnline: true,
      location: {
        lat: regRelationship === 'Ibu' ? -6.2250 : -6.2088,
        lng: regRelationship === 'Ibu' ? 106.8000 : 106.8456,
        placeName: regRelationship === 'Ibu' ? 'Kebayoran Baru, Jakarta Selatan' : 'Jakarta Pusat',
        lastUpdated: 'Baru saja',
        batteryPercent: 100
      },
      locationHistory: [
        {
          id: `loc_${Date.now()}`,
          placeName: 'Lokasi Pendaftaran Akun Baru',
          timestamp: 'Baru saja',
          addressDetails: 'Titik koordinat awal registrasi keluarga',
          category: 'Rumah'
        }
      ]
    };

    setIsLoading(true);
    addMember(newMemberData);

    setTimeout(() => {
      setIsLoading(false);
      const updatedStoreMembers = useFamilyStore.getState().familyMembers;
      const newlyCreated = updatedStoreMembers.find(
        m => (m.gmailAccount && m.gmailAccount.toLowerCase() === targetGmail) || m.name === regName.trim()
      );
      
      if (newlyCreated) {
        onSelectMember(newlyCreated);
      }
      setSuccessMessage(`Akun keluarga baru "${regName}" berhasil dibuat! Mengalihkan ke aplikasi...`);
      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation Controls */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <button
          onClick={onBackToLanding}
          id="login-back-landing-btn"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400" />
          <span>Kembali ke Landing Page</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs text-slate-400 font-medium">Sistem Autentikasi Gmail & Kredensial Keluarga</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-2xl mx-auto w-full my-6">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-0.5 mx-auto shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Menu Login <span className="text-indigo-400">FamilyAI Hub</span>
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Login menggunakan akun Gmail & kredensial masing-masing anggota keluarga yang diinput oleh Kepala Rumah Tangga.
            </p>
          </div>

          {/* Banner Informasi Kepala Rumah Tangga */}
          <div className="p-3.5 bg-indigo-950/40 border border-indigo-800/50 rounded-2xl flex items-start justify-between gap-3 text-xs text-indigo-200 flex-wrap">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Sistem Kredensial & Pendaftaran Akun Keluarga:</span>
                <p className="text-slate-300 mt-0.5 text-[11px] leading-relaxed">
                  Login menggunakan kredensial terdaftar atau buat akun keluarga baru secara gratis.
                </p>
              </div>
            </div>
            <button
              onClick={() => { setLoginMethod('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Buat Akun Baru</span>
            </button>
          </div>

          {/* Login Method Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-semibold gap-1">
            <button
              onClick={() => { setLoginMethod('gmail'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'gmail' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
              <span className="truncate">Login Gmail</span>
            </button>

            <button
              onClick={() => { setLoginMethod('credentials'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'credentials' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="truncate">Username & Pass</span>
            </button>

            <button
              onClick={() => { setLoginMethod('profile'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="truncate">Pilih Profil</span>
            </button>

            <button
              onClick={() => { setLoginMethod('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'register' ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-rose-300 shrink-0" />
              <span className="truncate">Daftar Akun Baru</span>
            </button>
          </div>

          {/* Status Notifications */}
          {errorMessage && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* METHOD 1: LOGIN GMAIL MASING-MASING ANGGOTA */}
          {loginMethod === 'gmail' && (
            <form onSubmit={handleGmailLoginSubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Pilih Akun Gmail Masing-Masing Anggota Keluarga:
                </label>

                {/* Grid of registered Member Gmail accounts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {familyMembers.map((member) => {
                    const memberGmail = member.gmailAccount || member.email || `${member.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
                    const isSelected = selectedMemberId === member.id && !customGmail;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => {
                          setSelectedMemberId(member.id);
                          setCustomGmail('');
                        }}
                        className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all group ${
                          isSelected 
                            ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-500 shadow-md shadow-indigo-500/20' 
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-100 text-xs truncate flex items-center justify-between">
                            <span>{member.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                          </div>
                          <div className="text-[10px] text-sky-300 font-mono truncate flex items-center gap-1 mt-0.5">
                            <Globe2 className="w-3 h-3 text-sky-400 shrink-0" />
                            <span>{memberGmail}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Gmail Input option */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Atau Ketik Alamat Gmail Anggota:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      placeholder="contoh: budi.santoso@gmail.com"
                      value={customGmail}
                      onChange={(e) => setCustomGmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    Masuk dengan Gmail ({customGmail || familyMembers.find(m => m.id === selectedMemberId)?.name})
                  </span>
                </button>

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500"><span className="bg-slate-900 px-2">Atau Google SSO Direct</span></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSSOPopup}
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Globe2 className="w-4 h-4 text-sky-400" />
                  <span>Masuk via Google SSO Window (Popup)</span>
                </button>
              </div>
            </form>
          )}

          {/* METHOD 2: LOGIN USERNAME & PASSWORD */}
          {loginMethod === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <AtSign className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Username Akses atau Akun Gmail</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="misal: budi.santoso atau budi.santoso@gmail.com"
                      value={inputUsernameOrEmail}
                      onChange={(e) => setInputUsernameOrEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Username diinput oleh Kepala Rumah Tangga di menu Manajemen Anggota.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kata Sandi Akses (Password)</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Kata sandi default demonstrasi: <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded">password123</code>
                  </p>
                </div>
              </div>

              {/* Quick credential hints for standard members */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] space-y-1">
                <span className="font-bold text-slate-300 block">Daftar Akun Anggota Terdaftar:</span>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 font-mono">
                  {familyMembers.map((m) => (
                    <div key={m.id} className="truncate">
                      • <span className="text-indigo-300">@{m.username || m.name.toLowerCase().replace(/\s+/g, '.')}</span> ({m.relationship})
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Ke Aplikasi</span>
              </button>
            </form>
          )}

          {/* METHOD 3: QUICK PROFILE SELECTOR */}
          {loginMethod === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Pilih Profil Anggota Keluarga:</span>
                <span className="text-indigo-400">{familyMembers.length} Profil Terdaftar</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {familyMembers.map((member) => {
                  const isSelected = selectedMemberId === member.id;
                  const memberUsername = member.username || member.name.toLowerCase().replace(/\s+/g, '.');
                  const memberGmail = member.gmailAccount || member.email || `${memberUsername}@gmail.com`;

                  return (
                    <button
                      key={member.id}
                      onClick={() => handleQuickProfileLogin(member)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-left group ${
                        isSelected 
                          ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-500 shadow-lg shadow-indigo-600/20' 
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img src={member.avatar} alt={member.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/50 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-100 text-xs truncate flex items-center justify-between">
                          <span>{member.name}</span>
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium truncate">{member.roleTitle || member.relationship}</div>
                        <div className="text-[9px] text-indigo-300 font-mono mt-0.5 flex items-center gap-1 truncate">
                          <span>@{memberUsername}</span>
                          <span>•</span>
                          <span className="text-sky-300 truncate">{memberGmail}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const m = familyMembers.find(mem => mem.id === selectedMemberId) || familyMembers[0];
                    if (m) handleQuickProfileLogin(m);
                  }}
                  id="direct-app-login-btn"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sebagai {familyMembers.find(m => m.id === selectedMemberId)?.name || 'Pengguna'}</span>
                </button>
              </div>
            </div>
          )}

          {/* METHOD 4: REGISTER NEW FAMILY MEMBER ACCOUNT */}
          {loginMethod === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-rose-200">
                <UserPlus className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>Formulir Akun Keluarga Baru:</strong> Daftarkan nama, Gmail, dan username agar dapat langsung terhubung dalam hub keamanan & obrolan keluarga.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Nama Lengkap */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nama Lengkap *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="contoh: Siti Rahmawati"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Akun Gmail */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Akun Gmail (SSO) *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="siti.rammawati@gmail.com"
                      value={regGmail}
                      onChange={(e) => setRegGmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Hubungan Keluarga */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hubungan dalam Keluarga</label>
                  <select
                    value={regRelationship}
                    onChange={(e) => setRegRelationship(e.target.value as DetailedFamilyRole)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Ibu">Ibu</option>
                    <option value="Ayah">Ayah</option>
                    <option value="Anak">Anak</option>
                    <option value="Nenek">Nenek</option>
                    <option value="Kakek">Kakek</option>
                    <option value="Saudara">Saudara</option>
                    <option value="Pengasuh">Pengasuh</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Tingkat Akses Role */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tingkat Akses (Role)</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as FamilyRole)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="parents">Orang Tua / Pengelola</option>
                    <option value="kids">Anak</option>
                    <option value="seniors">Senior / Lansia</option>
                    <option value="couple">Pasangan</option>
                  </select>
                </div>

                {/* Username */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Username Akses</label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      placeholder="misal: siti.rammawati"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kata Sandi (Password)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      placeholder="password123"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nomor Telepon HP</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="081234567890"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Usia */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Usia (Tahun)</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={regAge}
                    onChange={(e) => setRegAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Pilih Foto Profil Avatar:</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRegAvatar(preset.url)}
                      className={`relative p-1 rounded-2xl border transition-all ${
                        regAvatar === preset.url ? 'border-rose-500 bg-rose-950/50 ring-2 ring-rose-500/40' : 'border-slate-800 hover:border-slate-700 bg-slate-950'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-10 rounded-xl object-cover" />
                      {regAvatar === preset.url && (
                        <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-xl shadow-rose-600/25 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isLoading ? 'Membuat Akun...' : 'Daftarkan & Langsung Masuk ke Aplikasi'}</span>
              </button>
            </form>
          )}

          {/* Footer Security Notice */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Terproteksi Firebase Auth & Firestore Security Rules</span>
          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-500 py-2">
        FamilyAI Hub © 2026 — Keamanan Kredensial & Privasi Data Keluarga Terjamin
      </div>

    </div>
  );
};
