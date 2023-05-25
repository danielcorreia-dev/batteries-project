import { Form, Formik } from 'formik';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

type Props = {};

interface FormValues {
  presentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  presentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  presentPassword: Yup.string().required('Insira sua senha atual'),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      'Senhas devem conter ao menos uma letra maiúscula e um caractere especial'
    )
    .min(8, 'Senhas devem conter ao menos 8 caracteres')
    .required('Você precisa colocar uma senha nova'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'As senhas devem ser iguais')
    .required('Você precisa confirmar sua senha'),
});

const ChangePassword = ({}: Props) => {
  const onSubmit = async () => {
    return true;
  };

  return (
    <>
      <ToastContainer />
      <div className="py-2 mb-10">
        <h1 className="font-bold text-2xl">Altere sua senha</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="presentPassword" className="cursor-pointer">
                Senha atual
              </label>
              <input
                className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                type="password"
                name="presentPassword"
                id="presentPassword"
              />
              {touched.presentPassword && errors.presentPassword && (
                <span className="text-red-500">{errors.presentPassword}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="cursor-pointer">
                Nova senha
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              {touched.newPassword && errors.newPassword && (
                <span className="text-red-500">{errors.newPassword}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="cursor-pointer">
                Confirme sua nova senha
              </label>
              <input
                className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePassword;
