import { Formik, Form, Field, ErrorMessage } from 'formik';
import useRedirect from '@/lib/hooks/useRedirect';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import InputMask from 'react-input-mask';
import Autocomplete from 'react-google-autocomplete';

type CompanyProps = {
  title: string;
  address: string;
  phoneNumber: string;
  openingHours: string;
  benefits?: [];
};

type Props = {
  companyValues: CompanyProps;
};

const FormCompanySignUp: React.FC<Props> = ({ companyValues }) => {
  const { handleRedirect } = useRedirect('/sistema');
  interface FormValues {
    title: string;
    address: string;
    phoneNumber: string;
    openingHours: string;
  }

  const initialValues: FormValues = {
    title: companyValues.title || '',
    address: companyValues.address || '',
    phoneNumber: companyValues.phoneNumber || '',
    openingHours: companyValues.openingHours || '',
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
      )
      .test('address', 'Endereço inválido', (value) => {
        if (!value) return true;

        const addressArray = value.split(',');
        const street = addressArray[0]?.trim();
        const city = addressArray[1]?.trim();
        const state = addressArray[2]?.trim();

        if (!city || !state || !street) {
          return false;
        }

        return true;
      }),
    phoneNumber: Yup.string().required(
      'Sua empresa precisa ter um número de telefone'
    ),
    openingHours: Yup.string()
      .required('Sua empresa precisa ter um horário de funcionamento')
      .test('openingHours', 'Horário de funcionamento inválido', (value) => {
        if (!value) return true;

        const hoursRegex =
          /^([01]?[0-9]|2[0-3]):[0-5][0-9] - ([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return hoursRegex.test(value);
      }),
  });

  const onSubmit = async (
    { title, address, phoneNumber, openingHours }: FormValues,
    { setFieldError }: any
  ) => {
    try {
      const res = await fetch('/api/company/update', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          address,
          phoneNumber,
          openingHours,
        }),
      });
      const data = await res.json();
      if (res.status === 402) {
        setFieldError('title', 'Essa empresa já existe');
      }

      if (res.ok) {
        toast.success('Sua empresa foi atualizada com sucesso');
        setTimeout(handleRedirect, 1500);
      }
    } catch (err) {
      console.error(`error ${err}`);
    }
  };

  const googlePlacesRef = useRef<any>(null);

  const handleAddressLabelClick = () => {
    if (googlePlacesRef.current) {
      googlePlacesRef.current.focus();
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
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="w-full w-min-max">
            <div className="mb-4">
              <label htmlFor="title">Nome da empresa:</label>
              <Field
                type="text"
                id="title"
                name="title"
                className={`${
                  errors.title && touched.title ? 'border-red-500 border-2' : ''
                } border rounded p-2 block mt-1 w-full bg-neutral-200 outline-none focus:border-2 focus:border-blue-500`}
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="address"
                onClick={handleAddressLabelClick}
                className="mb-1"
              >
                Endereço:
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                component={({ field, form }: any) => (
                  <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                    onPlaceSelected={(place: any) => {
                      if (place && place.formatted_address) {
                        const address = place.formatted_address;
                        const addressArray = address.split(',');
                        const street = addressArray[0];
                        const city = addressArray[1];
                        const state = addressArray[2];
                        const fullAddress = `${street.trim()}, ${city.trim()}, ${state.trim()}`;
                        form.setFieldValue(field.name, fullAddress);
                      }
                    }}
                    placeholder="Ex: Rua dos Pinheiros, 0 - Bairro, Cidade - Estado, Brasil"
                    ref={googlePlacesRef}
                    options={{
                      types: ['address'],
                      componentRestrictions: { country: 'br' },
                    }}
                    className={`${
                      form.errors.address && form.touched.address
                        ? 'border-red-500 border-2'
                        : ''
                    } border rounded p-2 block mt-1 w-full bg-neutral-200 outline-none focus:border-2 focus:border-blue-500`}
                    value={field.value}
                    onChange={(event: any) => {
                      form.setFieldValue(field.name, event.target.value);
                    }}
                    autoFocus={true}
                  />
                )}
              />
              <ErrorMessage
                name="address"
                component="p"
                className="text-red-500 text-sm max-w-lg"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="phoneNumber">Número de telefone:</label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                as={InputMask}
                mask="(99) 99999-9999"
                placeholder="Ex: (99) 99999-9999"
                permanents={[5]}
                maskChar="_"
                className={`${
                  errors.phoneNumber && touched.phoneNumber
                    ? 'border-red-500 border-2'
                    : ''
                } border rounded p-2 block mt-1 w-full bg-neutral-200 outline-none focus:border-2 focus:border-blue-500`}
              />
              <ErrorMessage
                name="phoneNumber"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="openingHours">Horário de funcionamento:</label>
              <Field
                type="text"
                id="openingHours"
                name="openingHours"
                as={InputMask}
                mask="99:99 - 99:99"
                placeholder="Ex: 08:00 - 18:00"
                className={`${
                  errors.openingHours && touched.openingHours
                    ? 'border-red-500 border-2'
                    : ''
                } border rounded p-2 block mt-1 w-full bg-neutral-200 outline-none focus:border-2 focus:border-blue-500`}
              />
              <ErrorMessage
                name="openingHours"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCompanySignUp;
