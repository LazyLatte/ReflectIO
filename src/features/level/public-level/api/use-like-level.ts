import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
const useLikeLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id}: {id: string}) => {
        const {data} = await axiosPrivate.put(`/play/like/${id}`);
        return data;
    })
}
export default useLikeLevel;