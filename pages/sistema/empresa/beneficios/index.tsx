import CompanyBenefitList from '@/components/company/CompanyBenefitList';
import UserLayout from '@/layouts/UserLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import React, { FC } from 'react';

type Benefit = {
  id: number;
  benefit: string;
  description: string;
  scoreNeeded: number;
  status: boolean;
};

const benefit = [
  {
    id: 1,
    title: 'Benefício 1',
    description: 'Descrição do benefício 1',
    scoreNeeded: 100,
    active: true,
  },
  {
    id: 2,
    title: 'Benefício 1',
    description: 'Descrição do benefício 1',
    scoreNeeded: 100,
    active: true,
  },
  {
    id: 3,
    title: 'Benefício 1',
    description: 'Descrição do benefício 1',
    scoreNeeded: 100,
    active: true,
  },
  {
    id: 4,
    title: 'Benefício 1',
    description: 'Descrição do benefício 1',
    scoreNeeded: 100,
    active: true,
  },
  {
    id: 5,
    title: 'Benefício 1',
    description: 'Descrição do benefício 1',
    scoreNeeded: 100,
    active: true,
  },
  {
    id: 6,
    title: 'Benefício 1',
    description: 'Descrição do benefício 1',
    scoreNeeded: 100,
    active: true,
  },
];

type Props = {
  companyBenefits: Benefit[];
  companyId: number;
};

const Beneficios: FC<Props> = ({
  companyBenefits,
  companyId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserLayout>
      <div className="w-full md:p-0 px-8 border-l-[1px] border-1 border-neutral-200">
        <div className="px-6">
          <CompanyBenefitList
            benefits={companyBenefits}
            companyId={companyId}
          />
        </div>
      </div>
    </UserLayout>
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
    const companyBenefitsResponse = await fetch(
      `${api}/company/${companyData.id}/profile`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    const companyProfile = await companyBenefitsResponse.json();
    const companyBenefits = companyProfile[0].benefit;

    return {
      props: {
        companyId: companyData.id,
        companyBenefits,
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

export default Beneficios;
