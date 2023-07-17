import Footer from '@/components/landingPage/Footer';
import HeroSection from '@/components/landingPage/HeroSection';
import Nav from '@/components/landingPage/Nav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  navColor?: string;
}

const LandingLayout = ({ navColor, children, ...props }: Props) => {
  return (
    <>
      <Nav bgColor={navColor} />
      <div {...props}>{children}</div>
      <Footer />
    </>
  );
};

export default LandingLayout;
