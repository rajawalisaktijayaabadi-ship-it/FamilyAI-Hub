import React, { useState } from 'react';
import { 
  Crown, 
  UserPlus, 
  Settings, 
  Shield, 
  Key, 
  Tv, 
  Database, 
  Check, 
  Activity, 
  Users, 
  CreditCard, 
  FileSpreadsheet, 
  AlertCircle, 
  RefreshCw, 
  Lock, 
  Search, 
  Building2, 
  Download, 
  Upload 
} from 'lucide-react';
import { FamilyMember } from '../../types';
import { useAdminStore } from '../../features/admin/stores/useAdminStore';
import { useWorkspaceStore } from '../../features/admin/stores/useWorkspaceStore';
import { useAnalyticsStore } from '../../features/admin/stores/useAnalyticsStore';
import { useMonitoringStore } from '../../features/admin/stores/useMonitoringStore';
import { useBillingStore } from '../../features/admin/stores/useBillingStore';
import { useDummyDataStore } from '../../store/useDummyDataStore';

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
  const [activeTab, setActiveTab] = useState<'members' | 'workspaces' | 'audit' | 'analytics' | 'billing' | 'security'>('members');

  // Form states for member
  const [name, setName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Anak');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [avatar, setAvatar] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  // Stores
  const { auditLogs, roles, systemSettings, updateSystemSetting } = useAdminStore();
  const { workspaces, currentWorkspaceId, setCurrentWorkspace, addWorkspace } = useWorkspaceStore();
  const { analytics, monthlyGrowthTrend } = useAnalyticsStore();
  const { status, recentErrors, refreshMonitoring } = useMonitoringStore();
  const { subscription, availablePlans, invoices } = useBillingStore();
  const { hideDummyData, toggleHideDummyData } = useDummyDataStore();

  const [auditSearch, setAuditSearch] = useState('');

  const filteredLogs = auditLogs.filter((log) =>
    log.actionType.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.actorEmail.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.description.toLowerCase().includes(auditSearch.toLowerCase())
  );

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
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 text-white space-y-3 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-black">Enterprise Production Admin & DevOps Platform</h2>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">
                Enterprise v1.0
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Multi-tenant workspace, audit logs, analytics performa, penagihan, & kontrol keamanan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSmartTV}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 border border-purple-400/30"
            >
              <Tv className="w-4 h-4 text-amber-300" />
              <span>Smart TV Launcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'members'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Anggota & Akses</span>
        </button>

        <button
          onClick={() => setActiveTab('workspaces')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'workspaces'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Multi-Tenant Workspaces</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Audit Log Center</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Analytics & Monitoring</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'billing'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Langganan & Billing</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Sistem & Keamanan</span>
        </button>
      </div>

      {/* Tab Content: Members */}
      {activeTab === 'members' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>Tambah Anggota Keluarga</span>
            </h3>

            <form onSubmit={handleAddMemberSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-400 block mb-1">Nama Lengkap:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="misal: Siti / Ahmad..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3 rounded-2xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Peran Dalam Keluarga:</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3 rounded-2xl outline-none"
                >
                  <option value="Ayah / Kepala Keluarga">Ayah / Kepala Keluarga</option>
                  <option value="Ibu">Ibu</option>
                  <option value="Anak">Anak</option>
                  <option value="Kakek / Nenek">Kakek / Nenek</option>
                  <option value="Pengasuh / Asisten">Pengasuh / Asisten</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">Hak Akses Sistem:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3 rounded-2xl outline-none"
                >
                  <option value="member">Anggota Biasa (Member)</option>
                  <option value="admin">Administrator / Kepala Keluarga</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-400 block mb-1">URL Foto Profil Avatar:</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3 rounded-2xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all"
              >
                Simpan Anggota Baru
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-base">Daftar Anggota Keluarga Terdaftar</h3>

            <div className="space-y-3">
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

                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                    Aktif Terhubung
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Multi-Tenant Workspaces */}
      {activeTab === 'workspaces' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span>Daftar Multi-Tenant Workspaces</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => setCurrentWorkspace(ws.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                    currentWorkspaceId === ws.id
                      ? 'bg-slate-950 border-amber-500 shadow-xl'
                      : 'bg-slate-950 border-slate-800 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {ws.type}
                    </span>
                    {currentWorkspaceId === ws.id && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                        Aktif Digunakan
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-white text-base">{ws.name}</h4>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div>Pemilik: <strong className="text-slate-100">{ws.ownerEmail}</strong></div>
                    <div>Jumlah Anggota: <strong className="text-slate-100">{ws.memberCount} Orang</strong></div>
                    <div>Paket: <strong className="text-amber-300">{ws.planType}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>Audit Log Center (Catatan Aktivitas Keamanan)</span>
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Cari audit log..."
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white pl-9 pr-3 py-2 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">{log.actionType}</span>
                    <span className="text-[10px] text-slate-400">oleh {log.actorEmail}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{log.description}</p>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">{log.timestamp}</span>
                  <span className="text-[9px] bg-slate-900 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                    IP: {log.ipAddress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Analytics & Monitoring */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400">DAU / MAU Users</div>
              <div className="text-xl font-black text-white">{analytics.dau} / {analytics.mau}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400">AI Tokens Used</div>
              <div className="text-xl font-black text-amber-400">485.2k</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400">Storage Memory</div>
              <div className="text-xl font-black text-emerald-400">{analytics.storageUsedGb} GB</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <div className="text-xs text-slate-400">System Health</div>
              <div className="text-xl font-black text-indigo-400">{status.systemHealthScore}%</div>
            </div>
          </div>

          {/* Web Vitals & Latency */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">Real-Time Infrastructure Web Vitals</h4>
              <button
                onClick={() => refreshMonitoring()}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Refresh Status</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">LCP (Largest Contentful Paint)</span>
                <strong className="text-emerald-400 text-sm">{status.webVitals.lcp}s</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Firestore Latency</span>
                <strong className="text-emerald-400 text-sm">{status.firestoreLatencyMs} ms</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">FID (First Input Delay)</span>
                <strong className="text-emerald-400 text-sm">{status.webVitals.fid} ms</strong>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">API Cloud Health</span>
                <strong className="text-amber-300 text-sm">{status.apiStatus}</strong>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab Content: Billing & Plans */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Status Langganan Enterprise Active</h3>
                <p className="text-xs text-slate-400">Workspace: Workspace Keluarga Sastro</p>
              </div>

              <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                Paket: {subscription.planName}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availablePlans.map((plan) => (
                <div
                  key={plan.planName}
                  className={`p-5 rounded-3xl border space-y-3 flex flex-col justify-between ${
                    subscription.planName === plan.planName
                      ? 'bg-indigo-950/60 border-indigo-500 shadow-xl'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="space-y-2">
                    <h4 className="font-black text-white text-base">{plan.planName}</h4>
                    <p className="text-xs text-slate-400">{plan.description}</p>
                    <div className="text-xl font-black text-amber-400">
                      Rp {plan.priceMonthly.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-normal">/ bln</span>
                    </div>

                    <ul className="space-y-1 pt-2 border-t border-slate-800/80">
                      {(plan.features || []).map((feat, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => alert(`Memilih peningkatan ke paket ${plan.planName}`)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
                  >
                    {subscription.planName === plan.planName ? 'Paket Aktif' : 'Pilih Paket'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Security */}
      {activeTab === 'security' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-emerald-400" />
            <span>Keamanan & Pengaturan Sistem Enterprise</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-amber-950/20 rounded-2xl border border-amber-500/40 flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>Sembunyikan Data Dummy / Contoh</span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Menyembunyikan seluruh sampel data default (anggota keluarga, riwayat, tugas, galeri) agar aplikasi hanya menampilkan data asli yang dibuat pengguna.
                </p>
              </div>
              <button
                onClick={toggleHideDummyData}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                  hideDummyData 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {hideDummyData ? 'Aktif (Disembunyikan)' : 'Tampilkan Data Dummy'}
              </button>
            </div>

            {systemSettings.map((setting) => (
              <div key={setting.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{setting.key}</div>
                  <p className="text-slate-400 text-[11px]">{setting.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(setting.value)}
                  onChange={(e) => updateSystemSetting(setting.id, e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
