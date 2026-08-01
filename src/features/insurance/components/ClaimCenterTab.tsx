import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Upload,
  Calendar,
  DollarSign,
  User,
  X,
  FileCheck
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import {
  FamilyMember,
  InsuranceClaim,
  ClaimStatusType,
  InsuranceCategoryType
} from '../../../types';

interface ClaimCenterTabProps {
  familyMembers: FamilyMember[];
}

export const ClaimCenterTab: React.FC<ClaimCenterTabProps> = ({ familyMembers }) => {
  const { claims, policies, addClaim, updateClaimStatus } = useInsuranceStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);

  // New Claim Form
  const [policyId, setPolicyId] = useState(policies[0]?.id || '');
  const [category, setCategory] = useState<InsuranceCategoryType>('Kesehatan');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [insuredMemberName, setInsuredMemberName] = useState(familyMembers[0]?.name || '');
  const [claimedAmount, setClaimedAmount] = useState(2500000);
  const [notes, setNotes] = useState('');

  // Update Status Form
  const [newStatus, setNewStatus] = useState<ClaimStatusType>('Review');
  const [statusNote, setStatusNote] = useState('');

  const statusesList: ClaimStatusType[] = ['Draft', 'Submitted', 'Review', 'Approved', 'Rejected', 'Closed'];

  const handleOpenAddModal = () => {
    setPolicyId(policies[0]?.id || '');
    setCategory('Kesehatan');
    setIncidentDate(new Date().toISOString().split('T')[0]);
    setInsuredMemberName(familyMembers[0]?.name || '');
    setClaimedAmount(2500000);
    setNotes('');
    setShowAddModal(true);
  };

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const pol = policies.find((p) => p.id === policyId);
    const policyTitle = pol ? pol.title : 'Polis Asuransi';

    addClaim({
      policyId,
      policyTitle,
      category,
      claimDate: new Date().toISOString().split('T')[0],
      incidentDate,
      insuredMemberName,
      claimedAmount,
      status: 'Submitted',
      documents: [
        {
          id: `cdoc-${Date.now()}`,
          name: 'Kuitansi_Layanan_RS.pdf',
          url: '#',
          type: 'application/pdf'
        }
      ],
      notes
    });

    setShowAddModal(false);
  };

  const handleOpenUpdateModal = (claim: InsuranceClaim) => {
    setSelectedClaim(claim);
    setNewStatus(claim.status);
    setStatusNote('');
    setShowStatusModal(true);
  };

  const handleConfirmUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClaim) {
      updateClaimStatus(selectedClaim.id, newStatus, statusNote);
    }
    setShowStatusModal(false);
  };

  const getStatusBadge = (status: ClaimStatusType) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/30';
      case 'Review':
      case 'Submitted':
        return 'bg-blue-950 text-blue-300 border-blue-500/30';
      case 'Rejected':
        return 'bg-rose-950 text-rose-300 border-rose-500/30';
      case 'Closed':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-amber-950 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Pusat Pengajuan & Status Klaim</h2>
          </div>
          <p className="text-xs text-slate-300">
            Pencatatan pengajuan klaim, pemantauan tahapan verifikasi berkas, dan histori pencairan manfaat.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Pengajuan Klaim</span>
        </button>
      </div>

      {/* Claims List */}
      <div className="space-y-6">
        {claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl hover:border-slate-700 transition-all"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold text-sm">{claim.claimNumber}</span>
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(claim.status)}`}>
                    {claim.status}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mt-1">{claim.policyTitle}</h3>
                <p className="text-xs text-slate-400">
                  Yang Ditanggung: <span className="text-slate-200 font-medium">{claim.insuredMemberName}</span> • Kejadian: {claim.incidentDate}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400">Nominal Diajukan</div>
                  <div className="text-lg font-black text-emerald-400">
                    Rp {claim.claimedAmount.toLocaleString('id-ID')}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenUpdateModal(claim)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
                >
                  Update Status
                </button>
              </div>
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300">Timeline Progress Klaim:</div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                {statusesList.map((st, idx) => {
                  const isCurrent = claim.status === st;
                  const isPassed =
                    statusesList.indexOf(claim.status) >= idx && claim.status !== 'Rejected';

                  return (
                    <div
                      key={st}
                      className={`p-2.5 rounded-2xl border text-center text-xs font-bold space-y-1 ${
                        isCurrent
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md scale-105'
                          : isPassed
                          ? 'bg-slate-950 border-slate-800 text-emerald-400'
                          : 'bg-slate-950/40 border-slate-800/40 text-slate-600'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono text-slate-400">Tahap {idx + 1}</div>
                      <div>{st}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Claim Timeline Logs */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-300">Catatan Histori Verifikasi:</div>
              <div className="space-y-1.5">
                {claim.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <div>
                      <span className="font-bold text-slate-200">[{item.date}] {item.status}:</span>{' '}
                      <span>{item.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {claim.notes && (
              <p className="text-xs text-slate-400 italic">
                Catatan Pengguna: "{claim.notes}"
              </p>
            )}
          </div>
        ))}

        {claims.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <FileText className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-sm">Belum ada histori pengajuan klaim asuransi.</p>
          </div>
        )}
      </div>

      {/* Add Claim Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Buat Pengajuan Klaim Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClaim} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Pilih Polis:</label>
                <select
                  value={policyId}
                  onChange={(e) => setPolicyId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                >
                  {policies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.policyNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Anggota Terkait:</label>
                  <select
                    value={insuredMemberName}
                    onChange={(e) => setInsuredMemberName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Tanggal Kejadian / RS:</label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Estimasi Nominal Klaim (Rp):</label>
                <input
                  type="number"
                  value={claimedAmount}
                  onChange={(e) => setClaimedAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Keterangan / Gejala Medis / Kerusakan:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Deskripsi singkat alasan mengajukan klaim..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Simpan Draft Klaim
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && selectedClaim && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Update Status Tahapan Klaim</h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmUpdateStatus} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Pilih Status Baru:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ClaimStatusType)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none font-bold"
                >
                  {statusesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Catatan Tambahan Verifikasi:</label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={2}
                  placeholder="misal: Berkas kuitansi disetujui, dana akan dicairkan 3 hari kerja..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Perbarui Status
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
