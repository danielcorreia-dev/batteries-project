import SearchBar, { SearchProps } from '@/components/SearchBar';
import React, { useState } from 'react';

type Props = {};

type User = {
  nick: string;
};

const searchProps: SearchProps<User> = {
  placeholder: 'Search for users',
  fetchData: async (query: string) => {
    // Implement your API call to fetch user data based on the query
    // Return an array of User objects
    const response = await fetch(`/api/users?search=${query}`);
    const data: User[] = await response.json();
    return data;
  },
  renderResult: (user: User) => {
    // Implement your custom rendering logic for user items
    return <span>{user.nick}</span>;
  },
};

const Pontuar = (props: Props) => {
  return (
    <div>
      <SearchBar searchProps={searchProps} />
    </div>
  );
};

export default Pontuar;
