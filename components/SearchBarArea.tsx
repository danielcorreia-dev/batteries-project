import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SearchBarArea = ({ children, ...props }: Props) => {
  return (
    <div className="relative min-w-full h-full flex-1 border-l px-4">
      <div className="flex min-w-full max-w-2xl items-center justify-center mt-[4vh]">
        {children}
      </div>
    </div>
  );
};

export default SearchBarArea;
