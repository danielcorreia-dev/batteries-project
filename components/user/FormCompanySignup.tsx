import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import useRedirect from '@/lib/hooks/useRedirect';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const FormCompanySignUp = () => {
  const { handleRedirect } = useRedirect('/sistema');
  interface FormValues {
    title: string;
    address: string;
  }

  const initialValues: FormValues = {
    title: '',
    address: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Sua empresa precisa ter um nome')
      .matches(
        /^[^!@#$%^&*()]+$/,
        'O nome da empresa não pode conter símbolos especiais'
      ),
    address: Yup.string()
      .required('Sua empresa precisa ter um endereço físico')
      .matches(
        /^[^!@#$%^&*()]+$/,
        'O endereço da empresa não pode conter símbolos especiais'
      ),
  });

  const onSubmit = async (
    { title, address }: FormValues,
    { setFieldError }: any
  ) => {
    try {
      const res = await fetch('/api/create-company', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          address,
        }),
      });
      const data = await res.json();
      if (res.status === 402) {
        setFieldError('title', 'Essa empresa já existe');
      }

      if (res.ok) {
        toast.success('Sua empresa foi criada com sucesso');
        setTimeout(handleRedirect, 1500);
      }
    } catch (err) {
      console.error(`error ${err}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldError }) => (
          <Form className="max-w-xs">
            <div className="mb-4">
              <label htmlFor="">Nome da empresa:</label>
              <Field
                type="text"
                id="title"
                name="title"
                className={`${
                  errors.title && touched.title ? 'border-red-500 border-2' : ''
                } border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500`}
              />
              <ErrorMessage name="title">
                {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
              </ErrorMessage>
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="password">Endereço:</label>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyBRTyn-nU5Ui8W9pQTU2koKI_IDiEae9OI"
                apiOptions={{ region: 'br' }}
                autocompletionRequest={{
                  bounds: [
                    { lat: 150, lng: 100 },
                    { lat: 100, lng: 100 },
                  ],
                  componentRestrictions: {
                    country: ['br'],
                  },
                }}
              />
              <Field
                type="text"
                id="address"
                name="address"
                className={`${
                  errors.address && touched.address
                    ? 'border-red-500 border-2'
                    : ''
                } border rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500`}
              />
              <ErrorMessage name="address" className="max-w-lg">
                {(msg) => <p className="text-red-500 text-sm">{msg}</p>}
              </ErrorMessage>
            </div>
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
    </>
  );
};

export default FormCompanySignUp;
