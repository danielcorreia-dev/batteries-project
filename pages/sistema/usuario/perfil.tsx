import UserLayout from '@/components/layouts/UserLayout';
import { useSession } from 'next-auth/react';
import React from 'react';
import { getSourceMapRange } from 'typescript';

type Props = {};

const Perfil = (props: Props) => {
  const { data: session } = useSession(); 
  console.log(session);
  return (
    <>
      <UserLayout>

      </UserLayout>
    </>
  );
};

export default Perfil;
