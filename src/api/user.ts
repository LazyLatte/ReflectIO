import axios from './axios';



export const findUser = async (name) => {
  const response = await axios.get(`/users?name=${name}`);
  return response.data;
};
export const userLogin = async (name, password) => {
  const response = await axios.post('/auth', { name, password }, {withCredentials: true});
  return response.data;
};

export const userRegister = async (name, password) => {
  const response = await axios.post('/register', { name, password }, {withCredentials: true});
  return response.data;
};

