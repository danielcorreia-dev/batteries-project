import Card from '@/components/landingPage/Card';
import LandingLayout from '@/components/layouts/LandingLayout';
import { Inter } from '@next/font/google';
import Link from 'next/link';
import { TbLeaf, TbTrophy, TbRecycle } from 'react-icons/tb';
import { IoEnterOutline } from 'react-icons/io5';
import naturalSlide from 'public/natural-slide1.svg';
import achievSlide from 'public/achievement-slide2.svg';
import mobileSlide from 'public/mobile-slide.svg'
import Slider from '@/components/Slider';

const inter = Inter({ subsets: ['latin'] });

const slides = [
  {
    image: naturalSlide,
    title: 'Slide 1 Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo velit nisl, quis tempor tellus aliquam a. Mauris commodo consequat dolor at vulputate. Aenean ullamcorper gravida leo, non iaculis ipsum consectetur in.',
  },
  {
    image: achievSlide,
    title: 'Slide 2 Title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo velit nisl, quis tempor tellus aliquam a. Mauris commodo consequat dolor at vulputate. Aenean ullamcorper gravida leo, non iaculis ipsum consectetur in.',
  },
  {
    image: mobileSlide,
    title: 'Responsivo e atualizado',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo velit nisl, quis tempor tellus aliquam a. Mauris commodo consequat dolor at vulputate. Aenean ullamcorper gravida leo, non iaculis ipsum consectetur in.',
  },
];

export default function Home() {
  return (
    <>
      <LandingLayout>
        {/* Card Section */}
        <section className="py-12 px-8 mb-40">
          <div className="mx-auto md:max-w-6xl">
            <div className="text-center mb-16 mx-8 md:mx-0">
              <span className="uppercase font-bold text-md mb-2 block">
                rede social sustentável
              </span>
              <h2 className="text-4xl font-bold">Ajude o mundo e se divirta</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-16 mx-8 md:mx-0">
              <Card
                content="Premiações, descontos e cupons, somente preservando e ajudando a natureza"
                title="Ganhe recompensas e conquistas"
                Icon={TbLeaf}
              />
              <Card
                content="Descubra todos os lugares próximos para o despojamento de medicamentos e pilhas"
                title="Descarte no lugar ideal"
                Icon={TbRecycle}
                btn="Explore os lugares de descarte"
                href="/signup"
              />
              <Card
                content="Fique no topo do ranking entre seu círculo de amigos como o mais ecologicamente sustentável"
                title="Concorra entre seus amigos"
                Icon={TbTrophy}
              />
            </div>
          </div>
        </section>

        {/* Slider Section */}
        <section>
          <div className="mx-auto max-w-5xl">
            <div>
              <span className="uppercase font-bold text-md mb-2 block">
                interativo e responsivo
              </span>
              <h2 className="text-4xl font-bold leading-snug">
                Construa relações atráves <br /> da sustentabilidade
              </h2>
            </div>
            <Slider slides={[...slides]} />
          </div>
        </section>
        {/* Responsive */}
        <section className="py-16">
          <div className="bg-gradient-to-b from-blue-800 to-purple-700">
            <div className="flex flex-col items-center justify-center p-8">
              <span className="block font-bold uppercase text-neutral-50 mb-2">
                conheça agora
              </span>
              <h3 className="font-bold text-2xl text-center text-violet-300 mb-4">
                Venha conhecer nossa comunidade
              </h3>
              <Link
                href="/cadastro"
                className="bg-white rounded py-2 px-4 font-bold flex items-center hover:text-violet-800 hover:shadow-lg hover:drop-shadow transition-all"
              >
                <IoEnterOutline size={32} className="mr-2" /> Cadastre-se
              </Link>
            </div>
          </div>
        </section>
      </LandingLayout>
    </>
  );
}
