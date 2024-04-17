//region imports
import { setCookie, deleteCookie } from "cookies-next";

//region constants
export interface UserInterface {
  username: string;
  password: string;
  createdAt?: Date;
  rol: string;
}

const bcrypt = require('bcryptjs');

//region initializeUsers
export const initializeUsers = (users: UserInterface[]) => {
  const usersLoad = loadUsersFromLocalStorage()

  if (usersLoad) {
    return
  } else {
    const saltRounds = 10;
    const defaultUsers: UserInterface[] = users.map((user: any) => {

      const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        password: hashedPassword,
      };
    });

    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

//region loadUsersFromLocalStorage

export const loadUsersFromLocalStorage = () => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers
};

//region handleLogin

export const handleLogin = async (username: string, password: string) => {
  const users = localStorage.getItem('users');
  const usersArray = JSON.parse(users ? users : '');


  const user = usersArray.find((user: UserInterface) => user.username === username);
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      localStorage.setItem('userSession', JSON.stringify({
        username,
        isLoggedIn: true,
        loginTime: new Date().getTime(),
      }));
      setCookie("isLoggedIn", 'true')
      setCookie("userNameSession", username);
      alert('login satisfactorio');
      return 'ok'
    } else {
      alert('Credenciales incorrectas');
      return 'incorrect'
    }
  } else {
    alert('Usuario no encontrado');
    return 'incorrect'
  }
};

//region handleLogout

export const handleLogout = () => {
  deleteCookie('isLoggedIn');
  deleteCookie('userNameSession');
  localStorage.removeItem('userSession');
};

//region handleRegister

export const handleRegister = async (newUsername: string, newPassword: string) => {
  const users = localStorage.getItem('users');
  const usersArray = JSON.parse(users ? users : '');

  const existingUser = usersArray.find((user: UserInterface) => user.username === newUsername);
  if (existingUser) {
    alert('El nombre de usuario ya existe');
    return 'usuario existente';
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const newUser: UserInterface = {
      username: newUsername,
      password: hashedPassword,
      rol: 'user',
      createdAt: new Date(),
    };

    usersArray.push(newUser);
    localStorage.setItem('users', JSON.stringify(usersArray));
    return 'usuario creado'
  }
};