import classNames from 'classnames';
import { url } from 'inspector';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { VscAccount, VscTag, VscGear } from 'react-icons/vsc';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

interface ItemsProps {
  url: string;
  text: string;
  icon: React.ElementType;
}

interface Items {
  items: ItemsProps[];
}

const BottomUserNavbar: React.FC<Items> = ({ items }) => {
  const router = useRouter();

  const links = items.map((item) => (
    <Link
      className={classNames('pt-4 pb-4 px-5', {
        'text-blue-700': item.url === router.asPath,
      })}
      href={item.url}
      key={'bottom-bar-' + item.url + item.text}
    >
      <item.icon size={32} />
    </Link>
  ));

  return (
    <div className="fixed w-screen bottom-0 left-0 z-50 bg-white">
      <div className="flex items-center justify-between h-16 bg-white">
        {links}
      </div>
    </div>
  );
};

export default BottomUserNavbar;
