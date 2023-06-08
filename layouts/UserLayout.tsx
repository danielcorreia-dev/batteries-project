import SideUserNav from '@/components/user/SideUserNav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const UserLayout = ({ children, ...props }: Props) => {
  return (
    <>
      <div className="flex mx-auto max-w-7xl">
        <div>
          <SideUserNav />
        </div>
        <div className="max-w-full flex-1 flex gap-2" {...props}>
          {children}
        </div>
      </div>
    </>
  );
};

export default UserLayout;
