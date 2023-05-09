'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post('http://localhost:3000/auth/refresh', {
      refreshToken: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
  };

  return;
};
