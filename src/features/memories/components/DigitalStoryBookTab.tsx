import React, { useState } from 'react';
import { BookOpen, Sparkles, Plus, Calendar, User, Trash2, Heart, Share2 } from 'lucide-react';
import { useMemoryStore } from '../stores/useMemoryStore';
import { MemoryService } from '../services/memoryService';

interface DigitalStoryBookTabProps {
  onOpenStoryModal: () => void;
}

export const DigitalStoryBookTab: React.FC<DigitalStoryBookTabProps> = ({ onOpenStoryModal }) => {
  const { stories, deleteStory } = useMemoryStore();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <span>Digital Life Story Book Keluarga</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Buku narasi digital dengan rangkaian naskah cerita indah yang dirangkum oleh AI dari foto dan momen kebersamaan
            </p>
          </div>

          <button
            onClick={onOpenStoryModal}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tulis / Generate Cerita AI</span>
          </button>
        </div>
      </div>

      {/* Stories Flip Cards / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800">
                <img src={story.coverPhotoUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {story.generatedByAI && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-950/90 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-purple-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> AI Generated Story
                  </div>
                )}

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-bold border border-slate-800">
                  {story.date}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {story.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-purple-500 pl-3 py-1">
                "{story.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Anggota: {story.associatedMemberIds.join(', ')}</span>
              </div>

              <button
                onClick={() => deleteStory(story.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
