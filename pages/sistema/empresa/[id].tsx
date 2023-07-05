import CompanyProfileMain from '@/components/company/CompanyProfileMain';
import UserLayout from '@/layouts/UserLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

type CompanyProps = {
  title: string;
  id: any;
  address: string;
  phoneNumber: string;
  openingHours: string;
  benefits?: [];
};

type Props = {
  companyData?: CompanyProps | undefined;
  error?: {
    message: string;
    details: string;
  };
};

const idProfile = ({
  companyData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserLayout>
      <CompanyProfileMain companyProps={companyData[0]} />
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const api = process.env.API_URL;
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = context.params?.id as string;

  try {
    const userCompanyResponse = await fetch(`${api}/company/${id}/profile`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

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

export default idProfile;
