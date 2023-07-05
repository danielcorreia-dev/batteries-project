import React, { useState } from 'react';
import classNames from 'classnames';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface Tab {
  title: string;
  component: any;
}

interface Props {
  tabs: Tab[];
  userData?: any;
}

const TabComponent: React.FC<Props> = ({ tabs, userData }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };
  return (
    <div className="grid grid-flow-col border-l max-w-7xl">
      <div className="max-w-full border-r border-neutral-300 h-screen w-80">
        <h1 className="px-4 py-6 font-bold text-2xl capitalize mb-10">
          Configurações
        </h1>
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => handleTabClick(index)}
              className={classNames(
                'p-3 flex justify-between items-center cursor-pointer transition-colors duration-75',
                {
                  'border-blue-400 border-b-2 bg-blue-100':
                    activeTabIndex === index,
                },
                {
                  'border-t': index === 0,
                  'border-b': true,
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
          userData,
        })}
      </div>
    </div>
  );
};

export default TabComponent;
