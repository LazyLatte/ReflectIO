import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { UserLevelInfo} from "@features/level";
export const useCreateLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({height, width, thumbnail}: {height: number, width: number, thumbnail: string}) => {
        const {data} = await axiosPrivate.post<UserLevelInfo>('/levels', {height, width, thumbnail});
        return data;
    })
}

