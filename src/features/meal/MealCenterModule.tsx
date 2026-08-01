import React, { useState } from 'react';
import { 
  Utensils, 
  Calendar, 
  BookOpen, 
  Heart, 
  Home, 
  Sparkles, 
  BarChart3, 
  Bell, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { FamilyMember } from '../../types';
import { useMealStore } from '../../stores/useMealStore';
import { MealDashboardTab } from './components/MealDashboardTab';
import { MealPlannerTab } from './components/MealPlannerTab';
import { RecipeManagementTab } from './components/RecipeManagementTab';
import { NutritionCenterTab } from './components/NutritionCenterTab';
import { KitchenManagementTab } from './components/KitchenManagementTab';
import { AIRecommendationModal } from './components/AIRecommendationModal';
import { MealReportsModal } from './components/MealReportsModal';

interface MealCenterModuleProps {
  familyMembers?: FamilyMember[];
}

export const MealCenterModule: React.FC<MealCenterModuleProps> = ({ 
  familyMembers = [] 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planner' | 'recipes' | 'nutrition' | 'kitchen'>('dashboard');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isReportsOpen, setIsReportsOpen] = useState<boolean>(false);

  const { notifications, markNotificationRead } = useMealStore();
  const unreadNotifs = notifications.filter(n => !n.isRead);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Disclaimer Banner Required by Prompt 13 */}
      <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-200 flex items-start justify-between gap-3 shadow-md">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-300">Pernyataan Batasan Layanan Nutrisi AI: </span>
            AI Meal Planner & Nutrition Center memberikan rekomendasi menu harian, edukasi gizi seimbang, dan optimasi stok kulkas. AI bukan dokter atau ahli gizi medis dan tidak memberikan terapi gizi klinik.
          </div>
        </div>
      </div>

      {/* Main Module Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Meal Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'planner'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Meal Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'recipes'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Recipes</span>
          </button>

          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'nutrition'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Nutrition & Diets</span>
          </button>

          <button
            onClick={() => setActiveTab('kitchen')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'kitchen'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>Kitchen</span>
          </button>

        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          
          <button
            onClick={() => setIsAIOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-indigo-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Rekomendasi AI</span>
          </button>

          <button
            onClick={() => setIsReportsOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Laporan</span>
          </button>

        </div>
      </div>

      {/* Tab Render Switcher */}
      {activeTab === 'dashboard' && (
        <MealDashboardTab
          onOpenAIGenerator={() => setIsAIOpen(true)}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {activeTab === 'planner' && (
        <MealPlannerTab familyMembers={familyMembers} />
      )}

      {activeTab === 'recipes' && (
        <RecipeManagementTab />
      )}

      {activeTab === 'nutrition' && (
        <NutritionCenterTab />
      )}

      {activeTab === 'kitchen' && (
        <KitchenManagementTab />
      )}

      {/* Modals */}
      <AIRecommendationModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      <MealReportsModal
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />

    </div>
  );
};
