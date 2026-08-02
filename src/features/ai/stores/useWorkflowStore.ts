import { create } from 'zustand';
import { AIWorkflow, WorkflowNode, WorkflowConnection, WorkflowNodeType } from '../../../types/aiSuperAssistant';

interface WorkflowState {
  workflows: AIWorkflow[];
  activeWorkflowId: string;
  
  // Actions
  setActiveWorkflow: (id: string) => void;
  addWorkflow: (title: string, description: string) => void;
  addNodeToWorkflow: (workflowId: string, nodeType: WorkflowNodeType, title: string) => void;
  removeNodeFromWorkflow: (workflowId: string, nodeId: string) => void;
  addConnection: (workflowId: string, fromNodeId: string, toNodeId: string, label?: string) => void;
  toggleWorkflowActive: (id: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  activeWorkflowId: 'wf-1',

  workflows: [
    {
      id: 'wf-1',
      title: 'Workflow Otomasi Rutinitas Pagi Sekolah & Sarapan',
      description: 'Menghubungkan alarm pagi, cuaca, stok dapur, dan pembuatan task persiapan anak.',
      isActive: true,
      createdAt: '2026-07-28',
      nodes: [
        { id: 'n-1', type: 'Trigger', title: 'Pukul 06:00 WIB Hari Sekolah', config: { time: '06:00', days: 'Mon-Fri' }, position: { x: 50, y: 100 } },
        { id: 'n-2', type: 'Condition', title: 'Apakah Ada Ujian Sekolah Hari Ini?', config: { checkCalendarType: 'Ujian' }, position: { x: 300, y: 100 } },
        { id: 'n-3', type: 'Action', title: 'Buat Task Sarapan Bergizi & Air Mineral', config: { taskType: 'Makan Pagi' }, position: { x: 550, y: 50 } },
        { id: 'n-4', type: 'Action', title: 'Kirim Notifikasi Suara "Selamat Pagi"', config: { sound: 'Gentle Bell' }, position: { x: 550, y: 180 } },
        { id: 'n-5', type: 'Delay', title: 'Tunggu 15 Menit', config: { durationMinutes: 15 }, position: { x: 800, y: 100 } }
      ],
      connections: [
        { id: 'c-1', fromNodeId: 'n-1', toNodeId: 'n-2', label: 'Trigger Aktif' },
        { id: 'c-2', fromNodeId: 'n-2', toNodeId: 'n-3', label: 'Ya (Ujian)' },
        { id: 'c-3', fromNodeId: 'n-2', toNodeId: 'n-4', label: 'Lanjut' },
        { id: 'c-4', fromNodeId: 'n-3', toNodeId: 'n-5', label: 'Berikutnya' }
      ]
    },
    {
      id: 'wf-2',
      title: 'Workflow Manajemen Anggaran & Peringatan Pengeluaran',
      description: 'Menganalisis pengeluaran harian dan mengirim peringatan jika budget katering terlampaui.',
      isActive: true,
      createdAt: '2026-07-20',
      nodes: [
        { id: 'wf2-n1', type: 'Trigger', title: 'Setiap Pengeluaran Keuangan Baru', config: { module: 'Finance' }, position: { x: 50, y: 100 } },
        { id: 'wf2-n2', type: 'Condition', title: 'Apakah Total Pengeluaran > 80% Budget?', config: { threshold: 80 }, position: { x: 300, y: 100 } },
        { id: 'wf2-n3', type: 'Action', title: 'Kirim Warning AI ke Telegram/WhatsApp', config: { channel: 'App Notification' }, position: { x: 550, y: 100 } }
      ],
      connections: [
        { id: 'wf2-c1', fromNodeId: 'wf2-n1', toNodeId: 'wf2-n2' },
        { id: 'wf2-c2', fromNodeId: 'wf2-n2', toNodeId: 'wf2-n3', label: 'Melebihi' }
      ]
    }
  ],

  setActiveWorkflow: (id) => set({ activeWorkflowId: id }),

  addWorkflow: (title, description) =>
    set((state) => {
      const newWf: AIWorkflow = {
        id: `wf-${Date.now()}`,
        title,
        description,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
        nodes: [
          { id: `n-${Date.now()}-1`, type: 'Trigger', title: 'Picu Otomatis', config: {}, position: { x: 50, y: 100 } },
          { id: `n-${Date.now()}-2`, type: 'Action', title: 'Tindakan AI', config: {}, position: { x: 320, y: 100 } }
        ],
        connections: [
          { id: `c-${Date.now()}`, fromNodeId: `n-${Date.now()}-1`, toNodeId: `n-${Date.now()}-2` }
        ]
      };
      return {
        workflows: [newWf, ...state.workflows],
        activeWorkflowId: newWf.id
      };
    }),

  addNodeToWorkflow: (workflowId, nodeType, title) =>
    set((state) => ({
      workflows: state.workflows.map((wf) => {
        if (wf.id !== workflowId) return wf;
        const newNode: WorkflowNode = {
          id: `n-${Date.now()}`,
          type: nodeType,
          title,
          config: {},
          position: { x: 100 + wf.nodes.length * 120, y: 100 + (wf.nodes.length % 2) * 60 }
        };
        return {
          ...wf,
          nodes: [...wf.nodes, newNode]
        };
      })
    })),

  removeNodeFromWorkflow: (workflowId, nodeId) =>
    set((state) => ({
      workflows: state.workflows.map((wf) => {
        if (wf.id !== workflowId) return wf;
        return {
          ...wf,
          nodes: wf.nodes.filter((n) => n.id !== nodeId),
          connections: wf.connections.filter((c) => c.fromNodeId !== nodeId && c.toNodeId !== nodeId)
        };
      })
    })),

  addConnection: (workflowId, fromNodeId, toNodeId, label) =>
    set((state) => ({
      workflows: state.workflows.map((wf) => {
        if (wf.id !== workflowId) return wf;
        const newConn: WorkflowConnection = {
          id: `c-${Date.now()}`,
          fromNodeId,
          toNodeId,
          label
        };
        return {
          ...wf,
          connections: [...wf.connections, newConn]
        };
      })
    })),

  toggleWorkflowActive: (id) =>
    set((state) => ({
      workflows: state.workflows.map((wf) => (wf.id === id ? { ...wf, isActive: !wf.isActive } : wf))
    }))
}));
