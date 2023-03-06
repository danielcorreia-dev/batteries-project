import Card from '@/components/landingPage/Card';
import LandingLayout from '@/components/layouts/LandingLayout';
import { Inter } from '@next/font/google';
import { TbLeaf, TbTrophy, TbRecycle } from 'react-icons/tb';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <LandingLayout>
        {/* Card Section */}
        <section className="mt-12">
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
                content="fklsdajflksaj"
                title="Descarte no lugar ideal"
                Icon={TbRecycle}
                btn="oie"
                href="/about"
              />
              <Card
                content="fklsdajflksaj"
                title="Concorra entre seus amigos"
                Icon={TbTrophy}
              />
            </div>
          </div>
        </section>
        {/* Responsive */}
        <section>
          
        </section>
      </LandingLayout>
    </>
  );
}
