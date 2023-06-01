interface SectionProps {
  title: string;
  data: string | undefined;
}
interface UserData {
  nick: string;
  email: string;
}

const SectionTab = ({ title, data }: SectionProps) => {
  return (
    <div className="block w-full mb-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="p-2 block bg-gray-200 rounded">
        <p>{data}</p>
      </div>
    </div>
  );
};

const CompanyInfo = ({ userData }: { userData: UserData }) => {
  const { nick, email } = userData;

  return (
    <>
      <h1 className="font-bold text-2xl mb-10 py-2">Informações do Usuário</h1>
      <div className="max-w-7xl">
        <SectionTab title="Nome de Usuário" data={nick} />
        <SectionTab title="Email" data={email} />
      </div>
    </>
  );
};
export default CompanyInfo;
