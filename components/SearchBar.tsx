import useDebounce from '@/lib/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export type SearchProps<T extends object> = {
  placeholder: string;
  fetchData: (query: string) => Promise<T[]>;
  renderResult: (item: T) => React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
  setValue?: (value: string) => void;
  setSelectedValue?: (value: T) => void;
  handleItemRouting?: (item: T) => void;
};

type Props<T extends object> = {
  searchProps: SearchProps<T>;
};

const SearchBar = <T extends object>({ searchProps }: Props<T>) => {
  const {
    placeholder,
    fetchData,
    renderResult,
    inputRef,
    setValue,
    handleItemRouting,
  } = searchProps;

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

  const handleItemClick = (item: T & { label?: string }) => {
    const itemLabel =
      item && ('label' in item ? item.label : (item as any).nick)
        ? (item as any)
        : (item as any).title || item.toString();

    setSearch(itemLabel);
    if (setValue) {
      setValue(itemLabel);
    }
    if (searchProps.setSelectedValue) {
      searchProps.setSelectedValue(item);
    }
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
        ref={inputRef}
        className="w-full self-stretch flex-1 py-2 px-4 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      {hideSuggestions && search !== '' && (
        <div>
          {loading ? (
            <Skeleton count={3} height={12} />
          ) : (
            <>
              {result.length === 0 ? (
                <div className="text-sm text-neutral-500">Sem resultados</div>
              ) : (
                <ul>
                  {result.map((item, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        if (handleItemRouting) {
                          handleItemRouting(item);
                        } else {
                          handleItemClick(item);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {renderResult(item)}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
