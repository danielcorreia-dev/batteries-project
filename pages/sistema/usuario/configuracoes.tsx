import Button from '@/components/landingPage/Button';
import UserLayout from '@/components/layouts/UserLayout';
import ChangePassword from '@/components/user/configurations/ChangePassword';
import DeleteAccount from '@/components/user/configurations/DeleteAccount';
import UserInfo from '@/components/user/configurations/UserInfo';
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

  return (
    <div className="grid grid-cols-2 border-l">
      <div className="max-w-full border-r border-neutral-300 h-screen w-80">
        <h1 className="px-4 py-6 font-bold text-2xl capitalize mb-10">
          configurações
        </h1>
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={classNames(
                'p-3 flex justify-between items-center cursor-pointer transition-colors duration-75',
                {
                  ' border-blue-400 border-b-2 bg-blue-100':
                    activeTabIndex === index,
                },
                'border-b',
                {
                  'border-t-0': index === 0,
                }
              )}
            >
              <p className="mr-10">{tab.title}</p>
              <MdOutlineKeyboardArrowRight />
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 py-4">
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
    component: UserInfo,
  },
  {
    title: 'Alterar sua senha',
    component: ChangePassword,
  },
  {
    title: 'Desativar a sua conta',
    component: DeleteAccount,
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
