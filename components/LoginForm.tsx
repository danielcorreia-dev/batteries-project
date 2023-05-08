import { Formik, Field, ErrorMessage, Form, FormikHelpers } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

const LoginForm = () => {
  const [authError, setAuthError] = useState<string>('');
  const { push } = useRouter();
  interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('email invalido')
      .required('Insira um e-mail válido'),
    password: Yup.string().required(''),
  });

  const onSubmit = async (
    { email, password, rememberMe }: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    const result = await signIn("credentials", { email, password, redirect: true, callbackUrl: '/home'})
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              id="email"
              name="email"
              className={`${
                errors.email && touched.email ? 'border-red-500 border-2' : ''
              } border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500`}
            />
            <ErrorMessage name="email">
              {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
            </ErrorMessage>
          </div>
          <div className="mb-4">
            <label htmlFor="password">Senha:</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
            />
            <ErrorMessage name="password">
              {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
            </ErrorMessage>
          </div>
          <div className="mb-4">
            <label htmlFor="rememberMe">
              <Field
                type="checkbox"
                className="w-4 h-4 accent-violet-500 mr-2"
                id="rememberMe"
                name="rememberMe"
                checked={values.rememberMe}
              />
              Lembrar de mim
            </label>
          </div>
          <button
            type="submit"
            className="border py-2 px-4 rounded bg-violet-500 text-white w-100 w-max"
          >
            Entrar
          </button>
          {authError && <div>{authError}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
