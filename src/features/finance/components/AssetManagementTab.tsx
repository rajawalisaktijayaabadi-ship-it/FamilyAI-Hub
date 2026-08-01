import React, { useState } from 'react';
import { Home, Plus, Trash2, Shield, Car, Smartphone, DollarSign, MapPin, UserCheck } from 'lucide-react';
import { useFinanceStore } from '../../../store/useFinanceStore';
import { FamilyMember } from '../../../types';

interface AssetManagementTabProps {
  familyMembers: FamilyMember[];
}

export const AssetManagementTab: React.FC<AssetManagementTabProps> = ({ familyMembers }) => {
  const { assets, addAsset, deleteAsset } = useFinanceStore();

  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<
    'Rumah' | 'Tanah' | 'Mobil' | 'Motor' | 'Perhiasan' | 'Elektronik' | 'Aset Digital' | 'Investasi' | 'Lainnya'
  >('Rumah');
  const [estimatedValue, setEstimatedValue] = useState<number>(100000000);
  const [purchasePrice, setPurchasePrice] = useState<number>(80000000);
  const [purchaseDate, setPurchaseDate] = useState('2022-01-01');
  const [ownerMemberId, setOwnerMemberId] = useState(familyMembers[0]?.id || 'm-1');
  const [locationOrRef, setLocationOrRef] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || estimatedValue <= 0) return;

    const selectedOwner = familyMembers.find((m) => m.id === ownerMemberId);

    addAsset({
      title,
      category,
      estimatedValue,
      purchasePrice,
      purchaseDate,
      ownerMemberId,
      ownerName: selectedOwner ? selectedOwner.name : 'Keluarga Utama',
      locationOrRef,
      notes
    });

    setTitle('');
    setShowAddModal(false);
  };

  const totalAssetValuation = assets.reduce((sum, a) => sum + a.estimatedValue, 0);
  const totalPurchaseValuation = assets.reduce((sum, a) => sum + a.purchasePrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Home className="w-5 h-5 text-teal-400" />
            <span>Manajemen Aset Kekayaan Keluarga (Asset Inventory)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Inventarisasi rumah, tanah, kendaraan, perhiasan, elektronik, dan aset digital.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs rounded-2xl shadow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aset Keluarga</span>
        </button>
      </div>

      {/* Asset Valuation Banner */}
      <div className="bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-300">Total Estimasi Nilai Kekayaan Aset (Valuation)</div>
          <div className="text-3xl font-black text-teal-400 mt-1">
            Rp {totalAssetValuation.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <div>Total Harga Beli Awal: <strong className="text-slate-200">Rp {totalPurchaseValuation.toLocaleString('id-ID')}</strong></div>
          <div>Apresiasi Nilai Aset: <strong className="text-emerald-400">+Rp {(totalAssetValuation - totalPurchaseValuation).toLocaleString('id-ID')}</strong></div>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((ast) => (
          <div
            key={ast.id}
            className="bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-3xl p-5 space-y-3 relative group transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] bg-slate-950 text-teal-400 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                  {ast.category}
                </span>
                <h4 className="font-bold text-white text-base mt-1.5">{ast.title}</h4>
                <div className="text-[11px] text-slate-400">
                  Pemilik: <strong className="text-slate-200">{ast.ownerName}</strong> • Beli: {ast.purchaseDate}
                </div>
              </div>

              <button
                onClick={() => deleteAsset(ast.id)}
                className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
              <div>
                <div className="text-slate-400 text-[10px]">Estimasi Nilai Sekarang:</div>
                <div className="font-mono font-bold text-teal-400 text-sm">Rp {ast.estimatedValue.toLocaleString('id-ID')}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px]">Harga Beli Awal:</div>
                <div className="font-mono text-slate-400">Rp {ast.purchasePrice.toLocaleString('id-ID')}</div>
              </div>
            </div>

            {ast.locationOrRef && (
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{ast.locationOrRef}</span>
              </div>
            )}

            {ast.notes && <div className="text-[11px] text-slate-500 italic">"{ast.notes}"</div>}
          </div>
        ))}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Tambah Aset Kekayaan Baru</h3>

            <form onSubmit={handleAddAsset} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nama Aset / Barang:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="misal: Rumah Tinggal / Mobil Honda / Emas Perhiasan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Kategori:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    <option value="Rumah">Rumah / Bangunan</option>
                    <option value="Tanah">Tanah / Kavling</option>
                    <option value="Mobil">Mobil Kendaraan</option>
                    <option value="Motor">Motor Kendaraan</option>
                    <option value="Perhiasan">Perhiasan & Berlian</option>
                    <option value="Elektronik">Elektronik Mahal</option>
                    <option value="Aset Digital">Aset Digital</option>
                    <option value="Investasi">Investasi Fisik</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Pemilik Aset:</label>
                  <select
                    value={ownerMemberId}
                    onChange={(e) => setOwnerMemberId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  >
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.detailedRole || m.roleTitle})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Estimasi Nilai Sekarang (Rp):</label>
                  <input
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Harga Beli Awal (Rp):</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Pembelian:</label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Lokasi / Keterangan Dokumen:</label>
                  <input
                    type="text"
                    value={locationOrRef}
                    onChange={(e) => setLocationOrRef(e.target.value)}
                    placeholder="misal: Komp Asri / Garasi / SDB Mandiri"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Opsional:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl"
                >
                  Simpan Aset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
