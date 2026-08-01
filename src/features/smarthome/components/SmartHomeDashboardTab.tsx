import { useState } from 'react';
import { 
  Home, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Camera, 
  Zap, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Clock, 
  Radio, 
  Play, 
  Wrench, 
  Sun, 
  Moon, 
  Film, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle,
  Wifi
} from 'lucide-react';
import { useDeviceStore } from '../../../stores/useDeviceStore';
import { useAutomationStore } from '../../../stores/useAutomationStore';
import { useEnergyStore } from '../../../stores/useEnergyStore';
import { useSecurityStore } from '../../../stores/useSecurityStore';
import { useSmartHomeStore } from '../../../stores/useSmartHomeStore';

interface SmartHomeDashboardTabProps {
  onOpenAIModal: () => void;
  onNavigateTab: (tab: 'devices' | 'automation' | 'energy' | 'security' | 'presence' | 'maintenance') => void;
}

export const SmartHomeDashboardTab: React.FC<SmartHomeDashboardTabProps> = ({
  onOpenAIModal,
  onNavigateTab
}) => {
  const { devices, toggleDevice } = useDeviceStore();
  const { scenes, activateScene } = useAutomationStore();
  const { usage, tariffPerKwhIdr } = useEnergyStore();
  const { isArmSystem, securityEvents, familyPresenceList, maintenances } = useSecurityStore();
  const { hubStatus, hubName, firmwareVersion, aiSmartHomeInsights } = useSmartHomeStore();

  const onlineDevicesCount = devices.filter(d => d.onlineStatus === 'Online').length;
  const activeDevicesCount = devices.filter(d => d.status).length;
  const criticalMaintenances = maintenances.filter(m => m.status === 'Mendesak').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Gateway Hub Status & Core Metrics */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                {hubName} ({firmwareVersion})
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                <Radio className="w-3 h-3" /> Gateway Online
              </span>
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight">
              Pusat Kendali Pintar & Otomasi Kediaman Keluarga
            </h2>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Memantau {devices.length} perangkat IoT, mendeteksi presensi anggota keluarga, mengoptimalkan konsumsi listrik harian, dan menjaga keamanan pintu serta CCTV secara realtime.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAIModal}
              className="px-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>AI Home Insight & Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Summary Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onNavigateTab('devices')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Perangkat Aktif</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{activeDevicesCount} <span className="text-xs font-semibold text-slate-400">/ {devices.length} Perangkat</span></div>
          <div className="text-[11px] text-indigo-300 font-medium">{onlineDevicesCount} Online • mesh OK</div>
        </div>

        <div 
          onClick={() => onNavigateTab('energy')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Konsumsi Hari Ini</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400">{usage.todayKwh} <span className="text-xs font-semibold text-slate-400">kWh</span></div>
          <div className="text-[11px] text-slate-400">Est. Rp {(usage.todayKwh * tariffPerKwhIdr).toLocaleString('id-ID')} / hari</div>
        </div>

        <div 
          onClick={() => onNavigateTab('security')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Status Keamanan</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-400">
            {isArmSystem ? 'Siaga Penuh' : 'Disarmed'}
          </div>
          <div className="text-[11px] text-slate-400">CCTV & Smart Lock Terhubung</div>
        </div>

        <div 
          onClick={() => onNavigateTab('presence')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl cursor-pointer transition-all space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Presensi Rumah</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-300">
            {familyPresenceList.filter(p => p.status === 'Di Rumah').length} <span className="text-xs font-semibold text-slate-400">Anggota</span>
          </div>
          <div className="text-[11px] text-slate-400">Ayah, Ibu & Kakek di rumah</div>
        </div>

      </div>

      {/* AI Smart Home Insight Banner Cards */}
      {aiSmartHomeInsights.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Smart Home Proactive Insights</span>
            </h3>

            <button
              onClick={onOpenAIModal}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              Tanya AI Smart Assistant →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiSmartHomeInsights.map((insight) => (
              <div 
                key={insight.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {insight.type}
                  </span>
                  <span className="text-[10px] text-slate-500">{insight.createdAt}</span>
                </div>

                <h4 className="font-bold text-white text-sm">{insight.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.message}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => alert(`Aksi '${insight.actionLabel}' telah dijalankan!`)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    {insight.actionLabel} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preset Scenes Quick Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-indigo-400" />
              <span>Skenario Otomasi Rumah (Preset Scenes)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Jalankan pengaturan multi-perangkat hanya dalam satu ketukan jari.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('automation')}
            className="text-xs font-bold text-indigo-400 hover:underline"
          >
            Kelola Otomasi →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {scenes.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                activateScene(sc.id);
                alert(`Skenario '${sc.name}' telah diaktifkan! ${sc.actionDescription}`);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                sc.isActive 
                  ? 'bg-gradient-to-b from-indigo-900/60 to-slate-900 border-indigo-500 text-white shadow-lg' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="font-bold text-xs text-white mb-1 flex items-center gap-1.5">
                {sc.name === 'Good Morning' && <Sun className="w-4 h-4 text-amber-400" />}
                {sc.name === 'Good Night' && <Moon className="w-4 h-4 text-indigo-400" />}
                {sc.name === 'Movie Time' && <Film className="w-4 h-4 text-purple-400" />}
                {sc.name === 'Away Mode' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                {sc.name}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-2">{sc.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Devices Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Kontrol Perangkat Utama</span>
          </h3>

          <button
            onClick={() => onNavigateTab('devices')}
            className="text-xs font-bold text-indigo-400 hover:underline"
          >
            Lihat Semua Perangkat ({devices.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {devices.slice(0, 6).map((dev) => (
            <div
              key={dev.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                dev.status 
                  ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border-indigo-500/40 text-white' 
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{dev.room} • {dev.category}</span>
                <h4 className="font-bold text-sm text-white">{dev.name}</h4>
                <span className="text-xs text-indigo-300">
                  {dev.status ? (dev.value ? `${dev.value} ${dev.unit || ''}` : 'AKTIF') : 'MATI'}
                </span>
              </div>

              <button
                onClick={() => toggleDevice(dev.id)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                  dev.status ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  dev.status ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
