import React from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndSave: () => void;
  ref: React.MutableRefObject<any>;
}

const DeleteCompanyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndSave,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-96 min-h-min h-1/6 flex flex-col justify-center items-center"
      overlayClassName={'absolute bg-black bg-opacity-50 inset-0'}
    >
      <div className="w-full">
        <div className="px-2">
          <h2 className="mb-4 text-center px-4">
            Você tem certeza que deseja <b>deletar</b> a sua empresa?
          </h2>
          <div className="flex justify-around w-full">
            <button
              className={
                'py-2 px-4 bg-blue-500 hover:bg-blue-700 transition-colors text-white rounded'
              }
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={
                'py-2 px-4 bg-red-500 hover:bg-red-700 transition-colors text-white rounded'
              }
              onClick={onCloseAndSave}
            >
              Deletar Empresa
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCompanyModal;
