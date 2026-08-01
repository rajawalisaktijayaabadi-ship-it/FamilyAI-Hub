import React from 'react';
import { FinanceCenterModule } from '../../features/finance/FinanceCenterModule';
import { BudgetItem, FamilyMember } from '../../types';

interface FinanceViewProps {
  budget?: BudgetItem[];
  familyMembers?: FamilyMember[];
  onAddBudgetItem?: (item: BudgetItem) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ familyMembers = [] }) => {
  return <FinanceCenterModule familyMembers={familyMembers} />;
};
