import { isCancel } from 'axios';
import {useMutation, useQueryClient} from 'react-query';
import { Difficulty} from "@features/level";
import { ClearRecords } from './clears-type';
import { useAuth, useAxiosPrivate } from "@features/authentication";

export const usePatchClears = () => {
    const {auth} = useAuth()!;
    const axiosPrivate = useAxiosPrivate(); 
    const queryClient = useQueryClient();
    return useMutation(async ({difficulty, idx} : {difficulty: Difficulty, idx: number}) => {
        const {data} = await axiosPrivate.patch<ClearRecords>(`/levels/built-in?difficulty=${difficulty}&idx=${idx}`);
        return data;
    },{
        retry: false,
        onSuccess: (data) => {
            queryClient.setQueryData(["clears", auth?.name], data);
        },
        onError: (error: unknown, {difficulty, idx} : {difficulty: Difficulty, idx: number}) => {
            if(isCancel(error)){
                queryClient.setQueryData(["clears", ""], (prev: ClearRecords = {easy: 0, normal: 0, hard: 0}) => {
                    prev[difficulty] |= 1 << idx;
                    return prev;
                });
            }
        }
    })
}