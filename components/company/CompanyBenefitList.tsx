import React from 'react';
import CompanyBenefitListItem from './CompanyBenefitListItem';
import { IoCaretBack } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';

type BenefitProps = {
  id: number;
  benefit: string;
  description: string;
  scoreNeeded: number;
  active: boolean;
};

type Props = {
  benefits: BenefitProps[];
};

const CompanyBenefitList: React.FC<Props> = ({ benefits }) => {
  const router = useRouter();
  return (
    <div className="relative w-full min-h-fit">
      <div className="flex-col justify-start md:max-w-3xl py-8">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Benefícios</h2>
              <div className="flex-col justify-start items-start">
                <p className="text-sm text-gray-500 mb-4">
                  Lista de benefícios disponíveis para os colaboradores.
                </p>
              </div>
            </div>
            <div className="flex-col items-center justify-evenly">
              <button onClick={() => router.back()}>
                <div className="flex items-center justify-around border border-neutral-200 px-3 py-2 rounded hover:bg-neutral-200 transition-colors">
                  <IoCaretBack />
                  <p className="text-sm text-neutral-500">Voltar</p>
                </div>
              </button>
            </div>
          </div>
          <Link
            href={'/sistema/empresa/beneficios/criar-beneficio'}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded transition transition-300 ease-in-out"
          >
            Adicionar benefício
          </Link>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-4">
            Número de benefícios cadastrados: <span>{benefits.length}</span>
          </p>
        </div>
        {benefits.length === 0 && (
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-500 mb-4">
              Nenhum benefício cadastrado
            </p>
          </div>
        )}
        {benefits?.sort().map((benefit, index) => (
          <CompanyBenefitListItem benefitItem={benefit} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CompanyBenefitList;
