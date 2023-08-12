import { useMutation, useQueryClient } from "react-query";
import { isCancel } from "axios";
import { useAuth, useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";
export const useDeleteLevel = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation(async ({id}: {id: string}) => {
        const {data} = await axiosPrivate.delete<UserLevelInfo>(`/levels/${id}`);
        return data;
    },{
        retry: false,
        onSuccess: (data) => {
            queryClient.setQueryData(["custom", auth?.name], (prev: UserLevelInfo[] = []) => {
                return prev.filter(e => e.id !== data.id);
            });
        },
        onError: (error: unknown, {id}: {id: string}) => {
            if(isCancel(error)){
                queryClient.setQueryData(["custom", ""], (prev: UserLevelInfo[] = []) => {
                    return prev.filter(e => e.id !== id);
                });
            }
        }
    })
}

