import UserLayout from '@/layouts/UserLayout';
import SearchBar, { SearchProps } from '@/components/SearchBar';
import SearchBarArea from '@/components/SearchBarArea';
import GlobalSearchResult from '@/components/user/GlobalSearchResult';
import { useRouter } from 'next/router';

const Buscar = () => {
  const router = useRouter();
  const searchProps: SearchProps<any> = {
    placeholder: 'Procure por empresas',
    fetchData: async (query: string) => {
      const response = await fetch(`/api/company/with-title?query=${query}`);
      const data = await response.json();
      return data;
    },
    renderResult: (company: any) => {
      return <GlobalSearchResult company={company} />;
    },
    handleItemRouting(item) {
      router.push(`/sistema/empresa/${item.id}`);
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
