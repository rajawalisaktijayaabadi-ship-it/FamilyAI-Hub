import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  FamilyMember, 
  FamilyProfile, 
  FamilyActivityItem, 
  FamilyInvitation, 
  RolePermissionItem,
  DetailedFamilyRole 
} from '../types';
import { 
  initialFamilyMembers, 
  initialFamilyProfile, 
  initialFamilyActivities, 
  initialFamilyInvitations, 
  initialRolePermissions 
} from '../data/mockData';

const safeStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch (e) {
      console.warn('LocalStorage quota exceeded, skipping persist update:', e);
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // ignore
    }
  }
}));

interface FamilyStore {
  familyMembers: FamilyMember[];
  familyProfile: FamilyProfile;
  familyActivities: FamilyActivityItem[];
  familyInvitations: FamilyInvitation[];
  rolePermissions: RolePermissionItem[];
  selectedMemberForEdit: FamilyMember | null;
  isAddMemberOpen: boolean;
  isInviteModalOpen: boolean;
  isAutoGpsSimulationActive: boolean;

  // Actions
  addMember: (memberData: Omit<FamilyMember, 'id'>) => void;
  updateMember: (id: string, updatedData: Partial<FamilyMember>) => void;
  updateMemberLocation: (memberId: string, placeName: string, addressDetails?: string, category?: any, lat?: number, lng?: number) => void;
  simulateRealtimeGpsUpdates: () => void;
  toggleAutoGpsSimulation: (active?: boolean) => void;
  deleteMember: (id: string) => void;
  updateFamilyProfile: (profileData: Partial<FamilyProfile>) => void;
  addInvitation: (email: string, role: DetailedFamilyRole) => void;
  cancelInvitation: (id: string) => void;
  addActivity: (action: string, category: string, actorName?: string) => void;
  setAddMemberOpen: (open: boolean) => void;
  setInviteModalOpen: (open: boolean) => void;
  setSelectedMemberForEdit: (member: FamilyMember | null) => void;
}

