'use client'
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { hasCookie, getCookie } from 'cookies-next';
import { initializeUsers } from '@/utils/useAuth';
import defaultUsers from '../../utils/users.json'


const GaleryComponent = () => {
  const router = useRouter();
  const isLoggedIn = hasCookie('isLoggedIn');
  const userNameSession = getCookie('userNameSession');
  useEffect(() => {
    initializeUsers(defaultUsers);
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, router]);

  return (
    <div>GaleryComponent</div>
  )
}

export default GaleryComponent