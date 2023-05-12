import {FC} from 'react';
import {useEffect, createContext} from 'react';
import { AxiosInstance } from 'axios';

import {axiosPrivate} from '@api/axios';
import {useAuth, useRefreshToken} from '@features/authentication';

const AxiosPrivateContext = createContext<AxiosInstance>(axiosPrivate);

export const AxiosPrivateProvider: FC<Provider> = ({children}) => {
    const { auth } = useAuth()!;
    const refresh = useRefreshToken();
    
    useEffect(()=>{
      const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
          const controller = new AbortController();

          if(!auth?.accessToken){
              controller.abort();
          }else if(!config.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          }
          return {
            ...config,
            signal: controller.signal
          };
        }, 
        (error) => Promise.reject(error)
      );
  
      const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
          const prevRequest = error?.config;
          if(error?.response?.status === 403 && !prevRequest?.sent){
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );
  
      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      }
    }, [auth, refresh]);
    return (
        <AxiosPrivateContext.Provider value={axiosPrivate}>
            {children}
        </AxiosPrivateContext.Provider>
    )
}

export default AxiosPrivateContext;