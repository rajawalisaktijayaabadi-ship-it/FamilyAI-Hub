import React from 'react';
import { ShoppingCenterModule } from '../../features/shopping/ShoppingCenterModule';
import { ShoppingItem, FamilyMember } from '../../types';

interface ShoppingViewProps {
  shoppingItems?: ShoppingItem[];
  familyMembers?: FamilyMember[];
  onToggleItem?: (id: string) => void;
  onAddItem?: (item: ShoppingItem) => void;
  onDeleteItem?: (id: string) => void;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  familyMembers = []
}) => {
  return <ShoppingCenterModule familyMembers={familyMembers} />;
};
