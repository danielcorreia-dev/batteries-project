import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const DeleteAccount = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${session?.user.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        signOut();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.error('Conta deletada com sucesso!');
        push('/');
      } else {
        throw new Error('Erro ao deletar conta');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const DeletingPopUpBox = () => {
    return (
      <div>
        {showConfirmation ? (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-25"></div>
            <div className="bg-white p-8 rounded shadow-lg relative">
              <p className="text-lg font-bold mb-4">Confirmation</p>
              <p className="mb-6">
                Você tem certeza que deseja deletar a sua conta?
              </p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-300 hover:opacity-75 rounded mr-2 transition-all"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                  onClick={handleConfirmDelete}
                >
                  Deletar Conta
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          onClick={() => setShowConfirmation(true)}
        >
          Deletar Conta
        </button>
      </div>
    );
  };

  const [showConfirmation, setShowConfirmation] = React.useState(false);

  return (
    <>
      <ToastContainer />
      <div className="flex-1 roundedp-2">
        <div className="py-2 pb-10">
          <h1 className="font-bold text-2xl">Deletar sua conta</h1>
        </div>
        <div className="max-w-2xl mb-4 flex bg-red-200 p-4 rounded">
          <ol className="max-w-xl">
            <li className="mb-2">
              <b>Perda de dados</b>: Ao excluir sua conta, todos os dados
              associados a ela serão permanentemente removidos de nossos
              sistemas. Isso inclui informações pessoais, histórico de
              atividades, configurações personalizadas e qualquer pontuação que
              você tenha adquirido.
            </li>
            <li>
              <p className="text-gray-500 text-sm mb-4">
                Ao deletar sua conta, você perderá todos os seus dados e não
                poderá recuperá-los.
              </p>
            </li>
          </ol>
        </div>
        <DeletingPopUpBox />
      </div>
    </>
  );
};

export default DeleteAccount;
