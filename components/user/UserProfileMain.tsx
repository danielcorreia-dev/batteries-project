import { GrLocation } from 'react-icons/gr';
import {
  RiCloseLine,
  RiRecycleFill,
  RiStarLine,
  RiTrophyLine,
} from 'react-icons/ri';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import DiscardedPlaces from './DiscardedPlaces';
import Avatar from '@/components/Avatar';

interface IconProps {
  Icon: React.ElementType;
  points?: number;
  label: string;
}

const IconInfo: React.FC<IconProps> = ({ Icon, points, label }) => (
  <span className="flex items-center text-sm">
    {Icon && <Icon size={24} className="inline-block mr-1" />}
    <b className="mr-1">{points}</b> {label}
  </span>
);

interface Props {
  profileProps: ProfileProps;
}

interface ProfileProps {
  name: string;
  location?: string;
  bio?: string;
  points?: number;
  achievements?: number;
  savedPlaces?: number;
  companies?: Company[];
  user?: boolean;
}

type Company = {
  title: string;
  address: string;
  scores: number;
};

const UserProfileMain: React.FC<Props> = ({ profileProps }) => {
  const { name, location, bio, points, achievements, savedPlaces, companies } =
    profileProps;
  const [editProfile, setEditProfile] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const editRef = useRef<HTMLHeadingElement>(null);

  const onSubmit = () => {
    setEditProfile(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Você precisa ter um nome'),
  });

  const initialValues = {
    name: name,
    location: location || '',
    bio: bio || '',
    points: points || 0,
    achievements: achievements || 0,
    savedPlaces: savedPlaces || 0,
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setEditProfile(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const items = [
    {
      title: 'Lugares descartados',
    },
  ];

  const EditProfileForm: React.FC = () => (
    <div
      className={classNames(
        'flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 bg-neutral-600 bg-opacity-25',
        { hidden: !editProfile }
      )}
    >
      <div
        ref={editRef}
        className="h-auto md:w-2/6 max-w-2xl bg-white shadow-md shadow-neutral-300 rounded p-4"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <RiCloseLine
              size={40}
              className="cursor-pointer mr-4 inline-block rounded-lg p-2 hover:bg-neutral-200"
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
                <div className="mb-3">
                  <label htmlFor="name" className="text-sm text-neutral-400">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="block px-2 py-3 border rounded border-neutral-400 max-w-full w-full"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <EditProfileForm />
      <div className="h-screen md:border-x border-neutral-300 max-w-xl w-full">
        <div className="md:py-8">
          <div className="flex-col items-center justify-between max-w-xl py-4 px-8">
            <div className="flex items-center justify-between mb-4">
              <Avatar />
              {/* <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
                onClick={() => setEditProfile(!editProfile)}
              >
                Editar perfil
              </button> */}
            </div>
            <div className="mb-5 sm:mb-8">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-700">{bio}</p>
            </div>
            <div className="flex flex-col sm:items-center justify-between sm:flex-row">
              <IconInfo Icon={RiRecycleFill} points={points} label={'Pontos'} />
              {/* <IconInfo Icon={RiTrophyLine} points={achievements} label={'Conquistas'} />
            <IconInfo Icon={RiStarLine} points={savedPlaces} label={'Lugares Salvos'} /> */}
            </div>
          </div>
        </div>
        <div className="border-b">
          <nav className="px-4">
            <ul className="flex">
              {items.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => setActiveTabIndex(index)}
                  className={classNames('p-3 cursor-pointer hover:opacity-75', {
                    'border-b-2 border-blue-500 ': activeTabIndex === index,
                  })}
                >
                  {tab.title}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          {activeTabIndex === 0 && (
            <DiscardedPlaces companies={companies || []} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileMain;
