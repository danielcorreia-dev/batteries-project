import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import UserProvider from './UserProvider';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  );
};

export default Provider;
