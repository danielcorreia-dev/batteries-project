import Image from 'next/image';
import { useState } from 'react';
import { GrLocation } from 'react-icons/gr';

interface ProfileProps {
  avatar: string;
  name: string;
  location: string;
  bio: string;
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

  return (
    <div className="h-screen border-r border-neutral-300 py-4 px-8">
      <div className="flex-col items-center justify-between mb-6 max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <div className='relative h-32 w-32'>
            <Image
              src={avatar}
              alt="Avatar"
              className="rounded-full"
              objectFit="cover"
              fill
            />
          </div>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none" onClick={() => setEditProfile(!editProfile)}>
          Editar perfil
        </button>
        </div>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-700 flex items-center mb-6"><GrLocation className='inline-block mr-2'/>{location}</p>
            <p className="text-gray-700">{bio}</p>
          </div>
      </div>
    </div>
  );
};

export default ProfileMain;
