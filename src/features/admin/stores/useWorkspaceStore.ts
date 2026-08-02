import { create } from 'zustand';
import { Workspace } from '../../../types/enterpriseAdmin';

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspaceId: string;
  
  // Actions
  setCurrentWorkspace: (id: string) => void;
  addWorkspace: (name: string, type: Workspace['type'], ownerEmail: string, planType: Workspace['planType']) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentWorkspaceId: 'ws-1',

  workspaces: [
    {
      id: 'ws-1',
      name: 'Workspace Keluarga Sastro',
      type: 'Family Workspace',
      ownerEmail: 'sastro@familyai.id',
      memberCount: 5,
      planType: 'Family Plus',
      createdAt: '2026-01-15',
      status: 'Active',
      settings: {
        timezone: 'Asia/Jakarta (WIB)',
        language: 'Bahasa Indonesia',
        currency: 'IDR (Rp)',
        encryptionEnabled: true,
        aiAutoSummaries: true
      }
    },
    {
      id: 'ws-2',
      name: 'Komunitas Parenting Bandung Barat',
      type: 'Organization Workspace',
      ownerEmail: 'komunitas@parenting.org',
      memberCount: 24,
      planType: 'Enterprise',
      createdAt: '2026-04-10',
      status: 'Active',
      settings: {
        timezone: 'Asia/Jakarta (WIB)',
        language: 'Bahasa Indonesia',
        currency: 'IDR (Rp)',
        encryptionEnabled: true,
        aiAutoSummaries: true
      }
    }
  ],

  setCurrentWorkspace: (id) => set({ currentWorkspaceId: id }),

  addWorkspace: (name, type, ownerEmail, planType) =>
    set((state) => ({
      workspaces: [
        {
          id: `ws-${Date.now()}`,
          name,
          type,
          ownerEmail,
          memberCount: 1,
          planType,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'Active',
          settings: {
            timezone: 'Asia/Jakarta (WIB)',
            language: 'Bahasa Indonesia',
            currency: 'IDR (Rp)',
            encryptionEnabled: true,
            aiAutoSummaries: true
          }
        },
        ...state.workspaces
      ]
    }))
}));
