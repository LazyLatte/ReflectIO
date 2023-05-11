import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo, LevelInfo, MirrorState } from "@features/level";
export const useUpdateLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id, levelInfo}: {id: string, levelInfo: LevelInfo}) => {
        const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/${id}`, {levelInfo});
        return data;
    })
}

export const useUploadLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id, levelInfo, mirrorStates}: {id: string, levelInfo: LevelInfo, mirrorStates: {reflectors: MirrorState[], lenses: MirrorState[]}}) => {
        const {data} = await axiosPrivate.put<UserLevelInfo>(`/levels/upload/${id}`, {levelInfo, mirrorStates});
        return data;
    })
}