import UserLayout from '@/layouts/UserLayout';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import userSWR, { SWRConfig } from 'swr';
import { fetcher } from '@/lib/utils/fetcher';
import CompanyProfileMain from '@/components/company/CompanyProfileMain';

type ProfileData = {
  id: number;
  name: string;
  address: string;
};

export const getServerSideProps: GetServerSideProps<{
  fallback: { '/api/empresa/perfil': ProfileData };
}> = async () => {
  const profileInfo: ProfileData = await fetcher('/api/empresa/perfil');
  return {
    props: {
      fallback: {
        '/api/empresa/perfil': profileInfo,
      },
    },
  };
};

const Perfil = () => {
  const { data, error } = userSWR('/api/empresa/perfil', fetcher);
  return (
    <>
      <UserLayout>
        <CompanyProfileMain companyProps= {
          name: `${data.name}`,
          address: `${data.address}`,
        } />
      </UserLayout>
    </>
  );
};

export default Perfil;
