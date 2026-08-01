import { create } from 'zustand';
import { EnergyUsage } from '../types';

interface EnergyState {
  usage: EnergyUsage;
  tariffPerKwhIdr: number;
  updateUsage: (newUsage: Partial<EnergyUsage>) => void;
}

const initialEnergy: EnergyUsage = {
  id: 'eng-1',
  date: new Date().toISOString().split('T')[0],
  todayKwh: 18.4,
  weeklyKwh: 124.5,
  monthlyKwh: 512.0,
  estimatedCostIdr: 768000, // Rp 768.000 / month approx @ Rp 1.500/kWh
  mostConsumingDevice: 'AC Split Inverter Utama (38% Total Listrik)',
  energySavingPercentage: 14.2
};

export const useEnergyStore = create<EnergyState>((set) => ({
  usage: initialEnergy,
  tariffPerKwhIdr: 1500, // Rp 1.500 per kWh standard PLN 2200VA

  updateUsage: (newUsage: Partial<EnergyUsage>) => set((state) => ({
    usage: { ...state.usage, ...newUsage }
  }))
}));
