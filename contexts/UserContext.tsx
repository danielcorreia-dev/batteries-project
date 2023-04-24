import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
}

interface SignInData {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

const UserContext = ({ children }) => {
  const isAuthenticated = false;

  const signIn = async (data: SignInData) => {
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
