import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit,
  ShoppingCart,
  Tag,
  DollarSign,
  User,
  Calendar,
  Sparkles,
  AlertCircle,
  X,
  Repeat
} from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ShoppingItem, ShoppingPriority, FamilyMember } from '../../../types';
import { useShoppingStore, defaultCategoriesList } from '../../../store/useShoppingStore';

const shoppingItemSchema = z.object({
  name: z.string().min(2, 'Nama barang minimal 2 karakter'),
  category: z.string().min(1, 'Pilih kategori'),
  quantity: z.coerce.number().min(0.1, 'Jumlah harus lebih dari 0'),
  unit: z.string().min(1, 'Satuan wajib diisi (misal: Pouch, Kg, Botol)'),
  estimatedPrice: z.coerce.number().min(0, 'Estimasi harga valid'),
  priority: z.enum(['Tinggi', 'Sedang', 'Biasa', 'Mendesak']),
  notes: z.string().optional(),
  assignedMemberId: z.string().optional(),
  assignedMemberName: z.string().optional(),
  date: z.string().min(1, 'Tanggal belanja wajib'),
  storeName: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringFrequency: z.enum(['Harian', 'Mingguan', 'Bulanan', 'Tahunan']).optional()
});

type ShoppingFormValues = z.infer<typeof shoppingItemSchema>;

interface ShoppingListManagerProps {
  familyMembers?: FamilyMember[];
}

