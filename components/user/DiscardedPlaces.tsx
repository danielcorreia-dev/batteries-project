import React from 'react';

type Company = {
  title: string;
}[];

interface Props {
  companies: Company;
}

const DiscardedPlaces = ({ companies }: Props) => {
  return companies.length > 0 ? (
    <div className="flex flex-col">
      <div className="max-w-7xl">
        <ul>
          {companies.map((company, index) => (
            <li key={index} className="block w-full mb-4">
              <h2 className="font-semibold text-lg">{company.title}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-lg mb-10 py-2">
        Você não descartou em nenhuma empresa ainda
      </h1>
    </div>
  );
};

export default DiscardedPlaces;
