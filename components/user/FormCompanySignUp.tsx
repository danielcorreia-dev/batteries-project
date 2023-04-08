import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormCompanySignUp = () => {
  interface FormValues {
    name: string;
    address: string;
    description: string;
  }

  const initialValues: FormValues = {
    name: '',
    address: '',
    description: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Sua empresa precisa ter um nome'),
    address: Yup.string().required(
      'Sua empresa precisa ter um endereço físico'
    ),
  });

  const onSubmit = () => {};

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    ></Formik>
  );
};

export default FormCompanySignUp;
