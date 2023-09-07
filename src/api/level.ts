import axios from './axios';

export const listGlobalLevels = async (name: string, start: number, orderBy: string = 'clears', ascend: boolean = false) => {
    const response = await axios.get(`/levels?name=${name}&start=${start}&orderBy=${orderBy}&ascend=${ascend}`);
    return response.data;
};

export const getLevelByID = async (id: string) => {
  const response = await axios.get(`/levels/${id}`);
  return response.data;
};


// export const listUserLevels = async (axiosPrivate) => {
//   const response = await axiosPrivate.get('/levels/user');
//   return response.data;
// };

// export const createLevel = async (axiosPrivate, levelInfo) => {
//   const response = await axiosPrivate.post('/levels', {levelInfo});
//   return response.data;
// };
// export const updateLevel = async (axiosPrivate, id, levelInfo) => {
//   const response = await axiosPrivate.put(`/levels/${id}`, {levelInfo});
//   return response.data;
// };
// export const uploadLevel = async (axiosPrivate, id, levelInfo) => {
//   const response = await axiosPrivate.post(`/levels/upload/${id}`, {levelInfo});
//   return response.data;
// };
