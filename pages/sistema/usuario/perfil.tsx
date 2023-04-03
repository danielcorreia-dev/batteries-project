import UserLayout from '@/components/layouts/UserLayout';
import ProfileMain from '@/components/user/ProfileMain';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type Profile = {
  name: string;
  location: string;
  bio: string;
  avatar: string;
  points: number;
  achievments: number;
  savedPlaces: number;
};

const Perfil = ({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <UserLayout>
        <ProfileMain
          name={profile.name}
          bio={profile.bio}
          location={profile.location}
          avatar={profile.avatar}
          points={profile.points}
          achievments={profile.achievments}
          savedPlaces= {profile.savedPlaces}
        />
      </UserLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const profile: Profile[] = await res.json();
  return {
    props: {
      profile,
    },
  };
};

export default Perfil;
