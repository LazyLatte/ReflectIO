import {useMutation, useQueryClient} from 'react-query';
import { Difficulty, BuiltInLevelClearRecordsInterface } from "@features/level";
import { useAxiosPrivate } from "@features/authentication";
export const usePatchClears = (difficulty: Difficulty, idx: number) => {
    const axiosPrivate = useAxiosPrivate(); 
    //const queryClient = useQueryClient();
    return useMutation(async () => {
        return await axiosPrivate.patch(`/levels/built-in?difficulty=${difficulty}&idx=${idx}`);
    })
}