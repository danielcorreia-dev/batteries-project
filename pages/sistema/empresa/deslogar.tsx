import { useRole, UserRole } from '@/contexts/RoleProvider';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

type Props = {};

const LogarEmpresa = (props: Props) => {
  const { setRole } = useRole();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRole(UserRole.Usuario);
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      router.push('/sistema/usuario/perfil');
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, [setRole, router]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CgSpinnerAlt className="animate-spin text-5xl mr-2 text-blue-500" />
          <p className="text-xl">Voltando para o seu perfil de usuário ...</p>
        </div>
      ) : null}
    </div>
  );
};

export default LogarEmpresa;
