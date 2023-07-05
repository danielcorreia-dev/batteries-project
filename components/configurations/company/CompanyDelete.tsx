import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import DeleteCompanyModal from './DeleteCompanyModal';
import { useRouter } from 'next/router';

type CompanyProps = {
  title: string;
  address: string;
  phoneNumber: string;
  openingHours: string;
  id: number;
  benefits?: [];
};

const CompanyDelete = ({ userData }: { userData: CompanyProps }) => {
  const { push } = useRouter();
  const companyModal = useRef<HTMLElement>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        companyModal.current &&
        !companyModal.current.contains(e.target as Node)
      ) {
        if (isConfirming) {
          setIsConfirming(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isConfirming]);

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/company/delete`, {
        method: 'POST',
        body: JSON.stringify({
          id: `${userData.id}`,
        }),
      });
      if (res.ok) {
        console.log('deletou');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success('Sua empresa foi deletada com sucesso');
        push('/sistema/empresa/deslogar');
      } else {
        toast.error('Erro ao deletar a sua empresa');
        throw new Error('Erro ao deletar conta');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex-1 rounded-2">
        <div className="py-2 pb-10">
          <h1 className="font-bold text-2xl">Deletar sua empresa</h1>
        </div>
        <div className="max-w-2xl mb-4 flex bg-red-200 p-4 rounded">
          <ol className="max-w-xl">
            <li className="mb-2">
              <b>Perda de dados</b>: Ao excluir sua empresa, todos os dados
              associados a ela serão permanentemente removidos de nossos
              sistemas.
            </li>
            <li>
              <p className="text-gray-500 text-sm mb-4">
                Ao deletar sua empresa, você perderá todos os seus dados
                associados a ela e não poderá recuperá-los.
              </p>
            </li>
          </ol>
        </div>
        <div className="flex justify-start">
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={() => {
              setIsConfirming(true);
            }}
          >
            Deletar Empresa
          </button>
        </div>
        <DeleteCompanyModal
          ref={companyModal}
          isOpen={isConfirming}
          onClose={() => setIsConfirming(false)}
          onCloseAndSave={() => {
            setIsConfirming(false);
            handleConfirmDelete();
          }}
        />
      </div>
    </>
  );
};

export default CompanyDelete;
