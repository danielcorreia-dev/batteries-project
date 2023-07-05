import classNames from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsAward, BsPencilSquare, BsTrash3 } from 'react-icons/bs';
import DeleteAccount from '../configurations/user/DeleteAccount';
import { RiCloseLine } from 'react-icons/ri';
import CompanyBenefitForm from './CompanyBenefitForm';
import { ToastContainer, toast } from 'react-toastify';
import router from 'next/router';

type BenefitProps = {
  id: number;
  benefit: string;
  description: string;
  scoreNeeded: number;
  active: boolean;
};

type Props = {
  benefitItem: BenefitProps;
};

const deleteBenefit = async (id: number) => {};

const handleUpdate = async () => {
  try {
    const response = await fetch('/api/company/update-benefit', {
      method: 'POST',
      body: JSON.stringify({
        id,
        benefit,
        description,
        scoreNeeded,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setFieldError('benefit', data.message);
    }

    if (response.ok) {
      toast.success('Benefício criado com sucesso');
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  } catch (e) {
    console.error(e);
  }
};

const CompanyBenefitListItem: React.FC<Props> = ({ benefitItem }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id, benefit, description, scoreNeeded, active } = benefitItem;
  return (
    <>
      <ToastContainer />
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white min-w-fit min-h-fit rounded-lg">
            <div className="py-4 px-6 w-full">
              <div className="mb-4 flex justify-between">
                <h1 className="text-lg font-semibold">Editar</h1>
                <RiCloseLine
                  size={40}
                  className="cursor-pointer inline-block rounded-lg p-2 hover:bg-neutral-200 transition-colors"
                  onClick={() => setIsEditing(false)}
                />
              </div>
              <div className="flex justify-center min-w-max w-full">
                <CompanyBenefitForm
                  initialValues={benefitItem}
                  onSubmit={handleUpdate}
                  edit={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full border-b py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-center items-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded-full">
                <BsAward size={24} />
              </div>
              <div className="flex flex-col items-center md:items-start mb-2 md:mb-0">
                <h3 className="text-lg font-semibold">{benefit}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <div className="flex flex-col md:items-start items-center mb-2 md:mb-0">
              <div className="flex items-center md:flex-row md:items-center">
                <p className="text-sm text-gray-500 mr-2">
                  Pontuação necessária:
                </p>
                <p className="text-sm text-orange-500 font-semibold">
                  {scoreNeeded}
                </p>
              </div>
              <div className="flex md:flex-row md:items-center">
                <p className="text-sm text-gray-500 mr-2">Status:</p>
                <p
                  className={classNames(`text-sm text-gray-500 `, {
                    'text-green-500': active,
                    'text-red-500': !active,
                  })}
                >
                  {active ? 'Ativo' : 'Inativo'}
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center transition ease-in-out">
              <button
                title="Editar benefício"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-500 hover:bg-gray-100 rounded transition transition-300 ease-in-out"
              >
                <BsPencilSquare />
              </button>
              <button className="px-4 py-2 text-red-500 hover:bg-gray-100 rounded transition transition-300 ease-in-out">
                <BsTrash3 title="Excluir benefício" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyBenefitListItem;
