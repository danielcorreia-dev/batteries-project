import React, { FC } from 'react';
import { BsAward } from 'react-icons/bs';
import { useSession } from 'next-auth/react';

type User = {
  id: number;
  nick: string;
  avatar: string;
  totalScore: number;
  index: number;
};

type Props = {
  user: User;
  index: number;
};

const podium = ['text-yellow-500', 'text-gray-500', 'text-amber-800'];

const RankingItem: FC<Props> = ({ user, index }) => {
  const { data: session, status } = useSession();

  return (
    <div className="relative w-full">
      <div
        className={`py-4 px-4 border rounded ${
          session?.user.id === user.id && 'bg-neutral-100/70 shadow-md '
        }`}
      >
        <div className="grid grid-flow-col gap-2">
          <div className="flex gap-4 items-center">
            <span
              className={`font-semibold text-xl ${
                session?.user.id === user.id && 'text-blue-600 font-semibold'
              }`}
            >
              {index}°
            </span>
            <div className={`text-center`}>
              <span
                className={`${
                  session?.user.id === user.id && 'text-blue-600 font-semibold'
                }`}
              >
                {user.nick}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end text-lg font-semibold">
            <div className="flex gap-5">
              {index <= 3 && (
                <BsAward size={28} className={`${podium[index - 1]}`} />
              )}
              <span
                className={`${
                  session?.user.id === user.id && 'text-blue-600 font-semibold'
                }`}
              >
                {user.totalScore}
              </span>
            </div>
            <span className="text-sm text-neutral-500 font-normal">Pontos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
