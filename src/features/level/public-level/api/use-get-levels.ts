import { useInfiniteQuery } from "react-query";
import { UserLevelInfo} from "@features/level";
import { useAuth } from "@features/authentication";
import axios from '@api/axios';
const pageSize = 5;
const useGetGlobalLevels = (orderBy: string = 'clears', ascend: boolean = false) => {
    const {auth} = useAuth()!;
    const name = auth?.accessToken ? auth?.name : '';
    return useInfiniteQuery<UserLevelInfo[], Error>({
        queryKey: ["global"], 
        queryFn: async ({ pageParam = 0 }) => {
            const {data} = await axios.get<UserLevelInfo[]>(`/levels?name=${name}&start=${pageParam}&orderBy=${orderBy}&ascend=${ascend}`);
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < pageSize ? undefined :  allPages.length * pageSize;
        },
        retry: false,
        cacheTime: 0
    })
}

export default useGetGlobalLevels;