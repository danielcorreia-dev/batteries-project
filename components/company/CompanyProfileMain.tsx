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
          {Icon && <Icon size={24} className="inline-block mr-1" />}
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

interface CompanyProps {
  name: string;
  address: string;
}

type Props = {
  companyProps: CompanyProps;
};

const CompanyProfileMain:React.FC<Props> = ({ companyProps }) => {
  const { name, address } = companyProps;
  // States
  const [editProfile, setEditProfile] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const editRef = useRef<HTMLHeadingElement>(null);

  // Formik consts

  const onSubmit = () => {
    return setEditProfile(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Você precisa ter um nome'),
  });

  const initialValues = {
    name: name || '',
    address: address || '',
  };

  // Close pop-up edit profile window
  useEffect(() => {
    console.log(editRef);
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
      title: 'Fotos',
    },
    {
      title: 'Benefícios',
    },
  ];

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
                    <label htmlFor="name" className="text-sm text-neutral-400">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="block px-2 py-3 border rounded border-neutral-400 max-w-full w-full"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="location"
                      className="text-sm text-neutral-400"
                    >
                      Localização
                    </label>
                    <Field
                      type="text"
                      name="location"
                      className="block px-2 py-3 border rounded border-neutral-400  w-full"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bio" className="text-sm text-neutral-400">
                      Bio
                    </label>
                    <Field
                      as="textarea"
                      rows="5"
                      type="text"
                      name="bio"
                      className="block px-2 py-3 border rounded border-neutral-400 max-w-full resize-none w-full"
                    />
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
      <div className="h-screen border-x border-neutral-300 ">
        <div className="flex-col items-center justify-between mb-6 max-w-xl py-4 px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative h-32 w-32">
              <Image
                src={props.avatar}
                alt="Avatar"
                className="rounded-full"
                objectFit="cover"
                fill
              />
            </div>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
              onClick={() => setEditProfile(!editProfile)}
            >
              Editar Empresa
            </button>
          </div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-700 flex items-center mb-6">
              <GrLocation className="inline-block mr-2" />
              {address}
            </p>
            <p className="text-gray-700">{}</p>
            <div className="mt-2">
              {/* <div className="text-sm">
                Recebemos:
                {props.trashType === 1 && (
                  <p className="flex items-center font-semibold flex-wrap">
                    <RiBatterySaverLine className="inline-block mr-2" /> Pilhas
                    e baterias.
                  </p>
                )}
                {props.trashType === 2 && (
                  <p className="flex items-center font-semibold flex-wrap">
                    <FaPills className="inline-block mr-2" /> Medicamentos.
                  </p>
                )}
                {props.trashType === 3 && (
                  <p className="flex items-center font-semibold flex-wrap">
                    <FaPills className="inline-block mr-1" />
                    <RiBatterySaverLine className="inline-block mr-2" />
                    Medicamentos, pilhas e baterias.
                  </p>
                )} */}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:items-center justify-between sm:flex-row">
            <IconInfo
              Icon={RiRecycleFill}
              points={props.points}
              label={'Descartes'}
            />
            <IconInfo
              variant="company"
              Icon={RiTimerFlashLine}
              points={props.businessHours}
              label={'Horário de Func.'}
            />
            <IconInfo
              variant="company"
              Icon={RiPhoneFill}
              points={props.contact}
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
        <div>{/* Achievments */}</div>
      </div>
    </>
  );
};

export default CompanyProfileMain;
