import {useMutation, useQueryClient} from 'react-query';
import { Difficulty} from "@features/level";
import { ClearRecords } from './clears-type';
import { useAxiosPrivate } from "@features/authentication";

export const usePatchClears = () => {
    const axiosPrivate = useAxiosPrivate(); 
    const queryClient = useQueryClient();
    return useMutation(async ({difficulty, idx} : {difficulty: Difficulty, idx: number}) => {
        const {data} = await axiosPrivate.patch<ClearRecords>(`/levels/built-in?difficulty=${difficulty}&idx=${idx}`);
        return data;
    },{
        retry: false,
        onSuccess: (data) => {
            queryClient.setQueryData(["clears"], data);
        }
    })
}