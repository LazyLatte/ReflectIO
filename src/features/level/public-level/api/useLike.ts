import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
export const useLike = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id}: {id: string}) => {
        const {data} = await axiosPrivate.put(`/levels/like/${id}`);
        return data;
    })
}