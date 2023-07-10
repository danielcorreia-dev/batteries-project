import { Field, Form, Formik } from 'formik';
import router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

type Props = {
  initialValues?: BenefitValues;
  id: number;
};

interface BenefitValues {
  benefit: string;
  description: string;
  scoreNeeded: number;
}

const validationSchema = Yup.object({
  benefit: Yup.string().required('O benefício precisa ter um nome'),
  description: Yup.string().required('O benefício precisa ter uma descrição'),
  scoreNeeded: Yup.number()
    .required('O benefício precisa ter uma pontuação')
    .min(0, 'A pontuação mínima é 0'),
});

const defaultInitialValues: BenefitValues = {
  benefit: '',
  description: '',
  scoreNeeded: 0,
};

const CompanyBenefitForm: React.FC<Props> = ({
  initialValues = defaultInitialValues,
  id,
}) => {
  const onSubmit = async (
    { benefit, description, scoreNeeded }: BenefitValues,
    { setFieldError }: any
  ) => {
    try {
      const response = await fetch('/api/company/update-benefit', {
        method: 'POST',
        body: JSON.stringify({
          id,
          benefit,
          description,
          scoreNeeded,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setFieldError('benefit', data.message);
      }

      if (response.ok) {
        toast.success('Benefício criado com sucesso');
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldError,
        }) => (
          <Form className="flex flex-col">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                htmlFor="benefit"
              >
                Nome
              </label>
              <Field
                type="text"
                name="benefit"
                id="benefit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.benefit}
                className="mt-1 border py-1 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {errors.benefit && touched.benefit && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.benefit}
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <label
                className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                htmlFor="description"
              >
                Descrição
              </label>
              <Field
                as="textarea"
                name="description"
                row={3}
                id="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="mt-1 border py-1 px-2 outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              {errors.description && touched.description && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.description}
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <label
                className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                htmlFor="scoreNeeded"
              >
                Pontuação necessária
              </label>
              <Field
                type="number"
                name="scoreNeeded"
                id="scoreNeeded"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.scoreNeeded}
                className="mt-1 border py-1 px-2 outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.scoreNeeded && touched.scoreNeeded && (
                <div className="mt-1 text-sm text-red-600">
                  {errors.scoreNeeded}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
              >
                Salvar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompanyBenefitForm;
