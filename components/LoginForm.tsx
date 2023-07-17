import { useForm, Controller } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type Props = {};

const LoginForm: FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState<string>('');

  const { push } = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Insira um e-mail válido'),
    password: Yup.string().required('Insira a senha'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: any) => {
    setAuthError('');
    const { email, password } = data;

    const result = await signIn('credentials', {
      email,
      password,
      rememberMe,
      redirect: false,
    });

    if (!result?.ok) {
      setAuthError('Email ou senha inválido');
    } else {
      push('/sistema/');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e: any) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className={`${
                  errors.email ? 'border-red-500 border-2' : ''
                } border rounded p-2 block mt-1 w-full bg-neutral-100 outline-none focus:border-2 focus:border-purple-500`}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Senha:</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  className="border rounded p-2 block mt-1 w-full bg-neutral-100 outline-none focus:border-2 focus:border-purple-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 h-max "
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="rememberMe">
            <input
              type="checkbox"
              className="w-4 h-4 accent-violet-500 mr-2"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Lembrar de mim
          </label>
        </div>
        <button
          type="submit"
          className={`border py-2 px-4 mb-4 rounded bg-violet-500 text-white w-100 w-max transition-all ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          <span className="transition-all">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </span>
        </button>
        {authError && <div className="text-red-500">{authError}</div>}
      </form>
    </>
  );
};

export default LoginForm;
