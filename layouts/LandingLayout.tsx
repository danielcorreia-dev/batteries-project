import Footer from '@/components/landingPage/Footer';
import HeroSection from '@/components/landingPage/HeroSection';
import Nav from '@/components/landingPage/Nav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const LandingLayout = ({ children, ...props }: Props) => {
  return (
    <>
      <Nav bgColor="bg-blue-200"></Nav>
      <HeroSection />
      <div {...props}>{children}</div>
      <Footer />
    </>
  );
};

export default LandingLayout;
