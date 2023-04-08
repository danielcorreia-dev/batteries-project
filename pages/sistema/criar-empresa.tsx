import NavSemLogo from '@/components/NavSemLogo';
import Footer from '@/components/landingPage/Footer';
import LandingLayout from '@/components/layouts/LandingLayout';
import FormCompanySignUp from '@/components/user/FormCompanySignUp';

const CreateCompany = () => {
  return (
    <>
      <NavSemLogo />
      <FormCompanySignUp />
      <Footer/>
    </>
  );
};

export default CreateCompany;
