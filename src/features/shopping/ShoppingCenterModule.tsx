import React, { useState } from 'react';
import {
  ShoppingCart,
  Package,
  Home,
  Sparkles,
  AlertTriangle,
  Clock,
  TrendingUp,
  Store,
  Calendar as CalendarIcon,
  CheckSquare,
  FileText,
  DollarSign,
  Plus,
  ShieldCheck,
  Search,
  Filter,
  BarChart3,
  Bell
} from 'lucide-react';

import { ShoppingDashboard } from './components/ShoppingDashboard';
import { ShoppingListManager } from './components/ShoppingListManager';
import { SmartInventoryManager } from './components/SmartInventoryManager';
import { LowStockExpirationTracker } from './components/LowStockExpirationTracker';
import { HouseholdManager } from './components/HouseholdManager';
import { HomeAssetRegister } from './components/HomeAssetRegister';
import { HouseholdTaskManager } from './components/HouseholdTaskManager';
import { AIShoppingInsights } from './components/AIShoppingInsights';
import { FavoriteStoresManager } from './components/FavoriteStoresManager';
import { ShoppingReportsView } from './components/ShoppingReportsView';

import { FamilyMember } from '../../types';
import { useShoppingStore } from '../../store/useShoppingStore';
import { useInventoryStore } from '../../store/useInventoryStore';
import { useHouseholdStore } from '../../store/useHouseholdStore';

interface ShoppingCenterModuleProps {
  familyMembers?: FamilyMember[];
}

export const ShoppingCenterModule: React.FC<ShoppingCenterModuleProps> = ({
  familyMembers = []
}) => {
  // Main Sections: 'shopping' | 'inventory' | 'household'
  const [mainSection, setMainSection] = useState<'shopping' | 'inventory' | 'household'>('shopping');

  // Sub Tabs per Section
  const [shoppingSubTab, setShoppingSubTab] = useState<'dashboard' | 'list' | 'ai_insight' | 'stores' | 'reports'>('dashboard');
  const [inventorySubTab, setInventorySubTab] = useState<'all' | 'low_stock' | 'expiration' | 'locations'>('all');
  const [householdSubTab, setHouseholdSubTab] = useState<'assets' | 'tasks' | 'rooms' | 'warranties'>('assets');

  // Stores
  const { notifications, getPendingItemsCount } = useShoppingStore();
  const { getLowStockItems, getOutOfStockItems, getNearExpirationItems, getExpiredItems } = useInventoryStore();
  const { getPendingTasksCount, getExpiringWarranties } = useHouseholdStore();

  const lowStockCount = getLowStockItems().length + getOutOfStockItems().length;
  const expNoticeCount = getNearExpirationItems().length + getExpiredItems().length;
  const pendingTasksCount = getPendingTasksCount();
  const expiringWarrantiesCount = getExpiringWarranties().length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-slate-800 p-6 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Household & AI Shopping Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Belanja & Inventaris Rumah Tangga
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Pusat kelola kebutuhan dapur, stok barang, pengawasan kedaluwarsa, registrasi aset elektronik, dan rekomendasi belanja cerdas keluarga.
            </p>
          </div>

          {/* Quick Badges Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">Daftar Belanja Pending</div>
              <div className="text-lg font-bold text-amber-400">{getPendingItemsCount()} Item</div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400">Stok Kritis / Habis</div>
              <div className="text-lg font-bold text-rose-400">{lowStockCount} Item</div>
            </div>

            <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400">Peringatan Kedaluwarsa</div>
              <div className="text-lg font-bold text-orange-400">{expNoticeCount} Item</div>
            </div>
          </div>
        </div>

        {/* Main Section Navigation Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setMainSection('shopping')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              mainSection === 'shopping'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>1. Shopping Center (Belanja)</span>
          </button>

          <button
            onClick={() => setMainSection('inventory')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              mainSection === 'inventory'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>2. Smart Inventory (Stok Barang)</span>
            {lowStockCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                {lowStockCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMainSection('household')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              mainSection === 'household'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>3. Household & Assets (Rumah Tangga)</span>
            {pendingTasksCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black">
                {pendingTasksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 1: SHOPPING */}
      {mainSection === 'shopping' && (
        <div className="space-y-6">
          {/* Sub Navigation Bar for Shopping */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
            <button
              onClick={() => setShoppingSubTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                shoppingSubTab === 'dashboard'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Dashboard Belanja</span>
            </button>

            <button
              onClick={() => setShoppingSubTab('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                shoppingSubTab === 'list'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Daftar Belanja (Shopping List)</span>
            </button>

            <button
              onClick={() => setShoppingSubTab('ai_insight')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                shoppingSubTab === 'ai_insight'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Insight & Rekomendasi</span>
            </button>

            <button
              onClick={() => setShoppingSubTab('stores')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                shoppingSubTab === 'stores'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Toko Favorit & Riwayat Harga</span>
            </button>

            <button
              onClick={() => setShoppingSubTab('reports')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                shoppingSubTab === 'reports'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Laporan Belanja & Anggaran</span>
            </button>
          </div>

          {/* Render Sub View */}
          {shoppingSubTab === 'dashboard' && (
            <ShoppingDashboard familyMembers={familyMembers} onNavigateList={() => setShoppingSubTab('list')} />
          )}

          {shoppingSubTab === 'list' && (
            <ShoppingListManager familyMembers={familyMembers} />
          )}

          {shoppingSubTab === 'ai_insight' && (
            <AIShoppingInsights familyMembers={familyMembers} />
          )}

          {shoppingSubTab === 'stores' && (
            <FavoriteStoresManager />
          )}

          {shoppingSubTab === 'reports' && (
            <ShoppingReportsView />
          )}
        </div>
      )}

      {/* SECTION 2: SMART INVENTORY */}
      {mainSection === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setInventorySubTab('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  inventorySubTab === 'all'
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Seluruh Stok Inventaris</span>
              </button>

              <button
                onClick={() => setInventorySubTab('low_stock')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  inventorySubTab === 'low_stock'
                    ? 'bg-slate-800 text-rose-400 border border-rose-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Low Stock Monitor</span>
                {lowStockCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px]">
                    {lowStockCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setInventorySubTab('expiration')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  inventorySubTab === 'expiration'
                    ? 'bg-slate-800 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Expiration Tracker</span>
                {expNoticeCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-300 font-bold text-[10px]">
                    {expNoticeCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {inventorySubTab === 'all' && (
            <SmartInventoryManager familyMembers={familyMembers} />
          )}

          {(inventorySubTab === 'low_stock' || inventorySubTab === 'expiration') && (
            <LowStockExpirationTracker defaultTab={inventorySubTab} />
          )}
        </div>
      )}

      {/* SECTION 3: HOUSEHOLD & ASSETS */}
      {mainSection === 'household' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setHouseholdSubTab('assets')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  householdSubTab === 'assets'
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Register Aset Rumah</span>
              </button>

              <button
                onClick={() => setHouseholdSubTab('tasks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  householdSubTab === 'tasks'
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tugas Rumah Tangga (Household Tasks)</span>
                {pendingTasksCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                    {pendingTasksCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {householdSubTab === 'assets' && (
            <HomeAssetRegister />
          )}

          {householdSubTab === 'tasks' && (
            <HouseholdTaskManager familyMembers={familyMembers} />
          )}
        </div>
      )}

    </div>
  );
};
