import FormCadastro from '@/components/FormUserSignup';
import Footer from '@/components/landingPage/Footer';
import NavSemLogo from '@/components/NavSemLogo';
import Link from 'next/link';
import { FiBatteryCharging } from 'react-icons/fi';

const Cadastro = () => {
  return (
    <>
      <NavSemLogo />
      <main className="flex flex-col justify-center items-center mx-auto max-w-5xl md:h-[80vh] mt-5 md:mt-0">
        <Link
          href="login"
          className="text-purple-500 hover:text-purple-700 mb-4"
        >
          Já possui uma conta?
        </Link>
        <div className="border py-6 px-4 rounded">
          <div className="text-center flex flex-col justify-center items-center mb-5 max-w-xs">
            <FiBatteryCharging size={32} />
            <h2 className="font-bold text-2xl">Crie a sua conta</h2>
            <span className="text-md text-neutral-5<00">
              Fácil e rapidamente, insira seus dados
            </span>
          </div>
          <FormCadastro />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cadastro;
