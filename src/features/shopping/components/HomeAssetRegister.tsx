import React, { useState } from 'react';
import {
  Home,
  Plus,
  Tv,
  Wrench,
  ShieldCheck,
  Calendar,
  DollarSign,
  FileText,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  X,
  ExternalLink
} from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { HouseholdAsset } from '../../../types';
import { useHouseholdStore } from '../../../store/useHouseholdStore';

const assetSchema = z.object({
  name: z.string().min(2, 'Nama aset minimal 2 karakter'),
  category: z.string().min(1, 'Pilih kategori aset'),
  roomId: z.string().min(1, 'Pilih ruangan'),
  brandModel: z.string().min(1, 'Merk / Seri model wajib diisi'),
  serialNumber: z.string().optional(),
  purchaseDate: z.string().min(1, 'Tanggal pembelian wajib'),
  purchasePrice: z.coerce.number().min(0, 'Harga beli valid'),
  warrantyExpiryDate: z.string().optional(),
  manualBookUrl: z.string().optional(),
  receiptPhotoUrl: z.string().optional(),
  status: z.enum(['Baik', 'Perlu Service', 'Rusak', 'Garansi Klaim']),
  notes: z.string().optional()
});

type AssetFormValues = z.infer<typeof assetSchema>;

export const HomeAssetRegister: React.FC = () => {
  const { rooms, assets, addAsset, updateAsset, deleteAsset, getExpiringWarranties } = useHouseholdStore();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingAsset, setEditingAsset] = useState<HouseholdAsset | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');

  const expiringWarranties = getExpiringWarranties();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: '',
      category: 'TV',
      roomId: rooms[0]?.id || 'room-1',
      brandModel: '',
      serialNumber: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: 5000000,
      warrantyExpiryDate: '2027-08-01',
      manualBookUrl: '',
      receiptPhotoUrl: '',
      status: 'Baik',
      notes: ''
    }
  });

  const handleOpenAddModal = () => {
    setEditingAsset(null);
    reset({
      name: '',
      category: 'TV',
      roomId: rooms[0]?.id || 'room-1',
      brandModel: '',
      serialNumber: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: 5000000,
      warrantyExpiryDate: '2027-08-01',
      manualBookUrl: '',
      receiptPhotoUrl: '',
      status: 'Baik',
      notes: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (asset: HouseholdAsset) => {
    setEditingAsset(asset);
    reset({
      name: asset.name,
      category: asset.category,
      roomId: asset.roomId,
      brandModel: asset.brandModel,
      serialNumber: asset.serialNumber || '',
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice,
      warrantyExpiryDate: asset.warrantyExpiryDate || '',
      manualBookUrl: asset.manualBookUrl || '',
      receiptPhotoUrl: asset.receiptPhotoUrl || '',
      status: asset.status,
      notes: asset.notes || ''
    });
    setShowModal(true);
  };

  const onSubmitForm = (values: AssetFormValues) => {
    const room = rooms.find((r) => r.id === values.roomId);
    const roomName = room ? room.name : 'Ruang Tamu';

    if (editingAsset) {
      updateAsset(editingAsset.id, {
        ...values,
        roomName
      });
    } else {
      addAsset({
        ...values,
        roomName
      });
    }
    setShowModal(false);
  };

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.brandModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesRoom = selectedRoom === 'all' || asset.roomId === selectedRoom;

    return matchesSearch && matchesCategory && matchesRoom;
  });

  const totalAssetValue = assets.reduce((sum, a) => sum + a.purchasePrice, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Stat Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Total Aset Terdaftar</div>
          <div className="text-2xl font-black text-white">{assets.length} Perangkat</div>
          <div className="text-[10px] text-amber-400 font-semibold">Mencakup TV, AC, Kulkas & Furniture</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Estimasi Nilai Total Aset</div>
          <div className="text-xl font-black text-emerald-400">Rp {totalAssetValue.toLocaleString('id-ID')}</div>
          <div className="text-[10px] text-slate-400">Modal investasi rumah tangga</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Peringatan Garansi Berakhir</div>
          <div className="text-2xl font-black text-orange-400">{expiringWarranties.length} Aset</div>
          <div className="text-[10px] text-orange-300 font-semibold">Perlu service atau review klaim garansi</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari aset rumah, merk model, atau kategori..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Registrasi Aset Baru</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Kategori:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1 text-[11px] outline-none"
          >
            <option value="all">Semua Kategori Aset</option>
            <option value="TV">TV</option>
            <option value="AC">AC</option>
            <option value="Kulkas">Kulkas</option>
            <option value="Mesin Cuci">Mesin Cuci</option>
            <option value="Komputer">Komputer</option>
            <option value="Laptop">Laptop</option>
            <option value="Furniture">Furniture</option>
            <option value="Peralatan Dapur">Peralatan Dapur</option>
          </select>

          <span className="text-slate-400 font-semibold text-[11px] ml-2">Ruangan:</span>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1 text-[11px] outline-none"
          >
            <option value="all">Semua Ruangan</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-slate-800 text-[10px] font-bold">
                  {asset.category}
                </span>

                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  asset.status === 'Baik'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : asset.status === 'Perlu Service'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {asset.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-base">{asset.name}</h4>
                <p className="text-xs text-slate-400 font-mono">{asset.brandModel}</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ruangan:</span>
                  <span className="font-semibold text-white">{asset.roomName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Harga Beli:</span>
                  <span className="font-mono font-bold text-emerald-400">Rp {asset.purchasePrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tgl Pembelian:</span>
                  <span>{asset.purchaseDate}</span>
                </div>
                {asset.warrantyExpiryDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Garansi Berakhir:</span>
                    <span className="font-semibold text-orange-400">{asset.warrantyExpiryDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              {asset.manualBookUrl ? (
                <a
                  href={asset.manualBookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Manual Book PDF</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                <span className="text-[10px] text-slate-500 italic">No manual link</span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEditModal(asset)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteAsset(asset.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Asset Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                {editingAsset ? 'Edit Detail Aset Rumah' : 'Registrasi Aset Rumah Baru'}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Aset Perangkat:</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="misal: TV Samsung 55 Inch, AC Daikin Kamar Utama..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
                {errors.name && <p className="text-rose-400 text-[10px] mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Kategori Perangkat:</label>
                  <select
                    {...register('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    <option value="TV">TV</option>
                    <option value="AC">AC</option>
                    <option value="Kulkas">Kulkas</option>
                    <option value="Mesin Cuci">Mesin Cuci</option>
                    <option value="Komputer">Komputer</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Peralatan Dapur">Peralatan Dapur</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Ruangan:</label>
                  <select
                    {...register('roomId')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Merk & Model Seri:</label>
                  <input
                    type="text"
                    {...register('brandModel')}
                    placeholder="misal: Samsung QA55Q60C"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Serial Number (SN):</label>
                  <input
                    type="text"
                    {...register('serialNumber')}
                    placeholder="SN-XXXX-YYYY"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Tanggal Pembelian:</label>
                  <input
                    type="date"
                    {...register('purchaseDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Harga Beli (Rp):</label>
                  <input
                    type="number"
                    {...register('purchasePrice')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Garansi Berakhir:</label>
                  <input
                    type="date"
                    {...register('warrantyExpiryDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Status Kondisi:</label>
                  <select
                    {...register('status')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Perlu Service">Perlu Service</option>
                    <option value="Rusak">Rusak</option>
                    <option value="Garansi Klaim">Garansi Klaim</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Link Manual Book PDF / URL:</label>
                <input
                  type="text"
                  {...register('manualBookUrl')}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Service / Asuransi:</label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Riwayat perbaikan, kontak garansi service center..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold rounded-2xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-2xl shadow-lg"
                >
                  {editingAsset ? 'Simpan Perubahan' : 'Registrasi Aset'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
