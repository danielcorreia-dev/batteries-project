import LoginForm from '@/components/LoginForm';
import Footer from '@/components/landingPage/Footer';
import NavSemLogo from '@/components/NavSemLogo';
import Link from 'next/link';
import { FiBatteryCharging } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/sistema');

  }, [router, session])

  return (
    <>
      <NavSemLogo />
      <main className="flex flex-col items-center mx-auto max-w-5xl py-12">
        <Link
          href="cadastro"
          className="text-purple-500 hover:text-purple-700 mb-4"
        >
          Não tem uma conta?
        </Link>
        <div className="border py-6 px-4 rounded">
          <div className="text-center flex flex-col justify-center items-center mb-5 max-w-xs">
            <FiBatteryCharging size={32} />
            <h2 className="font-bold text-2xl">Entre na sua conta</h2>
            <span className="text-md text-neutral-5<00">
              Use seus dados de cadastro para acessar nossa plataforma
            </span>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
