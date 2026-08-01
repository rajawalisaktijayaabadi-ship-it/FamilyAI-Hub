import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  QrCode, 
  Copy, 
  Check, 
  Shield, 
  Heart, 
  Sparkles, 
  Home, 
  Award,
  ChevronRight,
  X,
  UserCheck
} from 'lucide-react';
import { FamilyMember, DetailedFamilyRole } from '../../types';
import { useFamilyStore } from '../../store/useFamilyStore';

export const FamilyView: React.FC = () => {
  const { 
    familyMembers, 
    familyProfile, 
    familyInvitations, 
    rolePermissions,
    isAddMemberOpen, 
    setAddMemberOpen,
    isInviteModalOpen,
    setInviteModalOpen,
    addMember,
    updateMember,
    deleteMember,
    updateFamilyProfile,
    addInvitation,
    cancelInvitation
  } = useFamilyStore();

  const [activeSubTab, setActiveSubTab] = useState<'members' | 'tree' | 'profile' | 'permissions' | 'invitations'>('members');

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('Semua');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');

  // Modal & Form state for Add/Edit
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [memberForm, setMemberForm] = useState<{
    name: string;
    detailedRole: DetailedFamilyRole;
    relationship: string;
    age: number;
    birthDate: string;
    gender: 'Laki-laki' | 'Perempuan';
    phone: string;
    email: string;
    avatar: string;
    statusText: string;
    status: 'aktif' | 'sekolah' | 'kerja' | 'istirahat' | 'offline';
  }>({
    name: '',
    detailedRole: 'Anak',
    relationship: 'Anak',
    age: 12,
    birthDate: '2014-05-10',
    gender: 'Laki-laki',
    phone: '+6281234567890',
    email: 'anak@familyai.hub',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    statusText: 'Aktif di rumah',
    status: 'aktif'
  });

  // Invite Form
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<DetailedFamilyRole>('Saudara');
  const [copiedLink, setCopiedLink] = useState(false);

  // Profile Edit Modal
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    familyName: familyProfile.familyName,
    address: familyProfile.address,
    motto: familyProfile.motto,
    familyPhoto: familyProfile.familyPhoto
  });

  // Filtered members list
  const filteredMembers = familyMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.relationship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = selectedRoleFilter === 'Semua' || 
      member.detailedRole === selectedRoleFilter ||
      (selectedRoleFilter === 'Orang Tua' && (member.role === 'parents' || member.detailedRole === 'Ayah' || member.detailedRole === 'Ibu')) ||
      (selectedRoleFilter === 'Anak' && (member.role === 'kids' || member.detailedRole === 'Anak')) ||
      (selectedRoleFilter === 'Lansia' && (member.role === 'seniors' || member.detailedRole === 'Kakek' || member.detailedRole === 'Nenek'));

    const matchesStatus = selectedStatusFilter === 'Semua' || member.status === selectedStatusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingMember(null);
    setMemberForm({
      name: '',
      detailedRole: 'Anak',
      relationship: 'Anak',
      age: 12,
      birthDate: '2014-05-10',
      gender: 'Laki-laki',
      phone: '+6281234567890',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      statusText: 'Aktif di rumah',
      status: 'aktif'
    });
    setAddMemberOpen(true);
  };

  const handleOpenEdit = (m: FamilyMember) => {
    setEditingMember(m);
    setMemberForm({
      name: m.name,
      detailedRole: m.detailedRole || 'Anak',
      relationship: m.relationship,
      age: m.age,
      birthDate: m.birthDate || '2000-01-01',
      gender: m.gender || 'Laki-laki',
      phone: m.phone || '+6281234567890',
      email: m.email || '',
      avatar: m.avatar,
      statusText: m.statusText,
      status: m.status || 'aktif'
    });
    setAddMemberOpen(true);
  };

  const handleSubmitMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim()) return;

    if (editingMember) {
      updateMember(editingMember.id, {
        name: memberForm.name,
        detailedRole: memberForm.detailedRole,
        relationship: memberForm.relationship,
        age: Number(memberForm.age),
        birthDate: memberForm.birthDate,
        gender: memberForm.gender,
        phone: memberForm.phone,
        email: memberForm.email,
        avatar: memberForm.avatar,
        statusText: memberForm.statusText,
        status: memberForm.status,
        role: (memberForm.detailedRole === 'Ayah' || memberForm.detailedRole === 'Ibu') ? 'parents' : (memberForm.detailedRole === 'Kakek' || memberForm.detailedRole === 'Nenek') ? 'seniors' : 'kids'
      });
    } else {
      addMember({
        name: memberForm.name,
        detailedRole: memberForm.detailedRole,
        relationship: memberForm.relationship,
        age: Number(memberForm.age),
        birthDate: memberForm.birthDate,
        gender: memberForm.gender,
        phone: memberForm.phone,
        email: memberForm.email,
        avatar: memberForm.avatar,
        statusText: memberForm.statusText,
        status: memberForm.status,
        role: (memberForm.detailedRole === 'Ayah' || memberForm.detailedRole === 'Ibu') ? 'parents' : (memberForm.detailedRole === 'Kakek' || memberForm.detailedRole === 'Nenek') ? 'seniors' : 'kids',
        roleTitle: `${memberForm.relationship} (${memberForm.detailedRole})`,
        mood: 'happy',
        isOnline: true,
        location: {
          lat: -6.2088,
          lng: 106.8456,
          placeName: 'Kediaman Utama',
          lastUpdated: 'Baru saja',
          batteryPercent: 90
        }
      });
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    addInvitation(inviteEmail, inviteRole);
    setInviteEmail('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateFamilyProfile(profileForm);
    setIsEditProfileOpen(false);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(`https://familyai.hub/invite/${familyProfile.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg text-white">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span>Family Management</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                {familyMembers.length} Anggota
              </span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Kelola struktur anggota, silsilah keluarga, profil, dan hak akses peran seluruh anggota keluarga.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Undang Anggota</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Anggota</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSubTab('members')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'members'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Daftar Anggota</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tree')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'tree'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Family Tree (Silsilah)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Home className="w-4 h-4 text-emerald-400" />
          <span>Profil Keluarga</span>
        </button>

        <button
          onClick={() => setActiveSubTab('permissions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'permissions'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Shield className="w-4 h-4 text-purple-400" />
          <span>Hak Akses Peran (Permissions)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('invitations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'invitations'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Mail className="w-4 h-4 text-sky-400" />
          <span>Daftar Undangan ({familyInvitations.length})</span>
        </button>
      </div>

      {/* SUB TAB 1: MEMBERS LIST */}
      {activeSubTab === 'members' && (
        <div className="space-y-6">
          {/* Search & Filters Toolbar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, peran, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Role:</span>
              </div>
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Semua">Semua Peran</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Anak">Anak</option>
                <option value="Lansia">Lansia (Kakek/Nenek)</option>
                <option value="Ayah">Ayah</option>
                <option value="Ibu">Ibu</option>
                <option value="Saudara">Saudara</option>
                <option value="Pengasuh">Pengasuh</option>
              </select>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-2">
                <span>Status:</span>
              </div>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Semua">Semua Status</option>
                <option value="aktif">Aktif</option>
                <option value="sekolah">Sekolah</option>
                <option value="kerja">Kerja</option>
                <option value="istirahat">Istirahat</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Member Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl space-y-4 shadow-xl transition-all relative group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-md"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                        member.isOnline ? 'bg-emerald-500' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base truncate max-w-[150px]">{member.name}</h3>
                      <div className="text-xs text-indigo-300 font-semibold">{member.relationship} ({member.detailedRole || member.role})</div>
                      <div className="text-[11px] text-slate-400">{member.age} Tahun</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all"
                      title="Edit Anggota"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all"
                      title="Hapus Anggota"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Telepon:</span>
                    </span>
                    <span className="font-medium text-slate-200">{member.phone || '+628123456789'}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-400" />
                      <span>Email:</span>
                    </span>
                    <span className="font-medium text-slate-200 truncate max-w-[140px]">{member.email || 'Email belum diisi'}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Lokasi:</span>
                    </span>
                    <span className="font-medium text-slate-200 truncate max-w-[140px]">{member.location.placeName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full font-semibold uppercase text-[10px]">
                    Status: {member.status || 'aktif'}
                  </span>
                  <span className="text-slate-400 text-[11px] truncate max-w-[150px]">
                    {member.statusText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: VISUAL FAMILY TREE */}
      {activeSubTab === 'tree' && (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-8 shadow-xl">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Silsilah Keluarga (Family Tree)</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Visualisasi hierarki keturunan dan hubungan kekeluargaan secara interaktif dan terstruktur.
            </p>
          </div>

          <div className="space-y-8">
            {/* Generation 1: Seniors (Grandparents) */}
            <div className="space-y-3 text-center">
              <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                Generasi 1 — Lansia (Kakek & Nenek)
              </div>
              <div className="flex justify-center gap-6 flex-wrap">
                {familyMembers.filter(m => m.role === 'seniors' || m.detailedRole === 'Kakek' || m.detailedRole === 'Nenek').map(m => (
                  <div key={m.id} className="bg-slate-950 border border-amber-500/40 p-4 rounded-2xl text-center w-48 shadow-lg space-y-2">
                    <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-amber-400" />
                    <div className="font-bold text-white text-sm">{m.name}</div>
                    <div className="text-xs text-amber-300 font-semibold">{m.relationship} ({m.age} thn)</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-px h-8 bg-slate-700 mx-auto" />

            {/* Generation 2: Parents */}
            <div className="space-y-3 text-center">
              <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                Generasi 2 — Orang Tua (Ayah & Ibu)
              </div>
              <div className="flex justify-center gap-6 flex-wrap">
                {familyMembers.filter(m => m.role === 'parents' || m.detailedRole === 'Ayah' || m.detailedRole === 'Ibu').map(m => (
                  <div key={m.id} className="bg-slate-950 border border-indigo-500/40 p-4 rounded-2xl text-center w-48 shadow-lg space-y-2">
                    <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-indigo-400" />
                    <div className="font-bold text-white text-sm">{m.name}</div>
                    <div className="text-xs text-indigo-300 font-semibold">{m.relationship} ({m.age} thn)</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-px h-8 bg-slate-700 mx-auto" />

            {/* Generation 3: Kids */}
            <div className="space-y-3 text-center">
              <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                Generasi 3 — Anak-anak
              </div>
              <div className="flex justify-center gap-6 flex-wrap">
                {familyMembers.filter(m => m.role === 'kids' || m.detailedRole === 'Anak').map(m => (
                  <div key={m.id} className="bg-slate-950 border border-emerald-500/40 p-4 rounded-2xl text-center w-48 shadow-lg space-y-2">
                    <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-emerald-400" />
                    <div className="font-bold text-white text-sm">{m.name}</div>
                    <div className="text-xs text-emerald-300 font-semibold">{m.relationship} ({m.age} thn)</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 3: FAMILY PROFILE */}
      {activeSubTab === 'profile' && (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <img
                src={familyProfile.familyPhoto}
                alt={familyProfile.familyName}
                className="w-24 h-24 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-xl"
              />
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white">{familyProfile.familyName}</h3>
                <p className="text-indigo-300 text-xs italic">"{familyProfile.motto}"</p>
                <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{familyProfile.address}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profil Keluarga</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Tanggal Pembuatan Akun</div>
              <div className="text-lg font-bold text-white">{familyProfile.createdAt}</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Jumlah Rumah Terdaftar</div>
              <div className="text-lg font-bold text-indigo-400">{familyProfile.homeCount} Lokasi Kediaman</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold">Family Harmony Score</div>
              <div className="text-lg font-bold text-amber-400">{familyProfile.familyScore} / 100</div>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 4: PERMISSIONS MATRIX */}
      {activeSubTab === 'permissions' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl overflow-x-auto">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Matriks Hak Akses Peran (Role Permission Matrix)</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Konfigurasi kewenangan akses modul untuk setiap kategori peran di dalam keluarga.
            </p>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Peran (Role)</th>
                <th className="py-3 px-4 text-center">Kelola Anggota</th>
                <th className="py-3 px-4 text-center">Kelola Keuangan</th>
                <th className="py-3 px-4 text-center">Smart Home IoT</th>
                <th className="py-3 px-4 text-center">Akses AI</th>
                <th className="py-3 px-4 text-center">Kirim SOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {rolePermissions.map((perm, idx) => (
                <tr key={idx} className="hover:bg-slate-950/50">
                  <td className="py-4 px-4 font-bold text-white">{perm.label}</td>
                  <td className="py-4 px-4 text-center">
                    {perm.canManageMembers ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {perm.canManageFinance ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {perm.canControlSmartHome ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {perm.canAccessAI ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {perm.canSendSOS ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SUB TAB 5: INVITATIONS */}
      {activeSubTab === 'invitations' && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400" />
                <span>Daftar Undangan Anggota (Invitations)</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Status undangan email yang dikirim ke kerabat atau anggota baru.
              </p>
            </div>
            <button
              onClick={() => setInviteModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              + Kirim Undangan Baru
            </button>
          </div>

          <div className="space-y-3">
            {familyInvitations.map((inv) => (
              <div key={inv.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{inv.email}</div>
                  <div className="text-slate-400">Peran: <span className="text-indigo-300 font-semibold">{inv.role}</span> • Dikirim: {inv.createdAt}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase text-[10px]">
                    {inv.status}
                  </span>
                  <button
                    onClick={() => cancelInvitation(inv.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl"
                    title="Batalkan Undangan"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT MEMBER */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                <span>{editingMember ? 'Edit Data Anggota Keluarga' : 'Tambah Anggota Keluarga Baru'}</span>
              </h3>
              <button onClick={() => setAddMemberOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Peran dalam Keluarga *</label>
                  <select
                    value={memberForm.detailedRole}
                    onChange={(e) => setMemberForm({ ...memberForm, detailedRole: e.target.value as DetailedFamilyRole, relationship: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Ayah">Ayah</option>
                    <option value="Ibu">Ibu</option>
                    <option value="Anak">Anak</option>
                    <option value="Kakek">Kakek</option>
                    <option value="Nenek">Nenek</option>
                    <option value="Saudara">Saudara</option>
                    <option value="Pengasuh">Pengasuh</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={memberForm.birthDate}
                    onChange={(e) => setMemberForm({ ...memberForm, birthDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Umur (Tahun)</label>
                  <input
                    type="number"
                    value={memberForm.age}
                    onChange={(e) => setMemberForm({ ...memberForm, age: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Jenis Kelamin</label>
                  <select
                    value={memberForm.gender}
                    onChange={(e) => setMemberForm({ ...memberForm, gender: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nomor HP / WhatsApp</label>
                  <input
                    type="text"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    placeholder="+628123456789"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">Email</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">URL Foto Avatar</label>
                  <input
                    type="text"
                    value={memberForm.avatar}
                    onChange={(e) => setMemberForm({ ...memberForm, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold">Status / Catatan Singkat</label>
                  <input
                    type="text"
                    value={memberForm.statusText}
                    onChange={(e) => setMemberForm({ ...memberForm, statusText: e.target.value })}
                    placeholder="Contoh: Di sekolah, Di rumah"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddMemberOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg"
                >
                  {editingMember ? 'Simpan Perubahan' : 'Tambah Anggota'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: INVITE MEMBER */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400" />
                <span>Undang Anggota Baru</span>
              </h3>
              <button onClick={() => setInviteModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Email Penerima *</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="keluarga@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Peran Ditawarkan</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as DetailedFamilyRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Ayah">Ayah</option>
                  <option value="Ibu">Ibu</option>
                  <option value="Anak">Anak</option>
                  <option value="Kakek">Kakek</option>
                  <option value="Nenek">Nenek</option>
                  <option value="Saudara">Saudara</option>
                  <option value="Pengasuh">Pengasuh</option>
                </select>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-center">
                <div className="text-slate-400 text-[11px]">Atau bagikan Link / Kode QR berikut:</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="p-2 bg-white rounded-xl">
                    <QrCode className="w-16 h-16 text-slate-950" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyInviteLink}
                  className="w-full py-2 bg-slate-900 border border-slate-800 text-indigo-300 hover:text-white rounded-xl font-semibold flex items-center justify-center gap-2 text-xs"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Berhasil Disalin!' : 'Salin Link Undangan'}</span>
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg"
                >
                  Kirim Undangan Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT PROFILE */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-emerald-400" />
                <span>Edit Profil Utama Keluarga</span>
              </h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Keluarga</label>
                <input
                  type="text"
                  required
                  value={profileForm.familyName}
                  onChange={(e) => setProfileForm({ ...profileForm, familyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Alamat Kediaman Utama</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Moto Keluarga</label>
                <input
                  type="text"
                  value={profileForm.motto}
                  onChange={(e) => setProfileForm({ ...profileForm, motto: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">URL Foto Sampul Keluarga</label>
                <input
                  type="text"
                  value={profileForm.familyPhoto}
                  onChange={(e) => setProfileForm({ ...profileForm, familyPhoto: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-lg"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
