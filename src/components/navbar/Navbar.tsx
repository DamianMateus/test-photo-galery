'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasCookie, deleteCookie } from 'cookies-next';
import defaultUsers from '../../utils/users.json';
import { initializeUsers } from '@/utils/useAuth';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [pathnameState, setPathNameState] = useState('')
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';


  useEffect(() => {
    setPathNameState(pathname)
  }, [pathname]);

  useEffect(() => {
      const loggedIn = hasCookie('isLoggedIn');
      setIsLoggedIn(loggedIn);

      initializeUsers(defaultUsers);
      if (!loggedIn) {
        router.push('/auth/login');
      } else {
        setPathNameState('/galeria')
        router.push('/galeria');
      }
  }, [router]);

  const handleLogout = () => {
    deleteCookie('isLoggedIn');
    deleteCookie('userNameSession');
    localStorage.removeItem('userSession');
    setPathNameState('/out')
    alert('Sesión cerrada con éxito');
    router.push('/auth/login');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <nav className="flex justify-between items-center bg-blue-500 p-4">
      <div className="text-white font-bold">App Galería de Fotos Test</div>
      <div>
        {pathnameState == '/galeria' ? (
          <button className="text-white" onClick={handleLoginLogoutClick}>
            Log out
          </button>
        ) : (
          <button className="text-white" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;