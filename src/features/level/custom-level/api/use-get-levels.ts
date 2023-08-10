import { useQuery } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";

export const useGetUserLevels = () => {
    const axiosPrivate = useAxiosPrivate();
    return useQuery<UserLevelInfo[], Error>({
        queryKey: ["custom"], 
        queryFn: async () => {
            const {data} = await axiosPrivate.get<UserLevelInfo[]>('/levels/custom');
            return data;
        },
        retry: false
        //cacheTime: 1000
    })
}

