import Link from 'next/link';
import { title } from 'process';
import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = {
  title: string;
  description?: string | '';
  color?: string;
  icon?: React.ElementType;
  link: string | '';
};

interface Props {
  buttonProps: ButtonProps;
}

const ButtonCard = ({ buttonProps }: Props) => {
  const { title, description, icon: Icon, color, link } = buttonProps;

  return (
    <Link
      href={link}
      className="p-2 hover:opacity-60 transition-opacity transition-300 ease-in hidden md:inline-block"
    >
      <div className="bg-neutral-100 h-48 w-48 rounded border-neutral-300 border flex px-2 py-4 items-center justify-center">
        <div className="flex-col items-center text-center whitespace-pre-wrap justify-center">
          {Icon && (
            <Icon size={24} className={`text-center mx-auto mb-4 ${color}`} />
          )}
          <h2 className="">{title}</h2>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ButtonCard;
