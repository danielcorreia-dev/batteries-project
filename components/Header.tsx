import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-300 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="font-bold text-red-400 text-2xl">LogoPlacement</h1>
        <nav className="flex justify-center items-center w-auto">
          <ul className="text-base flex justify-between font-semibold">
            <li>
              <Link
                className="hover:text-blue-500 transition-colors px-6"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-500 transition-colors px-6"
                href="/about"
              >
                Our team
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-500 transition-colors px-6"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-500 transition-colors px-6"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-500 transition-colors px-6"
                href="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        {/* cta section start */}
        <div>
          <Link href="/login" className="font">
            Log in
          </Link>
          <Link href="/sign-in" className="bg-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
