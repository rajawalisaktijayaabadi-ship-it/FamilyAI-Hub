import React, { useState } from 'react';
import { 
  Tv, 
  Plus, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Gamepad2, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Save 
} from 'lucide-react';
import { Child, ScreenTimeRecord } from '../types';

interface ScreenTimeTabProps {
  child: Child;
  screenTimeRecords: ScreenTimeRecord[];
  onAddScreenTimeRecord: (record: Omit<ScreenTimeRecord, 'id'>) => void;
}

export const ScreenTimeTab: React.FC<ScreenTimeTabProps> = ({
  child,
  screenTimeRecords,
  onAddScreenTimeRecord
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [activityType, setActivityType] = useState<ScreenTimeRecord['activityType']>('Edukasi');
  const [device, setDevice] = useState<ScreenTimeRecord['device']>('Tablet');
  const [startTime, setStartTime] = useState('15:00');
  const [endTime, setEndTime] = useState('15:45');

  const childRecords = screenTimeRecords.filter((s) => s.childId === child.id);
  const totalMinsToday = childRecords.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const getDeviceIcon = (dev: ScreenTimeRecord['device']) => {
    switch (dev) {
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-pink-400" />;
      case 'Tablet':
        return <Tablet className="w-4 h-4 text-purple-400" />;
      case 'Laptop/PC':
        return <Laptop className="w-4 h-4 text-indigo-400" />;
      case 'Smart TV':
        return <Tv className="w-4 h-4 text-amber-400" />;
      case 'Konsol Game':
      default:
        return <Gamepad2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  const handleSaveScreenTime = (e: React.FormEvent) => {
    e.preventDefault();

    let dummyRec = '';
    if (activityType === 'Edukasi') {
      dummyRec = 'Aktivitas edukatif berdurasi ' + durationMinutes + ' menit sangat disarankan. Pastikan pencahayaan ruangan cukup terang.';
    } else if (activityType === 'Game') {
      dummyRec = 'Game santai. Disarankan rehat mata 15 menit dan lakukan peregangan badan setelah bermain.';
    } else {
      dummyRec = 'Penggunaan gadget sesuai kesepakatan keluarga. Imbangi dengan aktivitas fisik outdoor.';
    }

    onAddScreenTimeRecord({
      childId: child.id,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Number(durationMinutes),
      activityType,
      device,
      startTime,
      endTime,
      aiRecommendation: dummyRec
    });

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-pink-400" />
            <span>Manajemen & Monitoring Screen Time Sehat</span>
          </h2>
          <p className="text-xs text-slate-400">
            Catat durasi, perangkat, & dapatkan AI Recommendation untuk membiasakan penggunaan gadget yang seimbang.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Screen Time</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Durasi Layar Hari Ini</span>
          <div className="text-2xl font-black text-white">{totalMinsToday} <span className="text-xs font-normal text-slate-400">Menit</span></div>
          <span className="text-[10px] text-pink-400 font-semibold block">Batas Rekomendasi Usia {child.age} th: 60 Menit</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Status Screen Time</span>
          <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{totalMinsToday <= 60 ? 'Terkontrol & Sehat' : 'Mendekati Batas Maksimal'}</span>
          </div>
          <span className="text-[10px] text-slate-400 block">AI Rule: 20-20-20 Eye Rest Rule</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Saran Aktivitas Pengganti</span>
          <p className="text-xs text-slate-200 font-semibold">Bersepeda outdoor, membaca komik sains, atau lego robotics.</p>
        </div>
      </div>

      {/* Screen Time Logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
          Riwayat Penggunaan Gadget {child.name}
        </h3>

        {childRecords.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">Belum ada catatan screen time hari ini.</p>
        ) : (
          <div className="space-y-3">
            {childRecords.map((rec) => (
              <div key={rec.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      {getDeviceIcon(rec.device)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{rec.activityType} ({rec.device})</h4>
                      <span className="text-[10px] text-slate-400">{rec.startTime} - {rec.endTime} ({rec.durationMinutes} Mnt)</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {rec.date}
                  </span>
                </div>

                {rec.aiRecommendation && (
                  <div className="bg-gradient-to-r from-purple-950/40 to-pink-950/40 p-3 rounded-xl border border-purple-500/20 flex items-start gap-2 text-xs text-purple-200">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block text-[10px] uppercase font-bold">Rekomendasi AI Parenting:</strong>
                      <p>{rec.aiRecommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Add Screen Time */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Catat Screen Time Anak</h3>

            <form onSubmit={handleSaveScreenTime} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Jenis Perangkat</label>
                <select
                  value={device}
                  onChange={(e) => setDevice(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop/PC">Laptop / PC</option>
                  <option value="Smart TV">Smart TV</option>
                  <option value="Konsol Game">Konsol Game</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Jenis Aktivitas Layar</label>
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                >
                  <option value="Edukasi">Edukasi & Koding</option>
                  <option value="Game">Bermain Game</option>
                  <option value="Video/Hiburan">Nonton Video / Film</option>
                  <option value="Media Sosial">Media Sosial / Chatting</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Jam Mulai</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-pink-600 text-white font-bold rounded-xl shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan & AI Analysis</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
