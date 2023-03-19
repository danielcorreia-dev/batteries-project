import LoginForm from '@/components/LoginForm';
import Footer from '@/components/landingPage/Footer';
import Link from 'next/link';

const Login = () => (
  <>
    <main className="flex flex-col justify-center items-center mx-auto max-w-5xl h-screen">
      <Link href="cadastro" className="text-purple-500 hover:text-purple-700 mb-4">
        Não tem uma conta?
      </Link>
      <LoginForm />
    </main>
    <Footer />
  </>
);

export default Login;
