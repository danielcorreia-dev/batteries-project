import Footer from '@/components/LandingPage/Footer';
import Nav from '@/components/LandingPage/Nav';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Nav />
      <main className='h-20'>
        <div>

        </div>
      </main>
      <Footer />
    </>
  );
}
