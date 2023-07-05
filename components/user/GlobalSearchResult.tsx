import React from 'react';
import { BiStore, BiStoreAlt } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { FaStore, FaStoreAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

const randomIcons: IconType[] = [BiStoreAlt, BiStore, FaStore, FaStoreAlt];
const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];

type Company = {
  id: number;
  title: string;
  address: string;
};

interface Props {
  company: Company;
}

const DiscardedPlaces = ({ company }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/company/${company.id}`)}
      className="w-full relative bg-neutral-100 mb-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-4">
        <ul>
          <li className="block w-full">
            <div className="flex">
              <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mr-5">
                {React.createElement(randomIcon, {
                  className: 'w-6 h-6 text-blue-700',
                })}
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-lg">{company.title}</h2>
                <p className="text-sm text-gray-500"> {company.address}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DiscardedPlaces;
