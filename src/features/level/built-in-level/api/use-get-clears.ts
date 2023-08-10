import {useAuth} from '@features/authentication';
import { useQuery } from 'react-query';
import { ClearRecords } from './clears-type';
import { useAxiosPrivate } from "@features/authentication";

export const useGetClears = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    return useQuery<ClearRecords, Error>({
        queryKey: ["clears", auth?.name], 
        queryFn: async () => {
            const {data} = await axiosPrivate.get<ClearRecords>('/levels/built-in');
            return data
        },
        retry: false,
        refetchOnMount: false
        //cacheTime: 1000
    })
}

