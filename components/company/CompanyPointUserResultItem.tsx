import React from 'react';

type Props = {
  name: string;
};

const CompanyPointUserResultItem: React.FC<Props> = ({ name }) => {
  return (
    <div className="w-full mb-4">
      <div className="px-2 py-4 bg-neutral-100 border border-gray-200 rounded">
        <div className="flex justify-between items-center">
          <p className="text-neutral-900"> {name}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyPointUserResultItem;
