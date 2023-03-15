import { FunctionComponent } from 'react';
import { RiRegisteredFill } from 'react-icons/ri';
interface InputData {
  type: string;
  label: string;
  id: string;
  placeholder: string;
  name: string;
}

const InputForm: FunctionComponent<InputData> = ({
  type,
  id,
  label,
  placeholder,
  name,
}) => {
  return (
    <>
      <label htmlFor={id} className="mb-4 font-semibold text-sm">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="border -gray-400 rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
        {...register(name)}
      />
    </>
  );
};

export default InputForm;
