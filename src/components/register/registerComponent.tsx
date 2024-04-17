'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleRegister } from '@/utils/useAuth';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleRegister(username, password);
    if (result === 'usuario creado') {
      router.push('/galeria');
    } else if (result === 'usuario existente') {
      router.push('/auth/login');
    } else {
      alert('Ocurrió un error al registrar el usuario');
      console.error('Ocurrió un error al registrar el usuario');
    }
  };

  const handleLoginAccount = () => {
    router.push('/auth/login');
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Registrar usuario nuevo</h1>
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
          Crear usuario
        </button>
        <div className="text-center mb-4">
          <span className="text-gray-500">¿Ya tienes una cuenta?</span>{' '}
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            onClick={handleLoginAccount}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
