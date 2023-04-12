import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserLayout from '@/components/layouts/UserLayout';
import Link from 'next/link';
import classNames from 'classnames';

interface Item {
  id: number;
  title: string;
}

const data: Item[] = [
  { id: 1, title: 'Lorem Ipsum' },
  { id: 2, title: 'Dolor Sit Amet' },
  { id: 3, title: 'Consectetur Adipiscing Elit' },
  { id: 4, title: 'Sed Do Eiusmod Tempor Incididunt' },
  { id: 5, title: 'Ut Labore Et Dolore Magna Aliqua' },
  { id: 6, title: 'Ut Enim Ad Minim Veniam' },
  { id: 7, title: 'Quis Nostrud Exercitation Ullamco' },
  { id: 8, title: 'Laboris Nisi Ut Aliquip' },
  { id: 9, title: 'Ex Ea Commodo Consequat' },
  { id: 10, title: 'Duis Aute Irure Dolor In Reprehenderit' },
  { id: 11, title: 'Voluptate Velit Esse Cillum Dolore' },
  { id: 12, title: 'Fugiat Nulla Pariatur' },
  { id: 13, title: 'Excepteur Sint Occaecat Cupidatat' },
  { id: 14, title: 'Non Proident, Sunt In Culpa' },
  { id: 15, title: 'Qui Officia Deserunt Mollit Anim' },
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
                <Link key={item.id} href={`/sistema/empresa/${item.id}`}>
                  <p
                    className={classNames(
                      'hover:text-gray-500 hover:border-neutral-300 border border-transparent transition-colors px-2 py-4 mb-2 rounded',
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
