import classNames from 'classnames';
import { url } from 'inspector';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const UserNavbar = () => {
  const router = useRouter();

  const items = [
    {
      url: '/',
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
      className={classNames('p-6 px-8', {
        'text-red-700': item.url === router.asPath,
      })}
      href={item.url}
      key={'bottom-bar-' + item.url + item.text}
    >
      <item.icon size={32}/>
    </Link>
  ));

  return (
    <div className="fixed w-max right-6 bottom-4 left-1/2 -translate-x-1/2">
      <div className="flex items-center justify-between">{links}</div>
    </div>
  );
};

export default UserNavbar;
