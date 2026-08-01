import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Sparkles, 
  Luggage, 
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';
import { ChecklistCategory } from '../../../types/travel';

export const checklistCategoryList: ChecklistCategory[] = [
  'Dokumen',
  'Paspor',
  'Visa',
  'Tiket',
  'Hotel',
  'Pakaian',
  'Obat',
  'Peralatan Bayi',
  'Peralatan Lansia',
  'Gadget',
  'Power Bank',
  'Uang Tunai',
  'Custom Item'
];

export const TravelChecklistTab: React.FC = () => {
  const { 
    trips, 
    activeTripId, 
    checklists, 
    toggleChecklistItem, 
    addChecklistItem, 
    deleteChecklistItem 
  } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const activeChecklists = checklists.filter(c => c.tripId === activeTrip?.id);

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [itemName, setItemName] = useState<string>('');
  const [category, setCategory] = useState<ChecklistCategory>('Pakaian');
  const [quantity, setQuantity] = useState<number>(1);

  const packedCount = activeChecklists.filter(c => c.isPacked).length;
  const progressPercent = activeChecklists.length > 0 
    ? Math.round((packedCount / activeChecklists.length) * 100) 
    : 0;

  const filteredChecklists = selectedCategory === 'Semua' 
    ? activeChecklists 
    : activeChecklists.filter(c => c.category === selectedCategory);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip || !itemName.trim()) return;

    addChecklistItem({
      tripId: activeTrip.id,
      category,
      itemName,
      quantity,
      isPacked: false
    });

    setItemName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            Smart Packing Assistant
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <Luggage className="w-5 h-5 text-indigo-400" />
            <span>Checklist Perlengkapan Perjalanan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Persiapan dokumen, obat-obatan, perlengkapan bayi, lansia, dan barang bawaan keluarga.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Barang</span>
        </button>
      </div>

      {/* Progress Bar Card */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Status Kemasan Koper Keluarga</span>
          </span>
          <span className="text-amber-400 font-mono text-sm">{progressPercent}% Terkemas</span>
        </div>

        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>{packedCount} dari {activeChecklists.length} barang selesai dimasukkan koper</span>
          <span>Sisa {activeChecklists.length - packedCount} barang lagi</span>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategory('Semua')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'Semua' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Semua Category ({activeChecklists.length})
        </button>
        {checklistCategoryList.map((cat) => {
          const count = activeChecklists.filter(c => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-amber-300">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredChecklists.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleChecklistItem(item.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              item.isPacked
                ? 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <button className="text-amber-400 shrink-0">
                {item.isPacked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-600" />
                )}
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  {item.category}
                </span>
                <span className={`font-bold text-xs ${item.isPacked ? 'line-through text-slate-500' : 'text-white'}`}>
                  {item.itemName} ({item.quantity}x)
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChecklistItem(item.id);
              }}
              className="text-slate-600 hover:text-rose-400 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filteredChecklists.length === 0 && (
          <div className="col-span-full py-10 text-center bg-slate-900 rounded-3xl border border-slate-800 text-slate-500 text-xs">
            Belum ada barang pada kategori ini. Tambahkan barang bawaan keluarga baru!
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleAddItem} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Tambah Barang Perlengkapan</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Nama Barang</label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="mis. Paspor Anak & Baju Hangat"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  >
                    {checklistCategoryList.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Jumlah (Qty)</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Simpan Ke Checklist
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
