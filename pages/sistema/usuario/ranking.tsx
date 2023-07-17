import UserLayout from '@/layouts/UserLayout';
import React from 'react';

type Props = {};

const Ranking = (props: Props) => {
  return (
    <UserLayout>
      <div className="flex flex-col space-y-16 w-full p-4 max-w-4xl items-center justify-center mx-auto py-24"></div>
    </UserLayout>
  );
};

export default Ranking;
