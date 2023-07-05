import React from 'react';
import Image from 'next/image';
import profile1 from '../public/avatars/user-profile-1.svg';
import profile2 from '../public/avatars/user-profile-2.svg';
import market from '../public/avatars/market-profile.svg';

type AvatarProps = {
  src?: string | undefined;
  alt?: string | undefined;
  size?: string | undefined;
  variant?: 'user' | 'company' | undefined;
};

type Props = {
  avatarProps?: AvatarProps | undefined;
};

const userAvatars = [profile1, profile2];

function Avatar({ avatarProps }: Props) {
  const randomizer = Math.floor(Math.random() * userAvatars.length);
  const {
    src = userAvatars[1],
    alt = 'Avatar',
    size = 'w-32 h-32',
    variant = 'user',
  } = avatarProps || {};
  return (
    <>
      {variant === 'user' ? (
        <div className="flex items-center relative object-contain overflow-hidden h-32 w-32">
          <Image
            src={src}
            alt={alt}
            className={`rounded-full ${size}`}
            priority={true}
            fill
          />
        </div>
      ) : (
        <div className="flex items-center relative object-contain overflow-hidden h-32 w-32">
          <Image
            src={market || src}
            alt={alt}
            className={`rounded-full ${size}`}
            priority={true}
            fill
          />
        </div>
      )}
    </>
  );
}

export default Avatar;
