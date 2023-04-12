import { FC, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Deslogar = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated')
      signOut().then(() => {
        router.push('/home');
      });
  }, [router, status]);

  return <div>Deslogando...</div>;
};

export default Deslogar;
