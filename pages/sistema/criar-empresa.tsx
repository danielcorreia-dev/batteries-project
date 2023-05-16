import NavSemLogo from '@/components/NavSemLogo';
import Footer from '@/components/landingPage/Footer';
import FormCompanySignUp from '@/components/user/FormCompanySignup';
import { CiShop } from 'react-icons/ci'

const CreateCompany = () => {
  return (
    <>
      <NavSemLogo />
      <main className="flex flex-col items-center mx-auto max-w-5xl py-12">
        <div className="border py-6 px-4 rounded">
          <div className="text-center flex flex-col justify-center items-center mb-5 max-w-xs">
            <CiShop size={32} />
            <h2 className="font-bold text-2xl">Crie a sua empresa</h2>
            <span className="text-md text-neutral-5<00">
              Insira os dados iniciais sobre sua empresa
            </span>
          </div>
          <FormCompanySignUp />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateCompany;
