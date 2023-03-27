import Link from 'next/link';

const NavSemLogo = () => (
  <header className="border-b block">
    <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] w-full py-3 md:py-8">
      <Link href={'/'}>
        <h1 className="font-bold text-2xl">LogoText</h1>
      </Link>
    </div>
  </header>
);

export default NavSemLogo;
