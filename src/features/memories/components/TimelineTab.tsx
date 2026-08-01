import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Calendar, 
  MapPin, 
  Award, 
  Heart, 
  Baby, 
  GraduationCap, 
  Home, 
  Plane, 
  PartyPopper,
  User,
  Trash2
} from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { TimelineEventType } from '../../../types/memories';

interface TimelineTabProps {
  onOpenAddEventModal: () => void;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({ onOpenAddEventModal }) => {
  const { timelines, deleteTimelineEvent } = useMemoryStore();

  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
      case 'Kelahiran': return <Baby className="w-5 h-5 text-rose-400" />;
      case 'Pernikahan': return <Heart className="w-5 h-5 text-fuchsia-400 fill-fuchsia-400" />;
      case 'Wisuda':
      case 'Sekolah': return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'Pindah Rumah': return <Home className="w-5 h-5 text-emerald-400" />;
      case 'Liburan': return <Plane className="w-5 h-5 text-amber-400" />;
      case 'Pencapaian': return <Award className="w-5 h-5 text-cyan-400" />;
      default: return <PartyPopper className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-indigo-400" />
              <span>Timeline Kehidupan Keluarga</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Jejak langkah peristiwa penting, kelahiran, pernikahan, kepindahan rumah, dan pencapaian berharga
            </p>
          </div>

          <button
            onClick={onOpenAddEventModal}
            className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Peristiwa Milestone</span>
          </button>
        </div>
      </div>

      {/* Visual Timeline Stream */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-fuchsia-500">
        {timelines.map((item, idx) => (
          <div key={item.id} className="relative group">
            
            {/* Node Icon Circle */}
            <div className="absolute -left-6 sm:-left-10 top-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform z-10">
              {getEventIcon(item.eventType)}
            </div>

            {/* Timeline Item Content Card */}
            <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 shadow-xl space-y-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                    {item.eventType}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {item.date} ({item.year})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {item.location}
                  </span>
                  <button
                    onClick={() => deleteTimelineEvent(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.taggedMemberIds.map(mem => (
                      <span key={mem} className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 border border-slate-800 font-semibold flex items-center gap-1">
                        <User className="w-2.5 h-2.5 text-amber-400" /> {mem}
                      </span>
                    ))}
                  </div>
                </div>

                {item.photoUrl && (
                  <div className="h-40 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                    <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
