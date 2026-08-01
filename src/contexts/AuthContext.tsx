import React, { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/authService';
import { UserDocument } from '../firebase/schema';

interface AuthContextType {
  user: UserDocument | null;
  role: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest';
  switchRole: (role: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest') => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDocument | null>(AuthService.getCurrentUser());

  const switchRole = (newRole: 'super_admin' | 'parent' | 'child' | 'grandparent' | 'guest') => {
    const updated = AuthService.switchUserRole(newRole);
    setUser({ ...updated });
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role || 'parent',
      switchRole,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
