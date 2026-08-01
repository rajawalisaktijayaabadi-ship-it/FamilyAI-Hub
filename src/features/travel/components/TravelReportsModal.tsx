import React from 'react';
import { X, Printer, Plane, Calendar, DollarSign, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { useTravelStore } from '../../../stores/useTravelStore';

interface TravelReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TravelReportsModal: React.FC<TravelReportsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { trips, activeTripId, itineraries, budgets, checklists } = useTravelStore();

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const activeItineraries = itineraries.filter(i => i.tripId === activeTrip?.id);
  const activeBudgets = budgets.filter(b => b.tripId === activeTrip?.id);
  const activeChecklists = checklists.filter(c => c.tripId === activeTrip?.id);

  if (!isOpen) return null;

  const totalEstBudget = activeBudgets.reduce((acc, b) => acc + b.estimatedCostIdr, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="font-extrabold text-white text-base">Pratinjau Laporan Ringkasan Perjalanan</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-200 text-xs bg-slate-950">
          
          {/* Document Header */}
          <div className="text-center border-b border-slate-800 pb-6 space-y-2">
            <h1 className="text-2xl font-black text-white uppercase tracking-wider">FamilyAI Hub - Travel & Vacation Summary</h1>
            <p className="text-slate-400 text-xs">Laporan Ringkasan Rencana Perjalanan, Itinerary & Anggaran Perjalanan Keluarga</p>
            <div className="text-[11px] text-amber-400 font-mono font-bold">Dicetak Tanggal: {new Date().toLocaleDateString('id-ID')}</div>
          </div>

          {/* Active Trip Info */}
          {activeTrip && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-400 uppercase">{activeTrip.category}</span>
                <span className="text-xs font-bold text-emerald-400">Status: {activeTrip.status}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{activeTrip.name}</h2>
              <p className="text-slate-300">{activeTrip.notes}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-400 pt-2 border-t border-slate-800">
                <div>Tujuan: <strong className="text-white">{activeTrip.city}, {activeTrip.country}</strong></div>
                <div>Tanggal: <strong className="text-white">{activeTrip.startDate} - {activeTrip.endDate}</strong></div>
                <div>Durasi: <strong className="text-white">{activeTrip.durationDays} Hari</strong></div>
              </div>
            </div>
          )}

          {/* Itinerary Summary */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">1. Ringkasan Agenda & Itinerary</h3>
            <div className="space-y-2">
              {activeItineraries.map((itin) => (
                <div key={itin.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-amber-400">Hari ke-{itin.dayNumber} ({itin.time}): </span>
                    <span className="text-white font-semibold">{itin.activity}</span>
                    <span className="text-slate-400 block text-[11px]">Lokasi: {itin.location}</span>
                  </div>
                  {itin.estimatedCostIdr ? (
                    <span className="font-bold text-emerald-400">Rp {itin.estimatedCostIdr.toLocaleString('id-ID')}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Budget Summary */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">2. Ringkasan Anggaran Perjalanan</h3>
            <div className="space-y-2">
              {activeBudgets.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-white">{b.category}</span>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">Est: Rp {b.estimatedCostIdr.toLocaleString('id-ID')}</span>
                    <span className="text-slate-400 text-[10px]">Real: Rp {b.actualCostIdr.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex justify-between items-center font-bold text-sm text-white">
                <span>Total Estimasi Anggaran:</span>
                <span className="text-emerald-400">Rp {totalEstBudget.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Checklist Summary */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">3. Status Ringkasan Packing Barang</h3>
            <p className="text-slate-400">
              Total {activeChecklists.length} perlengkapan terekam dalam koper keluarga ({activeChecklists.filter(c => c.isPacked).length} terkemas).
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px]">
            FamilyAI Hub — AI Travel, Vacation & Family Event Center Document.
          </div>

        </div>

      </div>
    </div>
  );
};
