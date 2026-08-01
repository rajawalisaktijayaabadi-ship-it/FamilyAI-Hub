import React from 'react';
import { AIAssistantModule } from '../../features/ai/assistant/AIAssistantModule';
import { FamilyMember } from '../../types';

interface AIAssistantViewProps {
  currentMember: FamilyMember;
  familyMembers: FamilyMember[];
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ currentMember, familyMembers = [] }) => {
  return (
    <AIAssistantModule 
      currentMember={currentMember}
      familyMembers={familyMembers}
    />
  );
};
