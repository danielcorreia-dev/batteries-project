import type { GetServerSideProps } from 'next';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ButtonCard from '@/components/ButtonCard';
import UserLayout from '@/layouts/UserLayout';
import { TbWorldLatitude } from 'react-icons/tb';
import UserProfileMain from '@/components/user/UserProfileMain';
import { createPartiallyEmittedExpression } from 'typescript';
import { BsTrophyFill } from 'react-icons/bs';

type UserData = {
  nick: string;
  email: string;
  totalScore: string;
};

export type Company = {
  title: string;
  address: string;
  scores: number;
}[];

interface Props {
  userData: UserData;
  companies: Company;
}

const Perfil = ({ userData, companies }: Props) => {
  const { nick, totalScore } = userData;
  const companiesArray = [...companies];
  console.log(companies);

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
        <div className="flex flex-col items-center py-8">
          <ButtonCard
            buttonProps={{
              icon: TbWorldLatitude,
              color: 'text-blue-500',
              title: 'Descubra',
              description: 'Explore novas empresas na sua região',
              link: '/sistema/buscar',
            }}
          />
          <ButtonCard
            buttonProps={{
              icon: BsTrophyFill,
              color: 'text-blue-500',
              title: 'Ranking Global',
              description: 'Veja o ranking global de pontos',
              link: '/sistema/usuario/ranking',
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
        scores: company.scores,
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
