import Image from 'next/image';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import ProfileData from './ProfileData';
import { RiRecycleFill, RiTrophyLine, RiStarLine } from 'react-icons/ri';
import { TbAbacus, TbAspectRatio } from 'react-icons/tb';
import { table } from 'console';
import classNames from 'classnames';
import EditProfile from './EditProfile';
import { setSourceMapRange } from 'typescript';

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
  avatar?: string;
  name: string;
  location?: string;
  bio?: string;
  points?: number;
  achievments?: number;
  savedPlaces?: number;
}

const ProfileMain = ({
  name,
  location,
  bio,
  avatar,
  points,
  achievments,
  savedPlaces,
}: ProfileProps) => {
  const [editProfile, setEditProfile] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const editRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.log(editRef)
    let handleOutsideClick = (e:MouseEvent) => {
      if(!editRef.current?.contains(e.target as Node) && editRef.current !== null){
        setEditProfile(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
  }, [editRef]);

  const items = [
    {
      title: 'Conquistas',
    },
  ];

  return (
    <>
      <EditProfile isActive={editProfile} forwardRef={editRef} />
      <div className="h-screen border-r border-neutral-300 ">
        <div className="flex-col items-center justify-between mb-6 max-w-xl py-4 px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative h-32 w-32">
              <Image
                src={avatar}
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-700 flex items-center mb-6">
              <GrLocation className="inline-block mr-2" />
              {location}
            </p>
            <p className="text-gray-700">{bio}</p>
          </div>
          <div className="flex items-center justify-between ">
            <IconInfo
              Icon={RiRecycleFill}
              points={points}
              label={'Descartes'}
            />
            <IconInfo
              Icon={RiTrophyLine}
              points={achievments}
              label={'Conquistas'}
            />
            <IconInfo
              Icon={RiStarLine}
              points={savedPlaces}
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
