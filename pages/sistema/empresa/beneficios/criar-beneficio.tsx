import CompanyBenefitForm from '@/components/company/CompanyBenefitForm';
import UserLayout from '@/layouts/UserLayout';
import { useRouter } from 'next/router';
import React from 'react';
import { IoCaretBack } from 'react-icons/io5';

type Props = {};

const CriarBeneficio = (props: Props) => {
  const router = useRouter();
  return (
    <UserLayout>
      <div className="w-full">
        <div className="relative w-full min-h-fit">
          <div className="flex-col justify-start md:max-w-3xl py-8 px-4">
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <div className="">
                  <h2 className="text-2xl font-semibold">Criar Benefício</h2>
                  <div className="flex-col justify-start items-start">
                    <p className="text-sm text-gray-500 mb-4">
                      Preencha os campos abaixo para criar um novo benefício.
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
            </div>
            <CompanyBenefitForm />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CriarBeneficio;
