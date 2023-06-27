import React from 'react';
import SearchBar, { SearchProps } from '../SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoCaretBack } from 'react-icons/io5';

type Props = {};

type User = {
  nick: string;
};

const CompanyGrantBenefitPointsForTheUser = (props: Props) => {
  const router = useRouter();
  const searchProps: SearchProps<User> = {
    placeholder: 'Procure um usuário',
    fetchData: async (query: string) => {
      const response = await fetch(`/api/user/search?q=${query}`);
      const data: User[] = await response.json();
      return data;
    },
    renderResult: (user: User) => {
      return <span>{user.nick}</span>;
    },
  };

  return (
    <div className="w-full h-screen relative border-x border-neutral-200 max-w-3xl">
      <div className="flex items-center max-w-3xl px-6 mt-12">
        <div className="flex-col p-5 w-full">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Pontuar</h1>
              <p className="text-sm text-neutral-500">
                Pontue um usuário para que ele possa trocar por benefícios
              </p>
            </div>
            <div>
              <button onClick={() => router.back()}>
                <div className="flex items-center justify-around border border-neutral-200 px-3 py-2 rounded hover:bg-neutral-200 transition-colors">
                  <IoCaretBack />
                  <p className="text-sm text-neutral-500">Voltar</p>
                </div>
              </button>
            </div>
          </div>
          <div className="mt-6 flex-col">
            <SearchBar searchProps={searchProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyGrantBenefitPointsForTheUser;
