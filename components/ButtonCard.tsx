import Link from 'next/link';
import { title } from 'process';
import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = {
  title: string;
  description?: string | '';
  icon?: React.ElementType;
  link: string | '';
};

interface Props {
  buttonProps: ButtonProps;
}

const ButtonCard = ({ buttonProps }: Props) => {
  const { title, description, icon: Icon, link } = buttonProps;

  return (
    <Link
      href={link}
      className="p-2 hover:opacity-90 transition-opacity hidden md:inline-block"
    >
      <div className="bg-neutral-200 h-48 w-48 rounded border-neutral-300 border flex px-2 py-4 items-center justify-center">
        <div className="flex-col items-center text-center whitespace-pre-wrap justify-center">
          {Icon && <Icon size={24} className={'text-center mx-auto mb-4'} />}
          <h2 className="">{title}</h2>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ButtonCard;
