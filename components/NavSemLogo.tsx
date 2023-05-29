import Link from 'next/link';
import { useUserContext } from '../contexts/UserProvider';

const NavSemLogo = () => {
  const { userData } = useUserContext();
  return (
    <header className="border-b block">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] w-full py-3 md:py-8">
        <Link href={'/'}>
          <h1 className="font-bold text-2xl">Batteries Project</h1>
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
