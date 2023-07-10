import React, { useState } from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const CompanyBenefitDeleteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-96 min-h-min h-1/6 flex flex-col justify-center items-center"
    >
      <div className="text-center">
        <h2 className="mb-6">Tem certeza que deseja deletar este benefício?</h2>
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
            onClick={onDelete}
          >
            Deletar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CompanyBenefitDeleteModal;
