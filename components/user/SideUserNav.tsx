import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useUserContext } from '../../contexts/UserProvider';
import {
  BsPersonDown,
  BsTags,
  BsPersonCircle,
  BsGear,
  BsSearch,
  BsShop,
  BsTrophy,
  BsBoxArrowInLeft,
} from 'react-icons/bs';
import Image from 'next/image';
import BottomUserNavbar from './BottomUserNavbar';
import Logo from 'public/icon.png';

import useSWR from 'swr';
import { fetcher } from '@/lib/utils/fetcher';

import classNames from 'classnames';
import Link from 'next/link';
import { useRole, UserRole } from '@/contexts/RoleProvider';
import Skeleton from 'react-loading-skeleton';

const SideUserNav = () => {
  const { userData } = useUserContext();
  const { nick } = userData || {};
  const { role, setRole } = useRole();
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const timeoutRef = useRef<unknown | null>(null);
  const { data, error, isLoading } = useSWR('/api/user/company', fetcher, {
    revalidateOnFocus: false,
  });
  const baseItems = [
    {
      url: `/sistema/${role}/perfil`,
      text: 'Perfil',
      icon: BsPersonCircle,
    },
    {
      url: '/sistema/buscar',
      text: 'Buscar',
      icon: BsSearch,
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsBreakpoint(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuOpen = () => {
    clearInterval(timeoutRef.current as number);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    clearInterval(timeoutRef.current as number);
    timeoutRef.current = setTimeout(() => setIsMenuOpen(false), 300);
  };

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
        <item.icon size={28} />
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
        <div className="px-5 py-8 flex flex-end flex-col justify-between h-screen w-48">
          <div className="px-4 pb-8 min-w-max">
            <div className="mb-4">
              <Link href={`/sistema/${role}/perfil`} className="mb-12">
                <div className="p-2 bg-neutral-800 inline-flex rounded-full hover:opacity-80 transition-opacity">
                  <div className="relative w-8 h-8">
                    <Image alt="logo" src={Logo}></Image>
                  </div>
                </div>
              </Link>
            </div>

            <nav>
              <ul>
                {links}
                {isLoading ? (
                  <>
                    <Skeleton />
                    <Skeleton />
                  </>
                ) : (
                  <>
                    {data?.id && role === UserRole.Usuario && (
                      <>
                        <Link
                          href="/sistema/empresa/logar-empresa"
                          className="p-4 list-none hover:text-blue-400"
                        >
                          <div className="flex items-center justify-start">
                            <BsShop size={28} /> <p className="px-2">Empresa</p>
                          </div>
                        </Link>
                        <Link
                          href="/sistema/usuario/ranking"
                          className="p-4 list-none hover:text-blue-400"
                        >
                          <div className="flex items-center justify-start">
                            <BsTrophy size={28} />{' '}
                            <p className="px-2">Ranking</p>
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
                          <div
                            className={`flex items-center justify-start hover:text-blue-400 ${
                              router.asPath === '/sistema/empresa/beneficios' &&
                              'text-blue-700'
                            }`}
                          >
                            <BsTags size={28} />
                            <p className="px-2 list-none">Benefícios</p>
                          </div>
                        </Link>
                        <Link
                          href={'/sistema/empresa/deslogar'}
                          className="p-4 list-none hover:text-blue-400"
                        >
                          <div className="flex items-center justify-start whitespace-pre-wrap">
                            <BsPersonDown size={28} />
                            <p className="px-2 max-w-min">Perfil de usuário</p>
                          </div>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </ul>
            </nav>
          </div>

          {/* User Menu */}
          <div
            className="relative"
            onMouseEnter={handleMenuOpen} // Show the dropdown on mouse enter
            onMouseLeave={handleMenuClose} // Hide the dropdown on mouse leave
          >
            {role === UserRole.Usuario && (
              <span className="hover:opacity-80 transition-opacity">
                {nick}
              </span>
            )}
            {role === UserRole.Empresa && <span>{data?.title}</span>}
            {/* Dropdown menu */}
            {role === UserRole.Usuario && (
              <div
                className={`absolute z-10 mt-2 py-2 w-48 bottom-7 bg-white rounded-md shadow-lg ${
                  isMenuOpen ? 'block' : 'hidden'
                }`}
                onMouseEnter={() => setIsMenuOpen(true)} // Keep the dropdown open on menu hover
                onMouseLeave={() => setIsMenuOpen(false)} // Hide the dropdown on menu leave
              >
                {/* Add dropdown menu items here */}
                <button
                  className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 hover:text-red-500 transition-all items-center cursor-pointer space-x-2"
                  // className="flex items-center space-x-2 "
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setRole(UserRole.Usuario);
                  }}
                >
                  <BsBoxArrowInLeft /> <span>Deslogar</span>
                </button>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 hover:text-blue-500 transition-all"
                  href={`/sistema/${role}/configuracoes`}
                >
                  <div className="flex space-x-2 items-center">
                    <BsGear />
                    <span>Configurações</span>
                  </div>
                </Link>
              </div>
            )}
            {role === UserRole.Empresa && (
              <div
                className={`absolute z-10 mt-2 py-2 w-48 bottom-7 bg-white rounded-md shadow-lg ${
                  isMenuOpen ? 'block' : 'hidden'
                }`}
                onMouseEnter={() => setIsMenuOpen(true)} // Keep the dropdown open on menu hover
                onMouseLeave={() => setIsMenuOpen(false)} // Hide the dropdown on menu leave
              >
                {/* Add dropdown menu items here */}
                <button
                  className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 hover:text-red-500 transition-all items-center cursor-pointer space-x-2"
                  // className="flex items-center space-x-2 "
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setRole(UserRole.Usuario);
                  }}
                >
                  <BsBoxArrowInLeft /> <span>Deslogar</span>
                </button>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100 hover:text-blue-500 transition-all"
                  href={`/sistema/${role}/configuracoes`}
                >
                  <div className="flex space-x-2 items-center">
                    <BsGear />
                    <span>Configurações</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideUserNav;
