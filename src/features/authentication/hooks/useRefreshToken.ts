import axios from '@api/axios';
import useAuth from './useAuth';
import {Auth} from '@contexts/AuthProvider'
const useRefreshToken = () => {
  const {setAuth} = useAuth()!;

  const refresh = async () => {
      const { data } = await axios.get<Auth>('/refresh', {withCredentials: true});
      setAuth(data);
      console.log(data);
      return data.accessToken;

  }

  return refresh;
}

export default useRefreshToken;