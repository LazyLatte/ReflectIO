import { useQuery } from 'react-query';
import { ClearRecords } from '..';
import { useAuth, useAxiosPrivate } from "@features/authentication";

const useGetClears = () => {
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

export default useGetClears;
