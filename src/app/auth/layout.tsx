'use client'
import React, { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { hasCookie } from 'cookies-next';
import { initializeUsers } from '@/utils/useAuth';
import defaultUsers from '../../utils/users.json';
import Navbar from '@/components/navbar/Navbar';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const isLoggedIn = hasCookie('isLoggedIn');

  useEffect(() => {
    initializeUsers(defaultUsers);
    if (!isLoggedIn) {
      router.push('/auth/login');
    } else {
      router.push('/galeria');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default AuthLayout;
