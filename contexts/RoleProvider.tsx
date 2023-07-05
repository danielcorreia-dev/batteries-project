import React, { createContext, useContext, useState } from 'react';

export enum UserRole {
  Usuario = 'usuario',
  Empresa = 'empresa',
}

interface RoleContextProps {
  role: UserRole;
  updateRole: (newRole: UserRole) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const useRoleContext = (): RoleContextProps => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleContext must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: React.ReactNode;
}

const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(UserRole.Usuario);

  const updateRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const contextValue: RoleContextProps = {
    role,
    updateRole,
  };

  return (
    <RoleContext.Provider value={contextValue}>{children}</RoleContext.Provider>
  );
};

export default RoleProvider;
