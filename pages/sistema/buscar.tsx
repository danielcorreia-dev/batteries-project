import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import UserLayout from '@/components/layouts/UserLayout';
import Link from 'next/link';
import classNames from 'classnames';

interface Item {
  id: number;
  title: string;
}

const data: Item[] = [
  { id: 1, title: 'Pão de Açúcar' },
  { id: 2, title: 'ExtraFarma' },
  { id: 3, title: 'Nestlé Brasil' },
  { id: 4, title: 'Carrefour' },
  { id: 5, title: 'Farmácias Pague Menos' },
  { id: 6, title: 'Cargill' },
  { id: 7, title: 'Droga Raia' },
  { id: 8, title: 'JBS' },
  { id: 9, title: 'Walmart Brasil' },
  { id: 10, title: 'Ultrafarma' },
  { id: 11, title: 'Perdigão' },
  { id: 12, title: 'Drogasil' },
  { id: 13, title: 'Sadia' },
  { id: 14, title: 'DIA Supermercados' },
  { id: 15, title: 'Grupo Big' },
];

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function search(query: string) {
      setLoading(true);

      let results: Item[] = [];
      if (query) {
        results = data.filter((item) => {
          return item.title.toLowerCase().includes(query.toLowerCase());
        });
      }

      setResults(results);

      setLoading(false);
    }

    if (debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <UserLayout>
        <div className="border-x min-h-screen">
          <div className="flex-col flex-1 max-w-6xl w-max items-center justify-center py-4 px-6 overflow-y-auto">
            <input
              type="text"
              className="px-5 py-1 w-[50em] sm:px-5 sm:py-3 flex-1 text-neutral-800 bg-neutral-200 focus:bg-neutral-300 rounded focus:outline-none focus:ring-[1px] focus:ring-neutral-400 placeholder:text-zinc-400"
              value={query}
              onChange={handleChange}
              placeholder="O que você está a procura?"
            />
            <div className="mt-4">
              {loading ? <p>Loading...</p> : null}
              {results.map((item, index) => (
                <Link key={item.id} href={`/sistema/empresa/${item.id}`} className='flex items-center mb-2'>
                  <div className='h-16 w-16 relative mr-2'>
                    <Image src={`https://source.unsplash.com/random?$${Math.random}&stores`} alt={''} fill className='rounded-full'/>
                  </div>
                  <p
                    className={classNames(
                      'hover:text-gray-500 transition-colors px-2 py-4 mb-2 rounded',
                      { 'mb-0': index === results.length }
                    )}
                    key={item.id}
                  >
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default SearchBar;
