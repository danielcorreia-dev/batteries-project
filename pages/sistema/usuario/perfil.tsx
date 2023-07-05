import type { GetServerSideProps } from 'next';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ButtonCard from '@/components/ButtonCard';
import UserLayout from '@/layouts/UserLayout';
import { TbWorldLatitude } from 'react-icons/tb';
import UserProfileMain from '@/components/user/UserProfileMain';
import { createPartiallyEmittedExpression } from 'typescript';

type UserData = {
  nick: string;
  email: string;
  totalScore: string;
};

export type Company = {
  title: string;
}[];

interface Props {
  userData: UserData;
  companies: Company;
}

const Perfil = ({ userData, companies }: Props) => {
  const { nick, totalScore } = userData;
  const companiesArray = [...companies];

  return (
    <>
      <UserLayout>
        {/* Pass the necessary props to the ProfileMain component */}
        <UserProfileMain
          profileProps={{
            name: nick,
            points: parseInt(totalScore),
            companies: companiesArray,
          }}
          // Pass other necessary props from the userData
        />
        <div className="py-10">
          <ButtonCard
            buttonProps={{
              icon: TbWorldLatitude,
              color: 'text-blue-500',
              title: 'Descubra',
              description: 'Explore novas empresas na sua região',
              link: '/sistema/buscar',
            }}
          />
        </div>
      </UserLayout>
    </>
  );
};

export default Perfil;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const api = process.env.API_URL;

  try {
    const userDataResponse = await fetch(`${api}/user/${session?.user?.id}`);

    let companies = [];
    try {
      const companiesResponse = await fetch(
        `${api}/user/${session?.user?.id}/companies/with-points`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      companies = await companiesResponse.json();
    } catch (error) {
      console.error('Error fetching companies:', error);
    }

    const userData = await userDataResponse.json();
    companies = companies.map((company: any) => {
      return {
        title: company.company.title,
        address: company.company.address,
      };
    });
    return {
      props: {
        userData,
        companies,
      },
    };
  } catch (error) {
    console.log('Error fetching user data:', error);

    return {
      props: {
        error: 'Failed to fetch user data',
      },
    };
  }
};
