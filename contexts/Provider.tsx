import { SessionProvider } from 'next-auth/react';
import React, { ReactNode, useEffect, useState } from 'react';
import UserProvider from './UserProvider';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { RoleProvider } from './RoleProvider';
import { ToastContainer } from 'react-toastify';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RoleProvider>
        <UserProvider>
          <SkeletonTheme baseColor="#CCCCCC" highlightColor="#444">
            <ToastContainer />
            {children}
          </SkeletonTheme>
        </UserProvider>
      </RoleProvider>
    </SessionProvider>
  );
};

export default Provider;
