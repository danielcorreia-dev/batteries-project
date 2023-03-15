import FormCadastro from '@/components/FormCadastro';
import Footer from '@/components/landingPage/Footer';
import Link from 'next/link';

const Cadastro = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center mx-auto max-w-5xl h-screen">
        <Link href="login" className='text-purple-500 hover:text-purple-700 mb-4'>Já possui uma conta?</Link>
      <FormCadastro/>
      </main>
      <Footer />
    </>
  );
};

export default Cadastro;
