import SearchBar, { SearchProps } from '@/components/SearchBar';
import UserLayout from '@/layouts/UserLayout';
import CompanyGrantBenefitPointsForTheUser from '@/components/company/CompanyGrantBenefitPointsForTheUser';
import React, { useState } from 'react';

type Props = {};


const Pontuar = (props: Props) => {
  return (
    <div>
      <UserLayout>
        <CompanyGrantBenefitPointsForTheUser />
      </UserLayout>
    </div>
  );
};

export default Pontuar;
