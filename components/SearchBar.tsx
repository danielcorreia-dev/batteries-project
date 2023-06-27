import useDebounce from '@/lib/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export type SearchProps<T> = {
  placeholder: string;
  fetchData: (query: string) => Promise<T[]>;
  renderResult: (item: T) => React.ReactNode;
  ref?: React.RefObject<HTMLInputElement>;
};

type Props<T> = {
  searchProps: SearchProps<T>;
};

const SearchBar = <T,>({ searchProps }: Props<T>) => {
  const { placeholder, fetchData, renderResult } = searchProps;

  const [result, setResult] = useState<T[]>([]);
  const [search, setSearch] = useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setLoading(true);
      setResult([]);

      try {
        const data = await fetchData(debouncedSearch || '');
        setResult(data);
        setLoading(false);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchDataFromAPI();
  }, [debouncedSearch, fetchData]);

  const handleItemClick = (item: T) => {
    const itemLabel = item.label || item.nick || item.toString();
    setSearch(itemLabel);
  };

  return (
    <div className="w-full">
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        onFocus={() => setHideSuggestions(true)}
        onBlur={() => setHideSuggestions(false)}
        value={search || ''}
        className="w-full self-stretch flex-1 py-2 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      {hideSuggestions &&
        search !== '' && ( // Added search !== '' check
          <div>
            {loading ? (
              <Skeleton count={3} height={12} />
            ) : (
              <ul>
                {result?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onMouseDown={() => handleItemClick(item)}
                      className="cursor-pointer"
                    >
                      {renderResult(item)}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;
