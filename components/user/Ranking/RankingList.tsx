import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { BsGlobe, BsToggleOff } from 'react-icons/bs';
import { IoCaretBack } from 'react-icons/io5';
import RankingItem from './RankingItem';

type Props = {
  users: any[];
};

const RankingList: FC<Props> = ({ users }) => {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen">
      <div className="flex flex-col w-full p-4 max-w-4xl mx-auto py-8">
        <div className="flex-col justify-start md:max-w-4xl py-8">
          <div className="mb-4 flex space-x-4 items-center">
            <BsGlobe size={48} className="text-blue-500" />
            <h2 className="text-4xl font-semibold">Ranking Global</h2>
          </div>
          <div className="flex-col justify-start items-start">
            <p className="text-sm text-gray-500 mb-4">
              Lista de jogadores com maiores pontos no ranking global
            </p>
          </div>
        </div>
        {users ? (
          <div className="px-1 overflow-y-auto max-h-[46rem] scrollbar-thumb-gray-200 scrollbar-track-slate-100 scrollbar-thin scrollbar-corner-transparent scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
            <div className="flex-col space-y-2 ">
              {users
                .sort((a: any, b: any) => b.totalScore - a.totalScore)
                .map((user, index) => (
                  <RankingItem key={user.id} user={user} index={index + 1} />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <BsToggleOff size={48} className="text-gray-400" />
            <p className="text-gray-400 text-xl mt-4">
              Nenhum usuário encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingList;
