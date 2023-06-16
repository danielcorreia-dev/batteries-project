import UserLayout from '@/layouts/UserLayout';
import SearchBar from '@/components/SearchBar';

const Buscar = () => {
  const searchProps = {
    placeholder: 'Procure por empresas',
    fetchData: async (query: string) => {
      const response = await fetch(`/api/company/with-title?query=${query}`);
      const data = await response.json();
      return data;
    },
    renderResult: (company: any) => {
      return <span>{company.title}</span>;
    },
  };

  return (
    <>
      <UserLayout>
        <div>
          <SearchBar searchProps={searchProps} />
        </div>
      </UserLayout>
    </>
  );
};

export default Buscar;
