import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import UserProvider from './UserProvider';
import { SkeletonTheme } from 'react-loading-skeleton';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <UserProvider>
        <SkeletonTheme baseColor="#CCCCCC" highlightColor="#444">
          {children}
        </SkeletonTheme>
      </UserProvider>
    </SessionProvider>
  );
};

export default Provider;
