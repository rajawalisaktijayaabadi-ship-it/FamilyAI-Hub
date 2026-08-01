import React from 'react';
import { InsuranceCenterModule } from '../../features/insurance/InsuranceCenterModule';
import { FamilyMember } from '../../types';

interface InsuranceViewProps {
  familyMembers: FamilyMember[];
}

export const InsuranceView: React.FC<InsuranceViewProps> = ({ familyMembers = [] }) => {
  return <InsuranceCenterModule familyMembers={familyMembers} />;
};

