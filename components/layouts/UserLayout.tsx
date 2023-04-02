import SideUserNav from '../user/SideUserNav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const UserLayout = ({ children, ...props }: Props) => {
  return (
    <>
      <div className='flex'>
        <header className='border-r border-neutral-300 h-screen'>
          <SideUserNav />
        </header>
        <div {...props}>{children}</div>
      </div>
    </>
  );
};

export default UserLayout;
