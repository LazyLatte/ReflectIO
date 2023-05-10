import axios from '@api/axios';

export const findUser = async (name: string) => {
  const response = await axios.get(`/users?name=${name}`);
  return response.data;
};
export const userLogin = async (name: string, password: string) => {
  const response = await axios.post('/auth', { name, password }, {withCredentials: true});
  return response.data;
};

export const userRegister = async (name: string, password: string) => {
  const response = await axios.post('/register', { name, password }, {withCredentials: true});
  return response.data;
};

