import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi'

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-300 py-8">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        <h1 className="font-bold text-2xl">LogoText</h1>

        <FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={() => setOpen(!open)}/>

        <nav className={`${open ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full mb-2 mt-2 lg:mb-0 lg:mt-0`}>
          <ul className='text-base text-gray-600 lg:flex lg:justify-between'>
            <li>
              <Link href="/about" className='lg:px-5 py-2 block hover:text-blue-500 font-semibold'>About</Link>
            </li>
            <li>
              <Link href="/project" className='lg:px-5 py-2 block hover:text-blue-500 font-semibold'>Project</Link>
            </li>
            <li>
              <Link href="/team" className='lg:px-5 py-2 block hover:text-blue-500 font-semibold'>Team</Link>
            </li>
          </ul>
        </nav>

        {/* CTA */}
        <div className={`${open ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}>
          <Link className ='text-blue-500 hover:text-blue-700 transition-all font-semibold lg:mr-4 mb-2 lg:mb-0' href="/login">
            Login
          </Link>
          <Link className ="py-2 px-5 bg-blue-500 text-white hover:bg-blue-700 rounded transition-colors block" href="signup">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
