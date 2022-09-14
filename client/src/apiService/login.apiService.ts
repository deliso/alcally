import { User } from '../../../types/types';

const BASE_URL = 'http://localhost:3001';

interface ApiService {
  register: (user: User) => Promise<any>;
  login: (user: User) => Promise<User | Error>;
  companies: () => any;
  logout: () => any;
}
const apiService = {} as ApiService;

apiService.register = async (user: User) => {
  try {
    const registeredUser = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      // credentials: 'include',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const jsonRegisteredUser = registeredUser.json();
    return jsonRegisteredUser;
  } catch (error) {
    return error;
  }
};

apiService.login = async (user: User) => {
  try {
    const resultUser = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      // credentials: 'include',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const jsonResultUser = resultUser.json();
    return jsonResultUser;
  } catch (error) {
    console.log(error);
  }
};

apiService.companies = () => {
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;
