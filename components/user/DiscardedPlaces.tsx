import React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';
import { BiStore, BiStoreAlt } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { FaStore, FaStoreAlt } from 'react-icons/fa';

const randomIcons: IconType[] = [BiStoreAlt, BiStore, FaStore, FaStoreAlt];
const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];

type Company = {
  title: string;
  address: string;
  scores: number;
}[];

interface Props {
  companies: Company;
}

const DiscardedPlaces = ({ companies }: Props) => {
  return companies.length > 0 ? (
    <div className="w-full relative bg-neutral-100">
      <div className="p-4">
        <ul>
          {companies.map((company, index) => (
            <li key={index} className="block w-full mb-2 p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mr-5">
                    {React.createElement(randomIcon, {
                      className: 'w-6 h-6 text-blue-700',
                    })}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{company.title}</h2>
                    <p className="text-sm text-gray-500"> {company.address}</p>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">{company.scores}</span>
                  <h2 className="text-sm text-gray-500">Pontos</h2>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="w-full mt-6">
      <div className="flex flex-col items-center justify-center p-4">
        <RiEmotionSadLine />
        <h1 className="text-md py-2">
          Você não descartou em nenhuma empresa ainda
        </h1>
      </div>
    </div>
  );
};

export default DiscardedPlaces;
