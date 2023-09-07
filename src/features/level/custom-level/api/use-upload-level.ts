import { isCancel } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuth, useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo, LevelInfo, MirrorStates } from "@features/level";
const useUploadLevel = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation(async ({id, levelInfo, mirrorStates, thumbnail}: {id: string, levelInfo: LevelInfo, mirrorStates: MirrorStates, thumbnail: string}) => {
        const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/upload/${id}`, {levelInfo, mirrorStates, thumbnail});
        return data;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(["custom", auth?.name], (prev: UserLevelInfo[] = []) => prev.map(e => e.id === data.id ? {...data, public: true} : e));
        },
        onError: (error: unknown) => {
            if(isCancel(error)){
                alert("Guest cannot upload levels");
            }
        }
    })
}
export default useUploadLevel;