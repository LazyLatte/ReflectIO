import {useContext} from 'react';
import AxiosPrivateContext from '@contexts/AxiosPrivateProvider';


const useAxiosPrivate = () => {
  return useContext(AxiosPrivateContext);
}

export default useAxiosPrivate;