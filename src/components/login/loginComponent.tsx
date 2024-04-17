'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleLogin } from '@/utils/useAuth';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleLogin(username, password);
    if (result == 'ok') {
      router.push('/galeria');
    } else {
    }
  };

  const handleCreateAccount = () => {
    router.push('/auth/register');
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4 text-center w-full">
          <label htmlFor="username" className="mb-1 block">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder='ingresa tu usuario'
          />
        </div>
        <div className="mb-4 text-center w-full relative">
          <label htmlFor="password" className="mb-1 block">Contraseña:</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none"
              placeholder='ingresa tu contraseña'
            />
            <button
              type="button"
              className="ml-2 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image src='/lock-solid.svg' alt='lock icon' width={15} height={15} />
            </button>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Iniciar Sesión
        </button>
        <div className="text-center mb-4">
          <span className="text-gray-500">¿No tienes una cuenta?</span>{' '}
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            onClick={handleCreateAccount}
          >
            Crear una cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
