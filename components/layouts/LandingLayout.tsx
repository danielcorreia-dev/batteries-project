import { ReactNode } from 'react';
import Footer from '../landingPage/Footer';
import HeroSection from '../landingPage/HeroSection';
import Nav from '../landingPage/Nav';

interface Props {
  children?: ReactNode
}

const LandingLayout = ({ children, ...props }:Props) => {
  return (
    <>
      <Nav bgColor="bg-blue-300"></Nav>
      <HeroSection />
      <div {...props}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default LandingLayout;
