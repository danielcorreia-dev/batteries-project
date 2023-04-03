import classNames from 'classnames';
import { url } from 'inspector';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const BottomUserNavbar = () => {
  const router = useRouter();

  const items = [
    {
      url: '/sistema/usuario/perfil',
      text: 'Perfil',
      icon: VscAccount,
    },
    {
      url: 'sistema/explore',
      text: 'Explore',
      icon: HiOutlineMagnifyingGlass,
    },
    {
      url: 'sistema/missoes',
      text: 'Missões',
      icon: VscTag,
    },
    {
      url: '/sistema/configuracoes',
      text: 'Configurações',
      icon: VscGear,
    },
  ];

  const links = items.map((item) => (
    <Link
      className={classNames('pt-4 pb-4 px-8', {
        'text-blue-700': item.url === router.asPath,
      })}
      href={item.url}
      key={'bottom-bar-' + item.url + item.text}
    >
      <item.icon size={32} />
    </Link>
  ));

  return (
    <div className="fixed w-max right-6 bottom-2 left-1/2 -translate-x-1/2 border-t border-neutral-300">
      <div className="flex items-center justify-between">{links}</div>
    </div>
  );
};

export default BottomUserNavbar;
