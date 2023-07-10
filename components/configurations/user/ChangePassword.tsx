import { useUserContext } from '@/contexts/UserProvider';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  presentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  email: '',
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
    .required('Você precisa colocar uma senha nova')
    .notOneOf(
      [Yup.ref('presentPassword'), null],
      'A nova senha deve ser diferente da atual'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'As senhas devem ser iguais')
    .required('Você precisa confirmar sua senha'),
});

const ChangePassword = () => {
  const { userData } = useUserContext();

  const onSubmit = async ({ presentPassword, newPassword }: FormValues) => {
    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: userData?.email,
          password: presentPassword,
          newPassword: newPassword,
        }),
      });
      console.log(
        JSON.stringify({
          email: userData?.email,
          password: presentPassword,
          newPassword: newPassword,
        })
      );

      const data = await res.json();

      if (res.ok) {
        toast.update('Sua senha foi atualizada');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(`error ${err}`);
    }
  };

  return (
    <>
      <div className="py-2 mb-10">
        <h1 className="font-bold text-2xl">Altere sua senha</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-4 max-w-sm">
          <div className="flex flex-col gap-2">
            <label htmlFor="presentPassword" className="cursor-pointer">
              Senha atual
            </label>
            <Field
              type="password"
              name="presentPassword"
              id="presentPassword"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
            />
            <ErrorMessage
              name="presentPassword"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="cursor-pointer">
              Nova senha
            </label>
            <Field
              type="password"
              name="newPassword"
              id="newPassword"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <ErrorMessage
              name="newPassword"
              component="span"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="cursor-pointer">
              Confirme sua nova senha
            </label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
          >
            Enviar
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ChangePassword;
