import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
interface FormValues {
  email: string;
  nick: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  email: '',
  nick: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email invalido')
    .required('Insira um e-mail válido'),
  nick: Yup.string().required('Insira um nome de usuário válido'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      'Senhas devem conter ao menos uma letra maiúscula e um caractere especial'
    )
    .min(8, 'Password must be at least 8 characters')
    .required('Você precisa colocar uma senha'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais')
    .required('Você precisa confirmar sua senha'),
});

const FormCadastro = () => {
  const router = useRouter();

  const onSubmit = async (
    { nick, email, password }: FormValues,
    { setFieldError }: any
  ) => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          nick,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 402) {
        setFieldError('nick', 'Esse nick já existe');
      }

      if (res.ok) {
        router.push('/login');
      }
    } catch (err) {
      console.error(`error ${err}`);
    }
  };

    return (
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldError }) => (
        <Form className="max-w-xs">
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
            <label htmlFor="nick">Nick:</label>
            <Field
              type="text"
              id="nick"
              name="nick"
              className="border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
            />
            <ErrorMessage name="nick">
              {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
            </ErrorMessage>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password">Senha:</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
            />
            <ErrorMessage name="password" className="max-w-lg">
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
            disabled={isSubmitting}
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
