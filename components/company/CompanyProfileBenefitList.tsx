import React, { FC } from 'react';
import { BsAward } from 'react-icons/bs';
import { MdOutlineHighlightOff } from 'react-icons/md';
import { RiEmotionSadLine } from 'react-icons/ri';

type Benefits = {
  benefit: string;
  description: string;
  scoreNeeded: number;
  status: boolean;
};

type Props = {
  benefits: Benefits[];
};

const CompanyProfileBenefitList: FC<Props> = ({ benefits }) => {
  const hasBenefitsActive = benefits.some((benefit) => benefit.status);

  return benefits.length > 0 && hasBenefitsActive ? (
    <div className="w-full relative bg-neutral-100">
      <div className="p-4">
        <ul>
          {benefits
            .filter((benefit) => benefit.status)
            .map(({ benefit, description, scoreNeeded }, index) => (
              <li key={index} className="block w-full mb-2 p-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mr-5">
                      <BsAward size={24} className="text-blue-700" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{benefit}</h2>
                      <p className="text-sm text-gray-500"> {description}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">{scoreNeeded}</span>
                    <h2 className="text-sm text-gray-500">
                      Pontos necessários
                    </h2>
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
        <MdOutlineHighlightOff />
        <h1 className="text-md py-2">
          Essa empresa não possui benefícios ativos
        </h1>
      </div>
    </div>
  );
};

export default CompanyProfileBenefitList;
