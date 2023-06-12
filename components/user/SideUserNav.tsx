import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useUserContext } from '../../contexts/UserProvider';

import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { CiBookmark, CiLogout, CiShop } from 'react-icons/ci';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import BottomUserNavbar from './BottomUserNavbar';

const SideUserNav = () => {
  const { data: session } = useSession();
  const { userData } = useUserContext();
  const { nick } = userData || {};
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const router = useRouter();
  const agent = 'usuario';
  const [hasCompany, setHasCompany] = useState(false);

  const baseItems = [
    {
      url: `/sistema/${agent}/perfil`,
      text: 'Perfil',
      icon: VscAccount,
    },
    {
      url: '/sistema/buscar',
      text: 'Buscar',
      icon: HiOutlineMagnifyingGlass,
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

  useEffect(() => {
    const fetchUserCompany = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user.id}/company`);
        const data = await response.json();

        if (response.ok) {
          const { companyData } = data;
          setHasCompany(!!companyData); // Update hasCompany based on the presence of companyData
        } else {
          console.error('Error fetching user company:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user company:', error);
      }
    };

    if (session?.user && !hasCompany) {
      fetchUserCompany();
    }
  }, [session?.user, hasCompany]);

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
        <div className="p-8 flex flex-end flex-col justify-between h-full">
          <div className="px-4">
            <Link href="/sistema/usuario/perfil" className="mb-12">
              <h1>Batteries App</h1>
            </Link>
            <nav>
              {links}
              {hasCompany ? (
                <>
                  <Link
                    href="/sistema/usuario/empresa"
                    className="p-4 list-none hover:text-blue-400"
                  >
                    <div className="flex items-center justify-start">
                      <CiShop size={32} />{' '}
                      <p className="px-2">Switch to Company Profile</p>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/sistema/criar-empresa"
                    className="p-4 list-none hover:text-blue-400"
                  >
                    <div className="flex items-center justify-start">
                      <CiShop size={32} /> <p className="px-2">Criar empresa</p>
                    </div>
                  </Link>
                </>
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
