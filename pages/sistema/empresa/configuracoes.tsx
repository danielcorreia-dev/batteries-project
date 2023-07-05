import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import TabComponent from '@/components/configurations/user/TabConfiguration';
import CompanyInfo from '@/components/configurations/company/CompanyInfo';
import UserLayout from '@/layouts/UserLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import CompanyDelete from '@/components/configurations/company/CompanyDelete';

const tabs = [
  {
    title: 'Informações da empresa',
    component: CompanyInfo,
  },
  {
    title: 'Deletar empresa',
    component: CompanyDelete,
  },
];

const CompanyConfigurations = ({
  companyData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(companyData);
  return (
    <UserLayout>
      <TabComponent tabs={tabs} userData={companyData} />
    </UserLayout>
  );
};

type CompanyProps = {
  title: string;
  id: any;
  address: string;
  phoneNumber: string;
  openingHours: string;
  benefits?: [];
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

    const companyData: CompanyProps = await userCompanyResponse.json();

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

export default CompanyConfigurations;
