import React from 'react';

const DeleteAccount = () => {
  return (
    <>
      <div className="py-2 mb-10">
        <h1 className="font-bold text-2xl">Deletar sua conta</h1>
      </div>
      <div>
        <p className="text-gray-500 text-sm">
          Ao deletar sua conta, você perderá todos os seus dados e não poderá
          recuperá-los.
        </p>
        <ol>
          <li>
            Perda de dados: Ao excluir sua conta, todos os dados associados a
            ela serão permanentemente removidos de nossos sistemas. Isso inclui
            informações pessoais, histórico de atividades, configurações
            personalizadas e qualquer pontuação que você tenha adquirido.
          </li>
          <li></li>
          <li></li>
        </ol>
      </div>
    </>
  );
};

export default DeleteAccount;
