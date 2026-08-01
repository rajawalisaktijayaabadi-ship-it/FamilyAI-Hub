import React from 'react';
import { MoodCenterModule } from '../../features/mood/MoodCenterModule';

export const MoodDetectionView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <MoodCenterModule initialSubTab="overview" />
    </div>
  );
};
