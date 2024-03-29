import UserLayout from '@/components/layouts/UserLayout';
import { getSession } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import React from 'react';
import ProfileMain from '@/components/user/ProfileMain';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

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
        <ProfileMain
          profileProps={{
            name: nick,
            points: parseInt(totalScore),
            companies: companiesArray,
          }}
          // Pass other necessary props from the userData
        />
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
      console.log('Error fetching companies:', error);
    }

    const userData = await userDataResponse.json();

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
