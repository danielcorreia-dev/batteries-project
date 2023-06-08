import Link from 'next/link';
import { title } from 'process';
import React from 'react';

type ButtonProps = {
  title: string;
  description?: string | '';
  icon?: string;
  link: string | '';
};

interface Props {
  buttonProps: ButtonProps;
}

const ButtonCard = (props: Props) => {
  const { title, description, icon, link } = props.buttonProps;

  return (
    <Link href={link}>
      <div className="bg-red-500">
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default ButtonCard;
