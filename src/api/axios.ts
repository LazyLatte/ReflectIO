import axios from 'axios';

//const baseURL = 'http://localhost:3000/api';
const baseURL = 'ec2-52-11-140-52.us-west-2.compute.amazonaws.com/api';
export default axios.create({baseURL});

export const axiosPrivate = axios.create({
  baseURL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});