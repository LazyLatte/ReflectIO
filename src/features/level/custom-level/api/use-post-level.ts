import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";
export const useCreateLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({height, width}: {height: number, width: number}) => {
        console.log(height, width);
        const {data} = await axiosPrivate.post<UserLevelInfo>('/levels');
        return data;
    })
}

