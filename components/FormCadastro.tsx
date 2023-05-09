import { RiBatteryChargeLine } from 'react-icons/ri';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
interface FormValues {
  email: string;
  nick: string;
  password: string;
  confirmPassword: string;
  createdOn: Date;
}

const initialValues: FormValues = {
  email: '',
  nick: '',
  password: '',
  confirmPassword: '',
  createdOn: new Date(),
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email invalido')
    .required('Insira um e-mail válido'),
  nick: Yup.string().required('Insira um nome de usuário válido'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Você precisa colocar uma senha'),
  createdOn: Yup.date().required('Required'),
});

const onSubmit = async (
  { email, nick, password }: FormValues,
  { setSubmitting }: FormikHelpers<FormValues>
) => {
  const res = await fetch('http://localhost:3000/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      nick,
      email,
      password,
    },
  });
};

const FormCadastro = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
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
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              id="username"
              name="username"
              className="border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
            />
            <ErrorMessage name="username">
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
            <label htmlFor="confirmPassword">Confirme sua senha:</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
            />
            <ErrorMessage name="confirmPassword">
              {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
            </ErrorMessage>
          </div>
          <Field type="hidden" id="createdOn" name="createdOn"></Field>
          <button
            type="submit"
            className="border py-2 px-4 rounded bg-violet-500 text-white w-100 w-max"
          >
            Criar conta
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormCadastro;
