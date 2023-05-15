import { useSession } from 'next-auth/react';

interface SectionProps {
  title: string;
  data: string | undefined;
}

const SectionTab = ({ title, data }: SectionProps) => {
  return (
    <div className='block w-full'>
      <h2 className='font-semibold text-lg'>{title}</h2>
      <div className='p-2'>
        <p>{data}</p>

      </div>
    </div>
  );
};

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className='max-w-7xl'>
        <SectionTab title="Nome de Usuário" data={session?.user.nick} />
        <SectionTab title="Nome de Usuário" data={session?.user.nick} />
      </div>
    </>
  );
};

export default UserInfo;
