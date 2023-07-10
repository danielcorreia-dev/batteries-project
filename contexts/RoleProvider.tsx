import { createContext, useContext, useEffect, useState } from 'react';

export enum UserRole {
  Usuario = 'usuario',
  Empresa = 'empresa',
}
interface RoleContextType {
  role: UserRole;
  setRole: (newRole: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

interface RoleProviderProps {
  initialValue?: UserRole;
  children: React.ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({
  initialValue = UserRole.Usuario,
  children,
}) => {
  const [role, setRole] = useState<UserRole>(initialValue);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (
      storedRole &&
      Object.values(UserRole).includes(storedRole as UserRole)
    ) {
      setRole(storedRole as UserRole);
    }
  }, []);

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </RoleContext.Provider>
  );
};
