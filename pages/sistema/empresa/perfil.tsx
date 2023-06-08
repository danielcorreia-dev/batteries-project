import UserLayout from '@/layouts/UserLayout';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils/fetcher';
import CompanyProfileMain from '@/components/company/CompanyProfileMain';
import ButtonCard from '@/components/ButtonCard';

const API = `https://batteries-backend.up.railway.app/company/1`;

type ProfileData = {
  id: number;
  name: string;
  address: string;
};

export const getServerSideProps: GetServerSideProps<{
  fallback: { [key: string]: ProfileData[] };
}> = async () => {
  const profileInfo: ProfileData[] = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: profileInfo,
      },
    },
  };
};

const Perfil = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, error } = useSWR(API, { fallbackData: fallback[API] });

  console.log(data);

  const companyData = {
    name: data?.[0]?.title,
    address: data?.[0]?.address,
  };

  return (
    <>
      <UserLayout>
        <ProfileMain />
        {/* <ButtonCard
          buttonProps={{ title: 'Criar benefício', link: 'sistema/beneficio' }}
        /> */}
      </UserLayout>
    </>
  );
};

export default Perfil;
