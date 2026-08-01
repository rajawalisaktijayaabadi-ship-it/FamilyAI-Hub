import React from 'react';
import { FamilyMember } from '../../types';
import { PsychologyCenterModule } from '../../features/psychology/PsychologyCenterModule';

interface PsychologyViewProps {
  familyMembers?: FamilyMember[];
}

export const PsychologyView: React.FC<PsychologyViewProps> = () => {
  return <PsychologyCenterModule />;
};

export default PsychologyView;
