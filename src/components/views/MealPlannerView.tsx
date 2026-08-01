import React from 'react';
import { MealCenterModule } from '../../features/meal/MealCenterModule';
import { FamilyMember } from '../../types';

interface MealPlannerViewProps {
  mealPlans?: any[];
  familyMembers?: FamilyMember[];
}

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({ 
  familyMembers = [] 
}) => {
  return <MealCenterModule familyMembers={familyMembers} />;
};
