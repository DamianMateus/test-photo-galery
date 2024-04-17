import React, { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="px-4 py-2 w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">Bienvenido al test de galería en Next.js</h1>
        </div>
        <div className='mb-4 w-full flex justify-center'>
          <Image src='/login.svg' alt='login icon' className="w-20 h-20" width={75} height={75} />
        </div>
        <div className="container-content w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
