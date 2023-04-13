import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { CiBookmark } from 'react-icons/ci';
import { useCallback, useContext, useEffect, useState } from 'react';
import BottomUserNavbar from './BottomUserNavbar';

const SideUserNav = () => {
  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => {
      e.matches ? setTargetReached(true) : setTargetReached(false);
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };

  const router = useRouter();
  const agent = 'empresa';
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
      key={'side-bar-' + item.url + item.text}
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

  const isBreakpoint = useMediaQuery(767);

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
          </div>
          {/* User Profile mini-section 
          TODO: User Provider Logic */}
          <div className="flex items-start">
            <div className="relative h-12 w-12 mr-2">
              <Image
                src="https://source.unsplash.com/random?guy"
                alt="Avatar"
                className="rounded-full"
                objectFit="cover"
                fill
              />
            </div>
            <div>
              <p>Bruno Golveia</p>
              <p className="text-xs text-gray-600">São Paulo, SP</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideUserNav;
