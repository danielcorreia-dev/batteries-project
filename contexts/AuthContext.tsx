import {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode,
  ReactComponentElement,
} from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

const initialAuthContext: AuthContextType = {
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAccessToken = localStorage.getItem('accessToken');
      const savedRefreshToken = localStorage.getItem('refreshToken');

      if (savedAccessToken && savedRefreshToken) {
        setAccessToken(savedAccessToken);
        setRefreshToken(savedRefreshToken);
      }
    }
  }, []);

  const authContextValue: AuthContextType = {
    accessToken,
    refreshToken,
    setAccessToken: (newAccessToken: string | null) => {
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
      setAccessToken(newAccessToken);
    },
    setRefreshToken: (newRefreshToken: string | null) => {
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      } else {
        localStorage.removeItem('refreshToken');
      }
      setRefreshToken(newRefreshToken);
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
