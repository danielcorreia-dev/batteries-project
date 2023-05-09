import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

const Perfil = (props: Props) => {
  const { data: session } = useSession();
  console.log(session?.user.nick);
  return (
    <>
      <div>{session?.user.nick}</div>
    </>
  );
};

export default Perfil;
