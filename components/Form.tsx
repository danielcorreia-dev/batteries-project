import { RiBatteryChargeLine } from 'react-icons/ri';
import InputForm from './InputForm';

const Form = () => (
  <form
    action="/send-data-here"
    method="post"
    className="flex flex-col py-2 px-4 bg-gray-200 items-center"
  >
    <RiBatteryChargeLine size={64} display="block" />
    <h2 className="text-2xl font-bold">Crie a sua conta</h2>
    <span className="mb-4">Fácil e rapidamente, insira seu dados</span>

    <div className="w-full mb-4">
      <InputForm type="text" id="email" name="email" label="Email" />
    </div>
    <div className="w-full mb-4">
      <InputForm type="text" id="user" name="user" label="Usuário" />
    </div>
    <div className="w-full mb-4">
      <InputForm type="text" id="password" name="password" label="Senha" />
    </div>
    <button
      type="submit"
      className="font-bold text-xl w-full bg-purple-600 text-white hover:bg-purple-800 py-2 rounded transition-colors"
    >
      Cadastre-se
    </button>
  </form>
);

export default Form;
