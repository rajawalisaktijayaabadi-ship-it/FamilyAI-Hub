import React from 'react';
import { FamilyMember } from '../../types';
import { HealthCenterModule } from '../../features/health/HealthCenterModule';

interface HealthViewProps {
  familyMembers: FamilyMember[];
}

export const HealthView: React.FC<HealthViewProps> = ({ familyMembers = [] }) => {
  return <HealthCenterModule familyMembers={familyMembers} />;
};
