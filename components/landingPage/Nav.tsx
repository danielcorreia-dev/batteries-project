import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const LandingNav = ({ bgColor }: { bgColor: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={classNames(`${bgColor} py-8 md:bg-blue-200 md:border-none`, {'border-b': open === true})}>
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <h1 className="font-bold text-2xl">Batteries Project</h1>

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
                className="md:px-3 py-2 block text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                Sobre nós
              </Link>
            </li>
            <li>
              <Link
                href="/project"
                className="md:px-5 py-2 block text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                Projeto
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="md:px-5 py-2 block text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                Time
              </Link>
            </li>
          </ul>
        </nav>

        {/* CTA */}
        <div
          className={`${
            open ? 'block' : 'hidden'
          } md:flex md:items-center md:w-auto w-full md:text-inherit text-center`}
        >
          <Link
            className="text-indigo-700 hover:text-indigo-500 transition-all font-semibold md:mr-4 md:mb-0"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="py-2 px-5 bg-indigo-800 text-white hover:bg-blue-900 rounded mt-2 md:mt-0 transition-colors block"
            href="cadastro"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
