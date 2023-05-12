import { useMutation, useQueryClient } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";
export const useDeleteLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation(async ({id}: {id: string}) => {
        const {data} = await axiosPrivate.delete<UserLevelInfo>(`/levels/${id}`);
        return data;
    },{
        retry: false,
        onSuccess: (data) => {
            queryClient.setQueryData(["custom"], data);
        }
    })
}

