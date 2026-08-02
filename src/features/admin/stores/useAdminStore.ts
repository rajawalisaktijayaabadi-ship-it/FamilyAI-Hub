import { create } from 'zustand';
import { AdminRole, WorkspaceRole, WorkspacePermission, AuditLog, SystemSetting } from '../../../types/enterpriseAdmin';

interface AdminState {
  roles: WorkspaceRole[];
  permissions: WorkspacePermission[];
  auditLogs: AuditLog[];
  systemSettings: SystemSetting[];
  
  // Actions
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  updatePermission: (id: string, key: keyof Omit<WorkspacePermission, 'id' | 'module'>, value: boolean) => void;
  updateSystemSetting: (id: string, newValue: string | boolean | number) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  roles: [
    { id: 'role-1', roleName: 'Super Admin', description: 'Akses penuh ke seluruh sistem, platform admin, & audit log', isSystemDefault: true, assignedUsersCount: 1 },
    { id: 'role-2', roleName: 'Family Owner', description: 'Kepala keluarga pemilik workspace utama', isSystemDefault: true, assignedUsersCount: 2 },
    { id: 'role-3', roleName: 'Parent', description: 'Orang tua dengan hak kelola modul keuangan, asuransi, & edukasi', isSystemDefault: true, assignedUsersCount: 4 },
    { id: 'role-4', roleName: 'Child', description: 'Anak dengan hak akses edukasi, kuis, & galeri memori', isSystemDefault: true, assignedUsersCount: 3 },
    { id: 'role-5', roleName: 'Teen', description: 'Remaja dengan akses penuh ke jadwal pribadi & jurnal mood', isSystemDefault: true, assignedUsersCount: 2 },
    { id: 'role-6', roleName: 'Senior', description: 'Lansia dengan tampilan ramah lansia & reminder kesehatan', isSystemDefault: true, assignedUsersCount: 1 },
    { id: 'role-7', roleName: 'Guest', description: 'Tamu keluarga dengan akses terbatas pada catatan yang dibagikan', isSystemDefault: true, assignedUsersCount: 0 },
    { id: 'role-8', roleName: 'Moderator', description: 'Pengawas konten keluarga', isSystemDefault: false, assignedUsersCount: 1 },
    { id: 'role-9', roleName: 'Support', description: 'Tim dukungan teknis', isSystemDefault: false, assignedUsersCount: 1 },
    { id: 'role-10', roleName: 'Developer', description: 'Pengembang API & integrasi', isSystemDefault: false, assignedUsersCount: 2 }
  ],

  permissions: [
    { id: 'perm-1', module: 'AI Super Assistant Core', canRead: true, canCreate: true, canUpdate: true, canDelete: true, canAIExport: true, canShare: true },
    { id: 'perm-2', module: 'Family Financial & Budget', canRead: true, canCreate: true, canUpdate: true, canDelete: false, canAIExport: true, canShare: false },
    { id: 'perm-3', module: 'Health & Protection Center', canRead: true, canCreate: true, canUpdate: true, canDelete: false, canAIExport: true, canShare: false },
    { id: 'perm-4', module: 'Smart Home & IoT Devices', canRead: true, canCreate: true, canUpdate: true, canDelete: true, canAIExport: false, canShare: true },
    { id: 'perm-5', module: 'Family Memories & Gallery', canRead: true, canCreate: true, canUpdate: true, canDelete: true, canAIExport: true, canShare: true },
    { id: 'perm-6', module: 'Admin DevOps & Enterprise Settings', canRead: true, canCreate: false, canUpdate: false, canDelete: false, canAIExport: true, canShare: false }
  ],

  auditLogs: [
    {
      id: 'audit-1',
      timestamp: '2026-08-01 17:10:22',
      actorEmail: 'admin@familyai.id',
      actorRole: 'Super Admin',
      actionType: 'Login',
      description: 'Super Admin berhasil otentikasi melalui Firebase Auth (2FA Verified)',
      ipAddress: '182.253.18.42',
      targetModule: 'System Security',
      status: 'Success'
    },
    {
      id: 'audit-2',
      timestamp: '2026-08-01 16:45:10',
      actorEmail: 'ayah@sastro.com',
      actorRole: 'Family Owner',
      actionType: 'AI Request',
      description: 'Eksekusi query AI Gemini "Analisis Anggaran Bulanan & Asuransi"',
      ipAddress: '180.252.33.12',
      targetModule: 'AI Core Engine',
      status: 'Success'
    },
    {
      id: 'audit-3',
      timestamp: '2026-08-01 15:30:00',
      actorEmail: 'ibu@sastro.com',
      actorRole: 'Parent',
      actionType: 'CRUD',
      description: 'Pembaruan inventaris kulkas & rencana menu makan malam',
      ipAddress: '180.252.33.14',
      targetModule: 'Shopping & Inventory',
      status: 'Success'
    },
    {
      id: 'audit-4',
      timestamp: '2026-08-01 14:12:05',
      actorEmail: 'admin@familyai.id',
      actorRole: 'Super Admin',
      actionType: 'Permission Change',
      description: 'Pembaruan matriks izin modul Keuangan untuk peran Child',
      ipAddress: '182.253.18.42',
      targetModule: 'Workspace Permissions',
      status: 'Success'
    }
  ],

  systemSettings: [
    { id: 'set-1', category: 'General', key: 'app_name', value: 'FamilyAI Hub Enterprise', description: 'Nama resmi aplikasi' },
    { id: 'set-2', category: 'Localization', key: 'default_timezone', value: 'Asia/Jakarta (WIB)', description: 'Zona waktu bawaan sistem' },
    { id: 'set-3', category: 'Localization', key: 'default_currency', value: 'IDR (Rupiah)', description: 'Mata uang default' },
    { id: 'set-4', category: 'Security', key: 'firebase_app_check_enabled', value: true, description: 'Aktifkan Firebase App Check reCAPTCHA v3' },
    { id: 'set-5', category: 'AI Integration', key: 'gemini_model_version', value: 'gemini-2.5-flash', description: 'Model Gemini bawaan AI Core' },
    { id: 'set-6', category: 'Notifications', key: 'fcm_push_enabled', value: true, description: 'Push notification via Firebase Cloud Messaging' }
  ],

  addAuditLog: (log) =>
    set((state) => ({
      auditLogs: [
        {
          ...log,
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19)
        },
        ...state.auditLogs
      ]
    })),

  updatePermission: (id, key, value) =>
    set((state) => ({
      permissions: state.permissions.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    })),

  updateSystemSetting: (id, newValue) =>
    set((state) => ({
      systemSettings: state.systemSettings.map((s) => (s.id === id ? { ...s, value: newValue } : s))
    }))
}));
