import React, { useState } from 'react';
import { 
  Home, 
  Lightbulb, 
  Layers, 
  Play, 
  Zap, 
  ShieldCheck, 
  Users, 
  Wrench, 
  Sparkles, 
  FileText, 
  Bell, 
  Radio
} from 'lucide-react';

import { SmartHomeDashboardTab } from './components/SmartHomeDashboardTab';
import { DeviceManagementTab } from './components/DeviceManagementTab';
import { RoomManagementTab } from './components/RoomManagementTab';
import { AutomationCenterTab } from './components/AutomationCenterTab';
import { EnergyManagementTab } from './components/EnergyManagementTab';
import { HomeSecurityTab } from './components/HomeSecurityTab';
import { FamilyPresenceTab } from './components/FamilyPresenceTab';
import { MaintenanceTab } from './components/MaintenanceTab';
import { AISmartHomeModal } from './components/AISmartHomeModal';
import { SmartHomeReportsModal } from './components/SmartHomeReportsModal';

import { useSecurityStore } from '../../stores/useSecurityStore';

export type SmartHomeTab = 'dashboard' | 'devices' | 'rooms' | 'automation' | 'energy' | 'security' | 'presence' | 'maintenance';

export const SmartHomeCenterModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SmartHomeTab>('dashboard');
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState<boolean>(false);

  const { notifications, markNotificationRead } = useSecurityStore();
  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" /> AI Smart Home & IoT Hub
            </span>
            <span className="text-xs text-slate-500 font-mono">v4.18.0</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pusat Otomasi, IoT & Keamanan Rumah Pintar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Pusat manajemen terpadu perangkat pintar, pengawasan keamanan realtime, efisiensi listrik, dan otomasi keluarga.
          </p>
        </div>

        {/* Quick Action Top Bar */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsReportsModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Laporan Rumah</span>
          </button>

          <button
            onClick={() => setIsAIModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>AI Voice & Insights</span>
          </button>
        </div>
      </div>

      {/* Main Feature Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-slate-800/80">
        
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Dashboard Status</span>
        </button>

        <button
          onClick={() => setActiveTab('devices')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'devices'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Perangkat IoT</span>
        </button>

        <button
          onClick={() => setActiveTab('rooms')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'rooms'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Zona Ruangan</span>
        </button>

        <button
          onClick={() => setActiveTab('automation')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'automation'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Otomasi & Rule Builder</span>
        </button>

        <button
          onClick={() => setActiveTab('energy')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'energy'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-black'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Efisiensi Listrik</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'security'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Keamanan & CCTV</span>
        </button>

        <button
          onClick={() => setActiveTab('presence')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'presence'
              ? 'bg-purple-600 text-white border-purple-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Presensi Anggota</span>
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeTab === 'maintenance'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Perawatan Perangkat</span>
        </button>

      </div>

      {/* Render Selected Feature Tab */}
      <div className="pt-2">
        {activeTab === 'dashboard' && (
          <SmartHomeDashboardTab
            onOpenAIModal={() => setIsAIModalOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'devices' && <DeviceManagementTab />}
        {activeTab === 'rooms' && <RoomManagementTab />}
        {activeTab === 'automation' && <AutomationCenterTab />}
        {activeTab === 'energy' && <EnergyManagementTab />}
        {activeTab === 'security' && <HomeSecurityTab />}
        {activeTab === 'presence' && <FamilyPresenceTab />}
        {activeTab === 'maintenance' && <MaintenanceTab />}
      </div>

      {/* Modals */}
      <AISmartHomeModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      <SmartHomeReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
      />

    </div>
  );
};
