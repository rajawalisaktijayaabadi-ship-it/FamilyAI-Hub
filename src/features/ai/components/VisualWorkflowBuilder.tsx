import React, { useState } from 'react';
import { 
  GitMerge, 
  Plus, 
  Trash2, 
  Play, 
  Zap, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Maximize2 
} from 'lucide-react';
import { useWorkflowStore } from '../stores/useWorkflowStore';
import { WorkflowNodeType } from '../../../types/aiSuperAssistant';

export const VisualWorkflowBuilder: React.FC = () => {
  const { workflows, activeWorkflowId, setActiveWorkflow, addWorkflow, addNodeToWorkflow, removeNodeFromWorkflow, toggleWorkflowActive } = useWorkflowStore();
  
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNodeType, setSelectedNodeType] = useState<WorkflowNodeType>('Action');
  const [newNodeTitle, setNewNodeTitle] = useState('');

  const currentWf = workflows.find((w) => w.id === activeWorkflowId) || workflows[0];

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addWorkflow(newTitle, newDesc || 'Workflow otomatis baru');
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeTitle.trim() || !currentWf) return;
    addNodeToWorkflow(currentWf.id, selectedNodeType, newNodeTitle);
    setNewNodeTitle('');
  };

  return (
    <div className="space-y-6">
      
      {/* Workflow Header & Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <GitMerge className="w-6 h-6 text-indigo-400" />
              <span>AI Visual Workflow Builder & Automation Canvas</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Rancang alur kerja otomatis antar modul (Trigger, Condition, Action, Delay, & Loop).
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Workflow Baru</span>
          </button>
        </div>

        {/* Workflow List Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {workflows.map((wf) => (
            <button
              key={wf.id}
              onClick={() => setActiveWorkflow(wf.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                activeWorkflowId === wf.id
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${wf.isActive ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
              <span>{wf.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Workspace */}
      {currentWf && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden min-h-[480px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

          {/* Workflow Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 relative z-10">
            <div>
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-black text-white">{currentWf.title}</h4>
                <button
                  onClick={() => toggleWorkflowActive(currentWf.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                    currentWf.isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {currentWf.isActive ? 'Status: AKTIF' : 'Status: NONAKTIF'}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentWf.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Workflow "${currentWf.title}" berhasil diuji dan siap berjalan otomatis!`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulasi Jalankan</span>
              </button>
            </div>
          </div>

          {/* Node Generator Tool Control */}
          <form onSubmit={handleAddNode} className="flex flex-wrap items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl relative z-10">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Tambah Node Canvas:</span>
            </span>

            <select
              value={selectedNodeType}
              onChange={(e) => setSelectedNodeType(e.target.value as WorkflowNodeType)}
              className="bg-slate-950 border border-slate-700 text-xs text-white p-2 rounded-xl outline-none"
            >
              <option value="Trigger">Trigger (Pemicu)</option>
              <option value="Condition">Condition (Syarat/Kondisi)</option>
              <option value="Action">Action (Tindakan Modul)</option>
              <option value="Delay">Delay (Penundaan Waktu)</option>
              <option value="Loop">Loop (Perulangan)</option>
            </select>

            <input
              type="text"
              value={newNodeTitle}
              onChange={(e) => setNewNodeTitle(e.target.value)}
              placeholder="Nama langkah/node (misal: Kirim WA ke Ibu)..."
              className="flex-1 min-w-[200px] bg-slate-950 border border-slate-700 text-xs text-white p-2 rounded-xl outline-none"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              + Node
            </button>
          </form>

          {/* Visual Node Flow Visualizer */}
          <div className="space-y-4 pt-2 relative z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-indigo-400" />
              <span>Alur Node Eksekusi Canvas:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentWf.nodes.map((node, index) => {
                const isTrigger = node.type === 'Trigger';
                const isCondition = node.type === 'Condition';
                const isAction = node.type === 'Action';
                const isDelay = node.type === 'Delay';

                return (
                  <div 
                    key={node.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 relative shadow-xl ${
                      isTrigger ? 'bg-indigo-950/60 border-indigo-700 text-indigo-100' :
                      isCondition ? 'bg-amber-950/60 border-amber-700 text-amber-100' :
                      isAction ? 'bg-emerald-950/60 border-emerald-700 text-emerald-100' :
                      'bg-purple-950/60 border-purple-700 text-purple-100'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/10">
                          Step {index + 1} • {node.type}
                        </span>
                      </div>
                      <button
                        onClick={() => removeNodeFromWorkflow(currentWf.id, node.id)}
                        className="p-1 hover:bg-white/20 text-rose-300 rounded-lg transition-all"
                        title="Hapus Node"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-extrabold text-white text-sm">{node.title}</h5>
                      <p className="text-[11px] text-slate-300 opacity-90">
                        {isTrigger && 'Picu otomatis saat event / jadwal terpenuhi'}
                        {isCondition && 'Periksa validasi syarat kriteria sebelum lanjut'}
                        {isAction && 'Jalankan tindakan otomatis di modul AI'}
                        {isDelay && 'Tunda eksekusi selama durasi yang ditentukan'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Node Valid</span>
                      </span>
                      {index < currentWf.nodes.length - 1 && (
                        <span className="flex items-center gap-1 text-amber-300 font-bold">
                          <span>Menuju Step {index + 2}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* New Workflow Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-white text-lg">Buat AI Visual Workflow Baru</h3>
            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Nama Workflow:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="misal: Otomasi Rutinitas Malam Anak..."
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white p-3 rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Deskripsi Singkat:</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Penjelasan fungsi alur kerja ini..."
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white p-3 rounded-xl outline-none h-20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                >
                  Simpan Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
