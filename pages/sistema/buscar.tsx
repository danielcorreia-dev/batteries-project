import UserLayout from '@/layouts/UserLayout';
import SearchBar from '@/components/SearchBar';
import SearchBarArea from '@/components/SearchBarArea';

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
        <SearchBarArea>
          <SearchBar searchProps={searchProps} />
        </SearchBarArea>
      </UserLayout>
    </>
  );
};

export default Buscar;
