import UserLayout from '@/layouts/UserLayout';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import CompanyProfileMain from '@/components/company/CompanyProfileMain';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { BsCheck2Circle, BsPersonCheck } from 'react-icons/bs';
import ButtonCard from '@/components/ButtonCard';

const Perfil = ({
  companyData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const updatedCompanyData = {
    ...companyData,
    openHours: companyData.openingHours,
  };
  delete updatedCompanyData.openingHours;

  return (
    <>
      <UserLayout>
        <CompanyProfileMain companyProps={updatedCompanyData} />
        <div className="flex flex-col items-center py-8">
          <ButtonCard
            buttonProps={{
              icon: BsPersonCheck,
              color: 'text-blue-500',
              title: 'Pontuar usuário',
              description: 'Pontue um usuário por ter feito um descarte',
              link: '/sistema/empresa/pontuar',
            }}
          />
          <ButtonCard
            buttonProps={{
              icon: BsCheck2Circle,
              description: 'Crie um novo benefício para sua empresa',
              color: 'text-green-500',
              title: 'Criar benefício',
              link: '/sistema/empresa/beneficios/criar-beneficio',
            }}
          />
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = process.env.API_URL;
  const session = await getServerSession(context.req, context.res, authOptions);
  try {
    const userCompanyResponse = await fetch(
      `${api}/user/${session?.user.id}/company`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    if (!userCompanyResponse.ok) {
      throw new Error(
        `Failed to fetch company data: ${userCompanyResponse.status}`
      );
    }

    const companyData = await userCompanyResponse.json();
    const companyID = companyData.id;

    const companyBenefitsResponse = await fetch(
      `${api}/company/${companyID}/profile`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    const companyProfile = await companyBenefitsResponse.json();
    const companyBenefits = companyProfile[0].benefit;

    Object.assign(companyData, { benefits: companyBenefits });

    return {
      props: {
        companyData,
      },
    };
  } catch (error: any) {
    console.log('Error fetching company data:', error);

    return {
      props: {
        error: {
          message: 'Failed to fetch company data',
          details: error.message,
        },
      },
    };
  }
};

export default Perfil;
