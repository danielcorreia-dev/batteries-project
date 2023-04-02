import ProfileMain from "@/components/user/ProfileMain";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type Profile = {
  name: string,
  location: string,
  bio: string,
}

const Perfil = ({ profile }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <ProfileMain/>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/hello");
  const profile: Profile[] = await res.json();
  return {
    props: {
      profile,
    }
  }
};

export default Perfil