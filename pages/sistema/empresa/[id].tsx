import CompanyProfileMain from '@/components/company/CompanyProfileMain';
import UserLayout from '@/layouts/UserLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';
import { useRouter } from 'next/router';
import ButtonCard from '@/components/ButtonCard';
import { BsMap } from 'react-icons/bs';

type CompanyProps = {
  title: string;
  id: any;
  address: string;
  phoneNumber: string;
  openHours: string;
  benefits?: [];
  [key: string]: any;
};

type Props = {
  companyData?: CompanyProps;
  error?: {
    message: string;
    details: string;
  };
};

const IdProfile = ({
  companyData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const location = companyData?.address
    ? encodeURIComponent(companyData.address)
    : '';

  console.log(companyData);
  return (
    <>
      <UserLayout>
        <CompanyProfileMain companyProps={companyData} user={false} />
        <div className="flex flex-col items-center py-8">
          <ButtonCard
            buttonProps={{
              icon: BsMap,
              color: 'text-blue-500',
              title: 'Ver localização',
              description: 'Veja a localização da empresa no mapa',
              link: `https://www.google.com/maps/search/?api=1&query=${location}`,
              blank: true,
            }}
          />
        </div>
      </UserLayout>
    </>
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
      context.res.statusCode = 404;
      return {
        notFound: true,
      };
    }

    const companyDataArr: CompanyProps[] = await userCompanyResponse.json();

    const companyData = companyDataArr[0];

    if (!companyData || companyData.length === 0 || companyData === undefined) {
      return {
        notFound: true,
      };
    }

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

export default IdProfile;
