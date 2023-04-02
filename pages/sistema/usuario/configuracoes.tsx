import Button from '@/components/landingPage/Button';
import UserLayout from '@/components/layouts/UserLayout';
import classNames from 'classnames';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface Tab {
  title: string;
  component: React.FC<any>;
  props?: any;
}

interface Props {
  tabs: Tab[];
}

const TabComponent: React.FC<Props> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleClickTab = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="w-max max-w-full border-r border-neutral-300 h-screen">
        <h1 className='px-4 py-6 font-bold text-2xl capitalize mb-10'>configurações</h1>
        <ul className="border">
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleClickTab(index)}
              className={classNames(
                'p-3 flex justify-between items-center cursor-pointer transition-colors duration-75',
                {
                  ' border-blue-400 border-b-2 bg-blue-100':
                    activeTabIndex === index,
                },
                'border-b'
              )}
            >
              <p className='mr-10'>{tab.title}</p>
              <MdOutlineKeyboardArrowRight />
            </li>
          ))}
        </ul>
      </div>
      <div>
        {React.createElement(tabs[activeTabIndex].component, {
          ...tabs[activeTabIndex].props,
        })}
      </div>
    </div>
  );
};

const items = [
  {
    title: 'Informações da sua conta',
    component: Button,
    props: {
      content: 'teste',
      link: '/api/hello',
    },
  },
  {
    title: 'Alterar sua senha',
    component: Button,
    props: {
      content: 'teswte',
      link: '/api/hello',
    },
  },
  {
    title: 'Desativar a sua conta',
    component: Button,
    props: {
      content: 'teswte',
      link: '/api/hello',
    },
  },
];

const Configuracoes = () => {
  return (
    <UserLayout>
      <TabComponent tabs={items} />
    </UserLayout>
  );
};

export default Configuracoes;
