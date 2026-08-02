import React from 'react';
import { MoodCenterModule } from '../../features/mood/MoodCenterModule';
import { FamilyMember } from '../../types';

interface MoodDetectionViewProps {
  currentMember?: FamilyMember;
  moodEntries?: any[];
  onAddMoodEntry?: (entry: any) => void;
}

export const MoodDetectionView: React.FC<MoodDetectionViewProps> = ({ currentMember }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <MoodCenterModule initialSubTab="overview" currentMember={currentMember} />
    </div>
  );
};

