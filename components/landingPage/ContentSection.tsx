import classNames from 'classnames';
import React, { FC } from 'react';
import Image from 'next/image';

type Props = {
  title: string;
  content: string;
  align?: 'left' | 'center' | 'right';
  image?: string;
  alt?: string;
};

const ContentSection: FC<Props> = ({ title, content, align, image, alt }) => {
  return (
    <div className="w-full">
      {image && (
        <div
          className={classNames(
            'relative w-1/2 h-1/2 flex justify-end md:w-1/2',
            {
              'hidden md:block ml-auto': align === 'right',
              'hidden md:block mr-auto': align === 'left',
              'mx-auto': align === 'center',
            }
          )}
        >
          <Image src={image} alt={alt ?? ''} />
        </div>
      )}
      <div
        className={classNames('flex flex-col break-normal text-justify', {
          'items-start': align === 'left',
          'items-center': align === 'center',
          'items-end text-right': align === 'right',
        })}
      >
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p
          className={classNames('text-lg', {
            'text-center': align === 'center',
          })}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default ContentSection;
