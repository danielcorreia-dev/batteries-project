import SideUserNav from '@/components/user/SideUserNav';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children?: ReactNode;
}

const UserLayout = ({ children, ...props }: Props) => {
  const [isBreakpoint, setIsBreakpoint] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => setIsBreakpoint(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex mx-auto max-w-7xl">
        <div>
          <SideUserNav />
        </div>
        <div className={`max-w-full flex-1 flex gap-2`} {...props}>
          {children}
        </div>
      </div>

      {isBreakpoint && (
        <div className="h-16" /> // Add bottom space equivalent to the BottomNavBar
      )}
    </>
  );
};

export default UserLayout;
