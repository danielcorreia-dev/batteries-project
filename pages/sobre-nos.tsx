import ContentSection from '@/components/landingPage/ContentSection';
import Header from '@/components/landingPage/Header';
import LandingLayout from '@/layouts/LandingLayout';
import TeamAboutUs from '@/public/about-us/team-about-us.svg';
import Mission from '@/public/about-us/mission.svg';
import TeamWork from '@/public/about-us/team-work.svg';

const sectionItems = [
  {
    image: TeamAboutUs,
    alt: 'Ilustração - Equipe do projeto',
    title: 'Quem somos',
    content:
      'Somos uma equipe de estudantes graduandos em Sistemas de Informação e Análise e Desenvolvimento de Sistemas do Centro Universitário CESMAC, nos unimos com um propósito comum: desenvolver um projeto de iniciação científica inovador. O objetivo central do nosso projeto é criar um sistema de gerenciamento eficiente para o descarte apropriado de baterias e medicamentos, visando incentivar e simplificar o processo de descarte de forma ecologicamente responsável.',
  },
  {
    image: Mission,
    alt: 'Ilustração - Missão do projeto',
    title: 'Nossa missão com o projeto',
    content:
      'O nosso projeto tem como objetivo desenvolver um sistema eficiente para o gerenciamento adequado do descarte de baterias e medicamentos, buscando incentivar e tornar o processo de descarte mais prático e sustentável.',
  },
  {
    image: TeamWork,
    alt: 'Ilustração - Visão e aprendizado com o projeto',
    title: 'Nossa visão e aprendizado com o projeto',
    content:
      'A experiência vivenciada durante o projeto de iniciação científica trouxe consigo uma gama de aprendizados valiosos, tanto em termos técnicos quanto organizacionais. Esses conhecimentos adquiridos nos permitiram compreender a potencial aplicação do projeto na sociedade e como ele pode ser verdadeiramente benéfico para as pessoas.',
  },
];

const SobreNos = () => {
  return (
    <LandingLayout navColor="bg-gray-50">
      <Header title="Sobre nós" />
      <div className="flex flex-col space-y-16 w-full p-4 max-w-4xl items-center justify-center mx-auto py-24">
        {sectionItems.map((item, index) => {
          if (index === sectionItems.length - 1) {
            return (
              <ContentSection
                key={index}
                title={item.title}
                content={item.content}
                align={'center'}
                image={item.image}
                alt={item.alt}
              />
            );
          }
          return (
            <ContentSection
              key={index}
              title={item.title}
              content={item.content}
              align={index % 2 === 0 ? 'left' : 'right'}
              image={item.image}
            />
          );
        })}
      </div>
    </LandingLayout>
  );
};

export default SobreNos;
