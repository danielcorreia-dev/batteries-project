import SideUserNav from '../user/SideUserNav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const UserLayout = ({ children, ...props }: Props) => {
  return (
    <>
      <div className='flex mx-auto max-w-screen-xl'>
        <header className=''>
          <SideUserNav />
        </header>
        <div className='max-w-max flex-1'{...props}>{children}</div>
      </div>
    </>
  );
};

export default UserLayout;
