import classNames from 'classnames';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const SideUserNav = () => {
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
      className={classNames('p-4', {
        'text-blue-700': item.url === router.asPath,
      }, 'list-none')}
      href={item.url}
      key={'side-bar-' + item.url + item.text}
    >
      <li className='flex items-center'><item.icon size={32}/> {item.text}</li>
    </Link>
  ));

  return (
    <div>
      <nav>{links}</nav>
    </div>
  );
};

export default SideUserNav;
