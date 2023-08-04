import axios from '@api/axios';

export const findUser = async (name: string) => {
  const response = await axios.get(`/account?name=${name}`);
  return response.data;
};


export const userRegister = async (name: string, password: string) => {
  const response = await axios.post('/account/register', { name, password }, {withCredentials: true});
  return response.data;
};

export const userLogin = async (name: string, password: string) => {
  const response = await axios.post('/account/signin', { name, password }, {withCredentials: true});
  return response.data;
};

export const userSignOut = async () => {
  const response = await axios.post('/account/signout', {}, {withCredentials: true});
  return response.data;
};
