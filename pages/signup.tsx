import Form from '@/components/Form';
import Footer from '@/components/landingPage/Footer';
import Link from 'next/link';

const Signup = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center mx-auto max-w-5xl h-screen">
        <Link href="login" className='text-purple-500 hover:text-purple-700 mb-4'>Já possui uma conta?</Link>
        <Form />
      </main>
      <Footer />
    </>
  );
};

export default Signup;
