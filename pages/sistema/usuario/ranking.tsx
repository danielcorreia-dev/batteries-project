import RankingList from '@/components/user/Ranking/RankingList';
import UserLayout from '@/layouts/UserLayout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import React, { FC } from 'react';

type Props = {
  users: any[];
};

const Ranking: FC<Props> = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserLayout>
      <div className="w-full md:p-0 px-8 border-l-[1px] border-1 border-neutral-200">
        <div className="px-6">
          <RankingList users={users} />
        </div>
      </div>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = process.env.API_URL;
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    const allUsersResponse = await fetch(`${api}/user`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

    if (!allUsersResponse.ok) {
      throw new Error('Failed to fetch users');
    }

    const users: any = await allUsersResponse.json();

    return {
      props: {
        users,
      },
    };
  } catch (error: any) {
    console.log('Error fetching users:', error);

    return {
      props: {
        error: {
          message: 'Failed to fetch users',
          details: error.message,
        },
      },
    };
  }
};

export default Ranking;
