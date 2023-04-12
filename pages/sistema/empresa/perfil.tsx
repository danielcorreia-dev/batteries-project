import CompanyProfileMain from '@/components/company/CompanyProfileMain';
import UserLayout from '@/components/layouts/UserLayout';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type Company = {
  name: string;
  location: string;
  bio: string;
  avatar: string;
  points: number;
  businessHours: string;
  contact: string;
};

const Perfil = ({
  company,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <UserLayout>
        <CompanyProfileMain
          name={company.name}
          bio={company.bio}
          location={company.location}
          avatar={company.avatar}
          points={company.points}
          businessHours={company.businessHours}
          contact={company.contact}
        />
      </UserLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/company');
  const company: Company[] = await res.json();

  return {
    props: {
      company,
    },
  };
};

export default Perfil;