export const ShoppingListManager: React.FC<ShoppingListManagerProps> = ({
  familyMembers = []
}) => {
  const {
    items,
    addItem,
    updateItem,
    deleteItem,
    toggleItemBought,
    clearCompletedItems
  } = useShoppingStore();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<any>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: {
      name: '',
      category: 'Makanan',
      quantity: 1,
      unit: 'Pack',
      estimatedPrice: 25000,
      priority: 'Sedang',
      notes: '',
      date: new Date().toISOString().split('T')[0],
      storeName: 'Superindo Kebon Jeruk',
      isRecurring: false,
      recurringFrequency: 'Bulanan'
    }
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    reset({
      name: '',
      category: 'Makanan',
      quantity: 1,
      unit: 'Pack',
      estimatedPrice: 25000,
      priority: 'Sedang',
      notes: '',
      date: new Date().toISOString().split('T')[0],
      storeName: 'Superindo Kebon Jeruk',
      isRecurring: false,
      recurringFrequency: 'Bulanan'
    });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (item: ShoppingItem) => {
    setEditingItem(item);
    reset({
      name: item.name,
      category: item.category,
      quantity: Number(item.quantity) || 1,
      unit: item.unit || 'Pack',
      estimatedPrice: item.estimatedPrice,
      priority: item.priority || 'Sedang',
      notes: item.notes || '',
      assignedMemberId: item.assignedMemberId || '',
      assignedMemberName: item.assignedMemberName || '',
      date: item.date || new Date().toISOString().split('T')[0],
      storeName: item.storeName || '',
      isRecurring: item.isRecurring || false,
      recurringFrequency: item.recurringFrequency || 'Bulanan'
    });
    setShowAddModal(true);
  };

  const onSubmitForm = (values: any) => {
    const assignedMem = familyMembers.find(m => m.id === values.assignedMemberId);
    const assignedMemberName = assignedMem ? assignedMem.name : values.assignedMemberName || '';

    if (editingItem) {
      updateItem(editingItem.id, {
        ...values,
        assignedMemberName
      });
    } else {
      addItem({
        ...values,
        status: 'pending',
        bought: false,
        addedBy: familyMembers[0]?.name || 'Siti Rahma (Ibu)',
        assignedMemberName
      });
    }
    setShowAddModal(false);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.storeName && item.storeName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    
    let matchesStatus = true;
    if (statusFilter === 'pending') matchesStatus = !item.bought;
    if (statusFilter === 'completed') matchesStatus = item.bought;

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const totalEstFiltered = filteredItems.reduce((acc, curr) => acc + curr.estimatedPrice, 0);

  return (
    <div className="space-y-6">
      
      {/* Control Bar: Search, Filters, Add Button */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama barang, kategori, atau nama toko..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Barang Belanja</span>
            </button>

            <button
              onClick={clearCompletedItems}
              className="px-3 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs font-semibold rounded-2xl transition-all"
              title="Bersihkan item lunas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold mr-1">Status:</span>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              statusFilter === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Belum Dibeli ({items.filter(i => !i.bought).length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              statusFilter === 'completed'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Selesai Dibeli ({items.filter(i => i.bought).length})
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Semua ({items.length})
          </button>

          <span className="text-slate-600 px-1">|</span>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1 text-[11px] outline-none"
          >
            <option value="all">Semua Kategori</option>
            {defaultCategoriesList.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1 text-[11px] outline-none"
          >
            <option value="all">Semua Prioritas</option>
            <option value="Mendesak">Mendesak</option>
            <option value="Tinggi">Tinggi</option>
            <option value="Sedang">Sedang</option>
            <option value="Biasa">Biasa</option>
          </select>

          <div className="ml-auto font-mono text-[11px] text-amber-400 font-bold">
            Total Estimasi: Rp {totalEstFiltered.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* Shopping List Items Grid / Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <ShoppingCart className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-xs font-semibold">Tidak ada barang belanja yang cocok dengan filter ini.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  item.bought
                    ? 'bg-slate-950/50 border-slate-800/80 opacity-60 text-slate-400'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                {/* Checkbox & Details */}
                <div className="flex items-start gap-3 cursor-pointer" onClick={() => toggleItemBought(item.id)}>
                  <input
                    type="checkbox"
                    checked={item.bought}
                    onChange={() => {}}
                    className="w-4 h-4 mt-0.5 rounded text-amber-500 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-xs ${item.bought ? 'line-through' : 'text-white'}`}>
                        {item.name} ({item.quantity} {item.unit})
                      </span>

                      <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                        {item.category}
                      </span>

                      {item.priority === 'Mendesak' && (
                        <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Mendesak
                        </span>
                      )}

                      {item.isRecurring && (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                          <Repeat className="w-2.5 h-2.5" />
                          <span>Rutin ({item.recurringFrequency})</span>
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>Toko: {item.storeName || 'Bebas'}</span>
                      <span>• Tanggal: {item.date}</span>
                      {item.assignedMemberName && (
                        <span className="text-cyan-400 font-medium">• Ditugaskan: {item.assignedMemberName}</span>
                      )}
                      {item.notes && <span className="text-slate-400 italic">• "{item.notes}"</span>}
                    </div>
                  </div>
                </div>

                {/* Price & Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-amber-400">
                      Rp {item.estimatedPrice.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {item.bought ? 'Sudah Dibeli' : 'Estimasi'}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
                      title="Edit Barang"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Barang Belanja' : 'Tambah Barang Belanja Baru'}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Barang:</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="misal: Minyak Goreng 2L, Beras, Susu UHT..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
                {errors.name && <p className="text-rose-400 text-[10px] mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Kategori:</label>
                  <select
                    {...register('category')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    {defaultCategoriesList.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Prioritas:</label>
                  <select
                    {...register('priority')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    <option value="Mendesak">Mendesak</option>
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Biasa">Biasa</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jumlah:</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('quantity')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Satuan:</label>
                  <input
                    type="text"
                    {...register('unit')}
                    placeholder="Pouch, Kg, Botol, Pack..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Estimasi Harga (Rp):</label>
                  <input
                    type="number"
                    {...register('estimatedPrice')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Toko Favorit:</label>
                  <input
                    type="text"
                    {...register('storeName')}
                    placeholder="Superindo, Indomaret, Pasar..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Ditugaskan Kepada:</label>
                  <select
                    {...register('assignedMemberId')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    <option value="">-- Pilih Anggota --</option>
                    {familyMembers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Tanggal Belanja:</label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    {...register('isRecurring')}
                    className="w-4 h-4 rounded text-amber-500 cursor-pointer"
                  />
                  <label htmlFor="isRecurring" className="font-semibold text-slate-200 cursor-pointer">
                    Atur sebagai Belanja Rutin
                  </label>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Frekuensi Rutin:</label>
                  <select
                    {...register('recurringFrequency')}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-300 outline-none"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Tambahan:</label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Merk khusus, varian rasa, atau instruksi lain..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold rounded-2xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-2xl shadow-lg"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Ke Daftar'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
