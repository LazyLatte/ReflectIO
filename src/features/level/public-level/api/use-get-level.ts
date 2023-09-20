import { useQuery } from "react-query";
import { UserLevelInfo} from "@features/level";
import axios from '@api/axios';
import UuidEncoder from 'uuid-encoder';

const encoder = new UuidEncoder('base64url');
const useGetLevelByID = (id: string) => {
    return useQuery<UserLevelInfo | null, Error>({
        queryKey: ["search"], 
        queryFn: async () => {
            const decodeID = encoder.decode(id);
            const {data} = await axios.get<UserLevelInfo | null>(`/play/${decodeID}`);
            return data;
        },
        retry: false,
        refetchOnMount: false,
        enabled: false
    })
}

export default useGetLevelByID;