import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  CheckSquare, 
  DollarSign, 
  PartyPopper, 
  FileText, 
  HeartPulse, 
  Camera, 
  Sparkles, 
  Clock, 
  Luggage,
  Printer
} from 'lucide-react';

import { TravelDashboardTab } from './components/TravelDashboardTab';
import { TripManagementTab } from './components/TripManagementTab';
import { ItineraryBuilderTab } from './components/ItineraryBuilderTab';
import { TravelChecklistTab } from './components/TravelChecklistTab';
import { TravelBudgetTab } from './components/TravelBudgetTab';
import { FamilyEventCenterTab } from './components/FamilyEventCenterTab';
import { TravelDocumentCenterTab } from './components/TravelDocumentCenterTab';
import { TravelHealthSafetyTab } from './components/TravelHealthSafetyTab';
import { PhotoMemoriesTab } from './components/PhotoMemoriesTab';
import { TravelHistoryReportTab } from './components/TravelHistoryReportTab';

import { AITravelAssistantModal } from './components/AITravelAssistantModal';
import { TravelTripFormModal } from './components/TravelTripFormModal';
import { TravelReportsModal } from './components/TravelReportsModal';

import { TravelTrip } from '../../types/travel';

type TravelSubTab = 
  | 'dashboard' 
  | 'trips' 
  | 'itinerary' 
  | 'checklist' 
  | 'budget' 
  | 'events' 
  | 'documents' 
  | 'health_safety' 
  | 'photos' 
  | 'history';

export const TravelCenterModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<TravelSubTab>('dashboard');

  // Modals state
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [showTripModal, setShowTripModal] = useState<boolean>(false);
  const [editingTrip, setEditingTrip] = useState<TravelTrip | null>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const handleOpenEditTrip = (trip: TravelTrip) => {
    setEditingTrip(trip);
    setShowTripModal(true);
  };

  const handleOpenCreateTrip = () => {
    setEditingTrip(null);
    setShowTripModal(true);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Travel Center
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              Module 15
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3 mt-1">
            <Plane className="w-8 h-8 text-indigo-400" />
            <span>AI Travel, Vacation & Family Event Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Perencanaan liburan, mudik, acara keluarga, itinerary harian, checklist packing koper, anggaran travel, serta vault dokumen perjalanan.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => setShowAIModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>AI Travel Assistant</span>
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Laporan Travel</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800/80">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'dashboard'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveSubTab('trips')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'trips'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Daftar Trip</span>
        </button>

        <button
          onClick={() => setActiveSubTab('itinerary')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'itinerary'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Itinerary Builder</span>
        </button>

        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'checklist'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Luggage className="w-4 h-4" />
          <span>Checklist Packing</span>
        </button>

        <button
          onClick={() => setActiveSubTab('budget')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'budget'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Anggaran Travel</span>
        </button>

        <button
          onClick={() => setActiveSubTab('events')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'events'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <PartyPopper className="w-4 h-4" />
          <span>Event Center</span>
        </button>

        <button
          onClick={() => setActiveSubTab('documents')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'documents'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Dokumen Vault</span>
        </button>

        <button
          onClick={() => setActiveSubTab('health_safety')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'health_safety'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>Kesehatan & Keamanan</span>
        </button>

        <button
          onClick={() => setActiveSubTab('photos')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'photos'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Album Kenangan</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
            activeSubTab === 'history'
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Riwayat Travel</span>
        </button>
      </div>

      {/* Main Sub-Tab Active View */}
      <div>
        {activeSubTab === 'dashboard' && (
          <TravelDashboardTab
            onOpenAIModal={() => setShowAIModal(true)}
            onNavigateTab={(tab) => {
              if (tab === 'travel') setActiveSubTab('trips');
              if (tab === 'vacation') setActiveSubTab('history');
              if (tab === 'events') setActiveSubTab('events');
              if (tab === 'itinerary') setActiveSubTab('itinerary');
            }}
            onOpenTripModal={handleOpenCreateTrip}
          />
        )}

        {activeSubTab === 'trips' && (
          <TripManagementTab
            onOpenTripModal={handleOpenCreateTrip}
            onEditTripModal={handleOpenEditTrip}
          />
        )}

        {activeSubTab === 'itinerary' && <ItineraryBuilderTab />}

        {activeSubTab === 'checklist' && <TravelChecklistTab />}

        {activeSubTab === 'budget' && <TravelBudgetTab />}

        {activeSubTab === 'events' && <FamilyEventCenterTab />}

        {activeSubTab === 'documents' && <TravelDocumentCenterTab />}

        {activeSubTab === 'health_safety' && <TravelHealthSafetyTab />}

        {activeSubTab === 'photos' && <PhotoMemoriesTab />}

        {activeSubTab === 'history' && (
          <TravelHistoryReportTab
            onOpenReportModal={() => setShowReportModal(true)}
          />
        )}
      </div>

      {/* Modals */}
      <AITravelAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />

      <TravelTripFormModal
        isOpen={showTripModal}
        onClose={() => setShowTripModal(false)}
        editTrip={editingTrip}
      />

      <TravelReportsModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />

    </div>
  );
};
