import { useQuery } from 'react-query';
import { ClearRecords } from './clears-type';
import { useAxiosPrivate } from "@features/authentication";

export const useGetClears = () => {
    const axiosPrivate = useAxiosPrivate();
    return useQuery<ClearRecords, Error>({
        queryKey: ["clears"], 
        queryFn: async () => {
            const {data} = await axiosPrivate.get<ClearRecords>('/levels/built-in');
            return data
        },
        retry: false,
        refetchOnMount: false,
        //cacheTime: 1000
    })
}

