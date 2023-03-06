import Button from './Button';
import Image from 'next/image';
import heroPhoto from '../../public/hero-illustration.svg';

const HeroSection = () => {
  return (
    <main>
      <div className="relative px-6 lg:px-6 bg-blue-300 ">
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56 grid gap-4 md:grid-cols-2 items-center">
          <div className="text-center md:text-start mb-12">
            <h1 className="text-6xl font-bold mb-6 ">
              Contribua, Cresça, Ganhe.
            </h1>
            <p className="text-gray-800 mb-12">
              Um projeto inovador e voltado para sustentabilidade, junte-se a
              nossa comunidade{' '}
            </p>
            <Button content="Saiba mais" link="/signup"></Button>
          </div>
          <div>
            <Image src={heroPhoto} alt="hero-photo" className='w-full'/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
