import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import UserProvider from './UserProvider';
import { SkeletonTheme } from 'react-loading-skeleton';
import RoleProvider from './RoleProvider';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RoleProvider>
        <UserProvider>
          <SkeletonTheme baseColor="#CCCCCC" highlightColor="#444">
            {children}
          </SkeletonTheme>
        </UserProvider>
      </RoleProvider>
    </SessionProvider>
  );
};

export default Provider;
