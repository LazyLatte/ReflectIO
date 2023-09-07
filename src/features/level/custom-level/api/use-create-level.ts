import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { isCancel } from "axios";
import { useAuth, useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";
import { defaultEmptyLevel } from "../utils";
const useCreateLevel = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    return useMutation(async ({height, width, thumbnail}: {height: number, width: number, thumbnail: string}) => {
        const {data} = await axiosPrivate.post<UserLevelInfo>('/levels', {height, width, thumbnail});
        return data;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(["custom", auth?.name], (prev: UserLevelInfo[] = []) => [...prev, data]);
            navigate('/custom', {state: {userLevelInfo: data}});
        },
        onError: (error: unknown, {height, width, thumbnail}: {height: number, width: number, thumbnail: string}) => {
            if(isCancel(error)){
                const oldData: UserLevelInfo[] = queryClient.getQueryData(["custom", ""]) || [];
                const newLevelInfo = {...defaultEmptyLevel, height, width, thumbnail, id: `${oldData.length}`};
                queryClient.setQueryData(["custom", ""], [...oldData, newLevelInfo]);
                navigate('/custom', {state: {userLevelInfo: newLevelInfo}});
            }
        }
    })
}

export default useCreateLevel;