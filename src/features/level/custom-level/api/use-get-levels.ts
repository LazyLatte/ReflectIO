import { useQuery } from "react-query";
import { useAuth, useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";

const useGetUserLevels = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    return useQuery<UserLevelInfo[], Error>({
        queryKey: ["custom", auth?.name], 
        queryFn: async () => {
            const {data} = await axiosPrivate.get<UserLevelInfo[]>('/levels/custom');
            return data;
        },
        retry: false,
        refetchOnMount: false
        //cacheTime: 1000
    })
}

export default useGetUserLevels;