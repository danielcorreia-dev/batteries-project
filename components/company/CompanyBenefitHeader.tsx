import { useRouter } from 'next/router';
import React from 'react';
import { IoCaretBack } from 'react-icons/io5';

type Props = {};

const CompanyBenefitHeader = (props: Props) => {
  const router = useRouter();
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Benefícios</h2>
          <div className="flex-col justify-start items-start">
            <p className="text-sm text-gray-500 mb-4">
              Lista de benefícios disponíveis para os colaboradores.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <button onClick={() => router.back()}>
            <div className="flex items-center justify-around border border-neutral-200 px-3 py-2 rounded hover:bg-neutral-200 transition-colors">
              <IoCaretBack />
              <p className="text-sm text-neutral-500">Voltar</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyBenefitHeader;
