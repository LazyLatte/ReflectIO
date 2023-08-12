import { isCancel } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuth, useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo, LevelInfo, MirrorState } from "@features/level";
export const useUpdateLevel = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation(async ({id, levelInfo, thumbnail}: {id: string, levelInfo: LevelInfo, thumbnail: string}) => {
        const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/${id}`, {levelInfo, thumbnail});
        return data;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(["custom", auth?.name], (prev: UserLevelInfo[] = []) => prev.map(e => e.id === data.id ? data : e));
        },
        onError: (error: unknown, {id, levelInfo, thumbnail}: {id: string, levelInfo: LevelInfo, thumbnail: string}) => {
            if(isCancel(error)){
                queryClient.setQueryData(["custom", ""], (prev: UserLevelInfo[] = []) => prev.map(e => e.id === id ? {...e, ...levelInfo, thumbnail} : e));
            }
        }
    })
}

export const useUploadLevel = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    return useMutation(async ({id, levelInfo, mirrorStates, thumbnail}: {id: string, levelInfo: LevelInfo, mirrorStates: {reflectors: MirrorState[], lenses: MirrorState[]}, thumbnail: string}) => {
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