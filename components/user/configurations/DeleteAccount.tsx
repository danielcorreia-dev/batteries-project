import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface FormValues {
  password: string;
}

const initialValues: FormValues = {
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      'Senhas devem conter ao menos uma letra maiúscula e um caractere especial'
    )
    .min(8, 'Senhas devem conter ao menos 8 caracteres')
    .required('Você precisa inserir a sua senha'),
});

const DeleteAccount = () => {
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
                  // onClick={handleConfirmDelete}
                >
                  Deletar Conta
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setShowConfirmation(true)}
        >
          Deletar Conta
        </button>
      </div>
    );
  };

  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const onSubmit = async () => {};

  return (
    <>
      <div className="py-2 pb-10">
        <h1 className="font-bold text-2xl">Deletar sua conta</h1>
      </div>
      <div className="max-w-2xl mb-4">
        <ol className="max-w-xl">
          <li className="mb-2">
            <b>Perda de dados</b>: Ao excluir sua conta, todos os dados
            associados a ela serão permanentemente removidos de nossos sistemas.
            Isso inclui informações pessoais, histórico de atividades,
            configurações personalizadas e qualquer pontuação que você tenha
            adquirido.
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
    </>
  );
};

export default DeleteAccount;
