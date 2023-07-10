import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/icon.png';
import { useUserContext } from '../contexts/UserProvider';

const NavSemLogo = () => {
  const { userData } = useUserContext();
  return (
    <header className="border-b block">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] w-full py-3 md:py-8">
        <Link href={'/'} className="hover:opacity-80 transition-opacity">
          <div className="flex flex-row gap-4 items-center justify-start">
            <div className="p-2 bg-neutral-700 rounded-full">
              <div className="relative h-8 w-8">
                <Image alt="logo" src={Logo} />
              </div>
            </div>
            <h1 className="font-bold text-2xl">Batteries Project</h1>
          </div>
        </Link>
        {userData && (
          <Link href={'/sistema/usuario/perfil'}>
            <p>{userData.nick}</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavSemLogo;
