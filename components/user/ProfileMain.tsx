import Image from 'next/image';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import ProfileData from './ProfileData';
import { RiRecycleFill, RiTrophyLine, RiStarLine } from 'react-icons/ri';
import classNames from 'classnames';
// import EditProfile from './EditProfile';
import { RiCloseLine } from 'react-icons/ri';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface IconProps {
  Icon: React.ElementType;
  points?: number;
  label: string;
}

const IconInfo: FunctionComponent<IconProps> = ({ Icon, points, label }) => {
  return (
    <span className="flex items-center text-sm">
      {Icon && <Icon size={24} className="inline-block mr-1" />}
      <b className="mr-1">{points}</b> {label}
    </span>
  );
};

interface ProfileProps {
  avatar: string;
  name: string;
  location?: string;
  bio?: string;
  points?: number;
  achievments?: number;
  savedPlaces?: number;
}

const ProfileMain = (props: ProfileProps) => {
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
    avatar: props.avatar,
    name: props.name,
    location: props.location || '',
    bio: props.bio || '',
    points: props.points || 0,
    achievments: props.achievments || 0,
    savedPlaces: props.savedPlaces || 0,
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
      title: 'Conquistas',
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
          className="h-auto w-[400px] max-w-2xl bg-white shadow-md shadow-neutral-300 rounded p-4"
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
              <h2 className="font-semibold text-xl">Editar Perfil</h2>
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
                  <div className='mb-3'>
                    <label htmlFor="name" className='text-sm text-neutral-400'>Name</label>
                    <Field type="text" name="name" className="block px-2 py-3 border rounded border-neutral-400 max-w-max w-max"/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="location" className='text-sm text-neutral-400'>Localização</label>
                    <Field type="text" name="location" className="block px-2 py-3 border rounded border-neutral-400 max-w-max w-max"/>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="bio" className='text-sm text-neutral-400'>Bio</label>
                    <Field type="text" name="bio" className="block px-2 py-3 border rounded border-neutral-400 max-w-max w-max"/>
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
      <div className="h-screen border-r border-neutral-300 ">
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
              Editar perfil
            </button>
          </div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-2xl font-bold">{props.name}</h1>
            <p className="text-gray-700 flex items-center mb-6">
              <GrLocation className="inline-block mr-2" />
              {props.location}
            </p>
            <p className="text-gray-700">{props.bio}</p>
          </div>
          <div className="flex flex-col sm:items-center justify-between sm:flex-row">
            <IconInfo
              Icon={RiRecycleFill}
              points={props.points}
              label={'Descartes'}
            />
            <IconInfo
              Icon={RiTrophyLine}
              points={props.achievments}
              label={'Conquistas'}
            />
            <IconInfo
              Icon={RiStarLine}
              points={props.savedPlaces}
              label={'Lugares Salvos'}
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
                  className={classNames('p-3', {
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

export default ProfileMain;
