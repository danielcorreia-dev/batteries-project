import { RiBatteryChargeLine } from 'react-icons/ri';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
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
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).+$/,
      'Password must contain at least one uppercase letter and one special symbol'
    )
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Você precisa colocar uma senha'),
  createdOn: Yup.date().required('Required'),
});

const FormCadastro = () => {
  const router = useRouter();

  const onSubmit = async ({ nick, email, password }: FormValues) => {
    try {
      const res = await fetch('/api/submit-form', {
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
      router.push('/login');
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
      {({ errors, touched, isSubmitting }) => (
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
            <label htmlFor="nick">Username:</label>
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

// const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

// const FormCadastro = () => {
//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           email: '',
//         }}
//         onSubmit={async (values) => {
//           await sleep(500);
//           alert(JSON.stringify(values, null, 2));
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <label htmlFor="firstName">First Name</label>
//             <Field name="firstName" placeholder="Jane" />

//             <label htmlFor="lastName">Last Name</label>
//             <Field name="lastName" placeholder="Doe" />

//             <label htmlFor="email">Email</label>
//             <Field name="email" placeholder="jane@acme.com" type="email" />

//             <button type="submit" disabled={isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

export default FormCadastro;
