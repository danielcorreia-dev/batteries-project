import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import UserLayout from '@/components/layouts/UserLayout';
import ChangePassword from '@/components/configurations/user/ChangePassword';
import DeleteAccount from '@/components/configurations/user/DeleteAccount';
import UserInfo from '@/components/configurations/user/UserInfo';
import TabComponent from '@/components/configurations/user/TabConfiguration';

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
