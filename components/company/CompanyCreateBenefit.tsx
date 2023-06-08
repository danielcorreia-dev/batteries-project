import React, { useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BenefitCreationPage = () => {
  interface BenefitValues {
    email: string;
    presentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const initialValues: BenefitValues = {
    email: '',
    presentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const onSubmit = () => {};

  const validationSchema = Yup.object({
    name: Yup.string().required('Você precisa ter um nome'),
    location: Yup.string().required('Você precisa ter uma localização'),
    bio: Yup.string().required('Você precisa fornecer uma descrição'),
  });

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Benefit</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-1 font-semibold">
              Location
            </label>
            <Field
              type="text"
              name="location"
              id="location"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block mb-1 font-semibold">
              Bio
            </label>
            <Field
              as="textarea"
              name="bio"
              id="bio"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="bio" component="div" className="text-red-500" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BenefitCreationPage;
