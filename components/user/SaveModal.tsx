import React, { useState } from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndQuit: () => void;
}

const SaveModal: React.FC<Props> = ({ isOpen, onClose, onCloseAndQuit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-96 min-h-min h-1/6 flex flex-col justify-center items-center"
    >
      <div>
        <h2 className="mb-4">Tem certeza que deseja sair sem salvar?</h2>
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
            onClick={onCloseAndQuit}
          >
            Sair sem salvar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveModal;
