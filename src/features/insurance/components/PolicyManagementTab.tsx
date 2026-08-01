import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Users,
  Building,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import {
  FamilyMember,
  InsurancePolicy,
  InsuranceCategoryType,
  PolicyStatusType,
  PaymentFrequencyType
} from '../../../types';

interface PolicyManagementTabProps {
  familyMembers: FamilyMember[];
}

export const PolicyManagementTab: React.FC<PolicyManagementTabProps> = ({ familyMembers }) => {
  const { policies, providers, addPolicy, updatePolicy, deletePolicy } = useInsuranceStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<InsurancePolicy | null>(null);

  // Form State
  const [policyNumber, setPolicyNumber] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<InsuranceCategoryType>('Kesehatan');
  const [providerId, setProviderId] = useState('');
  const [participantNumber, setParticipantNumber] = useState('');
  const [policyHolderId, setPolicyHolderId] = useState(familyMembers[0]?.id || '');
  const [insuredMemberIds, setInsuredMemberIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<PolicyStatusType>('active');
  const [premiumAmount, setPremiumAmount] = useState(500000);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequencyType>('Bulanan');
  const [coverageLimit, setCoverageLimit] = useState(100000000);
  const [benefitsInput, setBenefitsInput] = useState('');
  const [notes, setNotes] = useState('');

  const categoriesList: InsuranceCategoryType[] = [
    'Kesehatan',
    'Jiwa',
    'Kecelakaan',
    'Rumah',
    'Kendaraan',
    'Pendidikan',
    'Perjalanan',
    'Usaha',
    'Pet Insurance',
    'Custom'
  ];

  const filteredPolicies = policies.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.providerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategoryFilter === 'ALL' || p.category === selectedCategoryFilter;
    const matchesStatus = selectedStatusFilter === 'ALL' || p.status === selectedStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingPolicy(null);
    setPolicyNumber(`POL-${Math.floor(100000 + Math.random() * 900000)}`);
    setTitle('');
    setCategory('Kesehatan');
    setProviderId(providers[0]?.id || '');
    setParticipantNumber('');
    setPolicyHolderId(familyMembers[0]?.id || '');
    setInsuredMemberIds(familyMembers.map((m) => m.id));
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('2028-12-31');
    setStatus('active');
    setPremiumAmount(500000);
    setPaymentFrequency('Bulanan');
    setCoverageLimit(100000000);
    setBenefitsInput('Rawat inap VIP, UGD 24 Jam, Pengobatan kronis');
    setNotes('');
    setShowModal(true);
  };

  const handleOpenEditModal = (p: InsurancePolicy) => {
    setEditingPolicy(p);
    setPolicyNumber(p.policyNumber);
    setTitle(p.title);
    setCategory(p.category);
    setProviderId(p.providerId);
    setParticipantNumber(p.participantNumber);
    setPolicyHolderId(p.policyHolderId);
    setInsuredMemberIds(p.insuredMemberIds);
    setStartDate(p.startDate);
    setEndDate(p.endDate);
    setStatus(p.status);
    setPremiumAmount(p.premiumAmount);
    setPaymentFrequency(p.paymentFrequency);
    setCoverageLimit(p.coverageLimit);
    setBenefitsInput(p.benefits.join(', '));
    setNotes(p.notes || '');
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !policyNumber.trim()) return;

    const providerObj = providers.find((pr) => pr.id === providerId);
    const providerName = providerObj ? providerObj.name : 'Provider Asuransi';

    const holderObj = familyMembers.find((m) => m.id === policyHolderId);
    const policyHolderName = holderObj ? holderObj.name : 'Pemegang Polis';

    const insuredMemberNames = familyMembers
      .filter((m) => insuredMemberIds.includes(m.id))
      .map((m) => m.name);

    const benefits = benefitsInput
      .split(',')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    if (editingPolicy) {
      updatePolicy(editingPolicy.id, {
        policyNumber,
        title,
        category,
        providerId,
        providerName,
        participantNumber,
        policyHolderId,
        policyHolderName,
        insuredMemberIds,
        insuredMemberNames,
        startDate,
        endDate,
        status,
        premiumAmount,
        paymentFrequency,
        coverageLimit,
        benefits,
        notes
      });
    } else {
      addPolicy({
        policyNumber,
        title,
        category,
        providerId,
        providerName,
        participantNumber,
        policyHolderId,
        policyHolderName,
        insuredMemberIds,
        insuredMemberNames,
        startDate,
        endDate,
        status,
        premiumAmount,
        paymentFrequency,
        coverageLimit,
        benefits,
        notes
      });
    }

    setShowModal(false);
  };

  const toggleInsuredMember = (id: string) => {
    if (insuredMemberIds.includes(id)) {
      setInsuredMemberIds(insuredMemberIds.filter((m) => m !== id));
    } else {
      setInsuredMemberIds([...insuredMemberIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari polis, nomor, atau provider..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
          />
        </div>

        {/* Filter dropdowns & Add Button */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          
          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-2xl px-3 py-2.5 outline-none focus:border-cyan-500"
          >
            <option value="ALL">Semua Kategori</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-2xl px-3 py-2.5 outline-none focus:border-cyan-500"
          >
            <option value="ALL">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="grace_period">Grace Period</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Dibatalkan</option>
          </select>

          {/* Add Policy Button */}
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Polis Baru</span>
          </button>
        </div>

      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => {
          let statusBadge = 'bg-emerald-950 text-emerald-300 border-emerald-500/30';
          if (policy.status === 'expired') statusBadge = 'bg-rose-950 text-rose-300 border-rose-500/30';
          if (policy.status === 'grace_period') statusBadge = 'bg-amber-950 text-amber-300 border-amber-500/30';

          return (
            <div
              key={policy.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                {/* Header Badge & Action Buttons */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                    {policy.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                      {policy.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleOpenEditModal(policy)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                      title="Edit Polis"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deletePolicy(policy.id)}
                      className="p-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 rounded-xl transition-all"
                      title="Hapus Polis"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Numbers */}
                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{policy.title}</h3>
                  <div className="text-xs text-slate-400 mt-1 space-y-0.5">
                    <div>
                      No. Polis: <span className="font-mono text-cyan-300 font-bold">{policy.policyNumber}</span>
                    </div>
                    <div>
                      Provider: <span className="text-slate-200">{policy.providerName}</span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">Pemegang Polis:</span>
                    <span className="text-slate-200 font-medium">{policy.policyHolderName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">Premi:</span>
                    <span className="text-amber-400 font-bold">
                      Rp {policy.premiumAmount.toLocaleString('id-ID')} / {policy.paymentFrequency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uang Pertanggungan:</span>
                    <span className="text-emerald-400 font-bold">
                      Rp {policy.coverageLimit.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Benefits Pills */}
                {policy.benefits && policy.benefits.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-400">Manfaat Utama:</div>
                    <div className="flex flex-wrap gap-1">
                      {policy.benefits.map((ben, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-lg text-[10px]"
                        >
                          ✓ {ben}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Insured Members Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{policy.insuredMemberNames.length} Anggota Ditanggung</span>
                </div>
                <span className="text-[10px] text-slate-500">{policy.startDate} s/d {policy.endDate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
          <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm">Tidak ditemukan data polis asuransi yang sesuai dengan kriteria.</p>
        </div>
      )}

      {/* CRUD Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto my-auto shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>{editingPolicy ? 'Edit Data Polis' : 'Tambah Polis Asuransi Baru'}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Nomor Polis:</label>
                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Nama / Judul Polis:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="misal: BPJS Kelas 1 / Prudential VIP"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Kategori Polis:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as InsuranceCategoryType)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Perusahaan Provider:</label>
                  <select
                    value={providerId}
                    onChange={(e) => setProviderId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    {providers.map((pr) => (
                      <option key={pr.id} value={pr.id}>
                        {pr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Nomor Peserta / Kartu:</label>
                  <input
                    type="text"
                    value={participantNumber}
                    onChange={(e) => setParticipantNumber(e.target.value)}
                    placeholder="misal: 000123987111"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Pemegang Polis:</label>
                  <select
                    value={policyHolderId}
                    onChange={(e) => setPolicyHolderId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Anggota Keluarga yang Ditanggung (Insured):
                </label>
                <div className="flex flex-wrap gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  {familyMembers.map((m) => {
                    const isSelected = insuredMemberIds.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleInsuredMember(m.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-cyan-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {m.name} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Nominal Premi (Rp):</label>
                  <input
                    type="number"
                    value={premiumAmount}
                    onChange={(e) => setPremiumAmount(Number(e.target.value))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Frekuensi Pembayaran:</label>
                  <select
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequencyType)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  >
                    <option value="Bulanan">Bulanan</option>
                    <option value="Triwulan">Triwulan</option>
                    <option value="Semesteran">Semesteran</option>
                    <option value="Tahunan">Tahunan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Uang Pertanggungan (Rp):</label>
                  <input
                    type="number"
                    value={coverageLimit}
                    onChange={(e) => setCoverageLimit(Number(e.target.value))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Tanggal Mulai:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Tanggal Berakhir:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Manfaat Utama (Pisahkan Koma):</label>
                <input
                  type="text"
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  placeholder="Rawat Inap VIP, UGD 24 Jam, Pengobatan Kronis"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                {editingPolicy ? 'Simpan Perubahan Polis' : 'Simpan Polis Baru'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
