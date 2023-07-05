import { useRoleContext, UserRole } from '@/contexts/RoleProvider';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

type Props = {};

const LogarEmpresa = (props: Props) => {
  const { updateRole } = useRoleContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateRole(UserRole.Empresa);
    // Simulating a delay for the loading screen
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      router.push('/sistema/empresa/perfil');
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, [updateRole, router]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CgSpinnerAlt className="animate-spin text-5xl mr-2 text-blue-500" />
          <p className="text-xl">Logando como empresa...</p>
        </div>
      ) : null}
    </div>
  );
};

export default LogarEmpresa;
