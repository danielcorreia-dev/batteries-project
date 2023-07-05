import { useEffect, useRef, useState } from 'react';
import CompanyEditModal from './CompanyEditModal';
import { RiCloseLine } from 'react-icons/ri';
import SaveModal from '@/components/user/SaveModal';

interface SectionProps {
  title: string;
  data: string | undefined;
}

type CompanyProps = {
  title: string;
  address: string;
  phoneNumber: string;
  openingHours: string;
  benefits?: [];
};

const SectionTab = ({ title, data }: SectionProps) => {
  return (
    <div className="block w-full mb-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="p-2 block bg-gray-200 rounded">
        <p>{data}</p>
      </div>
    </div>
  );
};

const CompanyInfo = ({ userData }: { userData: CompanyProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const { title, address, phoneNumber, openingHours } = userData;
  const editRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        editRef.current &&
        !editRef.current.contains(e.target as Node) &&
        e.target instanceof Element &&
        !e.target.classList.contains('pac-container')
      ) {
        // if (isEditing) {
        //   setShowQuitModal(true);
        // }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isEditing]);

  return (
    <>
      {showQuitModal && (
        <SaveModal
          isOpen={showQuitModal}
          onClose={() => setShowQuitModal(false)}
          onCloseAndQuit={() => {
            setIsEditing(false);
            setShowQuitModal(false);
          }}
        />
      )}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div
            ref={editRef}
            className="bg-white w-1/2 min-w-fit min-h-fit rounded-lg"
          >
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
                <CompanyEditModal companyValues={userData} />
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="font-bold text-2xl mb-10 py-2">Informações do Usuário</h1>
      <div className="">
        <div className="flex-col items-center mb-3">
          <SectionTab title="Nome da Empresa" data={title} />
          <SectionTab title="Endereço" data={address} />
          <SectionTab title="Número de contato" data={phoneNumber} />
          <SectionTab title="Horário de funcionamento" data={openingHours} />
        </div>
        <div className="mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
