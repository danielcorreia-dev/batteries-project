import { FunctionComponent } from 'react';

interface Props {
  type: string;
  label?: string;
  id?: string;
  name?: string;
}

const InputForm: FunctionComponent<Props> = ({ type, id, name, label}) => {
  return (
    <>
      <label htmlFor={id} className="mb-4 font-semibold text-sm">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="border -gray-400 rounded p-2 block mt-1 w-full bg-gray-300 outline-none focus:border-2 focus:border-purple-500"
      />
    </>
  );
};

export default InputForm;
