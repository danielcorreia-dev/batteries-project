import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { CiBookmark, CiLogout } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import BottomUserNavbar from './BottomUserNavbar';
import { signOut, useSession } from 'next-auth/react';
import { sign } from 'crypto';

const SideUserNav = () => {
  const { data: session } = useSession();
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const router = useRouter();
  const agent = 'usuario';
  const items = [
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

  const links = items.map((item) => (
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
        <BottomUserNavbar items={items} />
      ) : (
        <div className="p-8 flex flex-end flex-col justify-between h-full">
          <div>
            <Link href="/sistema/usuario/perfil" className="mb-12">
              <h1>Batteries App</h1>
            </Link>
            <nav>{links}</nav>
            <button
              onClick={() => signOut()}
              className="text-red-500 flex items-center"
            >
              <CiLogout className="mr-2" size={32} />
              Deslogar
            </button>
          </div>

          <div>
            <p>{session?.user.nick}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SideUserNav;
