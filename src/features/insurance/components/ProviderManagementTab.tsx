import React, { useState } from 'react';
import { Building, Plus, Phone, Mail, Globe, UserCheck, Edit2, Trash2, X, Search } from 'lucide-react';
import { useInsuranceStore } from '../../../store/useInsuranceStore';
import { InsuranceProvider } from '../../../types';

export const ProviderManagementTab: React.FC = () => {
  const { providers, addProvider, updateProvider, deleteProvider } = useInsuranceStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState<InsuranceProvider | null>(null);

  // Form
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [callCenter, setCallCenter] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');

  const filteredProviders = providers.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.callCenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingProvider(null);
    setName('');
    setContactPerson('');
    setCallCenter('');
    setEmail('');
    setWebsite('');
    setNotes('');
    setShowModal(true);
  };

  const handleOpenEditModal = (p: InsuranceProvider) => {
    setEditingProvider(p);
    setName(p.name);
    setContactPerson(p.contactPerson);
    setCallCenter(p.callCenter);
    setEmail(p.email);
    setWebsite(p.website);
    setNotes(p.notes || '');
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingProvider) {
      updateProvider(editingProvider.id, {
        name,
        contactPerson,
        callCenter,
        email,
        website,
        notes
      });
    } else {
      addProvider({
        name,
        contactPerson,
        callCenter,
        email,
        website,
        notes
      });
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Search Bar & Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari provider, hotline, email..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
          />
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Provider Baru</span>
        </button>
      </div>

      {/* Provider List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-2xl">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{provider.name}</h3>
                    <span className="text-[10px] text-cyan-400 font-semibold">Mitra Resmi Asuransi</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(provider)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProvider(provider.id)}
                    className="p-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {provider.callCenter && (
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-rose-400" /> Call Center / Hotline:
                    </span>
                    <a href={`tel:${provider.callCenter}`} className="font-bold text-rose-300 hover:underline">
                      {provider.callCenter}
                    </a>
                  </div>
                )}

                {provider.contactPerson && (
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Kontak Agen:
                    </span>
                    <span className="font-medium text-slate-200">{provider.contactPerson}</span>
                  </div>
                )}

                {provider.email && (
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-400" /> Email Support:
                    </span>
                    <a href={`mailto:${provider.email}`} className="font-medium text-blue-300 hover:underline truncate max-w-[160px]">
                      {provider.email}
                    </a>
                  </div>
                )}

                {provider.website && (
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" /> Website:
                    </span>
                    <a href={provider.website} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-300 hover:underline truncate max-w-[160px]">
                      {provider.website}
                    </a>
                  </div>
                )}
              </div>

              {provider.notes && (
                <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 italic">
                  "{provider.notes}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Building className="w-5 h-5 text-cyan-400" />
                <span>{editingProvider ? 'Edit Provider Asuransi' : 'Tambah Provider Baru'}</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 bg-slate-800 text-slate-300 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Nama Provider / Perusahaan:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="misal: Prudential / Manulife / BPJS"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Call Center / Hotline Darurat:</label>
                <input
                  type="text"
                  value={callCenter}
                  onChange={(e) => setCallCenter(e.target.value)}
                  placeholder="misal: 1500085 / 165"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Kontak Person / Agen:</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Nama agen resmi"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Email Support:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="care@provider.co.id"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Website Resmi:</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.provider.co.id"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Catatan Khusus:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Catatan mengenai cara klaim, rujukan RS, dll..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl p-3 text-xs text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
              >
                Simpan Provider
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
