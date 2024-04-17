'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasCookie } from 'cookies-next';
import defaultUsers from '../../utils/users.json';
import { initializeUsers, UserInterface } from '@/utils/useAuth';

const HomeComponent = () => {
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
  return (null)
};

export default HomeComponent;
