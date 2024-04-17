//region imports
import { useState, useEffect } from 'react';
import defaultUsers from './users.json';

//region constants
export interface User {
  username: string;
  password: string;
  createdAt: Date;
  rol: string;
}

const usersData = defaultUsers;

const bcrypt = require('bcryptjs');

//region initializeUsers
const initializeUsers = async (): Promise<User[]> => {
  const saltRounds = 10;

  const defaultUsers: User[] = await Promise.all(
    usersData.map(async (user: any) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        password: hashedPassword,
      };
    })
  );

  return defaultUsers;
};

//region useAuth
const useAuth = async (): Promise<{
  isLoggedIn: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
  handleRegister: (newUsername: string, newPassword: string) => Promise<void>;
}> => {
  //region States
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //region Load functionality
  const usersDefault = await initializeUsers();

  useEffect(() => {
    const userSessionString = localStorage.getItem('userSession');
    if (userSessionString) {
      const userSession = JSON.parse(userSessionString);
      const isLoggedIn = userSession.isLoggedIn;
      const loginTime = userSession.loginTime;
      const sessionDuration = new Date().getTime() - loginTime;

      if (sessionDuration > 3600000) {
        setIsLoggedIn(false);
        localStorage.removeItem('userSession');
        alert('Su sesión ha expirado. Inicie sesión nuevamente.');
      } else {
        setIsLoggedIn(isLoggedIn);
      }
    }
  }, []);

  const loadUsersFromLocalStorage = (): void => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers) as User[]);
    } else {
      setUsers(usersDefault);
      saveUsersToLocalStorage();
    }
  };

  useEffect(() => {
    loadUsersFromLocalStorage();
  }, []);

  //region Handlers
  const handleLogin = async (username: string, password: string): Promise<void> => {
    const user = users.find((user) => user.username === username);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        setIsLoggedIn(true);
        localStorage.setItem('userSession', JSON.stringify({
          username,
          isLoggedIn: true,
          loginTime: new Date().getTime(),
        }));
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Usuario no encontrado');
    }
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    localStorage.removeItem('userSession');
  };

  const handleRegister = async (newUsername: string, newPassword: string): Promise<void> => {
    const existingUser = users.find((user) => user.username === newUsername);
    if (existingUser) {
      alert('El nombre de usuario ya existe');
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const newUser: User = {
      username: newUsername,
      password: hashedPassword,
      rol: 'user',
      createdAt: new Date(),
    };

    setUsers([...users, newUser]);
    saveUsersToLocalStorage();
    setIsLoggedIn(true);
    return Promise.resolve();
  };

  //region Functions
  const saveUsersToLocalStorage = (): void => {
    localStorage.setItem('users', JSON.stringify(users));
  };



  return Promise.resolve({
    isLoggedIn,
    handleLogin,
    handleLogout,
    handleRegister,
  });
};

export default useAuth;