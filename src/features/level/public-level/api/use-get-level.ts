import { useQuery } from "react-query";
import { UserLevelInfo} from "@features/level";
import axios from '@api/axios';

const useGetLevelByID = (id: string) => {
    return useQuery<UserLevelInfo | null, Error>({
        queryKey: ["search"], 
        queryFn: async () => {
            const {data} = await axios.get<UserLevelInfo | null>(`/levels/${id}`);
            return data;
        },
        retry: false,
        refetchOnMount: false,
        enabled: false
    })
}

export default useGetLevelByID;