import React, { useState } from 'react';
import SearchBar, { SearchProps } from '../SearchBar';
import { useRouter } from 'next/router';
import { IoCaretBack } from 'react-icons/io5';
import CompanyPointUserResultItem from './CompanyPointUserResultItem';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHandlers, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { PiSpinnerGap } from 'react-icons/pi';

type Props = {};

type User = {
  nick: string;
  id: number;
};

const validationSchema = Yup.object({
  user: Yup.string().required('O usuário precisa ser selecionado'),
  score: Yup.number()
    .required('A pontuação precisa ser preenchida')
    .min(0, 'A pontuação mínima é 0'),
});

const CompanyGrantBenefitPointsForTheUser: React.FC<Props> = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchProps: SearchProps<User> = {
    placeholder: 'Procure um usuário',
    fetchData: async (query: string) => {
      const response = await fetch(`/api/user/search?q=${query}`);
      const data: User[] = await response.json();
      return data;
    },
    renderResult: (user: User) => {
      return <CompanyPointUserResultItem name={user.nick} />;
    },
  };

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);

      const response = await fetch('/api/company/point-user', {
        method: 'POST',
        body: JSON.stringify({
          userId: selectedUser?.id,
          score: values.points,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Usuário pontuado com sucesso');
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    } catch (err) {
      console.error(`error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen relative border-x border-neutral-200 max-w-3xl">
        <div className="flex items-center max-w-3xl px-6 mt-12">
          <div className="flex-col p-5 w-full">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">Pontuar</h1>
                <p className="text-sm text-neutral-500">
                  Pontue um usuário para que ele possa trocar por benefícios
                </p>
              </div>
              <div>
                <button onClick={() => router.back()}>
                  <div className="flex items-center justify-around border border-neutral-200 px-3 py-2 rounded hover:bg-neutral-200 transition-colors">
                    <IoCaretBack />
                    <p className="text-sm text-neutral-500">Voltar</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-6 flex-col">
              <Formik
                initialValues={{
                  user: '',
                  points: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    <div className="flex flex-col">
                      <label
                        htmlFor="user"
                        className="text-sm text-neutral-500 mb-2"
                      >
                        Usuário
                      </label>
                      <Field
                        component={SearchBar}
                        name="user"
                        id="user"
                        searchProps={{
                          ...searchProps,
                          setValue: (value: string) =>
                            setFieldValue('user', value),
                          setSelectedValue: (value: User) =>
                            setSelectedUser(value),
                        }}
                        className="border border-neutral-200 rounded px-3 py-2 mt-1"
                      />
                      {errors.user && touched.user && (
                        <div className="text-sm text-red-500">
                          {errors.user}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col mt-4">
                      <label
                        htmlFor="points"
                        className="text-sm text-neutral-500 mb-2"
                      >
                        Pontos
                      </label>
                      <Field
                        type="number"
                        name="points"
                        id="points"
                        className="border border-neutral-200 rounded px-3 py-2 mt-1 outline-none focus:border-blue-500"
                      />
                      {errors.points && touched.points && (
                        <div className="text-sm text-red-500">
                          {errors.points}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end mt-6 items-center">
                      <div>
                        {loading && (
                          <PiSpinnerGap className="animate-spin text-2xl mr-2 text-blue-500" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onSubmit(values)}
                        className={`bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 hover:bg-primary-600 transition-colors ${
                          loading &&
                          'opacity-50 cursor-not-allowed bg-neutral-500 hover:opacity-60 hover:bg-neutral-600'
                        }`}
                        disabled={loading}
                      >
                        Pontuar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyGrantBenefitPointsForTheUser;
