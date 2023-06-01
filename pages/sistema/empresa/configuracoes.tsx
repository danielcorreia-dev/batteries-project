import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import UserLayout from '@/components/layouts/UserLayout';
import ChangePassword from '@/components/configurations/user/ChangePassword';
import DeleteAccount from '@/components/configurations/user/DeleteAccount';
import UserInfo from '@/components/configurations/user/UserInfo';
import TabComponent from '@/components/configurations/user/TabConfiguration';
import CompanyInfo from '@/components/configurations/company/CompanyInfo';

interface CompanyData {
  nick: string;
  email: string;
  totalScore: string;
}

interface Props {
  companyData?: CompanyData;
}

const tabs = [
  {
    title: 'Informações da empresa',
    component: CompanyInfo,
  },
  // {
  //   title: 'Trocar senha',
  //   component: ChangePassword,
  // },
  // {
  //   title: 'Deletar conta',
  //   component: DeleteAccount,
  // },
];

const Configurations: React.FC<Props> = ({ companyData }) => {
  return (
    <UserLayout>
      <TabComponent tabs={tabs} userData={companyData} />
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
    const companyData: CompanyData = await response.json();

    return {
      props: {
        companyData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch company data',
      },
    };
  }
};

export default Configurations;
