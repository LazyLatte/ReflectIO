import axios from 'axios';

const baseURL = 'http://localhost:3000/api';
//const baseURL = '/api';
export default axios.create({baseURL});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});