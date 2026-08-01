import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Lightbulb, 
  PieChart, 
  Award, 
  ArrowDownRight, 
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { useEnergyStore } from '../../../stores/useEnergyStore';
import { useDeviceStore } from '../../../stores/useDeviceStore';

export const EnergyManagementTab: React.FC = () => {
  const { usage, tariffPerKwhIdr, updateUsage } = useEnergyStore();
  const { devices } = useDeviceStore();

  const [tariffInput, setTariffInput] = useState<number>(tariffPerKwhIdr);

  // Calculate top power consuming devices
  const sortedByWatts = [...devices].sort((a, b) => b.powerConsumptionWatts - a.powerConsumptionWatts);
  const totalWattsSum = devices.reduce((sum, d) => sum + (d.status ? d.powerConsumptionWatts : 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Pusat Efisiensi Energi & Estimasi Tagihan Listrik</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Analisis penggunaan daya PLN (kWh), estimasi Rupiah bulanan, dan audit perangkat paling boros.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2 text-xs">
          <span className="text-slate-400">Tarif PLN / kWh:</span>
          <span className="font-bold text-amber-400 font-mono">Rp {tariffPerKwhIdr.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* KPI Energy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <span className="text-xs text-slate-400 block">Konsumsi Hari Ini</span>
          <div className="text-2xl font-black text-amber-400">{usage.todayKwh} <span className="text-xs font-normal text-slate-400">kWh</span></div>
          <div className="text-[11px] text-slate-400">Est. Rp {(usage.todayKwh * tariffPerKwhIdr).toLocaleString('id-ID')}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <span className="text-xs text-slate-400 block">Konsumsi Mingguan</span>
          <div className="text-2xl font-black text-amber-300">{usage.weeklyKwh} <span className="text-xs font-normal text-slate-400">kWh</span></div>
          <div className="text-[11px] text-slate-400">Est. Rp {(usage.weeklyKwh * tariffPerKwhIdr).toLocaleString('id-ID')}</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <span className="text-xs text-slate-400 block">Proyeksi Bulanan</span>
          <div className="text-2xl font-black text-emerald-400">{usage.monthlyKwh} <span className="text-xs font-normal text-slate-400">kWh</span></div>
          <div className="text-[11px] text-emerald-300 font-bold">Rp {usage.estimatedCostIdr.toLocaleString('id-ID')} / bln</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2">
          <span className="text-xs text-slate-400 block">Suhu & Beban Realtime</span>
          <div className="text-2xl font-black text-cyan-400">{totalWattsSum} <span className="text-xs font-normal text-slate-400">Watt</span></div>
          <div className="text-[11px] text-cyan-300 font-medium">Beban Listrik Saat Ini</div>
        </div>

      </div>

      {/* AI Saving Suggestions & Device Energy Consumption List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Power Hungry Devices Audit */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-400" />
              <span>Audit Konsumsi Daya Per Perangkat</span>
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Daya Nominal (Watt)</span>
          </div>

          <div className="space-y-3">
            {sortedByWatts.map((dev) => {
              const percentage = Math.min(100, Math.round((dev.powerConsumptionWatts / 1000) * 100));

              return (
                <div key={dev.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{dev.name}</span>
                      <span className="text-[10px] text-slate-400">{dev.room} • {dev.category}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-amber-400 block">{dev.powerConsumptionWatts} W</span>
                      <span className={`text-[10px] font-bold ${dev.status ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {dev.status ? 'Menyala' : 'Standby/Off'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Energy Optimization Tips */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Home Energy Savings Recommendations</span>
          </h4>

          <div className="space-y-3 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ArrowDownRight className="w-4 h-4" />
                <span>Atur Suhu AC Ideal ke 24°C - 25°C</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Menurunkan suhu AC dari 18°C ke 24°C menghemat hingga 22% penggunaan listrik bulanan tanpa mengurangi kenyamanan tidur.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>Gunakan Otomasi Matikan Lampu Saat Malam</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Aturan otomasi 'Malam Otomatis' memastikan lampu ruang tamu dan halaman mati otomatis pukul 23:00 WIB.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Award className="w-4 h-4" />
                <span>Pencapaian Hemat Energi Bulan Ini</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Keluarga Anda telah menghemat <strong className="text-white">{usage.energySavingPercentage}% kWh</strong> dibanding bulan lalu!
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
