import { useMutation } from "react-query";
import { useAxiosPrivate } from "@features/authentication";
import { MirrorStates } from "@features/level";
interface PersonalBest {
    personal_best: number;
}
const useClearLevel = () => {
    const axiosPrivate = useAxiosPrivate();
    return useMutation(async ({id, mirrorStates}: {id: string, mirrorStates: MirrorStates}) => {
        const {data} = await axiosPrivate.put<PersonalBest>(`/play/clear/${id}`, {mirrorStates});
        return data;
    })
}
export default useClearLevel;