import React from 'react';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center text-center py-2 bg-gray-50 border-y border-neutral-200 text-sm">
      <h1 className="text-gray-800 font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
