import React, { useState } from 'react';
import { 
  MapPin, ShieldAlert, ShieldCheck, Battery, Navigation, Radio, PhoneCall,
  History, Clock, Home, GraduationCap, Briefcase, Building, Trees, Plus,
  CheckCircle2, Filter, Sparkles, X, ChevronRight, Compass
} from 'lucide-react';
import { FamilyMember, LocationHistoryLog } from '../../types';
import { useFamilyStore } from '../../store/useFamilyStore';

interface SafetyViewProps {
  familyMembers: FamilyMember[];
  onOpenSOS: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ familyMembers = [], onOpenSOS }) => {
  const { updateMemberLocation } = useFamilyStore();
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<string>('all');
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [checkInMemberId, setCheckInMemberId] = useState<string>(familyMembers[0]?.id || 'm1');
  const [newPlaceName, setNewPlaceName] = useState<string>('');
  const [newAddressDetails, setNewAddressDetails] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Rumah' | 'Sekolah' | 'Kantor' | 'Les/Kursus' | 'Publik/Olahraga' | 'Lainnya'>('Publik/Olahraga');

  // Filter members list based on selected filter
  const displayedMembers = selectedMemberFilter === 'all' 
    ? familyMembers 
    : familyMembers.filter(m => m.id === selectedMemberFilter);

  // Helper for category badge styling and icons
  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case 'Rumah':
        return {
          icon: <Home className="w-3.5 h-3.5 text-emerald-400" />,
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          label: 'Rumah'
        };
      case 'Sekolah':
        return {
          icon: <GraduationCap className="w-3.5 h-3.5 text-blue-400" />,
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          label: 'Sekolah'
        };
      case 'Kantor':
        return {
          icon: <Briefcase className="w-3.5 h-3.5 text-purple-400" />,
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          label: 'Kantor'
        };
      case 'Les/Kursus':
        return {
          icon: <Building className="w-3.5 h-3.5 text-amber-400" />,
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          label: 'Les/Kursus'
        };
      case 'Publik/Olahraga':
        return {
          icon: <Trees className="w-3.5 h-3.5 text-teal-400" />,
          bg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
          label: 'Publik / Olahraga'
        };
      default:
        return {
          icon: <MapPin className="w-3.5 h-3.5 text-rose-400" />,
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          label: category || 'Lokasi Umumn'
        };
    }
  };

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaceName.trim()) return;

    updateMemberLocation(
      checkInMemberId,
      newPlaceName.trim(),
      newAddressDetails.trim() || 'Pembaruan lokasi baru via Check-In',
      newCategory
    );

    // Reset state & close modal
    setNewPlaceName('');
    setNewAddressDetails('');
    setIsCheckInOpen(false);
  };

  const presetLocations = [
    { place: 'Grand Indonesia Mall, Thamrin', address: 'Jl. M.H. Thamrin No. 1, Menteng', cat: 'Publik/Olahraga' as const },
    { place: 'Taman Suropati, Menteng', address: 'Jl. Taman Suropati No. 5, Menteng', cat: 'Publik/Olahraga' as const },
    { place: 'Perpustakaan Cikini, TIM', address: 'Kawasan Taman Ismail Marzuki, Cikini', cat: 'Les/Kursus' as const },
    { place: 'Kediaman Utama, Kebayoran Baru', address: 'Jl. Senopati No. 45, Kebayoran Baru', cat: 'Rumah' as const },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-2 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-rose-400" />
              <h2 className="text-xl font-bold">Family Safety & Live GPS Tracker</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Pemantauan geofencing real-time, tingkat baterai gawai, dan sinyal SOS darurat seketika.
            </p>
          </div>

          <button
            onClick={onOpenSOS}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-red-600/30 flex items-center gap-2 border border-red-500/40 animate-pulse"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Kirim Sinyal Darurat (SOS)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Simulated Map Canvas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Navigation className="w-4 h-4 text-rose-400" />
              <span>Peta Lokasi Live Keluarga (DKI Jakarta)</span>
            </h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-spin" />
              <span>Sinyal GPS Terkoneksi</span>
            </span>
          </div>

          {/* Interactive Simulated Map Box */}
          <div className="relative w-full h-[380px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
            
            {/* Grid overlay lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Map Markers for Family Members */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {familyMembers.map((m) => (
                <div key={m.id} className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md flex items-center gap-3 shadow-lg">
                  <div className="relative">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/50" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[8px] text-white font-bold">
                      ✓
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-white truncate">{m.name}</div>
                    <div className="text-[10px] text-rose-300 font-medium truncate">{m.location.placeName}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{m.location.lastUpdated}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Status Footer */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Geofencing: 100% Di Dalam Zona Aman</span>
              </span>
              <span>Pembaruan otomatis tiap 30 detik</span>
            </div>
          </div>
        </div>

        {/* Member Device Battery & Emergency Contacts */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Status Daya Baterai Gawai</h3>

            <div className="space-y-3">
              {familyMembers.map((m) => (
                <div key={m.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-200">{m.name}</div>
                      <div className="text-[10px] text-slate-400">{m.relationship}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-400">
                    <Battery className="w-4 h-4" />
                    <span>{m.location.batteryPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>Kontak Darurat Terintegrasi</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Ambulans / RS Rujukan</div>
                  <div className="text-[10px] text-slate-400">RS Pondok Indah Kebayoran</div>
                </div>
                <span className="font-mono text-rose-400 font-bold">118 / 119</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Kepolisian Sektor</div>
                  <div className="text-[10px] text-slate-400">Polsek Kebayoran Baru</div>
                </div>
                <span className="font-mono text-indigo-400 font-bold">110</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* NEW FEATURE: Location History Log (3 Visited Locations per Member) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <History className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Log Riwayat Lokasi Dikunjungi</h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Last 3 Places
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pelacakan rekam jejak 3 lokasi terakhir yang pernah dikunjungi oleh setiap anggota keluarga beserta stempel waktu presisi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsCheckInOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 flex items-center gap-2 border border-rose-400/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Simulasi Check-In Baru</span>
            </button>
          </div>
        </div>

        {/* Member Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Anggota:</span>
          </div>

          <button
            onClick={() => setSelectedMemberFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedMemberFilter === 'all'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 border border-rose-400'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>Semua Anggota</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
              {familyMembers.length}
            </span>
          </button>

          {familyMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMemberFilter(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedMemberFilter === m.id
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 border border-rose-400 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full object-cover" />
              <span>{m.name.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400">({m.relationship})</span>
            </button>
          ))}
        </div>

        {/* Location History Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedMembers.map((member) => {
            // Retrieve history or generate default fallback of top 3 places
            const historyList: LocationHistoryLog[] = (member.locationHistory && member.locationHistory.length > 0)
              ? member.locationHistory.slice(0, 3)
              : [
                  {
                    id: `default_1_${member.id}`,
                    placeName: member.location.placeName,
                    timestamp: member.location.lastUpdated,
                    category: 'Lainnya',
                    addressDetails: 'Lokasi terkini saat ini'
                  }
                ];

            return (
              <div 
                key={member.id} 
                className="bg-slate-950 rounded-2xl border border-slate-800/80 hover:border-slate-700 p-5 space-y-4 flex flex-col justify-between transition-all shadow-md group"
              >
                {/* Member Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-500/40 group-hover:ring-rose-500 transition-all" 
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                        {member.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-medium text-rose-400">{member.relationship}</span>
                        <span>•</span>
                        <span>{member.roleTitle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-400 justify-end">
                      <Battery className="w-3.5 h-3.5" />
                      <span>{member.location.batteryPercent}%</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">GPS On</div>
                  </div>
                </div>

                {/* Timeline of Last 3 Visited Locations */}
                <div className="space-y-3 flex-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>3 Lokasi Terakhir</span>
                    <span className="text-[10px] text-rose-400/80 font-normal">Diperbarui Real-Time</span>
                  </div>

                  <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {historyList.map((item, idx) => {
                      const badgeInfo = getCategoryBadge(item.category);
                      const isLatest = idx === 0;

                      return (
                        <div key={item.id} className="relative group/item">
                          {/* Timeline Dot Indicator */}
                          <span 
                            className={`absolute -left-[17px] top-1 w-3 h-3 rounded-full border-2 border-slate-950 flex items-center justify-center ${
                              isLatest 
                                ? 'bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse' 
                                : 'bg-slate-700'
                            }`}
                          />

                          <div className={`p-3 rounded-xl border transition-all ${
                            isLatest 
                              ? 'bg-slate-900/90 border-rose-500/30 text-white shadow-sm' 
                              : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                          }`}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase tracking-tight ${
                                    isLatest 
                                      ? 'bg-rose-500 text-white' 
                                      : 'bg-slate-800 text-slate-400'
                                  }`}>
                                    {isLatest ? '#1 TERBARU' : `#${idx + 1}`}
                                  </span>

                                  <div className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-medium ${badgeInfo.bg}`}>
                                    {badgeInfo.icon}
                                    <span>{badgeInfo.label}</span>
                                  </div>
                                </div>

                                <div className="font-bold text-xs leading-snug text-slate-100 group-hover/item:text-rose-300 transition-colors truncate">
                                  {item.placeName}
                                </div>

                                {item.addressDetails && (
                                  <p className="text-[10px] text-slate-400 line-clamp-1">
                                    {item.addressDetails}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="flex items-center gap-1 text-slate-400">
                                <Clock className="w-3 h-3 text-rose-400/80" />
                                <span>{item.timestamp}</span>
                              </span>

                              {isLatest && (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[9px]">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Posisi Saat Ini</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Quick Action */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCheckInMemberId(member.id);
                      setIsCheckInOpen(true);
                    }}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-rose-400" />
                    <span>Check-In Lokasi {member.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* CHECK-IN MODAL FOR SIMULATING NEW LOCATION */}
      {isCheckInOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-white relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Simulasi Check-In Lokasi Baru</h3>
                  <p className="text-xs text-slate-400">Tambah titik lokasi visited terkini untuk riwayat keluarga</p>
                </div>
              </div>

              <button
                onClick={() => setIsCheckInOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-4 text-xs">
              
              {/* Member Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">Pilih Anggota Keluarga</label>
                <select
                  value={checkInMemberId}
                  onChange={(e) => setCheckInMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 transition-all"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.relationship} - {m.roleTitle})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-400 text-[11px] block">Rekomendasi Tempat Cepat:</label>
                <div className="flex flex-wrap gap-1.5">
                  {presetLocations.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setNewPlaceName(preset.place);
                        setNewAddressDetails(preset.address);
                        setNewCategory(preset.cat);
                      }}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/50 rounded-lg text-[11px] text-slate-300 transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      <span>{preset.place}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Place Name Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">Nama Tempat / Lokasi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Perpustakaan Nasional RI, Gambir"
                  value={newPlaceName}
                  onChange={(e) => setNewPlaceName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-all"
                />
              </div>

              {/* Address Details Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">Detail Alamat / Area Specific</label>
                <input
                  type="text"
                  placeholder="Contoh: Lantai 4 Area Baca Anak, Jl. Medan Merdeka Selatan"
                  value={newAddressDetails}
                  onChange={(e) => setNewAddressDetails(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-all"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300 block">Kategori Lokasi</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 transition-all"
                >
                  <option value="Rumah">Rumah Kediaman</option>
                  <option value="Sekolah">Sekolah / Kampus</option>
                  <option value="Kantor">Kantor / Tempat Kerja</option>
                  <option value="Les/Kursus">Les / Kursus / Studio</option>
                  <option value="Publik/Olahraga">Publik / Taman / Olahraga / Mall</option>
                  <option value="Lainnya">Lainnya / Faskes / Restoran</option>
                </select>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCheckInOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Check-In Lokasi</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

