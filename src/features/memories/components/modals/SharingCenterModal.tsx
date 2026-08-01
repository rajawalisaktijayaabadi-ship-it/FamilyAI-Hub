import React, { useState } from 'react';
import { X, Share2, QrCode, Lock, Globe, Copy, Check, ShieldCheck } from 'lucide-react';

interface SharingCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareUrl: string;
}

export const SharingCenterModal: React.FC<SharingCenterModalProps> = ({
  isOpen,
  onClose,
  title,
  shareUrl
}) => {
  const [copied, setCopied] = useState(false);
  const [visibility, setVisibility] = useState<'Family' | 'Public' | 'Passcode'>('Family');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-fuchsia-400" />
            <h3 className="font-bold text-white text-base">Sharing Center - Bagikan Kenangan</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Judul Momen:</span>
          <p className="text-sm font-bold text-white bg-slate-950 p-3 rounded-2xl border border-slate-800">{title}</p>
        </div>

        {/* Visibility Setting */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Hak Akses Bagikan:</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setVisibility('Family')}
              className={`p-2.5 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer ${
                visibility === 'Family' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Khusus Keluarga
            </button>
            <button
              onClick={() => setVisibility('Passcode')}
              className={`p-2.5 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer ${
                visibility === 'Passcode' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Lock className="w-4 h-4" /> Pin Passcode
            </button>
            <button
              onClick={() => setVisibility('Public')}
              className={`p-2.5 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 cursor-pointer ${
                visibility === 'Public' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              <Globe className="w-4 h-4" /> Publik Link
            </button>
          </div>
        </div>

        {/* Share Link Copy Field */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Tautan Bagikan:</span>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              readOnly 
              value={shareUrl} 
              className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-2xl text-xs text-slate-300 outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs rounded-2xl flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tercopy' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* QR Placeholder */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QrCode className="w-10 h-10 text-amber-400" />
            <div className="text-xs">
              <h4 className="font-bold text-white">QR Code Berbagi</h4>
              <p className="text-slate-400 text-[10px]">Pindai untuk membuka langsung di HP kerabat</p>
            </div>
          </div>
          <button 
            onClick={() => alert('QR Code disimpan!')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
          >
            Unduh QR
          </button>
        </div>

      </div>
    </div>
  );
};
