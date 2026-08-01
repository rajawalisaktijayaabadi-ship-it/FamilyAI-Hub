import React, { useState } from 'react';
import { 
  Stethoscope, Calendar, Clock, MapPin, Plus, Trash2, 
  CheckCircle2, AlertCircle, Building2, UserCheck, Bell
} from 'lucide-react';
import { useHealthStore } from '../../../store/useHealthStore';
import { FamilyMember } from '../../../types';

interface MedicalAppointmentTabProps {
  familyMembers: FamilyMember[];
  activeMemberId: string;
}

export const MedicalAppointmentTab: React.FC<MedicalAppointmentTabProps> = ({
  familyMembers,
  activeMemberId,
}) => {
  const { medicalAppointments, addAppointment, updateAppointmentStatus, deleteAppointment } = useHealthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formMemberId, setFormMemberId] = useState(activeMemberId === 'all' ? 'm1' : activeMemberId);
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('Spesialis Penyakit Dalam');
  const [hospitalClinic, setHospitalClinic] = useState('RS Medika Permata');
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('10:00');
  const [location, setLocation] = useState('Gedung Utama Lt. 2, Poli Penyakit Dalam');
  const [notes, setNotes] = useState('');

  const filteredAppts = medicalAppointments.filter((a) => activeMemberId === 'all' || a.memberId === activeMemberId);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName.trim()) return;

    addAppointment({
      memberId: formMemberId,
      doctorName: doctorName.trim(),
      specialty: specialty.trim(),
      hospitalClinic: hospitalClinic.trim(),
      date,
      time,
      location: location.trim() || hospitalClinic,
      notes: notes.trim() || undefined,
      reminderBeforeMinutes: 60,
      status: 'scheduled'
    });

    setDoctorName('');
    setNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-purple-400" />
            <span>Janji Temu Dokter & Kontrol Rumah Sakit</span>
          </h3>
          <p className="text-xs text-slate-400">
            Jadwal konsultasi medis, pemeriksaan kesehatan (MCU), dan kontrol rutin dokter spesialis.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Janji Dokter Baru</span>
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAppts.map((appt) => {
          const memberObj = familyMembers.find((m) => m.id === appt.memberId);

          return (
            <div 
              key={appt.id} 
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-4 shadow-xl transition-all relative group flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Member Header & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    {memberObj && (
                      <img src={memberObj.avatar} alt={memberObj.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-500/30" />
                    )}
                    <div>
                      <span className="font-bold text-xs text-white block">{memberObj?.name}</span>
                      <span className="text-[10px] text-slate-400">{memberObj?.relationship}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                      appt.status === 'scheduled' 
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                        : appt.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {appt.status === 'scheduled' ? 'Terjadwal' : appt.status === 'completed' ? 'Selesai' : 'Batal'}
                    </span>

                    <button
                      onClick={() => deleteAppointment(appt.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Doctor & Clinic Info */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mt-0.5">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-white leading-tight">{appt.doctorName}</h4>
                      <p className="text-xs text-purple-300 font-medium">{appt.specialty}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-200 font-bold">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>{appt.hospitalClinic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{appt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Date & Time Badge */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Calendar className="w-4 h-4" />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400 font-mono">
                    <Clock className="w-4 h-4" />
                    <span>Jam {appt.time} WIB</span>
                  </div>
                </div>

                {appt.notes && (
                  <p className="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                    "{appt.notes}"
                  </p>
                )}

              </div>

              {/* Bottom Actions */}
              {appt.status === 'scheduled' && (
                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => updateAppointmentStatus(appt.id, 'completed')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-xs flex items-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tandai Selesai Kontrol</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Add Appointment */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-400" />
                <span>Buat Janji Dokter Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-xs">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Pasien / Anggota Keluarga</label>
                <select
                  value={formMemberId}
                  onChange={(e) => setFormMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.relationship})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Dokter</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: dr. Hendra Wijaya, Sp.PD"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Spesialisasi</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Rumah Sakit / Klinik</label>
                <input
                  type="text"
                  value={hospitalClinic}
                  onChange={(e) => setHospitalClinic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Jam Konsultasi</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Detail Lokasi / Gedung / Ruangan</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Catatan Persiapan / Instruksi Dokter</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Contoh: Puasa 10 jam sebelum cek laboratorium darah"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Janji Temu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
