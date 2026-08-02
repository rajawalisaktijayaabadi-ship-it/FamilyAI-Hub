import React, { useState, useEffect } from 'react';
import { 
  X, Calendar as CalendarIcon, Clock, MapPin, Tag, User, AlertCircle, 
  Paperclip, Trash2, Repeat, Bell, Check, Plus, Shield
} from 'lucide-react';
import { CalendarEvent, EventCategory, EventPriority, ReminderOption, RepeatRule, CalendarScope } from '../types/calendarTypes';
import { useCalendarStore } from '../stores/useCalendarStore';
import { useFamilyStore } from '../../../store/useFamilyStore';

export const EventFormModal: React.FC = () => {
  const { isEventModalOpen, editingEvent, selectedDate, closeEventModal, addEvent, updateEvent, deleteEvent, categories } = useCalendarStore();
  const { familyMembers } = useFamilyStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventCategory>('Keluarga');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [color, setColor] = useState('#6366f1');
  const [priority, setPriority] = useState<EventPriority>('medium');
  const [reminder, setReminder] = useState<ReminderOption>('30m');
  const [repeat, setRepeat] = useState<RepeatRule>('Never');
  const [assignedMemberIds, setAssignedMemberIds] = useState<string[]>(['u-1']);
  const [assignedRoleCategory, setAssignedRoleCategory] = useState<CalendarScope>('family');
  const [attachments, setAttachments] = useState<{ id: string; name: string; url: string; type: string }[]>([]);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      setCategory(editingEvent.category);
      setLocation(editingEvent.location);
      setStartDate(editingEvent.startDate);
      setEndDate(editingEvent.endDate);
      setStartTime(editingEvent.startTime);
      setEndTime(editingEvent.endTime);
      setColor(editingEvent.color);
      setPriority(editingEvent.priority);
      setReminder(editingEvent.reminder);
      setRepeat(editingEvent.repeat);
      setAssignedMemberIds(editingEvent.assignedMemberIds || []);
      setAssignedRoleCategory(editingEvent.assignedRoleCategory || 'family');
      setAttachments(editingEvent.attachments || []);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Keluarga');
      setLocation('');
      setStartDate(selectedDate);
      setEndDate(selectedDate);
      setStartTime('09:00');
      setEndTime('10:00');
      setColor('#6366f1');
      setPriority('medium');
      setReminder('30m');
      setRepeat('Never');
      setAssignedMemberIds(['u-1', 'u-2']);
      setAssignedRoleCategory('family');
      setAttachments([]);
    }
  }, [editingEvent, selectedDate, isEventModalOpen]);

  if (!isEventModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const eventPayload = {
      title,
      description,
      category,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      color,
      priority,
      reminder,
      repeat,
      attachments,
      createdBy: 'u-1', // Default current user
      assignedMemberIds,
      assignedRoleCategory,
      status: 'scheduled' as const,
      sourceModule: editingEvent?.sourceModule || ('Manual' as const)
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventPayload);
    } else {
      addEvent(eventPayload);
    }
  };

  const handleToggleMember = (memberId: string) => {
    if (assignedMemberIds.includes(memberId)) {
      setAssignedMemberIds(assignedMemberIds.filter(id => id !== memberId));
    } else {
      setAssignedMemberIds([...assignedMemberIds, memberId]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachments([
        ...attachments,
        {
          id: `att-${Date.now()}`,
          name: file.name,
          url: '#',
          type: file.type || 'application/file'
        }
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {editingEvent ? 'Edit Agenda Keluarga' : 'Tambah Agenda Baru'}
              </h3>
              <p className="text-xs text-slate-400">Atur jadwal, pengingat, dan penugasan anggota keluarga</p>
            </div>
          </div>
          <button 
            onClick={closeEventModal}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-slate-200 text-sm">
          {/* Judul & Kategori */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Judul Agenda *</label>
              <input
                type="text"
                required
                placeholder="mis. Meeting Strategi Kantor / Pentas Seni Budi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" /> Kategori Kegiatan
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EventCategory)}
                  className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" /> Prioritas
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as EventPriority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                        priority === p
                          ? p === 'high'
                            ? 'bg-rose-500/30 text-rose-300 border-rose-500/60 ring-1 ring-rose-500'
                            : p === 'medium'
                            ? 'bg-amber-500/30 text-amber-300 border-amber-500/60 ring-1 ring-amber-500'
                            : 'bg-emerald-500/30 text-emerald-300 border-emerald-500/60 ring-1 ring-emerald-500'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p === 'high' ? 'Tinggi' : p === 'medium' ? 'Sedang' : 'Rendah'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tanggal & Waktu */}
          <div className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" /> Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (e.target.value > endDate) setEndDate(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" /> Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> Jam Mulai
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> Jam Selesai
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Lokasi & Deskripsi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Lokasi / Tempat
              </label>
              <input
                type="text"
                placeholder="mis. Aula Sekolah / Zoom / Ruang Tamu"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" /> Pengingat & Pengulangan
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value as ReminderOption)}
                  className="w-full px-2.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="none">Tanpa Pengingat</option>
                  <option value="5m">5 Menit Sebelum</option>
                  <option value="15m">15 Menit Sebelum</option>
                  <option value="30m">30 Menit Sebelum</option>
                  <option value="1h">1 Jam Sebelum</option>
                  <option value="1d">1 Hari Sebelum</option>
                </select>

                <select
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value as RepeatRule)}
                  className="w-full px-2.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Never">Tidak Diulang</option>
                  <option value="Daily">Setiap Hari</option>
                  <option value="Weekly">Setiap Minggu</option>
                  <option value="Monthly">Setiap Bulan</option>
                  <option value="Yearly">Setiap Tahun</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Deskripsi / Catatan Tambahan</label>
            <textarea
              rows={2}
              placeholder="Catatan khusus, perlengkapan yang harus dibawa, atau instruksi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Penugasan Anggota Keluarga */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" /> Tugaskan Anggota Keluarga
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {familyMembers.map((member) => {
                const isSelected = assignedMemberIds.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleToggleMember(member.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500/60 text-white ring-1 ring-indigo-500'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="truncate">{member.name.split(' ')[0]}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Lampiran */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-teal-400" /> Lampiran File / Dokumen
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Upload File
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
              {attachments.map(att => (
                <span key={att.id} className="text-xs text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-lg border border-indigo-500/30 flex items-center gap-1">
                  {att.name}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {editingEvent ? (
              <button
                type="button"
                onClick={() => deleteEvent(editingEvent.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 rounded-xl text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Hapus
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeEventModal}
                className="px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                {editingEvent ? 'Simpan Perubahan' : 'Tambah Agenda'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
