import { RiBatteryChargeLine } from 'react-icons/ri';
import InputForm from './InputForm';
import { useForm } from 'react-hook-form';

const FormCadastro = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-2 px-4 bg-gray-200 items-center"
    >
      <RiBatteryChargeLine size={64} display="block" />
      <h2 className="text-2xl font-bold">Crie a sua conta</h2>
      <span className="mb-4">Fácil e rapidamente, insira seu dados</span>
      <div className="w-full mb-4">
        <InputForm type="text" label="email" id="email" placeholder='email' name='email'/>
      </div>
      <div className="w-full mb-4"></div>
      <div className="w-full mb-4"></div>
      <input
        type="submit"
        className="font-bold text-xl w-full bg-purple-600 text-white hover:bg-purple-800 py-2 rounded transition-colors"
      />
      Cadastre-se
    </form>
  );
};
export default FormCadastro;
