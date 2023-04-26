import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface UseAuthType {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = (): UseAuthType => {
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useContext(AuthContext);

  const signIn = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const data: SignInResponse = await response.json();

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  return {
    accessToken,
    refreshToken,
    signIn,
  };
};
