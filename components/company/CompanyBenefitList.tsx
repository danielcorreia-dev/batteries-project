import React, { useEffect, useState } from 'react';
import CompanyBenefitListItem from './CompanyBenefitListItem';
import { IoCaretBack } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsToggleOff } from 'react-icons/bs';
import { toast } from 'react-toastify';

type BenefitProps = {
  id: number;
  benefit: string;
  description: string;
  scoreNeeded: number;
  status: boolean;
};

type Props = {
  benefits: BenefitProps[];
  companyId: number;
};

const CompanyBenefitList: React.FC<Props> = ({ benefits, companyId }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBenefitsDeactivated, setAllBenefitsDeactivated] =
    useState<boolean>(false);

  const handleDeactivateAllBenefits = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/company/deactivate-all-benefits', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
      }

      if (response.ok) {
        toast.success('Benefícios desativados com sucesso');
        setTimeout(() => {
          router.reload();
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full min-h-fit">
        <div className="flex-col justify-start md:max-w-4xl py-8">
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
          <div className="flex justify-between items-baseline">
            <p className="text-sm text-gray-500 mb-4">
              Número de benefícios cadastrados: <span>{benefits.length}</span>
            </p>
            <button
              className="text-sm px-2 py-4 text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-2"
              onClick={handleDeactivateAllBenefits}
            >
              <BsToggleOff />
              <span>Desativar todos os benefícios</span>
            </button>
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
    </>
  );
};

export default CompanyBenefitList;
