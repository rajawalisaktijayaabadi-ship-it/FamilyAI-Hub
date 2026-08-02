import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  QrCode,
  Barcode,
  AlertTriangle,
  Clock,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Minus
} from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { InventoryItem, FamilyMember } from '../../../types';
import { useInventoryStore } from '../../../store/useInventoryStore';
import { defaultCategoriesList } from '../../../store/useShoppingStore';

const inventorySchema = z.object({
  name: z.string().min(2, 'Nama barang minimal 2 karakter'),
  category: z.string().min(1, 'Pilih kategori'),
  locationId: z.string().min(1, 'Pilih lokasi penyimpanan'),
  quantity: z.coerce.number().min(0, 'Jumlah tidak boleh negatif'),
  unit: z.string().min(1, 'Satuan wajib diisi (misal: Karung, Pouch, Botol)'),
  minStock: z.coerce.number().min(0, 'Minimum stock wajib diisi'),
  purchaseDate: z.string().min(1, 'Tanggal beli wajib'),
  expirationDate: z.string().min(1, 'Tanggal kedaluwarsa wajib'),
  barcode: z.string().optional(),
  qrCode: z.string().optional(),
  photoUrl: z.string().optional(),
  pricePerUnit: z.coerce.number().optional(),
  notes: z.string().optional()
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

interface SmartInventoryManagerProps {
  familyMembers?: FamilyMember[];
}

export const SmartInventoryManager: React.FC<SmartInventoryManagerProps> = () => {
  const {
    items,
    locations,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    updateQuantity
  } = useInventoryStore();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [activeCodeModalItem, setActiveCodeModalItem] = useState<InventoryItem | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<any>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: '',
      category: 'Makanan',
      locationId: locations[0]?.id || 'loc-3',
      quantity: 2,
      unit: 'Pouch',
      minStock: 1,
      purchaseDate: new Date().toISOString().split('T')[0],
      expirationDate: '2027-08-01',
      barcode: '',
      qrCode: '',
      photoUrl: '',
      pricePerUnit: 35000,
      notes: ''
    }
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    reset({
      name: '',
      category: 'Makanan',
      locationId: locations[0]?.id || 'loc-3',
      quantity: 2,
      unit: 'Pouch',
      minStock: 1,
      purchaseDate: new Date().toISOString().split('T')[0],
      expirationDate: '2027-08-01',
      barcode: `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      qrCode: `QR-INV-${Date.now().toString().slice(-6)}`,
      photoUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
      pricePerUnit: 35000,
      notes: ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    reset({
      name: item.name,
      category: item.category,
      locationId: item.locationId,
      quantity: item.quantity,
      unit: item.unit,
      minStock: item.minStock,
      purchaseDate: item.purchaseDate,
      expirationDate: item.expirationDate,
      barcode: item.barcode,
      qrCode: item.qrCode,
      photoUrl: item.photoUrl || '',
      pricePerUnit: item.pricePerUnit || 0,
      notes: item.notes || ''
    });
    setShowModal(true);
  };

  const onSubmitForm = (values: any) => {
    const loc = locations.find((l) => l.id === values.locationId);
    const locationName = loc ? loc.name : 'Pantry Utama';

    if (editingItem) {
      updateInventoryItem(editingItem.id, {
        ...values,
        locationName
      });
    } else {
      addInventoryItem({
        ...values,
        locationName,
        barcode: values.barcode || `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        qrCode: values.qrCode || `QR-INV-${Date.now().toString().slice(-6)}`
      });
    }
    setShowModal(false);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.locationName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation === 'all' || item.locationId === selectedLocation;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari barang, kategori, atau lokasi penyimpanan..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Stok Barang</span>
          </button>

        </div>

        {/* Sub Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Lokasi:</span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1 text-[11px] outline-none"
          >
            <option value="all">Semua Lokasi Penyimpanan</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>

          <span className="text-slate-400 font-semibold text-[11px] ml-2">Kategori:</span>
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

          <span className="ml-auto text-[11px] text-slate-400 font-medium">
            Menampilkan <span className="text-white font-bold">{filteredItems.length}</span> barang
          </span>
        </div>
      </div>

      {/* Inventory Item Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isLow = item.quantity > 0 && item.quantity <= item.minStock;
          const isOut = item.quantity <= 0;

          return (
            <div
              key={item.id}
              className={`bg-slate-900 border rounded-3xl p-5 space-y-4 shadow-xl transition-all relative ${
                isOut
                  ? 'border-rose-500/40 bg-rose-950/10'
                  : isLow
                  ? 'border-amber-500/40 bg-amber-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-800 flex-shrink-0 bg-slate-950"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 flex-shrink-0">
                    <Package className="w-8 h-8" />
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                      {item.category}
                    </span>
                    
                    {isOut ? (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        HABIS TOTAL
                      </span>
                    ) : isLow ? (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        MENIPIS
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        STOK AMAN
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                  
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.locationName}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Adjuster & Expiration */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Jumlah Stok Saat Ini:</div>
                  <div className="font-bold text-white flex items-center gap-1">
                    <span className="text-sm">{item.quantity}</span>
                    <span className="text-slate-400 font-normal">{item.unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-7 h-7 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center font-bold border border-slate-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-7 h-7 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl flex items-center justify-center font-bold border border-amber-500/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Information Row */}
              <div className="text-[10px] text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Minimum Stock Alert:</span>
                  <span className="font-semibold text-slate-200">{item.minStock} {item.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kedaluwarsa (Exp):</span>
                  <span className="font-semibold text-orange-400">{item.expirationDate}</span>
                </div>
              </div>

              {/* Card Bottom Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <button
                  onClick={() => setActiveCodeModalItem(item)}
                  className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <Barcode className="w-3.5 h-3.5" />
                  <span>Lihat Barcode & QR</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteInventoryItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add/Edit Inventory Item Modal */}
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
              <Package className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Stok Barang' : 'Tambah Stok Barang Inventaris'}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Barang:</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="misal: Beras Pandan Wangi, Minyak Goreng, Deterjen..."
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
                  <label className="font-semibold text-slate-300 block mb-1">Lokasi Penyimpanan:</label>
                  <select
                    {...register('locationId')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jumlah Stok:</label>
                  <input
                    type="number"
                    {...register('quantity')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Satuan:</label>
                  <input
                    type="text"
                    {...register('unit')}
                    placeholder="Pouch, Kg, Botol..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Minimum Stock:</label>
                  <input
                    type="number"
                    {...register('minStock')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Tanggal Beli:</label>
                  <input
                    type="date"
                    {...register('purchaseDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Tanggal Kedaluwarsa:</label>
                  <input
                    type="date"
                    {...register('expirationDate')}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Foto Barang (URL):</label>
                <input
                  type="text"
                  {...register('photoUrl')}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-3 text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Tambahan:</label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Aturan penyimpanan, instruksi khusus..."
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
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Ke Inventaris'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Barcode & QR Code Modal */}
      {activeCodeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative text-center">
            <button
              onClick={() => setActiveCodeModalItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-white text-base">{activeCodeModalItem.name}</h3>
            <p className="text-xs text-slate-400">{activeCodeModalItem.locationName}</p>

            {/* Simulated Barcode */}
            <div className="bg-white p-4 rounded-2xl text-black space-y-2 inline-block w-full">
              <div className="flex items-center justify-center gap-1 h-12">
                {[4, 2, 6, 1, 3, 5, 2, 4, 1, 6, 3, 2, 5, 1, 4].map((w, idx) => (
                  <div key={idx} className="bg-black h-full" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <div className="font-mono text-xs font-bold">{activeCodeModalItem.barcode}</div>
            </div>

            {/* Simulated QR Code */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <div className="w-24 h-24 mx-auto bg-amber-400/20 border-2 border-amber-400/50 rounded-xl flex items-center justify-center text-amber-400">
                <QrCode className="w-16 h-16" />
              </div>
              <div className="font-mono text-[11px] text-slate-300 font-bold">{activeCodeModalItem.qrCode}</div>
            </div>

            <button
              onClick={() => setActiveCodeModalItem(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl"
            >
              Tutup Modal Code
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
