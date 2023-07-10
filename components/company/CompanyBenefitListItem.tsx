import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsAward, BsPencilSquare, BsTrash3 } from 'react-icons/bs';
import DeleteAccount from '../configurations/user/DeleteAccount';
import { RiCloseLine } from 'react-icons/ri';
import CompanyBenefitForm from './CompanyBenefitForm';
import { toast } from 'react-toastify';
import router from 'next/router';
import { setDefaultResultOrder } from 'dns';
import CompanyBenefitDeleteModal from './CompanyBenefitDeleteModal';
import CompanyBenefitEditForm from './CompanyBenefitEditForm';

type BenefitProps = {
  id: number;
  benefit: string;
  description: string;
  scoreNeeded: number;
  status: boolean;
};

type Props = {
  benefitItem: BenefitProps;
};

const CompanyBenefitListItem: React.FC<Props> = ({ benefitItem }) => {
  const { id, benefit, description, scoreNeeded, status } = benefitItem;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(status);

  const handleDeleteBenefit = async (id: number) => {
    setIsDelete(false);
    setIsLoading(true);
    try {
      await toast.promise(
        (async () => {
          const response = await fetch('/api/company/delete-benefit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
          }

          if (response.ok) {
            setTimeout(() => {
              router.reload();
            }, 1000);
          }
        })(),
        {
          pending: 'Deletando benefício...',
          success: 'Benefício deletado com  successo',
          error: 'Falha ao deletar o benefício, tente novamente mais tarde',
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBenefitStatus = async (id: number, status: boolean) => {
    setIsLoading(true);
    const newStatus = !status;
    try {
      const response = await fetch('/api/company/activate-benefit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
      }

      if (response.ok) {
        toast.success(
          `Benefício ${newStatus ? 'ativado' : 'desativado'} com sucesso`
        );
        setIsActive(newStatus);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setIsLoading(true);
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
      }

      if (response.ok) {
        toast.success('Benefício criado com sucesso');
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
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50"></div>
      )}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white min-w-fit w-2/12 min-h-fit rounded-lg">
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
                <CompanyBenefitEditForm id={id} initialValues={benefitItem} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full border-b py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="flex flex-row items-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded-full">
                <BsAward size={24} />
              </div>
              <div className="flex flex-col items-center md:items-start mb-2 md:mb-0">
                <h3 className="text-lg font-semibold">{benefit}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
            <div className="flex flex-col md:items-start justify-center items-center mb-2 md:mb-0">
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
                    'text-green-500': isActive,
                    'text-red-500': !isActive,
                  })}
                >
                  {!isActive ? 'Inativo' : 'Ativo'}
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center transition ease-in-out">
              <button
                title={isActive ? 'Desativar benefício' : 'Ativar benefício'}
                onClick={() => toggleBenefitStatus(id, isActive)}
                className="px-4 py-2 text-blue-500 hover:bg-gray-100 rounded transition transition-300 ease-in-out"
              >
                {isActive ? 'Desativar' : 'Ativar'}
              </button>
              <button
                title="Editar benefício"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-500 hover:bg-gray-100 rounded transition transition-300 ease-in-out"
              >
                <BsPencilSquare />
              </button>
              <button
                className="px-4 py-2 text-red-500 hover:bg-gray-100 rounded transition transition-300 ease-in-out"
                onClick={() => setIsDelete(true)}
              >
                <BsTrash3 title="Excluir benefício" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <CompanyBenefitDeleteModal
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        onDelete={() => handleDeleteBenefit(id)}
      />
    </>
  );
};

export default CompanyBenefitListItem;