export const useFamilyStore = create<FamilyStore>()(
  persist(
    (set, get) => ({
      familyMembers: initialFamilyMembers,
      familyProfile: initialFamilyProfile,
      familyActivities: initialFamilyActivities,
      familyInvitations: initialFamilyInvitations,
      rolePermissions: initialRolePermissions,
      selectedMemberForEdit: null,
      isAddMemberOpen: false,
      isInviteModalOpen: false,
      isAutoGpsSimulationActive: true,

      toggleAutoGpsSimulation: (active) => set((state) => ({ 
        isAutoGpsSimulationActive: active !== undefined ? active : !state.isAutoGpsSimulationActive 
      })),

      simulateRealtimeGpsUpdates: () => {
        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        set((state) => ({
          familyMembers: state.familyMembers.map((m) => {
            const defaultLat = m.id === 'm2' ? -6.2250 : -6.2088;
            const defaultLng = m.id === 'm2' ? 106.8000 : 106.8456;
            const currentLat = m.location?.lat || defaultLat;
            const currentLng = m.location?.lng || defaultLng;

            // Realistic micro movement offset for dynamic simulation
            const latOffset = (Math.random() - 0.5) * 0.0008;
            const lngOffset = (Math.random() - 0.5) * 0.0008;
            const newLat = Number((currentLat + latOffset).toFixed(5));
            const newLng = Number((currentLng + lngOffset).toFixed(5));

            // Slight battery percentage fluctuation
            const currentBattery = m.location?.batteryPercent || 85;
            const batteryChange = Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            const newBattery = Math.min(100, Math.max(15, currentBattery + batteryChange));

            return {
              ...m,
              isOnline: true,
              location: {
                ...m.location,
                lat: newLat,
                lng: newLng,
                batteryPercent: newBattery,
                lastUpdated: `Real-time GPS (${timeStr} WIB)`
              }
            };
          })
        }));
      },

      addMember: (memberData) => {
        const newId = `m_${Date.now()}`;
        const newMember: FamilyMember = {
          ...memberData,
          id: newId,
          isOnline: true,
          statusText: memberData.statusText || 'Aktif di aplikasi'
        };

        set((state) => ({
          familyMembers: [...state.familyMembers, newMember],
          isAddMemberOpen: false
        }));

        get().addActivity(
          `menambahkan anggota keluarga baru: ${memberData.name} (${memberData.relationship})`,
          'Anggota Baru',
          'Sistem / Admin'
        );
      },

      updateMember: (id, updatedData) => {
        set((state) => ({
          familyMembers: state.familyMembers.map((m) =>
            m.id === id ? { ...m, ...updatedData } : m
          ),
          selectedMemberForEdit: null
        }));

        const member = get().familyMembers.find((m) => m.id === id);
        if (member) {
          get().addActivity(
            `memperbarui profil ${member.name}`,
            'Update Anggota',
            'Sistem'
          );
        }
      },

      updateMemberLocation: (memberId, placeName, addressDetails = 'Lokasi Terkini', category = 'Lainnya', lat?: number, lng?: number) => {
        const timeStr = `Hari ini, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
        const member = get().familyMembers.find((m) => m.id === memberId);
        
        set((state) => ({
          familyMembers: state.familyMembers.map((m) => {
            if (m.id !== memberId) return m;
            const currentHistory = m.locationHistory || [];
            const newHistoryItem = {
              id: `lh_${Date.now()}`,
              placeName,
              timestamp: timeStr,
              addressDetails,
              category
            };
            const updatedHistory = [newHistoryItem, ...currentHistory].slice(0, 3);
            return {
              ...m,
              location: {
                ...m.location,
                placeName,
                lastUpdated: 'Baru saja',
                ...(lat !== undefined && lng !== undefined ? { lat, lng } : {})
              },
              locationHistory: updatedHistory
            };
          })
        }));

        if (member) {
          get().addActivity(
            `memperbarui lokasi ${member.name} ke ${placeName}`,
            'Lokasi & Keamanan',
            member.name
          );
        }
      },

      deleteMember: (id) => {
        const member = get().familyMembers.find((m) => m.id === id);
        set((state) => ({
          familyMembers: state.familyMembers.filter((m) => m.id !== id)
        }));

        if (member) {
          get().addActivity(
            `menghapus ${member.name} dari daftar keluarga`,
            'Hapus Anggota',
            'Sistem'
          );
        }
      },

      updateFamilyProfile: (profileData) => {
        set((state) => ({
          familyProfile: { ...state.familyProfile, ...profileData }
        }));
        get().addActivity('memperbarui profil utama keluarga', 'Profil Keluarga', 'Sistem');
      },

      addInvitation: (email, role) => {
        const invId = `inv_${Date.now()}`;
        const newInv: FamilyInvitation = {
          id: invId,
          familyId: get().familyProfile.id,
          email,
          role,
          inviteLink: `https://familyai.hub/invite/${get().familyProfile.id}-${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'pending',
          createdAt: new Date().toISOString().split('T')[0]
        };

        set((state) => ({
          familyInvitations: [newInv, ...state.familyInvitations],
          isInviteModalOpen: false
        }));

        get().addActivity(
          `mengirim undangan bergabung keluarga ke ${email} sebagai ${role}`,
          'Undangan',
          'Sistem'
        );
      },

      cancelInvitation: (id) => {
        set((state) => ({
          familyInvitations: state.familyInvitations.filter((inv) => inv.id !== id)
        }));
      },

      addActivity: (action, category, actorName = 'Ayah Budi') => {
        const actorMember = get().familyMembers.find(m => m.name === actorName || actorName.includes(m.name) || m.relationship === actorName);
        const newActivity: FamilyActivityItem = {
          id: `act_${Date.now()}`,
          actorName,
          actorAvatar: actorMember?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          action,
          category,
          timeAgo: 'Baru saja',
          timestamp: new Date().toISOString()
        };

        set((state) => ({
          familyActivities: [newActivity, ...state.familyActivities].slice(0, 40)
        }));
      },

      setAddMemberOpen: (open) => set({ isAddMemberOpen: open }),
      setInviteModalOpen: (open) => set({ isInviteModalOpen: open }),
      setSelectedMemberForEdit: (member) => set({ selectedMemberForEdit: member })
    }),
    {
      name: 'family-ai-hub-family-store',
      storage: safeStorage,
      partialize: (state) => ({
        familyMembers: state.familyMembers,
        familyProfile: state.familyProfile,
        familyActivities: state.familyActivities,
        familyInvitations: state.familyInvitations,
        rolePermissions: state.rolePermissions,
      }),
    }
  )
);

// Automated background interval runner for real-time GPS updates across the entire app
if (typeof window !== 'undefined') {
  setInterval(() => {
    try {
      const store = useFamilyStore.getState();
      if (store.isAutoGpsSimulationActive) {
        store.simulateRealtimeGpsUpdates();
      }
    } catch {
      // ignore
    }
  }, 10000); // Auto updates coordinates every 10 seconds
}
