import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import UserLayout from '@/components/layouts/UserLayout';
import ChangePassword from '@/components/user/configurations/ChangePassword';
import DeleteAccount from '@/components/user/configurations/DeleteAccount';
import UserInfo from '@/components/user/configurations/UserInfo';
import TabComponent from '@/components/user/configurations/TabConfiguration';

interface UserData {
  nick: string;
  email: string;
  totalScore: string;
}

interface Props {
  userData?: UserData;
}

const tabs = [
  {
    title: 'Informações da conta',
    component: UserInfo,
  },
  {
    title: 'Trocar senha',
    component: ChangePassword,
  },
  {
    title: 'Deletar conta',
    component: DeleteAccount,
  },
];

const Configurations: React.FC<Props> = ({ userData }) => {
  return (
    <UserLayout>
      <TabComponent tabs={tabs} userData={userData} />
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);

  try {
    const response = await fetch(
      `https://batteries-backend.up.railway.app/user/${session?.user?.id}`
    );
    const userData: UserData = await response.json();

    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch user data',
      },
    };
  }
};

export default Configurations;
