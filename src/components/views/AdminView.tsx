import React, { useState } from 'react';
import { Crown, UserPlus, Settings, Shield, Key, Tv, Database, Check } from 'lucide-react';
import { FamilyMember } from '../../types';

interface AdminViewProps {
  familyMembers: FamilyMember[];
  onAddMember: (member: FamilyMember) => void;
  onOpenSmartTV: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  familyMembers = [],
  onAddMember,
  onOpenSmartTV
}) => {
  const [name, setName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Anak');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [avatar, setAvatar] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name,
      relationship,
      role: 'parents',
      roleTitle: relationship,
      age: 30,
      avatar,
      mood: 'happy',
      statusText: 'Baru saja bergabung',
      isOnline: true,
      location: {
        lat: -6.2088,
        lng: 106.8456,
        placeName: 'Di Rumah Utama',
        lastUpdated: 'Baru Saja',
        batteryPercent: 100
      }
    };

    onAddMember(newMember);
    setName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-2 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold">Admin Panel & Pengaturan Kepala Keluarga</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Manajemen hak akses anggota keluarga, integrasi gawai, dan peluncur tampilan Smart TV.
            </p>
          </div>

          <button
            onClick={onOpenSmartTV}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 border border-purple-400/30"
          >
            <Tv className="w-4 h-4 text-amber-300" />
            <span>Mode Smart TV Dashboard</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Add Member Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Tambah Anggota Keluarga</span>
          </h3>

          <form onSubmit={handleAddMemberSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Nama Lengkap:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="misal: Siti / Ahmad..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-slate-200 p-3 rounded-2xl outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Peran Dalam Keluarga:</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-slate-200 p-3 rounded-2xl outline-none"
              >
                <option value="Ayah / Kepala Keluarga">Ayah / Kepala Keluarga</option>
                <option value="Ibu">Ibu</option>
                <option value="Anak">Anak</option>
                <option value="Kakek / Nenek">Kakek / Nenek</option>
                <option value="Pengasuh / Asisten">Pengasuh / Asisten</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Hak Akses Sistem:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-slate-200 p-3 rounded-2xl outline-none"
              >
                <option value="member">Anggota Biasa (Member)</option>
                <option value="admin">Administrator / Kepala Keluarga</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">URL Foto Profil Avatar:</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-slate-200 p-3 rounded-2xl outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg transition-all"
            >
              Simpan Anggota Baru
            </button>
          </form>
        </div>

        {/* Existing Members & System Status */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Daftar Anggota Keluarga Terdaftar</h3>

            <div className="space-y-2">
              {familyMembers.map((m) => (
                <div key={m.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40" />
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {m.role === 'parents' && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div className="text-slate-400 text-[11px]">{m.relationship}</div>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                    m.role === 'parents' 
                      ? 'bg-amber-950 text-amber-300 border-amber-500/30' 
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}>
                    {m.role === 'parents' ? 'Akses Ortu / Admin' : 'Akses Member'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Status Sistem & Lisensi AI Studio</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Google Gemini SDK:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Terhubung
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">PWA Manifest:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Siap Pasang
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
