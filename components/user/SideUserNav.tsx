import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { CiBookmark, CiLogout, CiShop } from 'react-icons/ci';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import BottomUserNavbar from './BottomUserNavbar';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useUserContext } from '../layouts/UserProvider';

const SideUserNav = () => {
  const { userData, setUser } = useUserContext();
  const { nick, company } = userData || {};
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const router = useRouter();
  const agent = 'usuario';

  const baseItems = [
    {
      url: `/sistema/${agent}/perfil`,
      text: 'Perfil',
      icon: VscAccount,
    },
    {
      url: '/sistema/',
      text: 'Lugares Salvos',
      icon: CiBookmark,
    },
    {
      url: '/sistema/buscar',
      text: 'Buscar',
      icon: HiOutlineMagnifyingGlass,
    },
    {
      url: '/sistema/missoes',
      text: 'Missões',
      icon: VscTag,
    },
    {
      url: `/sistema/${agent}/configuracoes`,
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
      className={classNames(
        'p-4',
        {
          'text-blue-700': item.url === router.asPath,
        },
        'list-none hover:text-blue-400'
      )}
      href={item.url}
      key={`side-bar-${item.url}-${item.text}`}
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
        <div className="p-8 flex flex-end flex-col justify-between h-full">
          <div className="px-4">
            <Link href="/sistema/usuario/perfil" className="mb-12">
              <h1>Batteries App</h1>
            </Link>
            <nav>
              {links}
              {company ? (
                <Link href="/sistema/"></Link>
              ) : (
                <Link
                  href="/sistema/criar-empresa"
                  className="p-4 list-none hover:text-blue-400"
                >
                  <div className="flex items-center justify-start">
                    <CiShop size={32} /> <p className="px-2">Criar empresa</p>
                  </div>
                </Link>
              )}
            </nav>

            <button
              onClick={() => signOut()}
              className="text-red-500 flex items-center"
            >
              <div></div>
              <CiLogout className="mr-2" size={32} />
              Deslogar
            </button>
          </div>

          {/* User Menu */}
          <div className="flex">
            <p className="hover:opacity-80 transition-opacity">{nick}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SideUserNav;
