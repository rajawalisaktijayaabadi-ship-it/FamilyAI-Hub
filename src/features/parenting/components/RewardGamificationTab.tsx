import React, { useState } from 'react';
import { 
  Award, 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Trophy, 
  Gift, 
  CheckCircle2, 
  BookMarked, 
  HeartHandshake, 
  Palette,
  Flame
} from 'lucide-react';
import { Child, ChildRewardSystem } from '../types';

interface RewardGamificationTabProps {
  child: Child;
  rewardSystem?: ChildRewardSystem;
}

export const RewardGamificationTab: React.FC<RewardGamificationTabProps> = ({
  child,
  rewardSystem
}) => {
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const defaultBadges = [
    { id: 'b1', name: 'Rajin Membaca', desc: 'Membaca 7 hari berturut-turut tanpa terputus.', icon: BookMarked, category: 'Literasi' },
    { id: 'b2', name: 'Anak Disiplin', desc: 'Menyelesaikan seluruh tugas harian tepat waktu.', icon: ShieldCheck, category: 'Karakter' },
    { id: 'b3', name: 'Bintang Matematika', desc: 'Mencapai target belajar matematika 10 sesi.', icon: Award, category: 'Akademik' },
    { id: 'b4', name: 'Juara Kebersihan', desc: 'Merapikan kamar & meja belajar setiap hari.', icon: Sparkles, category: 'Kemandirian' },
    { id: 'b5', name: 'Family Helper', desc: 'Membantu pekerjaan rumah tangga ringan.', icon: HeartHandshake, category: 'Sosial' }
  ];

  const redeemableFamilyRewards = [
    { id: 'r1', title: 'Tambahan 30 Menit Main Game / Gadget', cost: 100, icon: Gift },
    { id: 'r2', title: 'Pilih Menu Makan Malam Favorit Keluarga', cost: 150, icon: Gift },
    { id: 'r3', title: 'Pilih Film Bioskop / Streaming Akhir Pekan', cost: 200, icon: Gift },
    { id: 'r4', title: 'Beli Buku Komik / Ensiklopedia Baru', cost: 300, icon: Gift }
  ];

  const totalPoints = rewardSystem?.totalPoints || 480;
  const coins = rewardSystem?.coins || 120;
  const level = rewardSystem?.level || 5;

  const handleRedeem = (rewardId: string, cost: number) => {
    if (coins < cost) return;
    setRedeemedRewards([...redeemedRewards, rewardId]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-r from-amber-950/60 via-purple-950/50 to-slate-900 border border-amber-500/30 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold">Sistem Reward & Gamifikasi {child.name}</h2>
          </div>
          <p className="text-xs text-slate-300">
            Apresiasi setiap usaha & kedisiplinan anak melalui poin, koin, level, serta lencana keberhasilan!
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-amber-500/30 shrink-0">
          <div className="text-center px-3 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Poin</span>
            <span className="text-2xl font-black text-amber-400">{totalPoints}</span>
          </div>

          <div className="text-center px-3 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Koin Hadiah</span>
            <span className="text-2xl font-black text-purple-400">{coins}</span>
          </div>

          <div className="text-center px-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Level</span>
            <span className="text-xl font-bold text-pink-300">Lvl {level}</span>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Lencana Pencapaian (Badges Showcase)</h3>
          </div>
          <span className="text-xs text-amber-300 font-bold">5 / 5 Badges Terbuka</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultBadges.map((badge) => {
            const IconComp = badge.icon;
            return (
              <div key={badge.id} className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Terbuka
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Family Reward Exchange */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-pink-400" />
          <h3 className="text-base font-bold text-white">Tukar Koin dengan Reward Keluarga</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {redeemableFamilyRewards.map((reward) => {
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canAfford = coins >= reward.cost;

            return (
              <div key={reward.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{reward.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{reward.cost} Koin</span>
                  </div>
                </div>

                <button
                  disabled={isRedeemed || !canAfford}
                  onClick={() => handleRedeem(reward.id, reward.cost)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isRedeemed
                      ? 'bg-slate-800 text-slate-500'
                      : canAfford
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-400 opacity-60'
                  }`}
                >
                  {isRedeemed ? 'Sudah Ditukar' : 'Tukar Koin'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
