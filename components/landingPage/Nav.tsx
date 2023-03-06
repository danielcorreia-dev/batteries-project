import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const LandingNav = ({ bgColor }: { bgColor: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${bgColor} py-8 md:bg-blue-300 md:border-none `}>
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <h1 className="font-bold text-2xl">LogoText</h1>

        <FiMenu
          className="md:hidden block h-6 w-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        <nav
          className={`${
            open ? 'block' : 'hidden'
          } md:flex md:items-center md:w-auto w-full mb-1 mt-2 md:mb-0 md:mt-0`}
        >
          <ul className="text-base text-gray-600 md:flex md:justify-between">
            <li>
              <Link
                href="/about"
                className="md:px-5 py-2 block hover:text-blue-500 font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className="md:px-5 py-2 block hover:text-blue-500 font-semibold"
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="md:px-5 py-2 block hover:text-blue-500 font-semibold"
              >
                Team
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA */}
        <div
          className={`${
            open ? 'block' : 'hidden'
          } md:flex md:items-center md:w-auto w-full`}
        >
          <Link
            className="text-blue-500 hover:text-blue-700 transition-all font-semibold md:mr-4 md:mb-0"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="py-2 px-5 bg-blue-500 text-white hover:bg-blue-700 rounded mt-2 transition-colors block"
            href="signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
