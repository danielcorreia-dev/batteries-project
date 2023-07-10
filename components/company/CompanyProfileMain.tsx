import Image from 'next/image';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import {
  RiRecycleFill,
  RiCloseLine,
  RiTimerFlashLine,
  RiPhoneFill,
  RiBatterySaverLine,
} from 'react-icons/ri';
import { FaPills } from 'react-icons/fa';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import Avatar from '../Avatar';
import CompanyProfileBenefitList from './CompanyProfileBenefitList';

interface IconProps {
  Icon: React.ElementType;
  variant?: string;
  points?: number | string;
  label: string;
}

const IconInfo: FunctionComponent<IconProps> = ({
  Icon,
  variant,
  points,
  label,
}) => {
  switch (variant) {
    case 'company':
      return (
        <span className={classNames('flex items-center text-sm mb-1')}>
          {Icon && <Icon size={24} className="inline-block mr-4" />}
          <div className="block">
            <p>{label}</p>
            <b className="mr-1">{points}</b>
          </div>
        </span>
      );
    default:
      return (
        <span className={classNames('flex items-center text-sm mb-1')}>
          {Icon && <Icon size={24} className="inline-block mr-1" />}
          <b className="mr-1">{points}</b> {label}
        </span>
      );
  }
};

type CompanyProps = {
  title: string;
  address: string;
  phoneNumber: string;
  openHours: string;
  benefits?: [];
};

interface Props {
  companyProps?: CompanyProps;
  user?: boolean;
}

const CompanyProfileMain = ({ companyProps, user = true }: Props) => {
  // States
  const { title, address, phoneNumber, openHours, benefits } =
    companyProps || {};

  const [editProfile, setEditProfile] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const editRef = useRef<HTMLHeadingElement>(null);

  // Formik consts

  const onSubmit = () => {
    return setEditProfile(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Sua empresa precisa ter um nome'),
  });

  const initialValues = {
    title,
    address,
    phoneNumber,
    openHours,
  };

  useEffect(() => {
    let handleOutsideClick = (e: MouseEvent) => {
      if (
        !editRef.current?.contains(e.target as Node) &&
        editRef.current !== null
      ) {
        setEditProfile(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
  }, [editRef]);

  const items = [
    {
      title: 'Benefícios',
    },
  ];

  const companyExists = companyProps && Object.keys(companyProps).length > 0;

  const EditProfileForm = () => {
    return (
      <div
        className={classNames(
          'flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 bg-neutral-600 bg-opacity-25',
          { hidden: editProfile === false }
        )}
      >
        <div
          ref={editRef}
          // Temporary width
          className="h-auto md:w-2/6 max-w-2xl bg-white shadow-md shadow-neutral-300 rounded p-4"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <RiCloseLine
                size={40}
                className={
                  'cursor-pointer mr-4 inline-block rounded-lg p-2 hover:bg-neutral-200'
                }
                onClick={() => setEditProfile(false)}
              />
              <h2 className="font-semibold text-xl">Editar Empresa</h2>
            </div>
            <button
              onClick={onSubmit}
              className="border rounded border-blue-400 px-2 py-1 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors"
            >
              Salvar
            </button>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="title" className="text-sm text-neutral-400">
                      Nome da empresa
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="block px-2 py-3 border rounded border-neutral-400 max-w-full w-full"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="address"
                      className="text-sm text-neutral-400"
                    >
                      Localização
                    </label>
                    <Field
                      type="text"
                      name="address"
                      className="block px-2 py-3 border rounded border-neutral-400  w-full"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm text-neutral-400"
                    >
                      Contato
                    </label>
                    <Field
                      name="phoneNumber"
                      className="block px-2 py-3 border rounded border-neutral-400 focus:border-blue-500 max-w-full resize-none w-full"
                    >
                      {({ field, form, error }: any) => (
                        <InputMask
                          mask="(99) 99999-9999"
                          maskChar="_"
                          {...field}
                          className={`${
                            errors.phoneNumber && touched.phoneNumber
                              ? 'border-red-500 border-2'
                              : ''
                          } block px-2 py-3 border rounded border-neutral-400 focus:border-blue-500 max-w-full resize-none w-full`}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="openHours"
                      className="text-sm text-neutral-400"
                    >
                      Horário de funcionamento
                    </label>
                    <Field
                      name="openHours"
                      className="block px-2 py-3 border rounded border-neutral-400 focus:border-blue-500 max-w-full resize-none w-full"
                    >
                      {({ field, form, error }: any) => (
                        <InputMask
                          mask="das 99:99 às 99:99"
                          maskChar="*"
                          {...field}
                          className={`${
                            errors.phoneNumber && touched.phoneNumber
                              ? 'border-red-500 border-2'
                              : ''
                          } block px-2 py-3 border rounded border-neutral-400 focus:border-blue-500 max-w-full resize-none w-full`}
                        />
                      )}
                    </Field>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <EditProfileForm />
      <div className="h-screen md:border-x border-neutral-300 max-w-xl w-full">
        <div className="flex-col items-center justify-between  max-w-xl pt-10 px-8">
          <div className="flex items-center justify-between mb-4">
            <Avatar avatarProps={{ variant: 'company' }} />
            {user ? (
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
                onClick={() => setEditProfile(!editProfile)}
              >
                Editar Empresa
              </button>
            ) : (
              ''
            )}
          </div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-700 flex items-center mb-2">
              <GrLocation className="inline-block mr-2" />
              {address}
            </p>
          </div>
        </div>
        <div className="px-8 mb-6">
          <div className="flex flex-col sm:items-center justify-between sm:flex-row">
            <IconInfo
              variant="company"
              Icon={RiTimerFlashLine}
              points={openHours}
              label={'Horário de funcionamento'}
            />
            <IconInfo
              variant="company"
              Icon={RiPhoneFill}
              points={phoneNumber}
              label={'Contato'}
            />
          </div>
        </div>
        <div className="border-b">
          <nav className="px-4">
            <ul className="flex">
              {items.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => setActiveTabIndex(index)}
                  className={classNames('p-3 cursor-pointer transition-all', {
                    'border-b-2 border-blue-500': activeTabIndex === index,
                  })}
                >
                  {tab.title}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <CompanyProfileBenefitList benefits={benefits || []} />
        </div>
      </div>
    </>
  );
};

export default CompanyProfileMain;
