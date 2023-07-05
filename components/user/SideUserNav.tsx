import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useUserContext } from '../../contexts/UserProvider';
import { VscAccount, VscGear } from 'react-icons/vsc';
import { CiLogout, CiShop } from 'react-icons/ci';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { BsPersonDown, BsTags } from 'react-icons/bs';
import BottomUserNavbar from './BottomUserNavbar';

import useSWR from 'swr';
import { fetcher } from '@/lib/utils/fetcher';

import classNames from 'classnames';
import Link from 'next/link';
import { useRoleContext, UserRole } from '@/contexts/RoleProvider';
import Skeleton from 'react-loading-skeleton';

const SideUserNav = () => {
  const { userData } = useUserContext();
  const { nick } = userData || {};

  const { role } = useRoleContext();
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    role === UserRole.Usuario ? '/api/user/company' : null,
    fetcher
  );

  const baseItems = [
    {
      url: `/sistema/${role}/perfil`,
      text: 'Perfil',
      icon: VscAccount,
    },
    {
      url: '/sistema/buscar',
      text: 'Buscar',
      icon: HiOutlineMagnifyingGlass,
    },
    {
      url: `/sistema/${role}/configuracoes`,
      text: 'Configurações',
      icon: VscGear,
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsBreakpoint(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = baseItems.map((item) => (
    <Link
      href={item.url}
      key={`side-bar-${item.url}-${item.text}`}
      className={classNames(
        'p-4',
        {
          'text-blue-700': item.url === router.asPath,
        },
        'list-none hover:text-blue-400'
      )}
    >
      <li className="flex items-center">
        <item.icon size={32} />
        <p
          className={classNames('px-2 hover:text-blue-400', {
            'font-semibold': item.url === router.asPath,
          })}
        >
          {item.text}
        </p>
      </li>
    </Link>
  ));

  return (
    <>
      {isBreakpoint ? (
        <BottomUserNavbar items={baseItems} />
      ) : (
        <div className="px-5 py-8 flex flex-end flex-col justify-between h-screen max-w-sm">
          <div className="px-4 pb-8">
            <Link href="/sistema/usuario/perfil" className="mb-12">
              <h1>Batteries App</h1>
            </Link>
            <nav>
              {links}
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  {data?.id && role === UserRole.Usuario && (
                    <>
                      <Link
                        href="/sistema/empresa/logar-empresa"
                        className="p-4 list-none hover:text-blue-400"
                      >
                        <div className="flex items-center justify-start">
                          <CiShop size={32} /> <p className="px-2">Empresa</p>
                        </div>
                      </Link>
                    </>
                  )}
                  {!data?.id && role === UserRole.Usuario && (
                    <>
                      <Link
                        href={'/sistema/criar-empresa'}
                        className="p-4 list-none hover:text-blue-400"
                      >
                        <div className="flex items-center justify-start">
                          <BsPersonDown size={32} />
                          <p className="px-2">Criar Empresa</p>
                        </div>
                      </Link>
                    </>
                  )}
                  {role === UserRole.Empresa && (
                    <>
                      <Link href={'/sistema/empresa/beneficios'}>
                        <div className="flex items-center justify-start hover:text-blue-400">
                          <BsTags size={32} />
                          <p className="px-2 list-none">Benefícios</p>
                        </div>
                      </Link>
                      <Link
                        href={'/sistema/empresa/deslogar'}
                        className="p-4 list-none hover:text-blue-400"
                      >
                        <div className="flex items-center justify-start max-w-[200px] whitespace-pre-wrap">
                          <BsPersonDown size={32} />
                          <p className="px-2">
                            Voltar para o perfil de usuário
                          </p>
                        </div>
                      </Link>
                    </>
                  )}
                </>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-red-500 flex items-center"
              >
                <div></div>
                <CiLogout className="mr-2" size={32} />
                Deslogar
              </button>
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex">
            {role === UserRole.Usuario && (
              <p className="hover:opacity-80 transition-opacity">{nick}</p>
            )}
            {role === UserRole.Empresa && (
              <p className="hover:opacity-80 transition-opacity">{data}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideUserNav;
