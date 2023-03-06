import { RiBatteryChargeLine } from 'react-icons/ri';

const Form = () => {
  return (
    <form
      action="/send-data-here"
      method="post"
      className="flex flex-col py-2 px-4 bg-gray-200 items-center"
    >
      <RiBatteryChargeLine size={64} display="block" />
      <h2 className='text-2xl font-bold'>Crie a sua conta</h2>
      <span className='mb-4'>Fácil e rapidamente, insira seu dados</span>

      <div className="w-full mb-4">
        <label htmlFor="email" className="mb-4 font-semibold text-sm">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="border -gray-400 rounded p-2 block mt-1 w-full bg-gray-300"
        />
      </div>

      <div className="w-full mb-4">
        <label htmlFor="user" className="mb-4 font-semibold text-sm">
          Usuário
        </label>
        <input
          type="text"
          id="user"
          name="user"
          className="border -gray-400 rounded p-2 block mt-1 w-full bg-gray-300"
        />
      </div>

      <div className="w-full mb-4">
        <label htmlFor="passwordUser" className="mb-4 font-semibold text-sm">
          Senha
        </label>
        <input
          type="text"
          id="passwordUser"
          name="passwordUser"
          className="border -gray-400 rounded p-2 block mt-1 w-full bg-gray-300"
        />
      </div>
      <button type="submit" className='font-bold text-xl w-full bg-purple-600 text-white hover:bg-purple-800 py-2 rounded transition-colors'>Cadastre-se</button>
      
    </form>
  );
};

export default Form;
