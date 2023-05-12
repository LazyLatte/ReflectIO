import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo, LevelInfo, MirrorState } from "@features/level";
export const useUpdateLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id, levelInfo, thumbnail}: {id: string, levelInfo: LevelInfo, thumbnail: string}) => {
        const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/${id}`, {levelInfo, thumbnail});
        return data;
    })
}

export const useUploadLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id, levelInfo, mirrorStates, thumbnail}: {id: string, levelInfo: LevelInfo, mirrorStates: {reflectors: MirrorState[], lenses: MirrorState[]}, thumbnail: string}) => {
        const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/upload/${id}`, {levelInfo, mirrorStates, thumbnail});
        return data;
    })
}